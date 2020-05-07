import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store (NgRx)/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

// Whenever the route with the recipes id loads, this resolver fetches all recipes again, from the server,
// so then, if the page reloads, it will not fail, and will show the recipes

export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private recipesService: RecipeService,
                private store: Store<fromApp.AppState>,
                private actions$: Actions){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipesService.getRecipes();

        // Checking if there is any recipe loaded
        if (recipes.length === 0){
            this.store.dispatch(new RecipeActions.FetchRecipes());
            return this.actions$.pipe(
                ofType(RecipeActions.SET_RECIPES), take(1)
            );
        }else{
            return recipes;
        }
    }
}
