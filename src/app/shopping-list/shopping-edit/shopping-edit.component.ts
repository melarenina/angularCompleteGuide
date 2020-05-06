import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store (ngrx)/shopping-list.actions';
import * as fromShoppingList from '../store (ngrx)/shooping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f', {static: false}) slForm: NgForm;

  constructor(private slService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
        });
      }else{
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode){

      this.store.dispatch(new ShoppingListActions.UpdateIngredient(
        {
          index: this.editedItemIndex,
          newIngredient
        }
      ));

      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      // To dispatch this action to the store
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));

      // this.slService.addIngredient(newIngredient);
    }

    form.reset();

    this.editMode = false;

  }

  onClear(){
    this.slForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
    // this.editMode = false;
  }

  onDelete(){
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
