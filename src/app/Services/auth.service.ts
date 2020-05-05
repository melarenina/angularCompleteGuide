import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

    constructor(private http: HttpClient){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpU3IauKUBJPE33v32Mo2HeFbJ9AKylyM',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpU3IauKUBJPE33v32Mo2HeFbJ9AKylyM',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
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
