import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.less']
})
export class ModalCreateComponent implements OnInit{

  @Input() isModal: boolean;
  @Output() closed = new EventEmitter<boolean>();

  title: string;
  form: FormGroup;

  create() {
    this.closed.emit(false);
  }

  close() {
    this.closed.emit(false);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.title = this.form.value.title;
  }
}
