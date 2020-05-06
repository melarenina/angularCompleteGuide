import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingtListReducer } from './shopping-list/store (ngrx)/shooping-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({shoppingList: shoppingtListReducer}) // The reducer is assigned as a value to the Shopping list key
  ],
  // All the services you want to provide (or use the providedin on the injectable)
  providers: [],
  // Which component is available right in that index html file
  bootstrap: [AppComponent]
})
export class AppModule { }
