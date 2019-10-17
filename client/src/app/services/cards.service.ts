import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
