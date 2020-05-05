import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})

// Whenever the route with the recipes id loads, this resolver fetches all recipes again, from the server,
// so then, if the page reloads, it will not fail, and will show the recipes

export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private dsService: DataStorageService,
                private recipesService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipesService.getRecipes();

        // Checking if there is any recipe loaded
        if (recipes.length === 0){
            return this.dsService.fetchRecipes();
        }else{
            return recipes;
        }
    }
}
