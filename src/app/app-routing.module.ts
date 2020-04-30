import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [

    // -------------------HOME--------------------
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    // -------------------HOME--------------------

    // -------------------RECIPES--------------------
    { path: 'recipes', component: RecipesComponent },
    // -------------------RECIPES--------------------

    // -------------------SHOPPING-LIST--------------------
    { path: 'shopping-list', component: ShoppingListComponent},
    // -------------------SHOPPING-LIST--------------------
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}
