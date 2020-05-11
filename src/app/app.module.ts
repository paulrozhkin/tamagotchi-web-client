import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LandingComponent} from './landing/landing.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './admin-panel/dashboard/dashboard.component';
import {ManagementUsersComponent} from './admin-panel/management-users/management-users.component';
import {ManagementRestaurantsComponent} from './admin-panel/management-restaurants/management-restaurants.component';
import {ManagementDishesComponent} from './admin-panel/management-dishes/management-dishes.component';
import {ManagementMenuComponent} from './admin-panel/management-menu/management-menu.component';
import {ManagementHeaderComponent} from './admin-panel/management-header/management-header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AccountService, CoreModule, HttpTokenInterceptor, RestaurantsService, UsersService} from './core';
import {SharedModule} from './shared';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RestaurantCreateComponent} from './admin-panel/management-restaurants/restaurant-create/restaurant-create.component';
import {DecimalPipe} from '@angular/common';
import {RestaurantUpdateComponent} from './admin-panel/management-restaurants/restaurant-update/restaurant-update.component';
import {UserCreateComponent} from './admin-panel/management-users/user-create/user-create.component';
import {UserUpdateComponent} from './admin-panel/management-users/user-update/user-update.component';
import {DishesCreateComponent} from './admin-panel/management-dishes/dishes-create/dishes-create.component';
import {DishesUpdateComponent} from './admin-panel/management-dishes/dishes-update/dishes-update.component';
import {MenuItemCreateComponent} from './admin-panel/management-menu/menu-item-create/menu-item-create.component';
import {MenuItemUpdateComponent} from './admin-panel/management-menu/menu-item-update/menu-item-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AdminPanelComponent,
    DashboardComponent,
    ManagementUsersComponent,
    ManagementRestaurantsComponent,
    ManagementDishesComponent,
    ManagementMenuComponent,
    ManagementHeaderComponent,
    LoginComponent,
    RestaurantCreateComponent,
    RestaurantUpdateComponent,
    UserCreateComponent,
    UserUpdateComponent,
    DishesCreateComponent,
    DishesUpdateComponent,
    MenuItemCreateComponent,
    MenuItemUpdateComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
