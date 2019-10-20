import { Component, DoCheck, EventEmitter, Input, IterableChangeRecord, IterableDiffers, OnDestroy, Output} from '@angular/core';
import { Subscription } from 'rxjs';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { CardBeforeCreate } from '@app/interfaces/cardBeforeCreate';
import { CardsService } from '@app/services/cards.service';
import { CardResponse } from '@app/interfaces/card-response';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnDestroy, DoCheck {

  @Input() cardsArray: CardResponse[];
  @Input() headline: string;
  @Input() tableId: number;
  @Input() boardId: number;
  @Output() serverError = new EventEmitter<boolean>();

  card: CardBeforeCreate = {
    board_id: 0,
    table_id: 0,
    position: 0,
    title: ''
  };

  iterableDiffer: any;
  subscriptions: Subscription = new Subscription();
  protected defaultPositionCard = 65535;

  constructor(private cardsService: CardsService,
              private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this.iterableDiffers.find([]).create(null);
  }

  drop(event: CdkDragDrop<CardResponse[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      event.item.data.table_id = this.tableId;
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    event.item.data.position = this.setPositionDropCard(event);

    this.subscriptions.add(this.cardsService.updateCard(event.item.data)
      .subscribe(() => {
        },
        (error) => {
          if ((error.status === 400) || (error.status === 0)) {
            this.serverError.emit(true);
          }
        }
      ));
  }

  setPositionNewCard() {
    if (this.cardsArray.length === 0) {
      return this.defaultPositionCard;
    } else {
      return (
        (this.cardsArray[this.cardsArray.length - 1].position) + this.defaultPositionCard + 1
      );
    }
  }

  setPositionDropCard(event: CdkDragDrop<CardResponse[]>) {
    const newIndex = event.currentIndex;
    const oldIndex = event.previousIndex;

    if (event.container.data.length === 1) {
      return this.defaultPositionCard;
    } else if ((newIndex === oldIndex) && (event.previousContainer === event.container)) {
      return this.cardsArray[oldIndex].position;
    } else if (newIndex === 0) {
      return this.cardsArray[1].position / 2;
    } else if (newIndex === (this.cardsArray.length - 1)) {
      return (this.cardsArray[newIndex - 1].position) + this.defaultPositionCard + 1;
    } else {
      return (((this.cardsArray[newIndex - 1].position + this.cardsArray[newIndex + 1].position) / 2));
    }
  }


  createCard(title: string) {
    const position = this.setPositionNewCard();
    this.card = {
      board_id: this.boardId,
      table_id: this.tableId,
      position,
      title
    };

    this.subscriptions.add(this.cardsService.createCard(this.card)
      .subscribe((card: CardResponse) => {
          this.cardsArray.push(card);
        },
        (error) => {
          if ((error.status === 400) || (error.status === 0)) {
            this.serverError.emit(true);
          }
        }
      ));
  }

  sortCardsByName() {
    this.cardsArray.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  }

  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.cardsArray);
    if (changes) {
      changes.forEachMovedItem((elem: IterableChangeRecord<CardResponse>) => {
        console.log(elem);
        const newIndex = elem.currentIndex;

        if (newIndex === 0) {
            return;
          } else if (newIndex === (this.cardsArray.length - 1)) {
            elem.item.position = (this.cardsArray[newIndex - 1].position) + this.defaultPositionCard + 1;
          } else {
            elem.item.position = (((this.cardsArray[newIndex - 1].position + this.cardsArray[newIndex + 1].position) / 2));
          }

        console.log(this.cardsArray);
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
