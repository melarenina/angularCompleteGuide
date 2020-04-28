import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()

export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel',
            'A super tasty Schnitzel - just awesome!',
            'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/06/05/Chicken-Schnitzel-PHOTOGRAPHY-Andrew-Twort-xlarge_trans_NvBQzQNjv4BqYVJfVX8lOXOA23ylB4y8VVVse9JsN00kzbUr3IXHaGo.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            'Big Fat Burguer',
            'What else you need to say?',
            'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cf29c385555335.5d7fb3c164383.jpg',
            [
                new Ingredient('Bread', 2),
                new Ingredient('Meat', 1)
            ])
      ];

      getRecipe(){
          //  The slice will return a copy of the current array, so if any change happens
          // It wont affect the array
          return this.recipes.slice();
      }
}
