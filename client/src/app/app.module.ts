import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from '@components/pages/start-page/start-page.component';
import { NotFoundPageComponent } from '@components/pages/not-found-page/not-found-page.component';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { StartHeaderComponent } from '@components/start-header/start-header.component';
import { LogoutPageComponent } from '@components/pages/logout-page/logout-page.component';
import { SharedModule } from '@app/modules/shared.module';
import { BoardsComponent } from '@components/pages/boards/boards.component';
import { AuthInterceptor } from '@app/services/auth.interceptor';
import { MainLayoutComponent } from '@components/main-layout/main-layout.component';
import { ModalCreateComponent } from '@components/modal-create/modal-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardComponent } from '@components/pages/board/board.component';
import { BoardHeaderComponent } from '@components/board-header/board-header.component';
import { TableComponent } from '@components/table/table.component';
import { CardComponent } from '@components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    NotFoundPageComponent,
    MainHeaderComponent,
    StartHeaderComponent,
    LogoutPageComponent,
    BoardsComponent,
    MainLayoutComponent,
    ModalCreateComponent,
    BoardComponent,
    BoardHeaderComponent,
    TableComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
