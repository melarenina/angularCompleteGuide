import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10),
    ]
};

// If the state is null, or not passed, it will get the initalState value
export function shoppingtListReducer(state = initialState, action: ShoppingListActions.AddIngredient){
    // Checking what is the type of action
    switch (action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            // Returning a new object to replate the old state
            return {
                // To not lose the old data, we're copying it using the '...state'
                ...state,
                // Adding the old ingredients to keep them in the array and adding the new one
                ingredients: [...state.ingredients, action.payload]
            };
        default:
            return state;
    }
}

// Actions are everything that change the state of some property, like add a new ingredient
// Getting an ingredient doesn't change the the state of the property, only returns its current one
