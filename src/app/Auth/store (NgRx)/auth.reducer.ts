import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State{
    user: User;
}

const initialState: State = {
    user: null
};

export function authReducer(state: State = initialState, action: AuthActions.AuthActions){
    switch (action.type){
        // ------------------------------LOGIN------------------------------
        case AuthActions.LOGIN:
            const newUser = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );

            return {
                ...state,
                user: newUser
            };
        // ------------------------------LOGIN------------------------------

        // ------------------------------LOGOUT------------------------------
        case AuthActions.LOGOUT:
            return{
                ...state,
                user: null
            };
        // ------------------------------LOGOUT------------------------------

        default:
            return state;
    }
}
