import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../Auth/user.model';
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

@Injectable({providedIn: 'root'})

export class AuthService{
    // BehaviorSubject allows us to get access to the current user, even after that user has been emitted
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient,
                private router: Router){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpU3IauKUBJPE33v32Mo2HeFbJ9AKylyM',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), // Tap allows us to perform some action, without changing the response.
            tap(resData => {                // Just runs some code with the data you get back from the observable
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpU3IauKUBJPE33v32Mo2HeFbJ9AKylyM',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), // Tap allows us to perform some action, without changing the response.
            tap(resData => {                // Just runs some code with the data you get back from the observable
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    logout(){
        // Passgin an null "user"
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
        // The expires in comes in seconds. So we add it to the time we have now, and multiply for 1000
        // So that we can get the expiration date in miliseconds, conerted to a date because of the new date
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
    }


    private handleError(errorResponse: HttpErrorResponse){
        let errorMessage = 'An unklnown error occurred!';

        if (!errorResponse.error || !errorResponse.error.error){
            return throwError(errorMessage);
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

        return throwError(errorMessage);

    }

}
