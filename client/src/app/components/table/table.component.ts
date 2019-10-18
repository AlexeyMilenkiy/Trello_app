import {Component, DoCheck, Input, IterableDiffers, KeyValueDiffers, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { CardBeforeCreate } from '@app/interfaces/cardBeforeCreate';
import { CardsService } from '@app/services/cards.service';
import { CardResponse } from '@app/interfaces/card-response';
import {debug} from 'util';

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
    console.log(event.item.data.position);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    console.log(this.cardsArray)
    event.item.data.position = this.setPositionDropCard(event);
    console.log(this.cardsArray)
  }

  deleteCard(indexDel) {
    this.cardsArray.splice(indexDel, 1);
  }

  setPositionNewCard() {
    // console.log(this.cardsArray[this.cardsArray.length - 1].position)
    // debugger
    if (this.cardsArray.length === 0) {
      return this.defaultPositionCard;
    } else {
      return (
        (this.cardsArray[this.cardsArray.length - 1].position) + this.defaultPositionCard + 1
      );
    }
  }

  setPositionDropCard(event) {
    const newIndex = event.currentIndex;
    const oldIndex = event.previousIndex;
    // debugger
    if (newIndex === oldIndex) {
      return;
    } else if (newIndex === 0 || (newIndex - 1 === 0)) {
      return this.cardsArray[0].position / 2;
    } else {
      return (((this.cardsArray[newIndex - 1].position) + (this.cardsArray[newIndex + 1].position) / 2));
    }
  }

  createCard(title: string) {
    const position = this.setPositionNewCard();
    console.log('position', position);
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
