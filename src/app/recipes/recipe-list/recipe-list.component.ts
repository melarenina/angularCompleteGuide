import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// importing the model to be used as a type below
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/Services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe [];

  constructor(private recipe: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipe.getRecipe();
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
