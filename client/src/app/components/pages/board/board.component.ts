import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { BoardsService, ErrorHandlerService } from '@app/services';
import { BoardResponse, CardResponse } from '@app/interfaces';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit, OnDestroy {

  protected defaultTablesMap = {
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
  board: BoardResponse;
  subscriptions: Subscription = new Subscription();

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private boardsService: BoardsService,
              private errorHandlerService: ErrorHandlerService) {
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
            this.separateCardsArray();
          },
          (error) => {
            switch (error.status) {
              case 404 :
              case 422 :
                this.router.navigate(['not-found']);
                break;
              case 401 :
                this.router.navigate(['accept-page']);
                break;
              default :
                this.errorHandlerService.sendError('Server is not available! Please reload page');
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
            if (error.status === 404) {
              this.router.navigate(['not-found']);
            } else if ((error.status !== 401) && (error.status !== 422)) {
              this.errorHandlerService.sendError('Server is not available! Please reload page');
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
