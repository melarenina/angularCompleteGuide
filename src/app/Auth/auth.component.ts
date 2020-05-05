import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { AuthService, AuthResponseData } from '../Services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent{

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;

    constructor(private authService: AuthService,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver){}
                // Component factory allows us to get access to the component factory, in which we pass the
                // component we want to have access, so that angular creates it for us

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    private showErrorAlert(errorMessage: string){
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        hostViewContainerRef.createComponent(alertCmpFactory);
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
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
            }
        );

        formData.reset();

    }

}
