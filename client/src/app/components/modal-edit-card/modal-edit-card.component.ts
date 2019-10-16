import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal-edit-card',
  templateUrl: './modal-edit-card.component.html',
  styleUrls: ['./modal-edit-card.component.less']
})
export class ModalEditCardComponent implements OnInit {

  @Input() isEdit: boolean;
  @Input() title: string;
  @Input() details: string;
  @Output() closed = new EventEmitter<boolean>();
  @Output() changedTitle = new EventEmitter<string>();
  @Output() changedDetails = new EventEmitter<string>();

  isEditDescription = false;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      descriptionText: new FormControl(null, [
        Validators.maxLength(100)
      ]),
    });
  }

  changeTitle() {
    this.changedTitle.emit(this.title);
  }

  changeDetails() {
    this.details = this.form.value.descriptionText;
    this.changedDetails.emit(this.form.value.descriptionText);
  }

  close(event) {
    const className = event.target.className;
    if ((className === 'modal__card__close') || (className === 'modal__wrapper')) {
      this.closed.emit(false);
    }
  }

  addDescription() {
    this.isEditDescription = false;
    this.changedDetails.emit(this.details);
  }
}
