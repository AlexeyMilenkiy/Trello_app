import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private subject = new Subject();

  constructor() { }

  sendError(msg: string) {
    this.subject.next(msg);
  }

  getError(): Observable<any> {
    return this.subject.asObservable();
  }
}
