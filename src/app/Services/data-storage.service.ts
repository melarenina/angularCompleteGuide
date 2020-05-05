import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})

export class DataStorageService{

    constructor(private http: HttpClient,
                private recipesService: RecipeService,
                private authService: AuthService){}

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

        // Getting the latest user
        // Pipe/Take - To make sure that I onlu wanna take 1 value from the observable, and right after, it should unsubscribe
        // Exhaust map waits for the firt observable (the user one) to complete, gets the value from it (user), and then returns
        // a new observable (hhtp get), that will replace the old one

        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http.get<Recipe[]>(

                // Firebase API need the token as a query params. Others APIS usually get as a header

                'https://courseproject-33c56.firebaseio.com/recipes.json',
                {
                    params: new HttpParams().set('auth', user.token)
                }
            );
        }), map(recipes => {
            return recipes.map(recipe => {
            // ...recipe - copying all the data from recipe
            // if there's any ingredient, it returns them, if not, it sets them to an empty array
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }), tap(recipes => {
                this.recipesService.setRecipes(recipes);
            }));
    }

}
