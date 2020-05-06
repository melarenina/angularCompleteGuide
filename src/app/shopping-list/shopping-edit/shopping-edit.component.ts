import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store (ngrx)/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  @ViewChild('f', {static: false}) slForm: NgForm;

  constructor(private store: Store<fromApp.AppState>) { }

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

      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));

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
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
