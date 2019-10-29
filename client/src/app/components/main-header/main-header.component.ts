import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.less']
})
export class MainHeaderComponent implements OnInit {

  name: string;
  isOpenUserBlock = false;
  top: number;
  left: number;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.name = this.authService.getUserName();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openUserBlock(event) {
    const path = event.path || (event.composedPath && event.composedPath());
    this.top = path[0].offsetTop + 45;
    this.left = path[0].offsetLeft - 275;
    this.isOpenUserBlock = !this.isOpenUserBlock;
  }

  onClickedOutside(event) {
    if (event.target.className === 'main__header__user') {
      return;
    } else {
      this.isOpenUserBlock = false;
    }
  }
}
