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

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
