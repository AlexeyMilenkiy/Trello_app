import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

import { environment } from '@env/environment';
import { BoardBeforeCreate } from '@app/interfaces/board-before-create';
import { BoardResponse } from '@app/interfaces/board-response';

@Injectable({
  providedIn: 'root'
})

export class BoardsService {

  private subject = new Subject();

  constructor(private http: HttpClient) { }

  createHashLink(boardTitle: string, boardId: number) {
    const md5 = new Md5();
    const shareLink = md5.appendStr(`${boardTitle}${boardId}`).end();

    this.changeBoardShareLink(boardId, shareLink)
      .subscribe(
        () => this.subject.next(`${environment.baseClientUrl}shared/${shareLink}`),
        () => this.subject.next('Sorry server is unavailable'));
  }

  getHashLink(): Observable<any> {
    return this.subject.asObservable();
  }

  getUserId() {
    return parseInt(localStorage.getItem('id'), 10);
  }

  createBoard(board: BoardBeforeCreate): Observable<BoardResponse> {
    return this.http.post<BoardResponse>(`${environment.baseUrl}boards/create`, board);
  }

  removeBoard(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}boards/remove-board`, {params : {board_id: `${id}`}});
  }

  changeBoardShareLink(id: number, shareLink: string | Int32Array | null): Observable<number[]> {
    return (
      this.http.put<number[]>(`${environment.baseUrl}boards/change-board-link`, {id, shareLink})
    );
  }

  getBoards(): Observable<BoardResponse[]> {
    const id = this.getUserId();
    return this.http.get<BoardResponse[]>(`${environment.baseUrl}boards/get-boards`, {params : {author_id: `${id}`}});
  }

  getBoard(id: number): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(`${environment.baseUrl}boards/get-board`, {params : {board_id: `${id}`}});
  }

  getShareBoard(shareHash: string): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(`${environment.baseUrl}boards/get-share-board`, {params : {share_hash: shareHash}});  }

  changeBoardTitle(title: string, id: number): Observable<number[]> {
    return this.http.put<number[]>(`${environment.baseUrl}boards/change-board-title`, {title, id});
  }
}
