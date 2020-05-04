import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {DashboardComponent} from './admin-panel/dashboard/dashboard.component';
import {UsersComponent} from './admin-panel/users/users.component';

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: LandingComponent},
  {
    path: 'admin', component: AdminPanelComponent,
    children: [
      {path: '', redirectTo: 'statistic', pathMatch: 'full'},
      {path: 'statistic', component: DashboardComponent},
      {path: 'users', component: UsersComponent}
    ]
  },
  {path: '**', redirectTo: '/welcome'},
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
