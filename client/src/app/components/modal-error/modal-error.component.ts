import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.less']
})

export class ModalErrorComponent {
  @Input() isModal: boolean;
  @Input() message: string;
  @Output() closed = new EventEmitter<boolean>();

  close(event) {
    const className = event.target.className;
    if ((className === 'modal_wrapper') || (className === 'close_modal')) {
      this.closed.emit(false);
    }
  }
}
