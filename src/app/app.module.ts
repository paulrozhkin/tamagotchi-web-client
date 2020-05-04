import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {AppRoutingModule} from './app-routing.module';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { UsersComponent } from './admin-panel/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AdminPanelComponent,
    DashboardComponent,
    UsersComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
