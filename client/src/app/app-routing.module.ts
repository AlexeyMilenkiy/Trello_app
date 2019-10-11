import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartPageComponent } from '@components/pages/start-page/start-page.component';
import { NotFoundPageComponent } from '@components/pages/not-found-page/not-found-page.component';
import { LogoutPageComponent } from '@components/pages/logout-page/logout-page.component';
import { AuthGuard } from '@app/guards/auth.guard';
import { MainLayoutComponent } from '@components/main-layout/main-layout.component';
import { BoardsComponent } from '@components/boards/boards.component';
import { BoardComponent } from '@components/board/board.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '', component: StartPageComponent, canActivate: [AuthGuard]},

  { path: '', loadChildren: () => import('./modules/auth.module').then(m => m.AuthModule), canActivate: [AuthGuard] },

  { path: '', component: MainLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'boards', component: BoardsComponent},
      { path: 'boards/:id', component: BoardComponent},
    ]},

  { path: 'logged-out', component: LogoutPageComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundPageComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
