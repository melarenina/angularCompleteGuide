import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from './data-storage.service';

@Injectable({providedIn: 'root'})

// Whenever the route with the recipes id loads, this resolver fetches all recipes again, from the server,
// so then, if the page reloads, it will not fail, and will show the recipes

export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private dsService: DataStorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.dsService.fetchRecipes();
    }
}
