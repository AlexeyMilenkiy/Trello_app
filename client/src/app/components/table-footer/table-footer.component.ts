import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.less']
})
export class TableFooterComponent implements OnInit {

  @Output() newCard = new EventEmitter<string>();

  form: FormGroup;
  isOpen = false;
  isCreated = false;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      titleCard: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]),
    });
  }

  blurOnTitle(elem: HTMLTextAreaElement) {
    if (!this.isOpen) {
      return;
    }
    if (this.isCreated) {
      elem.focus();
      this.isCreated = false;
      return;
    }
    if (this.form.invalid || !this.form.value.titleCard.trim().length) {
      this.isCreated = false;
      this.isOpen = false;
      return;
    }
    this.newCard.emit(this.form.value.titleCard);
    this.form.reset();
    this.isCreated = false;
    this.isOpen = false;
  }

  createCard(event?) {
    if (this.form.invalid || !this.form.value.titleCard.trim().length) {
      return;
    }
    this.newCard.emit(this.form.value.titleCard);
    this.form.reset();
    this.isCreated = true;
    if (event) {
      event.preventDefault();
    }
  }

  close() {
    this.form.reset();
    this.isOpen = false;
  }
}
