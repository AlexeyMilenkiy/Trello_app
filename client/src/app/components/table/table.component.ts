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
export class TableComponent implements OnInit {

  @Input() cardsArray: CardResponse[];
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
  protected defaultPositionCard = 65535;

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

  setPositionCard() {
    if (this.cardsArray.length === 0) {
      return this.defaultPositionCard;
    } else {
      return (
        this.cardsArray[this.cardsArray.length - 1].position + this.defaultPositionCard + 1
      );
    }
  }

  createCard(title: string) {
    const position = this.setPositionCard();
    this.card = {
      board_id: this.boardId,
      table_id: this.tableId,
      position,
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

  ngOnInit() {
    console.log(this.cardsArray)
    this.cardsArray.sort((a, b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0));
    console.log(this.cardsArray)
  }
}
