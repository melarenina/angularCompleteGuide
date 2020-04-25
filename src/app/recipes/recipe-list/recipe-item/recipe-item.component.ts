import { Recipe } from './../../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  
  recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
