import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private subjectMsg = new Subject();
  private subjectClose = new Subject();

  constructor() { }

  sendError(msg: string) {
    this.subjectMsg.next(msg);
  }

  getError(): Observable<any> {
    return this.subjectMsg.asObservable();
  }

  sendEventClose() {
    this.subjectClose.next(false);
  }

  getEventClose(): Observable<any> {
    return this.subjectClose.asObservable();
  }
}
