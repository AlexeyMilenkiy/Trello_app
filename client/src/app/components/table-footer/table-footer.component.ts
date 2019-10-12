import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.less']
})
export class TableFooterComponent implements OnInit {
  form: FormGroup;
  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  create() {

  }

  addCard() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
