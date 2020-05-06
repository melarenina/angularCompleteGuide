import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            // -------------------SHOPPING-LIST--------------------
            { path: '', component: ShoppingListComponent},
            // -------------------SHOPPING-LIST--------------------
        ])
    ],
    // providers: [LoggingService]
})

export class ShoppingListModule{

}
