import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './admin-panel/dashboard/dashboard.component';
import {ManagementUsersComponent} from './admin-panel/management-users/management-users.component';
import {ManagementRestaurantsComponent} from './admin-panel/management-restaurants/management-restaurants.component';
import {ManagementDishesComponent} from './admin-panel/management-dishes/management-dishes.component';
import {ManagementMenuComponent} from './admin-panel/management-menu/management-menu.component';
import {ManagementHeaderComponent} from './admin-panel/management-header/management-header.component';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core';
import {SharedModule} from './shared';
import {FormsModule} from '@angular/forms';

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
    ManagementHeaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
