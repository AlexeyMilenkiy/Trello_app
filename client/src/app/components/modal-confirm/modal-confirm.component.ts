import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.less']
})
export class ModalConfirmComponent {

  @Input() isModal: boolean;
  @Output() closed = new EventEmitter<boolean>();
  @Output() confirmed = new EventEmitter<boolean>();

  close(event) {
    const className = event.target.className;
    if ((className === 'modal_wrapper') || (className === 'close_modal')) {
      this.closed.emit(false);
    }
  }

  confirm() {
    this.confirmed.emit(true);
  }
}
