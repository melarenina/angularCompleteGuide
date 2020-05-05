import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './Auth/auth.component';


const appRoutes: Routes = [

    // All parameters routes must be at the bottom

    // -------------------HOME--------------------
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    // -------------------HOME--------------------

    // -------------------AUTHENTICATION--------------------
    { path: 'auth', component: AuthComponent},
    // -------------------AUTHENTICATION--------------------
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule] // Every module works on its own, in angular.
                            // If you don't export, you can't access it from other modules
})

export class AppRoutingModule{

}
