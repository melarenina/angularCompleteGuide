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

        if (this.isLoginMode){
            // ....
        }else{
            this.authService.signUp(email, password)
        .subscribe(resData => {
            console.log(resData);
        }, error => {
            console.log(error);
            }
        );
        }

        formData.reset();

    }

}
