import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';

import { environment } from '@env/environment';
import { BoardBeforeCreate, BoardResponse } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})

export class BoardsService {

  private authorId: number;
  private subject = new Subject();

  constructor(private http: HttpClient) { }

  createHashLink(boardTitle: string, boardId: number) {
    const md5 = new Md5();
    const shareLink = md5.appendStr(`${boardTitle}${boardId}`).end();

    this.changeBoardShareLink(boardId, shareLink)
      .subscribe(
        () => this.subject.next(`${environment.baseClientUrl}shared/${shareLink}`),
        (error) => this.subject.next(error));
  }

  getHashLink(): Observable<any> {
    return this.subject.asObservable();
  }

  getUserId() {
    return parseInt(localStorage.getItem('id'), 10);
  }

  getAuthorId() {
    return this.authorId;
  }

  createBoard(board: BoardBeforeCreate): Observable<BoardResponse> {
    return this.http.post<BoardResponse>(`${environment.baseUrl}boards/create`, board);
  }

  removeBoard(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}boards/remove-board`, {params : {board_id: `${id}`}});
  }

  changeBoardShareLink(id: number, shareLink: string | Int32Array | null): Observable<any> {
    return (
      this.http.put(`${environment.baseUrl}boards/change-board-link`, {id, shareLink})
    );
  }

  getBoards(): Observable<BoardResponse[]> {
    const id = this.getUserId();
    return this.http.get<BoardResponse[]>(`${environment.baseUrl}boards/get-boards`, {params : {author_id: `${id}`}});
  }

  getBoard(id: number): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(`${environment.baseUrl}boards/get-board`, {params : {board_id: `${id}`}})
      .pipe(tap((board: BoardResponse) => this.authorId = board.author_id));
  }

  getShareBoard(shareHash: string): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(`${environment.baseUrl}boards/get-share-board`, {params : {share_hash: shareHash}})
      .pipe(tap((board: BoardResponse) => this.authorId = board.author_id));
  }

  changeBoardTitle(title: string, id: number): Observable<number[]> {
    return this.http.put<number[]>(`${environment.baseUrl}boards/change-board-title`, {title, id});
  }
}
