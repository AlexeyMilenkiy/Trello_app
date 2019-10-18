import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CardResponse } from '@app/interfaces/card-response';
import { CardBeforeCreate } from '@app/interfaces/cardBeforeCreate';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  createCard(card: CardBeforeCreate): Observable<CardResponse> {
    return this.http.post<CardResponse>(`${environment.baseUrl}cards/create`, {card});
  }

  getCards(tableId: number, boardId: number): Observable<CardResponse[]> {
    let headers = new HttpHeaders().set('board_id', `${boardId}`);
    headers = headers.set('table_id', `${tableId}`);
    return this.http.get<CardResponse[]>(`${environment.baseUrl}cards/get-cards`, {headers});
  }
}
