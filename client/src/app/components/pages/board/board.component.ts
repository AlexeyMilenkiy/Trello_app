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

  boardId = 0;
  cardId = 0;
  board: BoardResponse;
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
    this.cardId = parseInt(this.activateRoute.snapshot.params.card_id, 10);
    this.boardId = parseInt(this.activateRoute.snapshot.params.board_id, 10);
    this.isOpenEditCardModal = false;

    this.subscriptions.add(this.boardsService.getBoard(this.boardId)
      .subscribe((board: BoardResponse) => {
        this.board = {...board};
        if (this.cardId) {
            this.editCard = this.board.cards.find((card: CardResponse) => card.id === this.cardId);
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
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeEditModal(event: boolean) {
    this.isOpenEditCardModal = event;
    this.router.navigate(['/boards', this.boardId]);
  }
}
