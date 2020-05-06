import { Ingredient } from '../shared/ingredient.model';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10),
    ]
};

// If the state is null, or not passed, it will get the initalState value
export function shoppintListReducer(state = initialState, action){

}
