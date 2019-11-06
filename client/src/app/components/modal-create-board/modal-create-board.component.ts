import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-create-board',
  templateUrl: './modal-create-board.component.html',
  styleUrls: ['./modal-create-board.component.less']
})

export class ModalCreateBoardComponent implements OnInit {

  @Input() isOpen: boolean;
  @Output() closed = new EventEmitter<boolean>();
  @Output() newBoard = new EventEmitter<string>();

  constructor() {}
  title = '';
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]),
    });
  }

  create() {
    if (this.form.invalid || !this.form.value.title.trim().length) {
      return;
    }
    this.title = this.form.value.title;
    this.newBoard.emit(this.title);
    this.form.reset();
  }

  close(event) {
    if ((event.target.className === 'modal_wrapper') || (event.target.className === 'modal-create-close')) {
      this.closed.emit(false);
      this.form.reset();
    }
  }
}
