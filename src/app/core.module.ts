import { NgModule } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './Auth/auth-interceptor.service';
import { LoggingService } from './logging.service';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        RecipeService,
        ShoppingListService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    ]
})

export class CoreModule{

}
