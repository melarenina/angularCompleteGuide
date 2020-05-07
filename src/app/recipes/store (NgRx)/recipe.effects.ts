import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects{

    constructor(private actions$: Actions,
                private http: HttpClient,
                private store: Store<fromApp.AppState>){}

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')), // Merge a value from another observable into this one
        switchMap(([actionData , recipesState]) => {
            // Put overwrites all the data on our server
            return this.http.put(                               // Recipes is to create a new folder, and .json is because of firebase (our backend)
            'https://courseproject-33c56.firebaseio.com/recipes.json',
            recipesState.recipes
            );
        })
    );

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(
                'https://courseproject-33c56.firebaseio.com/recipes.json',
            );
        }), map(recipes => {
            return recipes.map(recipe => {
            // ...recipe - copying all the data from recipe
            // if there's any ingredient, it returns them, if not, it sets them to an empty array
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })
    );

}
