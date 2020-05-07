import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store (ngrx)/shooping-list.reducer';
import * as fromAuth from '../Auth/store (NgRx)/auth.reducer';
import * as fromRecipe from '../recipes/store (NgRx)/recipe.reducer';

export interface AppState{
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
    recipes: fromRecipe.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingtListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipe.recipeReducer
};
