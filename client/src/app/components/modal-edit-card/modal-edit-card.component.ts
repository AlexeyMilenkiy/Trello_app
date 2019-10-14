import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal-edit-card',
  templateUrl: './modal-edit-card.component.html',
  styleUrls: ['./modal-edit-card.component.less']
})
export class ModalEditCardComponent {

  @Input() isEdit: boolean;
  @Input() title: string;
  @Input() details: string;
  @Output() closed = new EventEmitter<boolean>();
  @Output() changedTitle = new EventEmitter<string>();
  @Output() changedDetails = new EventEmitter<string>();

  isEditDescription = true;

  changeTitle() {
    this.changedTitle.emit(this.title);
  }

  changeDetails() {
    this.changedDetails.emit(this.details);
  }

  close(event) {
    const className = event.target.className;
    if ((className === 'modal__card__close') || (className === 'modal__wrapper')) {
      this.closed.emit(false);
    }
  }
}
