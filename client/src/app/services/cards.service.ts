import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CardResponse, CardBeforeCreate } from '@app/interfaces';


@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

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
