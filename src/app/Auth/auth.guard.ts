import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService,
                private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot): boolean | Promise <boolean> | Observable<boolean | UrlTree>{

        // Using map to transfor the value user returns into a boolean value
        return this.authService.user.pipe(
            take(1),
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
