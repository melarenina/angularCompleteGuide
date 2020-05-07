import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store (NgRx)/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})

// Whenever the route with the recipes id loads, this resolver fetches all recipes again, from the server,
// so then, if the page reloads, it will not fail, and will show the recipes

export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private recipesService: RecipeService,
                private store: Store<fromApp.AppState>,
                private actions$: Actions){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipesService.getRecipes();
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
                return recipesState.recipes;
            }),
            // tslint:disable-next-line:no-shadowed-variable
            switchMap(recipes => {
                if (recipes.length === 0){
                    this.store.dispatch(new RecipeActions.FetchRecipes());
                    return this.actions$.pipe(
                        ofType(RecipeActions.SET_RECIPES), take(1)
                    );
                }else{
                    return of(recipes);
                }
            })
        );
    }
}
