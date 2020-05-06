import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService,
                private router: Router,
                private store: Store<fromApp.AppState>) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot): boolean | Promise <boolean> | Observable<boolean | UrlTree>{

        // Using map to transfor the value user returns into a boolean value
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user; // returning a new observable user
            }),
            map(user => {
            // If is a undefined, null value, it returns false. Otherwise, true.
            const isAtuh = !!user;

            if (isAtuh){
                return true;
            }else{
                return this.router.createUrlTree(['/auth']);
            }
        }));
    }
}
