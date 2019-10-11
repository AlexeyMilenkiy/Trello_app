import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.less']
})

export class ModalCreateComponent implements OnInit {

  @Input() isModal: boolean;
  @Output() closed = new EventEmitter<boolean>();
  @Output() newBoard = new EventEmitter<string>();

  constructor() {}
  title = '';
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  create() {
    if (this.form.invalid) {
      return;
    }
    this.title = this.form.value.title;
    this.newBoard.emit(this.title);
    this.form.reset();
  }

  close() {
    this.closed.emit(false);
    this.form.reset();
  }
}
