import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/guards/auth.guard';

import { MainLayoutComponent } from '@components/main-layout/main-layout.component';
import { BoardsComponent } from '@components/pages/boards/boards.component';
import { BoardComponent } from '@components/pages/board/board.component';
import { AcceptPageComponent } from '@components/pages/accept-page/accept-page.component';



const routes: Routes = [
  { path: '', component: MainLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'boards', component: BoardsComponent},
      { path: 'boards/:board_id', component: BoardComponent},
      { path: 'boards/:board_id/cards/:card_id', component: BoardComponent},
    ]
  },
  { path: '', component: MainLayoutComponent,
    children: [
      { path: 'shared/:share_hash', component: BoardComponent},
      { path: 'shared/:share_hash/cards/:card_id', component: BoardComponent},
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
