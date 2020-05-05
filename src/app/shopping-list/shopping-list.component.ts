import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient [];
  private idChangeSub: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.idChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        // Está passando a nova array de ingredientes vindo do service
        // Para a atual array que está mostrando no template
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.idChangeSub.unsubscribe();
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

}
