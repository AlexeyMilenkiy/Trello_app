import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { AuthGuard } from '@app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: AuthLayoutComponent, canActivate: [AuthGuard],
     children: [
       { path: 'login', component: SignInPageComponent },
       { path: 'sign-up', component: SignUpPageComponent },
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
