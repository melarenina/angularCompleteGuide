import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

// If the state is null, or not passed, it will get the initalState value
export function shoppingtListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions){
    // Checking what is the type of action
    switch (action.type){
        // -----------------------------------ADD ONE INGREDIENT-----------------------------------
        case ShoppingListActions.ADD_INGREDIENT:
            // Returning a new object to replate the old state
            return {
                // To not lose the old data, we're copying it using the '...state'
                ...state,
                // Adding the old ingredients to keep them in the array and adding the new one
                ingredients: [...state.ingredients, action.payload]
            };
        // -----------------------------------ADD ONE INGREDIENT-----------------------------------

        // -----------------------------------ADD MULTIPLE INGREDIENTS-----------------------------------
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state, // To add the elements of the payload array, and not the array it self
                ingredients: [...state.ingredients, ...action.payload]
            };
        // -----------------------------------ADD MULTIPLE INGREDIENTS-----------------------------------

        // -----------------------------------UPDATE ONE INGREDIENT-----------------------------------
        case ShoppingListActions.UPDATE_INGREDIENT:

            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient; // Replacing the old ingredient with the new one

            return {
                ...state, // To add the elements of the payload array, and not the array it self
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        // -----------------------------------UPDATE ONE INGREDIENT-----------------------------------

        // -----------------------------------DELETE ONE INGREDIENT-----------------------------------
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state, // Filter always return a copy of array, run a function on every element, and the element
                // Where the condition is true, is added to that array
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex; // This will return a new array without that element
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        // -----------------------------------DELETE ONE INGREDIENT-----------------------------------

        // ---- -------------------------------START EDIT-----------------------------------
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            };
        // -----------------------------------START EDIT-----------------------------------

        // -----------------------------------STOP EDIT-----------------------------------
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        // -----------------------------------STOP EDIT-----------------------------------
        default:
            return state;
    }
}

// Actions are everything that change the state of some property, like add a new ingredient
// Getting an ingredient doesn't change the the state of the property, only returns its current one
