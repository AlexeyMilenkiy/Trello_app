import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Board } from '@app/interfaces/board';

@Injectable({
  providedIn: 'root'
})

export class BoardsService {

  constructor(private http: HttpClient) { }

  createBoard(board: Board): Observable<any> {
    return this.http.post(`${environment.baseUrl}boards/create`, board);
  }
}
