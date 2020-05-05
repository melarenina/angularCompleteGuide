import { Component } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent{

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(formData: NgForm){

        if ( !formData.valid ){
            return;
        }

        const email = formData.value.email;
        const password = formData.value.password;

        this.isLoading = true;

        if (this.isLoginMode){
            // ....
        }else{
            this.authService.signUp(email, password)
        .subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
        }, error => {
            this.error = 'An error ocurred: ' + error.message;
            this.isLoading = false;
            }
        );
        }

        formData.reset();

    }

}
