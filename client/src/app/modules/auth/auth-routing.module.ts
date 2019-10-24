import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/guards/auth.guard';

import { SignInPageComponent } from '@components/auth/sign-in-page/sign-in-page.component';
import { AuthLayoutComponent } from '@components/auth/auth-layout/auth-layout.component';
import { SignUpPageComponent } from '@components/auth/sign-up-page/sign-up-page.component';

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
