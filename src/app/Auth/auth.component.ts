import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AlertComponent } from '../shared/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService, AuthResponseData } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store (NgRx)/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnDestroy{

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private closeSub: Subscription;
    @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;

    constructor(private authService: AuthService,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver,
                private store: Store<fromApp.AppState>){}
                // Component factory allows us to get access to the component factory, in which we pass the
                // component we want to have access, so that angular creates it for us

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    private showErrorAlert(errorMessage: string){
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = errorMessage;

        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
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
            this.store.dispatch(new AuthActions.LoginStart({email, password}));
            // authObservable = this.authService.login(email, password);
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

    ngOnDestroy(){
        if (this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

}
