import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})

export class AuthService{

    constructor(private http: HttpClient){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyBpU3IauKUBJPE33v32Mo2HeFbJ9AKylyM]',
            {
                email,
                password,
                returnSecureToken: true
            }
        );
    }

}
