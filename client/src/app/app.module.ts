import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-layout/start-page/start-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { StartHeaderComponent } from './components/start-layout/start-header/start-header.component';
import { LogoutPageComponent } from './components/start-layout/logout-page/logout-page.component';
import { StartLayoutComponent } from './components/start-layout/start-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    NotFoundPageComponent,
    MainHeaderComponent,
    StartHeaderComponent,
    LogoutPageComponent,
    StartLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
