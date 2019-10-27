import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { environment } from '@env/environment';
import { CardResponse } from '@app/interfaces/card-response';
import { CardBeforeCreate } from '@app/interfaces/cardBeforeCreate';


@Injectable({
  providedIn: 'root'
})
export class CardsService {

  cards: CardResponse[];
  private subjectDeletingCard = new Subject();
  private subjectEditCard = new Subject();

  constructor(private http: HttpClient) { }

  sendDeletedCard(card: CardResponse) {
    this.deleteCard(card)
      .subscribe(
        () => this.subjectDeletingCard.next(card),
        (err) => this.subjectDeletingCard.next(err));
  }

  getDeletedCard(): Observable<any> {
    return this.subjectDeletingCard.asObservable();
  }

  createCard(card: CardBeforeCreate): Observable<CardResponse> {
    return this.http.post<CardResponse>(`${environment.baseUrl}cards/create`, {...card});
  }

  updateCard(card: CardResponse): Observable<CardResponse> {
    return this.http.put<CardResponse>(`${environment.baseUrl}cards/update`, {...card});
  }

  deleteCard(card: CardResponse): Observable<any> {
    return this.http.delete(`${environment.baseUrl}cards/delete`, {params : {card_id: `${card.id}`}});
  }

  getCard(cardId: number): Observable<CardResponse> {
    return this.http.get<CardResponse>(`${environment.baseUrl}cards/get-card`, {params : {card_id: `${cardId}`}});
  }
}
