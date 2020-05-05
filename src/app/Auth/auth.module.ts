import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule, FormsModule, SharedModule, RouterModule.forChild(
        [
            // -------------------AUTHENTICATION--------------------
            { path: 'auth', component: AuthComponent},
            // -------------------AUTHENTICATION--------------------
        ]
    )],
    exports: [RouterModule],
    providers: []

})

export class AuthModule{

}
