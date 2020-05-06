import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../Auth/auth.service';
import * as fromApp from '../store/app.reducer';

@Component({
    selector: 'app-header',
    templateUrl:  './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{

    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private dsService: DataStorageService,
                private authService: AuthService,
                private store: Store<fromApp.AppState>){}

    ngOnInit(){
        this.userSub = this.store.select('auth').pipe(
            map(authState => authState.user) // This will return a new user as an observable
        ).
        subscribe(user => {
            this.isAuthenticated = !!user; // Same thing as !user ? false : true;
        });
    }

    onLogout(){
        this.authService.logout();
    }

    onSaveData(){
        this.dsService.storeRecipes();
    }

    onFetchData(){
        this.dsService.fetchRecipes().subscribe();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}
