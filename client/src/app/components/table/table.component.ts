import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CardBeforeCreate} from '@app/interfaces/cardBeforeCreate';
import {CardsService} from '@app/services/cards.service';
import {Subscription} from 'rxjs';
import {CardResponse} from '@app/interfaces/card-response';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent {

  @Input() cardsArray: Array<any>;   /// ИСПРАВЬ!!!!!!!!!
  @Input() headline: string;
  @Input() tableId: number;
  @Input() boardId: number;

  card: CardBeforeCreate = {
    board_id: 0,
    table_id: 0,
    position: 0,
    title: ''
  };

  subscriptions: Subscription = new Subscription();
  protected firstPositionCard = 65535;

  constructor(private cardsService: CardsService) {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  deleteCard(indexDel) {
    this.cardsArray.splice(indexDel, 1);
  }

  createCard(title: string) {
    this.card = {
      board_id: this.boardId,
      table_id: this.tableId,
      position: this.firstPositionCard,
      title
    };

    this.subscriptions.add(this.cardsService.createCard(this.card)
      .subscribe((card: CardResponse) => {
          console.log(card);
          this.cardsArray.push(card);
          console.log(this.cardsArray);
        },
        (error) => console.log(error)
      ));
  }
}
