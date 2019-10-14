import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(40)
      ]),
    });
  }

  openForm() {
    this.isOpen = true;
  }

  addCard() {

  }

  close() {
    this.form.reset();
    this.isOpen = false;
  }
}
