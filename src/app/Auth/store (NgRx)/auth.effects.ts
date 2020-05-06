import { Actions, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';

export class AuthEffects{

    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START) // Only continue this if the action if of type LOGIN_START
    );

    constructor(private actions$: Actions){}
}
