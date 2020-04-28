import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable()

export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a text', 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/healthy-eating-ingredients-1296x728-header.jpg?w=1155&h=1528'),
        new Recipe('The Second Test Recipe', 'This is simply a text', 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/healthy-eating-ingredients-1296x728-header.jpg?w=1155&h=1528')
      ];

      getRecipe(){
          //  The slice will return a copy of the current array, so if any change happens
          // It wont affect the array
          return this.recipes.slice();
      }
}
