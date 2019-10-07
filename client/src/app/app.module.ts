import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { StartHeaderComponent } from './components/start-header/start-header.component';
import { LogoutPageComponent } from './components/pages/logout-page/logout-page.component';
import { SignInPageComponent } from './components/auth/sign-in-page/sign-in-page.component';
import { AuthLayoutComponent } from './components/auth/auth-layout/auth-layout.component';
import { SignUpPageComponent } from './components/auth/sign-up-page/sign-up-page.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    NotFoundPageComponent,
    MainHeaderComponent,
    StartHeaderComponent,
    LogoutPageComponent,
    SignInPageComponent,
    AuthLayoutComponent,
    SignUpPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
