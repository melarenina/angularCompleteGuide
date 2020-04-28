import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../Services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient [];

  constructor(private shoppinglistServer: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppinglistServer.getIngredients();
  }

}
