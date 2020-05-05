import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {DashboardComponent} from './admin-panel/dashboard/dashboard.component';
import {ManagementUsersComponent} from './admin-panel/management-users/management-users.component';
import {ManagementRestaurantsComponent} from './admin-panel/management-restaurants/management-restaurants.component';
import {ManagementDishesComponent} from './admin-panel/management-dishes/management-dishes.component';
import {ManagementMenuComponent} from './admin-panel/management-menu/management-menu.component';
import {AuthGuard} from './core/services';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'welcome', component: LandingComponent},
  {
    path: 'admin', component: AdminPanelComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {path: '', redirectTo: 'statistic', pathMatch: 'full'},
      {path: 'statistic', component: DashboardComponent},
      {
        path: 'management',
        children: [
          {path: '', redirectTo: './', pathMatch: 'full'},
          {path: 'users', component: ManagementUsersComponent},
          {path: 'restaurants', component: ManagementRestaurantsComponent},
          {path: 'dishes', component: ManagementDishesComponent},
          {path: 'menu', component: ManagementMenuComponent}
        ]
      }
    ]
  },
  // {path: '**', redirectTo: '/welcome'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
