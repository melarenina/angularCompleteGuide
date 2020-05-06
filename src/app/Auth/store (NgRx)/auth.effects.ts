import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects{

    constructor(private actions$: Actions,
                private http: HttpClient){}

    @Effect()
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
                const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                return of(new AuthActions.Login({
                    email: resData.email,
                    userId: resData.localId,
                    token: resData.idToken,
                    expirationDate
                }));
            }), catchError(error => {
                    // ...
                    return of(); // returns a new observable
                })
            );
        })
    );

}
