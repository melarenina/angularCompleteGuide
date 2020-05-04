import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})

export class DataStorageService{

    constructor(private http: HttpClient,
                private recipesService: RecipeService){}

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

}
