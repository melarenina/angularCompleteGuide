import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store (ngrx)/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}>; // Because this is the data we get on our store
  // private idChangeSub: Subscription;

  constructor(private loggingService: LoggingService,
              private store: Store<fromApp.AppState>) {}
              // shoppingList - name we set up in the app module
              // {ingredients: Ingredient[]} - state data our global store hold in the reducer
              // (it must have the same name as in the reducer)

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList'); // select a slice of our state, returning an observable

    // this.store.select('shoppingList').subscribe();
    // this.ingredients = this.slService.getIngredients();
    // this.idChangeSub = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     // Está passando a nova array de ingredientes vindo do service
    //     // Para a atual array que está mostrando no template
    //     this.ingredients = ingredients;
    //   });

    this.loggingService.printLog('Hello from Shopping List component ngOnInit');
  }

  ngOnDestroy(): void {
    // this.idChangeSub.unsubscribe();
  }

  onEditItem(index: number){

    this.store.dispatch(new ShoppingListActions.StartEdit(index));

    // this.slService.startedEditing.next(index);
  }

}
