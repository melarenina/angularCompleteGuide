import { Component } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { AuthService, AuthResponseData } from '../Services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent{

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService,
                private router: Router){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onHadleError(){
        this.error = null;
    }

    onSubmit(formData: NgForm){

        if ( !formData.valid ){
            return;
        }

        const email = formData.value.email;
        const password = formData.value.password;

        let authObservable: Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.isLoginMode){
            authObservable = this.authService.login(email, password);
        }else{
            authObservable = this.authService.signUp(email, password);
        }

        authObservable.subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {

            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
            }
        );

        formData.reset();

    }

}
