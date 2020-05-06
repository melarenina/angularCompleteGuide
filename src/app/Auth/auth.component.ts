import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
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

export class AuthComponent implements OnDestroy, OnInit{

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private closeSub: Subscription;
    private storeSub: Subscription;
    @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;

    constructor(private authService: AuthService,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver,
                private store: Store<fromApp.AppState>){}
                // Component factory allows us to get access to the component factory, in which we pass the
                // component we want to have access, so that angular creates it for us


    ngOnInit(){
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error){
                this.showErrorAlert(this.error);
                this.isLoading = false;
            }
        });
    }

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
        this.store.dispatch(new AuthActions.ClearError());
    }

    onSubmit(formData: NgForm){

        if ( !formData.valid ){
            return;
        }

        const email = formData.value.email;
        const password = formData.value.password;


        this.isLoading = true;

        if (this.isLoginMode){
            this.store.dispatch(new AuthActions.LoginStart({email, password}));
            // authObservable = this.authService.login(email, password);
        }else{
            this.store.dispatch(new AuthActions.SignupStart({email, password}));
        }

        // authObservable.subscribe(resData => {
        //     console.log(resData);
        //     this.isLoading = false;
        //     this.router.navigate(['/recipes']);
        // }, errorMessage => {

        //     console.log(errorMessage);
        //     this.error = errorMessage;
        //     this.showErrorAlert(errorMessage);
        //     this.isLoading = false;
        //     }
        // );

        formData.reset();

    }

    ngOnDestroy(){
        if (this.closeSub){
            this.closeSub.unsubscribe();
        }

        if (this.storeSub){
            this.storeSub.unsubscribe();
        }
    }

}
