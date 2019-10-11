import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Board } from '@app/interfaces/board';
import { BoardResponse } from '@app/interfaces/board-response';

@Injectable({
  providedIn: 'root'
})

export class BoardsService {

  constructor(private http: HttpClient) { }

  getId() {
    return parseInt(localStorage.getItem('id'), 10);
  }

  createBoard(board: Board): Observable<BoardResponse> {
    return this.http.post<BoardResponse>(`${environment.baseUrl}boards/create`, board);
  }

  getBoards(): Observable<BoardResponse[]> {
    const id = this.getId();
    const headers = new HttpHeaders().set('id', `${id}`);
    return this.http.get<BoardResponse[]>(`${environment.baseUrl}boards/get-boards`, {headers});
  }
}
