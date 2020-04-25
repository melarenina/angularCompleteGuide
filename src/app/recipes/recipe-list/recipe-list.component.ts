import { Component, OnInit } from '@angular/core';

//importing the model to be used as a type below
import{ Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  //defining the type of the recipes to an Array of Recipe (the model created)
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a text', 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/healthy-eating-ingredients-1296x728-header.jpg?w=1155&h=1528'),
    new Recipe('A Test Recipe', 'This is simply a text', 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/healthy-eating-ingredients-1296x728-header.jpg?w=1155&h=1528')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
