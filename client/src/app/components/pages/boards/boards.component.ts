import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { BoardsService, ErrorHandlerService } from '@app/services';
import { BoardBeforeCreate, BoardResponse } from '@app/interfaces';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.less']
})
export class BoardsComponent implements OnInit, OnDestroy {

  board: BoardBeforeCreate = {
    author_id: 0,
    title: ''
  };
  boards: BoardResponse[] = [];
  isOpenModalCreateBoard = false;
  subscriptions: Subscription = new Subscription();

  constructor(private router: Router,
              private boardsService: BoardsService,
              private errorHandlerService: ErrorHandlerService) {
  }

  create(title: string) {
    this.board.title = title;
    this.board.author_id = this.boardsService.getUserId();

    this.subscriptions.add(this.boardsService.createBoard(this.board)
      .subscribe((board: BoardResponse) => {
          this.boards.push(board);
          this.isOpenModalCreateBoard = false;
          this.router.navigate([`/boards/${board.id}`]);
        },
        () => {
          this.isOpenModalCreateBoard = false;
          this.errorHandlerService.sendError('Server is not available! Please try again later');
        }
      ));
  }

  remove(id: number) {
    this.subscriptions.add(this.boardsService.removeBoard(id)
      .subscribe(() => {
          this.boards = this.boards.filter(item => item.id !== id);
        },
        () => {
          this.errorHandlerService.sendError('Server is not available! Please try again later');
        }
      ));
  }

  ngOnInit() {
    this.subscriptions.add(this.boardsService.getBoards()
      .subscribe((boards: BoardResponse[]) => {
          this.boards = [...boards];
          // this.isOpenModalCreateBoard = false;
        },
        () => {
          // this.isOpenModalCreateBoard = false;
          this.errorHandlerService.sendError('Server is not available! Please try again later');
        }
      ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
