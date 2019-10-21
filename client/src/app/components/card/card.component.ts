import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CardResponse } from '@app/interfaces/card-response';
import { CardsService } from '@app/services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {

  @Input() card: CardResponse;

  isCardEditModal = false;
  isShowEditTitleIcon = false;
  isOpenEditTitle = false;
  isError = false;
  top: 0;
  right: 0;
  form: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(private cardsService: CardsService) {}

  ngOnInit() {
    this.form = new FormGroup({
      titleCard: new FormControl(this.card.title, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]),
    });
  }

  openEditModal(event) {
    if (event.target.className === 'card__container') {
      this.isCardEditModal = true;
    }
  }

  changeCardTitle() {
    if (this.form.invalid || !this.form.value.titleCard.trim().length) {
      return;
    }
    const oldTitle = this.card.title;
    this.card.title = this.form.value.titleCard;
    this.subscriptions.add(this.cardsService.updateCard(this.card)
      .subscribe(() =>  {
          this.form.reset();
          this.isOpenEditTitle = false;
        },
        () => {
          this.card.title = oldTitle;
          this.form.reset();
          this.isOpenEditTitle = false;
          this.isError = true;
        }));
  }

  openEditorTitle(event) {
    this.top = event.path[3].offsetTop;
    this.right = event.path[3].offsetLeft;
    this.isOpenEditTitle = true;
  }

  closeEditorTitle(event) {
    if ((event.target.className === 'form__container') || (event.target.className === 'form__close')) {
      this.isOpenEditTitle = false;
    }
  }
}
