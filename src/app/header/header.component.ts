import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../Services/data-storage.service';
import { AuthService } from '../Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl:  './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{

    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private dsService: DataStorageService,
                private authService: AuthService){}

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user => {
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
