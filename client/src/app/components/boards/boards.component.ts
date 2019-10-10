import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.less']
})
export class BoardsComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.boards()
      .subscribe((res) => {
          console.log(res)
        },
        (error) => {
          if(error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/']);
          }
        }
      );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
