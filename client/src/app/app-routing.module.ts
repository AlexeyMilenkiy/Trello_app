import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from '@components/pages/start-page/start-page.component';
import { NotFoundPageComponent } from '@components/pages/not-found-page/not-found-page.component';
import { LogoutPageComponent } from '@components/pages/logout-page/logout-page.component';
import {BoardsComponent} from '@components/boards/boards.component';
import {AuthGuard} from '@app/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '', component: StartPageComponent, canActivate: [AuthGuard]},
  { path: '',
    loadChildren: () => import('./modules/auth.module').then(m => m.AuthModule) },
  { path: 'boards', component: BoardsComponent, canActivate: [AuthGuard]},
  { path: 'logged-out', component: LogoutPageComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundPageComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
