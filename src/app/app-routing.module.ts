import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PageComponent} from './page/page.component';
import {LoginGuard} from './guard/login.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {isLoginPage: true}
  },
  {
    path: 'users',
    component: PageComponent,
    data: {child: 'user', allowedRoles: 'ADMIN,SUPERADMIN'},
    canActivate: [LoginGuard]
  },
  {
    path: 'branches',
    component: PageComponent,
    canActivate: [LoginGuard],
    data: {child: 'branch', allowedRoles: 'ADMIN,SUPERADMIN'}
  },
  {
    path: 'dashboard',
    component: PageComponent,
    canActivate: [LoginGuard],
    data: {child: 'dashboard', allowedRoles: 'ADMIN,SUPERADMIN,USER'}
  },
  {
    path: 'pricing-periods',
    component: PageComponent,
    canActivate: [LoginGuard],
    data: {child: 'pricing-period', allowedRoles: 'ADMIN,SUPERADMIN'}
  },
  {
    path: 'pricings',
    component: PageComponent,
    canActivate: [LoginGuard],
    data: {child: 'pricing', allowedRoles: 'ADMIN,SUPERADMIN'}
  },
  {
    path: 'change-password',
    component: PageComponent,
    canActivate: [LoginGuard],
    data: {child: 'change-password', allowedRoles: 'USER,ADMIN,SUPERADMIN'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
