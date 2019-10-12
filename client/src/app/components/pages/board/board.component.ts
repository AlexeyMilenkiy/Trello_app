import {Component, OnDestroy, OnInit} from '@angular/core';

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

  protected tableTodo = 1;
  protected tableDoing = 2;
  protected tableDone = 3;

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
