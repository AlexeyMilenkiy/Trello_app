import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { CardsService, ErrorHandlerService } from '@app/services';
import { CardBeforeCreate, CardResponse } from '@app/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnDestroy, OnChanges {

  @Input() cardsArray: CardResponse[];
  @Input() headline: string;
  @Input() tableId: number;
  @Input() boardId: number;

  card: CardBeforeCreate;

  dragDisabled = false;
  subscriptions: Subscription = new Subscription();
  protected defaultCardPosition = 65535;

  constructor(private cardsService: CardsService,
              private errorHandlerService: ErrorHandlerService) {

    this.subscriptions.add(this.cardsService.getDeletedCard()
      .subscribe((card: CardResponse) => {
        if (this.tableId === card.table_id) {
          this.cardsArray = this.cardsArray.filter(item => item.id !== card.id);
        }
      },
    ));
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
    event.item.data.position = this.setDroppedCardPosition(event);

    this.subscriptions.add(this.cardsService.updateCard(event.item.data)
      .subscribe(() => {},
        (error) => {
        if (error.status === 404) {
          this.errorHandlerService.sendError('The board has been removed! You cannot change it!');
        } else {
          this.errorHandlerService.sendError('Server is not available! Please try again later');
        }
      }
    ));
  }

  setPositionNewCard() {
    const cardQty = this.cardsArray.length;

    if (cardQty === 0) {
      return this.defaultCardPosition;
    }
    return ((this.cardsArray[cardQty - 1].position) + this.defaultCardPosition + 1);
  }

  setDroppedCardPosition(event: CdkDragDrop<CardResponse[]>) {
    const newIndex = event.currentIndex;

    if (event.container.data.length === 1) {
      return this.defaultCardPosition;
    }
    if (newIndex === 0) {
      return this.cardsArray[1].position / 2;
    }
    if (newIndex === (this.cardsArray.length - 1)) {
      return (this.cardsArray[newIndex - 1].position) + this.defaultCardPosition + 1;
    }
    return (((this.cardsArray[newIndex - 1].position + this.cardsArray[newIndex + 1].position) / 2));
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
        () => {
          this.errorHandlerService.sendError('Server is not available! Please try again later');
        }
      ));
  }

  sortCardsByName() {
    this.cardsArray.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cardsArray.sort((a, b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
