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
  @Input() description: string;
  @Input() index: number;
  @Output() closed = new EventEmitter<boolean>();
  @Output() changedTitle = new EventEmitter<string>();
  @Output() changedDescription = new EventEmitter<string>();
  @Output() deletedCard = new EventEmitter<any>();   //Исправить

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

  changeDescription() {
    this.description = this.form.value.descriptionText;
    this.changedDescription.emit(this.form.value.descriptionText);
  }

  close(event) {
    const className = event.target.className;
    if ((className === 'modal__card__close') || (className === 'modal__wrapper')) {
      this.closed.emit(false);
    }
  }

  deleteCard(index) {
    this.deletedCard.emit(index);
  }
}
