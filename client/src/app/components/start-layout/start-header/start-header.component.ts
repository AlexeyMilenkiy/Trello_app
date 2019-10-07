import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-start-header',
  templateUrl: './start-header.component.html',
  styleUrls: ['./start-header.component.less']
})
export class StartHeaderComponent implements OnInit {
  @Input() isLogout: boolean;
  constructor() { }

  ngOnInit() {
  }

}
