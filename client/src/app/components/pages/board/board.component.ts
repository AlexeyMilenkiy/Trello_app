import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit, OnDestroy {

  protected tablesMap = {
    0: 'Todo',
    1: 'Doing',
    2: 'Done',
  };

  protected tableTodo = 0;
  protected tableDoing = 1;
  protected tableDone = 2;

  defaultCards = [
    [1, 2, 3, 4],
    [10, 20, 30, 40],
    []
  ];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    console.log(this.defaultCards);
  }

}
