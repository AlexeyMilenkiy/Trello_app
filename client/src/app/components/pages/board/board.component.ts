import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { BoardsService } from '@app/services/boards.service';
import { BoardResponse } from '@app/interfaces/board-response';
import { CardResponse } from '@app/interfaces/card-response';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit, OnDestroy {

  protected tablesMap = {
    1: 'Todo',
    2: 'Doing',
    3: 'Done',
  };

  protected cardsArray = [
    [], // Todo cards
    [], // Doing cards
    []  // Done cards
  ];

  queryBoardId: number;
  shareHash = '';
  board: BoardResponse = {author_id: 0, cards: [], id: 0, title: ''};
  subscriptions: Subscription = new Subscription();
  isError = false;

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private boardsService: BoardsService) {
  }

  separateCardsArray() {
    this.board.cards.forEach((card: CardResponse) => {
      card.position = Number(card.position); /// changed string to number
      switch (card.table_id) {
        case 1:
          this.cardsArray[0] = [...this.cardsArray[0], card];
          break;
        case 2:
          this.cardsArray[1] = [...this.cardsArray[1], card];
          break;
        case 3:
          this.cardsArray[2] = [...this.cardsArray[2], card];
      }
    });
  }

  ngOnInit(): void {

    this.queryBoardId = parseInt(this.activateRoute.snapshot.params.board_id, 10);
    this.shareHash = this.activateRoute.snapshot.params.share_hash;

    if (this.shareHash) {
      this.subscriptions.add(this.boardsService.getShareBoard(this.shareHash)
        .subscribe((board: BoardResponse) => {
            this.board = {...board};
            this.queryBoardId = this.board.id;
            this.separateCardsArray();
          },
          (error) => {
            switch (error.status) {
              case 404 || 0 || 422:
                this.router.navigate(['not-found']);
                break;
              case 401 :
                this.router.navigate(['accept-page']);
                break;
              default :
                this.isError = true;
            }
          })
      );
    } else {
      this.subscriptions.add( this.boardsService.getBoard(this.queryBoardId)
        .subscribe((board: BoardResponse) => {
          const userId = this.boardsService.getUserId();
          if (board.author_id !== userId) {
              this.router.navigate(['boards']);
            }
          this.board = {...board};
          this.separateCardsArray();
          },
          (error) => {
            if ((error.status === 404) || (error.status === 0)) {
              this.router.navigate(['not-found']);
            } else if ((error.status !== 401) && (error.status !== 422)) {
              this.isError = true;
            }
          }
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
