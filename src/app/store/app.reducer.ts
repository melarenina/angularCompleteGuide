import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store (ngrx)/shooping-list.reducer';
import * as fromAuth from '../Auth/store (NgRx)/auth.reducer';

export interface AppState{
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingtListReducer,
    auth: fromAuth.authReducer
};
