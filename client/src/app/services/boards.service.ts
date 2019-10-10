import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Board } from '@app/interfaces/board';
import { BoardResponse } from '@app/interfaces/board-response';

@Injectable({
  providedIn: 'root'
})

export class BoardsService {

  constructor(private http: HttpClient) { }

  createBoard(board: Board): Observable<BoardResponse> {
    return this.http.post<BoardResponse>(`${environment.baseUrl}boards/create`, board);
  }
}
