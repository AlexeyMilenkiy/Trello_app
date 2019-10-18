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

  ngOnInit(): void {
    this.boardId = parseInt(this.activateRoute.snapshot.params.id, 10);

    this.subscriptions.add(this.boardsService.getBoard(this.boardId)
      .subscribe((board: BoardResponse) => {
          this.board = {...board};
          console.log(this.board);

          this.board.cards.forEach((card: CardResponse) => {
            switch (card.table_id) {
              case 1:
                this.cardsArray[0].push(card);
                break;
              case 2:
                this.cardsArray[1].push(card);
                break;
              case 3:
                this.cardsArray[2].push(card);
            }
          });
        },
        (error) => {
          if (error.status === 404) {
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
