import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, SharedGuard, NotAuthGuard } from '@app/guards';

import { BoardResolver } from '@app/services/board-resolver.service';
import { CardsResolver } from '@app/services/cards-resolver.service';

import { MainLayoutComponent } from '@components/main-layout/main-layout.component';
import { BoardsComponent } from '@components/pages/boards/boards.component';
import { BoardComponent } from '@components/pages/board/board.component';
import { AcceptPageComponent } from '@components/pages/accept-page/accept-page.component';
import { ModalEditCardComponent } from '@components/modal-edit-card/modal-edit-card.component';
import { BoardNotFoundComponent } from '@components/pages/board-not-found/board-not-found.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent,
    children: [
      { path: 'boards', component: BoardsComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], },
      { path: 'boards/:board_id', component: BoardComponent, resolve: {board: BoardResolver},
        children : [
          { path: 'cards/:card_id', component: ModalEditCardComponent, resolve: {card: CardsResolver} }
        ]
      },
    ]
  },
  { path: '', component: MainLayoutComponent, canActivate: [SharedGuard], canActivateChild: [SharedGuard],
    children: [
      { path: 'shared/:share_hash', component: BoardComponent, resolve: {board: BoardResolver},
        children : [
          { path: 'cards/:card_id', component: ModalEditCardComponent, resolve: {card: CardsResolver}, }
        ]
      },
    ]
  },
  { path: 'accept-page', component: AcceptPageComponent, canActivate: [NotAuthGuard]},
  { path: 'board-not-found', component: BoardNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BoardResolver]
})
export class BoardsRoutingModule {
}
