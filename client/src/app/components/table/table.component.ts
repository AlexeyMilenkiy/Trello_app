import {Component, DoCheck, Input, IterableDiffers, KeyValueDiffers, OnDestroy} from '@angular/core';
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
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  deleteCard(indexDel) {
    this.cardsArray.splice(indexDel, 1);
  }

  setPositionNewCard() {
    if (this.cardsArray.length === 0) {
      return this.defaultPositionCard;
    } else {
      return (
        this.cardsArray[this.cardsArray.length - 1].position + this.defaultPositionCard + 1
      );
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
        (error) => console.log(error)
      ));
  }

  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.cardsArray);
    if (changes) {
      this.cardsArray.sort((a, b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0));
    }
  }

  ngOnDestroy(): void  {
    this.subscriptions.unsubscribe();
  }
}
