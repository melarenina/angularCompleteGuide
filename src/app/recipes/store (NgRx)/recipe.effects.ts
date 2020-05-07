import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects{

    constructor(private actions$: Actions,
                private http: HttpClient){}

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
