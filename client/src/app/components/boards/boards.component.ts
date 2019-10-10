import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.less']
})
export class BoardsComponent implements OnInit {

  isCreate = false;
  constructor() { }

  create() {
    this.isCreate = true;
  }
  ngOnInit() {

  }

}
