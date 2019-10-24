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

  boardIdFromUrl = 0;
  cardIdFromUrl = 0;
  shareHash = '';
  board: BoardResponse = {author_id: 0, cards: [], id: 0, title: ''};
  editCard: CardResponse;
  isOpenEditCardModal = false;
  subscriptions: Subscription = new Subscription();
  isError = false;

  constructor(private activateRoute: ActivatedRoute,
              private boardsService: BoardsService,
              private router: Router) {
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
    this.cardIdFromUrl = parseInt(this.activateRoute.snapshot.params.card_id, 10);
    this.boardIdFromUrl = parseInt(this.activateRoute.snapshot.params.board_id, 10);
    this.shareHash = this.activateRoute.snapshot.params.share_hash;

    if (this.shareHash) {
      this.subscriptions.add(this.boardsService.getShareBoard(this.shareHash)
        .subscribe((board: BoardResponse) => {
            this.board = {...board};
            this.boardIdFromUrl = this.board.id;

            if (this.cardIdFromUrl) {
              this.editCard = this.board.cards.find((card: CardResponse) => card.id === this.cardIdFromUrl);
              this.editCard ? this.isOpenEditCardModal = true : this.router.navigate(['not-found']);
            }
            this.separateCardsArray();
          },
          (error) => {
            switch (error.status) {
              case 404 || 0 || 422:
                this.router.navigate(['not-found']);
                break;
              case 401 :
                this.router.navigate(['accept-board']);
                break;
              default :
                this.isError = true;
            }
          })
      );
    } else {
      this.subscriptions.add(this.boardsService.getBoard(this.boardIdFromUrl)
        .subscribe((board: BoardResponse) => {
            if (board.author_id !== this.boardsService.getUserId()) {
              this.router.navigate(['boards']);
            }
            this.board = {...board};

            if (this.cardIdFromUrl) {
              this.editCard = this.board.cards.find((card: CardResponse) => card.id === this.cardIdFromUrl);
              this.editCard ? this.isOpenEditCardModal = true : this.router.navigate(['not-found']);
            }
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

  closeEditModal(event: boolean) {
    this.isOpenEditCardModal = event;
    if (this.shareHash) {
      this.router.navigate(['/shared', this.shareHash]);
    } else {
      this.router.navigate(['/boards', this.boardIdFromUrl]);
    }
  }
}
