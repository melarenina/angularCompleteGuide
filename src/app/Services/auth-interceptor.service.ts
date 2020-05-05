import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { NotExpr } from '@angular/compiler';


@Injectable()

export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){

        // Pipe/Take - To make sure that I only wanna take 1 value from the observable, and right after, it should unsubscribe
        // Exhaust map waits for the firt observable (the user one) to complete, gets the value from it (user), and then returns
        // a new observable (hhtp get), that will replace the old one

        // This method will return a request with the query param auth, containing the token
        return this.authService.user
        .pipe(
            take(1),
            exhaustMap(user => {
                if (!user){
                    // Caso não tenha um usuário (login, por exemplo), ele envia a request sem adicionar os parametros
                    return next.handle(req);
                }
                // Firebase API need the token as a query params. Others APIS usually get as a header
                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle(modifiedReq);
            })
        );

    }
}
