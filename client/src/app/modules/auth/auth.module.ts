import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { SharedModule } from '@app/modules/shared.module';
import { AuthRoutingModule } from '@app/modules/auth/auth-routing.module';

import { SignInPageComponent } from '@components/auth/sign-in-page/sign-in-page.component';
import { AuthLayoutComponent } from '@components/auth/auth-layout/auth-layout.component';
import { SignUpPageComponent } from '@components/auth/sign-up-page/sign-up-page.component';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('852228537422-alrv1nrm0vha24nrsjuhdqoqi5fonng0.apps.googleusercontent.com')
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    SignInPageComponent,
    AuthLayoutComponent,
    SignUpPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SocialLoginModule,
    AuthRoutingModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class AuthModule { }
