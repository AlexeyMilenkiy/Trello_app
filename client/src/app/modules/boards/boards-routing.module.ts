import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/guards/auth.guard';

import { MainLayoutComponent } from '@components/main-layout/main-layout.component';
import { BoardsComponent } from '@components/pages/boards/boards.component';
import { BoardComponent } from '@components/pages/board/board.component';
import { AcceptPageComponent } from '@components/pages/accept-page/accept-page.component';
import { ModalEditCardComponent } from '@components/modal-edit-card/modal-edit-card.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'boards', component: BoardsComponent },
      { path: 'boards/:board_id', component: BoardComponent,
        children : [
          { path: 'cards/:card_id', component: ModalEditCardComponent }
        ]
      },
      { path: 'shared/:share_hash', component: BoardComponent,
        children : [
          { path: 'cards/:card_id', component: ModalEditCardComponent }
        ]
      },
    ]
  },
  { path: 'accept-page', component: AcceptPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule {
}
