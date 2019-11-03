import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app/services';

@Component({
  selector: 'app-board-not-found',
  templateUrl: './board-not-found.component.html',
  styleUrls: ['./board-not-found.component.less']
})
export class BoardNotFoundComponent implements OnInit {

  isAuth: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated();
  }
}
