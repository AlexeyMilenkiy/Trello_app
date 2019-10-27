import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BoardsService } from '@app/services/boards.service';
import { BoardBeforeCreate } from '@app/interfaces/board-before-create';
import { BoardResponse } from '@app/interfaces/board-response';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.less']
})
export class BoardsComponent implements OnInit, OnDestroy {

  board: BoardBeforeCreate = {
    title: '',
    author_id: this.boardsService.getUserId()
  };
  boards: BoardResponse[] = [];
  isOpen = false;
  isError = false;
  subscriptions: Subscription = new Subscription();

  constructor(private boardsService: BoardsService,
              private router: Router) { }

  openModal() {
    this.isOpen = true;
  }

  create(title: string) {
    this.board.title = title;
    this.subscriptions.add(this.boardsService.createBoard(this.board)
      .subscribe((board: BoardResponse) => {
          this.boards.push(board);
          this.isOpen = false;
          this.router.navigate([`/boards/${board.id}`]);
        },
        () => {
          this.isOpen = false;
          this.isError = true;
        }
      ));
  }

  remove(id: number) {
    this.subscriptions.add(this.boardsService.removeBoard(id)
      .subscribe(() => {
          this.boards = this.boards.filter(item => item.id !== id);
        },
        () => {
          this.isError = true;
        }
      ));
  }

  ngOnInit() {
    this.subscriptions.add(this.boardsService.getBoards()
      .subscribe((boards: BoardResponse[]) => {
          this.boards = [...boards];
          this.isOpen = false;
        },
        () => {
          this.isOpen = false;
          this.isError = true;
        }
      ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
