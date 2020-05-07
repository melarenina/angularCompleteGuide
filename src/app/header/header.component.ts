import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../Auth/store (NgRx)/auth.actions';
import * as RecipeActions from '../recipes/store (NgRx)/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl:  './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{

    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private store: Store<fromApp.AppState>){}

    ngOnInit(){
        this.userSub = this.store.select('auth').pipe(
            map(authState => authState.user) // This will return a new user as an observable
        ).
        subscribe(user => {
            this.isAuthenticated = !!user; // Same thing as !user ? false : true;
        });
    }

    onLogout(){
        this.store.dispatch(new AuthActions.Logout());
    }

    onSaveData(){
        // this.dsService.storeRecipes();
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetchData(){
        // this.dsService.fetchRecipes().subscribe();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}
