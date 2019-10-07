import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartPageComponent} from './components/start-page/start-page.component';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';


const routes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'login', component: NotFoundPageComponent },
  {path: '**', component: NotFoundPageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
