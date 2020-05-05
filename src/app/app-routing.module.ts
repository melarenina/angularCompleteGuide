import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './Services/recipes-resolver.service';
import { AuthComponent } from './Auth/auth.component';
import { AuthGuard } from './Auth/auth.guard';

const appRoutes: Routes = [

    // All parameters routes must be at the bottom

    // -------------------HOME--------------------
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    // -------------------HOME--------------------

    // -------------------RECIPES--------------------
    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
    ] },
    // -------------------RECIPES--------------------

    // -------------------SHOPPING-LIST--------------------
    { path: 'shopping-list', component: ShoppingListComponent},
    // -------------------SHOPPING-LIST--------------------

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
