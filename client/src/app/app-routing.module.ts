import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartPageComponent} from './components/start-layout/start-page/start-page.component';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {LogoutPageComponent} from './components/start-layout/logout-page/logout-page.component';
import {StartLayoutComponent} from './components/start-layout/start-layout.component';


const routes: Routes = [
    {
      path: '', component: StartLayoutComponent,
      children: [
        { path: '', redirectTo: '/', pathMatch: 'full'},
        { path: '', component: StartPageComponent},
        { path: 'logged-out', component: LogoutPageComponent}
      ]
    },
  // {
  //   path: '', component: MainLayoutComponent, canActivate: [AuthGuard],
  //   children: [
  //     { path: 'home', component: HomeComponent },
  //     { path: 'my-posts', component: MyPostsComponent},
  //     { path: 'friends-posts', component: FriendsPostsComponent},
  //     { path: 'add-post', component: AddPostComponent}
  //   ]
  // },
  { path: '**', component: NotFoundPageComponent}
];


//   [
//   {path: '', component: StartPageComponent},
//   {path: 'login', component: NotFoundPageComponent },
//   {path: 'logged-out', component: LogoutPageComponent },
//   {path: '**', component: NotFoundPageComponent }
// ];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
