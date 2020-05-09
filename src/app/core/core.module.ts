import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountService, FilesService, JwtService, RestaurantsService, UsersService, DishesService} from './services';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpTokenInterceptor} from './interceptors';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
    JwtService,
    UsersService,
    AccountService,
    RestaurantsService,
    FilesService,
    DishesService
  ]
})
export class CoreModule {
}
