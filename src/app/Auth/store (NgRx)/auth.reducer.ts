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
        // ------------------------------AUTHENTICATE_SUCCESS------------------------------
        case AuthActions.AUTHENTICATE_SUCCESS:
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
        // ------------------------------AUTHENTICATE_SUCCESS------------------------------

        // ------------------------------LOGOUT------------------------------
        case AuthActions.LOGOUT:
            return{
                ...state,
                user: null
            };
        // ------------------------------LOGOUT------------------------------

        // ------------------------------LOGIN START------------------------------
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return{
                ...state,
                authError: null,
                loading: true
            };
        // ------------------------------LOGIN START------------------------------

        // ------------------------------LOGIN FAIL------------------------------
        case AuthActions.AUTHENTICATE_FAIL:
            return{
                ...state,
                user: null,
                authError: action.payload
            };
        // ------------------------------LOGIN FAIL------------------------------

        // ------------------------------CLEAR ERROR------------------------------
        case AuthActions.CLEAR_ERROR:
            return{
                ...state,
                authError: null
            };
        // ------------------------------CLEAR ERROR------------------------------

        default:
            return state;
    }
}
