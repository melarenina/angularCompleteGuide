import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';

import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
    return new AuthActions.AuthenticateSuccess({
        email,
        userId,
        token,
        expirationDate
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
                private router: Router){}

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
            ).pipe(map(resData => {
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
            ).pipe(map(resData => {
                return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
            }), catchError(errorResponse => {
                return handleError(errorResponse);
            })
            );
        })
    );

    @Effect({dispatch: false}) // This effect doesn't return a new action
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => {
            this.router.navigate(['/']);
        })
    );


}
