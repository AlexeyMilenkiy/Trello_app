import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ErrorHandlerService } from '@app/services/error-handler.service';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.less']
})

export class ModalErrorComponent implements OnDestroy {

  isModal = false;
  message: string;
  subscriptions: Subscription = new Subscription();

  constructor(private errorHandlerService: ErrorHandlerService) {
    this.subscriptions.add(this.errorHandlerService.getError()
      .subscribe((msg: string) => {
          this.message = msg;
          this.isModal = true;
      })
    );
  }

  close(event) {
    const className = event.target.className;
    if ((className === 'modal_wrapper') || (className === 'close_modal')) {
      this.isModal = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
