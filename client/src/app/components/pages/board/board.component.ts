import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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
    this.subscriptions.add(this.activateRoute.data
      .subscribe(
        (res: { board: BoardResponse }) => {
          if (res.board) {
            this.board = {...res.board};
            this.separateCardsArray();
          } else {
            this.errorHandlerService.sendError('Server is not available! Please reload page');
          }
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
