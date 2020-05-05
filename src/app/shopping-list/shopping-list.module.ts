import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            // -------------------SHOPPING-LIST--------------------
            { path: 'shopping-list', component: ShoppingListComponent},
            // -------------------SHOPPING-LIST--------------------
        ])
    ]
})

export class ShoppingListModule{

}
