import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/Services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }


  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }

    form.reset();

    this.editMode = false;

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
