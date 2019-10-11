import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Board } from '@app/interfaces/board';
import { BoardsService } from '@app/services/boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.less']
})
export class BoardsComponent implements OnInit, OnDestroy {

  board: Board = {
    title: '',
    id: this.boardsService.getId()
  };
  boards: Board[] = [];
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
      .subscribe((board: Board) => {
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

  ngOnInit() {
    this.subscriptions.add(this.boardsService.getBoards()
      .subscribe((boards: Board[]) => {
          this.boards = [...boards];
          this.isOpen = false;
        },
        () => {
          this.isOpen = false;
          this.isError = true;
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
