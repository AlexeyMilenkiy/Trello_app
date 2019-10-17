import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { BoardBeforeCreate } from '@app/interfaces/board-before-create';
import { BoardResponse } from '@app/interfaces/board-response';

@Injectable({
  providedIn: 'root'
})

export class BoardsService {

  constructor(private http: HttpClient) { }

  getUserId() {
    return parseInt(localStorage.getItem('id'), 10);
  }

  createBoard(board: BoardBeforeCreate): Observable<BoardResponse> {
    return this.http.post<BoardResponse>(`${environment.baseUrl}boards/create`, board);
  }

  removeBoard(id: number): Observable<any> {
    const headers = new HttpHeaders().set('board_id', `${id}`);
    return this.http.delete(`${environment.baseUrl}boards/remove-board`, {headers});
  }

  getBoards(): Observable<BoardResponse[]> {
    const id = this.getUserId();
    const headers = new HttpHeaders().set('author_id', `${id}`);
    return this.http.get<BoardResponse[]>(`${environment.baseUrl}boards/get-boards`, {headers});
  }

  getBoard(id: number): Observable<any> {
    const headers = new HttpHeaders().set('board_id', `${id}`);
    return this.http.get(`${environment.baseUrl}boards/get-board`, {headers});
  }
}
