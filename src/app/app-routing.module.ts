import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthenticationGuard} from './components/dashboard/authentication.guard';
import {LoginComponent} from './components/login/login.component';
import {ReservationComponent} from './components/reservation/reservation.component';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard]
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
