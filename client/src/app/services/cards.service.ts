import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { environment } from '@env/environment';
import { CardResponse } from '@app/interfaces/card-response';
import { CardBeforeCreate } from '@app/interfaces/cardBeforeCreate';


@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private subject = new Subject();

  constructor(private http: HttpClient) { }

  sendDeletingCard(card: CardResponse) {
    this.deleteCard(card)
      .subscribe(
        () => this.subject.next(card),
        (err) => this.subject.next(err));
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

  deleteCard(card: CardResponse): Observable<any> {
    const headers = new HttpHeaders().set('card_id', `${card.id}`);
    return this.http.delete(`${environment.baseUrl}cards/delete`, {headers});
  }
}
