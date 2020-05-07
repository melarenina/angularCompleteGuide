import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({
        email,
        userId,
        token,
        expirationDate,
        redirect: true
    });
};

const handleError = (errorResponse: any) => {

    let errorMessage = 'An unknown error occurred!';

    if (!errorResponse.error || !errorResponse.error.error){
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }

    switch (errorResponse.error.error.message) {

        case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists!';
            break;

        case 'EMAIL_NOT_FOUND':
            errorMessage = 'Invalid email.';
            break;

        case 'INVALID_PASSWORD':
            errorMessage = 'Incorrect Password.';
            break;

    }

    // returns a new observable
    return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects{

    constructor(private actions$: Actions,
                private http: HttpClient,
                private router: Router,
                private authService: AuthService){}

    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe(tap(resData => {
                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }
            ), map(resData => {
                return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
            }), catchError(errorResponse => {
                return handleError(errorResponse);
            })
            );
        })
    );

    @Effect() // This effect returns a new action
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START), // Only continue this if the action if of type LOGIN_START
        switchMap((authData: AuthActions.LoginStart) => { // Creates a new observable, by taking another observable's data
                return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(tap(resData => {
                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }
            ), map(resData => {
                return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
            }), catchError(errorResponse => {
                return handleError(errorResponse);
            })
            );
        })
    );

    @Effect({dispatch: false}) // This effect doesn't return a new action
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
            if (authSuccessAction.payload.redirect) {
                this.router.navigate(['/']);
            }
        })
    );

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }));

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            // Gettin the user we've stored in the local storage of the browser, converted into a javascript object
            const userData: {
                email: string;
                id: string,
                _token: string;
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));

            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );

            if (!userData){
                return { type: 'DUMMY' };
            }

            // Checking if it has a valid token
            if (loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                // this.user.next(loadedUser);
                return new AuthActions.AuthenticateSuccess(
                    {
                        email: loadedUser.email,
                        userId: loadedUser.id,
                        token: loadedUser.token,
                        expirationDate: new Date(userData._tokenExpirationDate),
                        redirect: false
                    }
                );
                                                    // Future date of expiration            -  Current Date (in miliseconds)
                // this.autoLogout(expirationDuration);
            }

            return { type: 'DUMMY' };
        })
    );

}
