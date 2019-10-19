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
  board: BoardResponse;
  subscriptions: Subscription = new Subscription();
  isError = false;

  constructor(private activateRoute: ActivatedRoute,
              private boardsService: BoardsService,
              private router: Router) {
  }

  separateCardsArray() {
    // this.cardsArray[0] = this.board.cards.filter((card: CardResponse) => card.table_id === 1);
    // this.cardsArray[1] = this.board.cards.filter((card: CardResponse) => card.table_id === 2);
    // this.cardsArray[2] = this.board.cards.filter((card: CardResponse) => card.table_id === 3);
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
    this.boardId = parseInt(this.activateRoute.snapshot.params.id, 10);

    this.subscriptions.add(this.boardsService.getBoard(this.boardId)
      .subscribe((board: BoardResponse) => {
          this.board = {...board};
          this.separateCardsArray();
        },
        (error) => {
        console.log(error);
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
}
