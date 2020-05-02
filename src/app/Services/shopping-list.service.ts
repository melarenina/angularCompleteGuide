import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable()

export class ShoppingListService{
    startedEditing = new Subject<number>();
    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10),
      ];

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);

        // Passando novamente uma cópia da array, mas dessa vez, com o novo ingrediente
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredients(){
        //  The slice will return a copy of the current array, so if any change happens
        // It wont affect the array
        return this.ingredients.slice();
    }

    addIngredients(ingredients: Ingredient[]){
        // '...' means the spread operator, which will transform our array into a list, so it can add
        // one element at a time, and not the whole array as one element
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}

