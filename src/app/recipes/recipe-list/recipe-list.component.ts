import { Component, OnInit } from '@angular/core';

// importing the model to be used as a type below
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/Services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe [];

  constructor(private recipe: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipe.getRecipes();
  }


}
