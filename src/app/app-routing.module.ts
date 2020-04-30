import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { Recipe } from './recipes/recipe.model';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

const appRoutes: Routes = [

    // -------------------HOME--------------------
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    // -------------------HOME--------------------

    // -------------------RECIPES--------------------
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: ':id', component: RecipeDetailComponent },
    ] },
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
