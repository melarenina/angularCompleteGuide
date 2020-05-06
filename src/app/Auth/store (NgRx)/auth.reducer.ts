import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State{
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
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
                authError: null,
                user: newUser,
                loading: false
            };
        // ------------------------------LOGIN------------------------------

        // ------------------------------LOGOUT------------------------------
        case AuthActions.LOGOUT:
            return{
                ...state,
                user: null
            };
        // ------------------------------LOGOUT------------------------------

        // ------------------------------LOGIN START------------------------------
        case AuthActions.LOGIN_START:
            return{
                ...state,
                authError: null,
                loading: true
            };
        // ------------------------------LOGIN START------------------------------

        // ------------------------------LOGIN FAIL------------------------------
        case AuthActions.LOGIN_FAIL:
            return{
                ...state,
                user: null,
                authError: action.payload
            };
        // ------------------------------LOGIN FAIL------------------------------

        default:
            return state;
    }
}
