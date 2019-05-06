import { NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Main
import { SettingsComponent } from './main/settings/settings.component';
import { OrdersListComponent } from './main/orders-list/orders-list.component';
import { OrderComponent } from './main/order/order.component';

import { MainModule } from './main/main.module';

import { AuthGuard } from './core/auth.guard';
import { UserResolve } from './main/settings/settings.resolve';

const routes: Routes = [
  {
    path: '',
    component: OrdersListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order/:id',
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolve
    }
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, UserResolve]
})
export class RoutingModule { }
export const RoutingComponents = [
  LoginComponent,
  RegisterComponent
];
