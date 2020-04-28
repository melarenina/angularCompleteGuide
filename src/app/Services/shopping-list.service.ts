import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()

export class ShoppingListService{

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10),
      ];

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
    }

    getIngredients(){
        //  The slice will return a copy of the current array, so if any change happens
        // It wont affect the array
        return this.ingredients.slice();
    }

}

