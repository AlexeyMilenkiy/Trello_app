import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CardsService, ErrorHandlerService } from '@app/services';
import { CardResponse } from '@app/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() card: CardResponse;
  @Output() isOpenEditor = new EventEmitter<boolean>();

  isOpenEditTitle = false;
  top: 0;
  right: 0;
  form: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(private cardsService: CardsService,
              private errorHandlerService: ErrorHandlerService) {

    this.subscriptions.add(this.cardsService.getUpdatedCard()
      .subscribe((card: CardResponse) => {
        if (this.card.id === card.id) {
          this.card.title = card.title;
          this.card.description = card.description;
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
    if (this.form.value.titleCard.trim() === this.card.title) {
      this.isOpenEditTitle = false;
      return;
    }
    const oldTitle = this.card.title;
    this.card.title = this.form.value.titleCard;
    this.subscriptions.add(this.cardsService.updateCard(this.card)
      .subscribe(() =>  {
          this.isOpenEditor.emit(false);
          this.isOpenEditTitle = false;
        },
        () => {
          this.card.title = oldTitle;
          this.isOpenEditTitle = false;
          this.errorHandlerService.sendError('Sorry, failed to change title! Please try again later');
        })
    );
  }

  openEditorTitle(event) {
    event.stopPropagation();
    this.form.setValue({titleCard: this.card.title});
    const path = event.path || (event.composedPath && event.composedPath());
    this.isOpenEditor.emit(true);
    this.top = path[3].offsetTop;
    this.right = path[3].offsetLeft;
    this.isOpenEditTitle = true;
  }

  closeEditorTitle(event) {
    if (event.target.className === 'form__btn') {
      return;
    }
    this.isOpenEditTitle = false;
    this.isOpenEditor.emit(false);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
