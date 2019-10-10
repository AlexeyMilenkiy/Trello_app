import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.less']
})
export class MainHeaderComponent implements OnInit {

  name: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
  }
}
