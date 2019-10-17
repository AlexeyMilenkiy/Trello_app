import { Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      titleCard: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]),
    });
  }

  createCard() {
    if (this.form.invalid) {
      return;
    }
    this.newCard.emit(this.form.value.titleCard);
    this.form.reset();
    this.isOpen = false;
  }

  close() {
    this.form.reset();
    this.isOpen = false;
  }
}
