import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CardResponse } from '@app/interfaces/card-response';
import { CardsService } from '@app/services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() card: CardResponse;
  @Output() isOpenEditor = new EventEmitter<boolean>();

  isOpenEditTitle = false;
  isError = false;
  top: 0;
  right: 0;
  form: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(private cardsService: CardsService) {
    this.subscriptions.add(this.cardsService.getUpdatedCard()
      .subscribe((card: CardResponse) => {
        if (this.card.id === card.id) {
          this.card = {...card};
        }
      })
    );
  }

  ngOnInit() {
    this.form = new FormGroup({
      titleCard: new FormControl(this.card.title, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]),
    });
  }

  changeCardTitle() {
    if (this.form.invalid || !this.form.value.titleCard.trim().length) {
      return;
    }
    const oldTitle = this.card.title;
    this.card.title = this.form.value.titleCard;
    this.subscriptions.add(this.cardsService.updateCard(this.card)
      .subscribe(() =>  {
          this.isOpenEditor.emit(false);
          this.isOpenEditTitle = false;
        },
        (error) => {
        if ((error.status !== 401) && (error.status !== 422)) {
          this.card.title = oldTitle;
          this.isOpenEditTitle = false;
          this.isError = true;
        }
        }));
  }

  openEditorTitle(event) {
    event.stopPropagation();
    const path = event.path || (event.composedPath && event.composedPath());
    this.isOpenEditor.emit(true);
    this.top = path[3].offsetTop;
    this.right = path[3].offsetLeft;
    this.isOpenEditTitle = true;
  }

  closeEditorTitle(event) {
    if ((event.target.className === 'form__container') || (event.target.className === 'form__close')) {
      this.isOpenEditTitle = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
