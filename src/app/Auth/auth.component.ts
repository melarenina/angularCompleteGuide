import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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

    onSubmit(form: NgForm){
        form.reset();
    }

}
