import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store (NgRx)/recipe.actions';

@Injectable({providedIn: 'root'})

export class DataStorageService{

    constructor(private http: HttpClient,
                private recipesService: RecipeService,
                private store: Store<fromApp.AppState>){}

    storeRecipes(){
        const recipes = this.recipesService.getRecipes();

        // Put overwrites all the data on our server
        this.http.put(                               // Recipes is to create a new folder, and .json is because of firebase (our backend)
            'https://courseproject-33c56.firebaseio.com/recipes.json',
            recipes
        ).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>(
            'https://courseproject-33c56.firebaseio.com/recipes.json',
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                // ...recipe - copying all the data from recipe
                // if there's any ingredient, it returns them, if not, it sets them to an empty array
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                });
            }), tap(recipes => {
                this.store.dispatch(new RecipesActions.SetRecipes(recipes));
                // this.recipesService.setRecipes(recipes);
                })
        );
    }

}
