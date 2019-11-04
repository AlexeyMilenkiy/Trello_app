import { Component } from '@angular/core';
import { AuthService } from '@app/services';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.less']
})
export class NotFoundPageComponent {

  isAuth = false;

  constructor(private authService: AuthService) {
    this.isAuth = this.authService.isAuthenticated();
  }
}
