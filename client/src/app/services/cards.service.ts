import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '@env/environment';
import { CardResponse } from '@app/interfaces/card-response';
import { CardBeforeCreate } from '@app/interfaces/cardBeforeCreate';

class EmitEvent {
}

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private subject = new Subject();

  constructor(private http: HttpClient) { }

  sendDeletingCard(event: EmitEvent) {
    this.subject.next(event);
  }

  getDeletingCard(): Observable<any> {
    return this.subject.asObservable();
  }

  createCard(card: CardBeforeCreate): Observable<CardResponse> {
    return this.http.post<CardResponse>(`${environment.baseUrl}cards/create`, {...card});
  }

  updateCard(card: CardResponse): Observable<CardResponse> {
    return this.http.put<CardResponse>(`${environment.baseUrl}cards/update`, {...card});
  }
}
