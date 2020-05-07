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

        // -------------------------------------ADD RECIPE-------------------------------------
        case RecipesActions.ADD_RECIPE:
            return{
                ...state,
                recipes: [...state.recipes , action.payload]
            };
        // -------------------------------------ADD RECIPE-------------------------------------

        // -------------------------------------UPDATE RECIPE-------------------------------------
        case RecipesActions.UPDATE_RECIPE:
            const updatedRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.newRecipe
            };

            const updatedRecipes = [...state.recipes];

            updatedRecipes[action.payload.index] = updatedRecipe;

            return{
                ...state,
                recipes: updatedRecipes
            };
        // -------------------------------------UPDATE RECIPE-------------------------------------

        // -------------------------------------DELETE RECIPE-------------------------------------
        case RecipesActions.DELETE_RECIPE:
            return{
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                    return index !== action.payload;
                })
            };
        // -------------------------------------DELETE RECIPE-------------------------------------

        default:
            return state;
    }
}
