import { Injectable } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store (NgRx)/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({providedIn: 'root'})

export class AuthService{
    // BehaviorSubject allows us to get access to the current user, even after that user has been emitted
    // user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer: any;

    constructor(private store: Store<fromApp.AppState>){}

    setLogoutTimer(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        } , expirationDuration);
    }

    clearLogoutTimer(){
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

}
