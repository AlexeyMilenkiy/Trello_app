import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartPageComponent} from './components/pages/start-page/start-page.component';
import {NotFoundPageComponent} from './components/pages/not-found-page/not-found-page.component';
import {LogoutPageComponent} from './components/pages/logout-page/logout-page.component';
import {AuthLayoutComponent} from './components/auth/auth-layout/auth-layout.component';
import {SignInPageComponent} from './components/auth/sign-in-page/sign-in-page.component';
import {SignUpPageComponent} from './components/auth/sign-up-page/sign-up-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '', component: StartPageComponent},
  { path: 'logged-out', component: LogoutPageComponent},
  {
      path: '', component: AuthLayoutComponent,
      children: [
        { path: 'login', component: SignInPageComponent },
        { path: 'sign-up', component: SignUpPageComponent },
      ]
    },
  { path: '**', component: NotFoundPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
