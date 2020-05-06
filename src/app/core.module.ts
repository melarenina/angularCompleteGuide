import { NgModule } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './Auth/auth-interceptor.service';
@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        RecipeService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    ]
})

export class CoreModule{

}
