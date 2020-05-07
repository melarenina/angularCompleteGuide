import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';

export interface State{
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
};

export function recipeReducer(state: State = initialState, action: RecipesActions.RecipesActions){

    switch (action.type) {

        // -------------------------------------SET RECIPES-------------------------------------
        case RecipesActions.SET_RECIPES:
            return{
                ...state,
                recipes: [...action.payload]
            };
        // -------------------------------------SET RECIPES-------------------------------------

        default:
            return state;
    }
}
