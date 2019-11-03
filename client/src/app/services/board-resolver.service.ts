import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable, of, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { BoardsService } from '@app/services';
import { BoardResponse } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BoardResolver implements Resolve<BoardResponse> {

  constructor(private router: Router,
              private boardsService: BoardsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BoardResponse> | Promise<BoardResponse> | BoardResponse {

    const queryBoardId = parseInt(route.params.board_id, 10);
    const shareHash = route.params.share_hash;
    const userId = this.boardsService.getUserId();

    if (queryBoardId) {
      return this.boardsService.getBoard(queryBoardId)
        .pipe(
          tap((board: BoardResponse) => {
            if (board.author_id !== userId) {
              this.router.navigate(['boards']);
              return EMPTY;
            }
            return of(board);
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 404) {
              this.router.navigate(['not-found']);
              return EMPTY;
            } else if ((error.status !== 401) && (error.status !== 422)) {
              return EMPTY;
            }
          })
        );
    } else {
      return this.boardsService.getShareBoard(shareHash)
        .pipe(
          tap((board: BoardResponse) => {
            return of(board);
          }),
          catchError((error: HttpErrorResponse) => {
            switch (error.status) {
              case 404 :
              case 422 :
                this.router.navigate(['not-found']);
                break;
              case 401 :
                this.router.navigate(['accept-page']);
                break;
              default :
                return EMPTY;
            }
          })
        );
    }
  }
}
