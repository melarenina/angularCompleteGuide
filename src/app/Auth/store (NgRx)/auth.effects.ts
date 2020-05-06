import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

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
            ).pipe(catchError(error => {
                // ...
                of(); // returns a new observable
            }), map(resData => {
                of();
            }));
        })
    );

}
