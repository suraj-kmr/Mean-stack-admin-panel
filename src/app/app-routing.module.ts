import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from "./shared/auth.guard";
import { SettingComponent } from './components/setting/setting.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'admin' },
  { path: 'admin', component: LogInComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard], data: {title: 'Dashboard',pageTitle:'Dashboard'} },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {title: 'Profile',pageTitle:'Profile'} },
      { path: 'setting', component: SettingComponent, canActivate: [AuthGuard], data: {title: 'Setting',pageTitle:'Setting'} },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
