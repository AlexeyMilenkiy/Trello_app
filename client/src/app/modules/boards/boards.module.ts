import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { AutosizeModule } from 'ngx-autosize';
import { AutoSizeInputModule } from 'ngx-autosize-input';

import { SharedModule } from '@app/modules/shared.module';
import { BoardsRoutingModule } from '@app/modules/boards/boards-routing.module';

import { BoardsComponent } from '@components/pages/boards/boards.component';
import { ModalCreateBoardComponent } from '@components/modal-create-board/modal-create-board.component';
import { BoardComponent } from '@components/pages/board/board.component';
import { BoardHeaderComponent } from '@components/board-header/board-header.component';
import { TableComponent } from '@components/table/table.component';
import { CardComponent } from '@components/card/card.component';
import { TableFooterComponent } from '@components/table-footer/table-footer.component';
import { ModalEditCardComponent } from '@components/modal-edit-card/modal-edit-card.component';
import { MainLayoutComponent } from '@components/main-layout/main-layout.component';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { AcceptPageComponent } from '@components/pages/accept-page/accept-page.component';
import {ClickOutsideModule} from 'ng-click-outside';

// import { AutoFocusDirective } from '@app/directives/auto-focus.directive';


@NgModule({
  declarations: [
    BoardsComponent,
    MainLayoutComponent,
    MainHeaderComponent,
    ModalCreateBoardComponent,
    BoardComponent,
    BoardHeaderComponent,
    TableComponent,
    CardComponent,
    TableFooterComponent,
    ModalEditCardComponent,
    AcceptPageComponent,
    // AutoFocusDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BoardsRoutingModule,
    AutosizeModule,
    AutoSizeInputModule,
    DragDropModule,
    ClickOutsideModule
  ]
})
export class BoardsModule { }
