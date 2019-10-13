import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal-edit-card',
  templateUrl: './modal-edit-card.component.html',
  styleUrls: ['./modal-edit-card.component.less']
})
export class ModalEditCardComponent {

  @Input() isEdit: boolean;
  @Input() title: string;
  @Output() closed = new EventEmitter<boolean>();
  @Output() changed = new EventEmitter<string>();

  showTitle() {
    this.changed.emit(this.title);
  }

  close(event) {
    const className = event.target.className;
    if ((className === 'fa fa-times') || (className === 'modal__wrapper')) {
      this.closed.emit(false);
    }
  }
}
