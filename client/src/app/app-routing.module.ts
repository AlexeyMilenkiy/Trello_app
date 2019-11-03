import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotAuthGuard } from '@app/guards/not-auth.guard';

import { StartPageComponent } from '@components/pages/start-page/start-page.component';
import { NotFoundPageComponent } from '@components/pages/not-found-page/not-found-page.component';



const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '', component: StartPageComponent, canActivate: [NotAuthGuard]},
  { path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  { path: '', loadChildren: () => import('./modules/boards/boards.module').then(m => m.BoardsModule)},
  { path: '**', component: NotFoundPageComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
