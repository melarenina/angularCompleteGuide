import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from '../Auth/user.model';
import { environment } from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store (NgRx)/auth.actions';

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})

export class AuthService{
    // BehaviorSubject allows us to get access to the current user, even after that user has been emitted
    // user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
                private router: Router,
                private store: Store<fromApp.AppState>){}

    logout(){
        // Passgin an null "user"
        // this.user.next(null);

        // Cleaning the user from the local storage
        localStorage.removeItem('userData');

        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogin(){
        // Gettin the user we've stored in the local storage of the browser, converted into a javascript object
        const userData: {
            email: string;
            id: string,
            _token: string;
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData){
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        // Checking if it has a valid token
        if (loadedUser.token) {
            // this.user.next(loadedUser);
            this.store.dispatch(new AuthActions.AuthenticateSuccess(
                {
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate)
                }
            ));
                                                // Future date of expiration            -  Current Date (in miliseconds)
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        } , expirationDuration);
    }

}
