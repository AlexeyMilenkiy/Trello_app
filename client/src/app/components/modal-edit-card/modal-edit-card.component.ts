import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { Subscription } from 'rxjs';

import { CardResponse } from '@app/interfaces/card-response';
import { CardsService } from '@app/services/cards.service';
import { BoardsService } from '@app/services/boards.service';


@Component({
  selector: 'app-modal-edit-card',
  templateUrl: './modal-edit-card.component.html',
  styleUrls: ['./modal-edit-card.component.less']
})
export class ModalEditCardComponent implements OnInit, OnDestroy {

  queryCardId: number;
  card: CardResponse;
  userId: number;
  isEditDescription = false;
  formTitle: FormGroup;
  formDescription: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(private router: Router,
              private activateRoute: ActivatedRoute,
              private cardsService: CardsService,
              private boardsService: BoardsService) {

    this.queryCardId = parseInt(this.activateRoute.snapshot.params.card_id, 10);

    // this.formTitle.setValue({titleText : this.card.title});
    // this.formDescription.setValue({descriptionText : this.card.description});
  }


  ngOnInit() {

    this.card = this.cardsService.getCard(this.queryCardId);
    this.userId = this.boardsService.getUserId();
    this.formTitle = new FormGroup({
      titleText: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]),
    });
    this.formDescription = new FormGroup({
        descriptionText: new FormControl(null, [
          Validators.maxLength(200)
        ]),
    });
  }

  blurOnTitle(elem: HTMLTextAreaElement) {
    if (this.formTitle.invalid || !this.formTitle.value.titleText.trim()) {
      elem.focus();
    } else {
      this.changeTitle();
    }
  }

  changeDescription() {
    this.isEditDescription = false;
    if (this.card.description !== this.formDescription.value.descriptionText.trim()) {
      this.card.description = this.formDescription.value.descriptionText;

      this.subscriptions.add(this.cardsService.updateCard(this.card)
        .subscribe(() => {},
          (error) => {
            if ((error.status !== 401) && (error.status !== 422)) {
              // this.isError = true;
            }
          }
        ));
    }
  }

  changeTitle() {
    if (this.card.title !== this.formTitle.value.titleText.trim()) {
      this.card.title = this.formTitle.value.titleText;

      this.subscriptions.add(this.cardsService.updateCard(this.card)
        .subscribe(() => {},
          (error) => {
            if ((error.status !== 401) && (error.status !== 422)) {
              // this.isError = true;
            }
          }
        ));
    }
  }

  close(event) {
    const className = event.target.className;
    if ((className === 'modal__card__close') || (className === 'modal__wrapper')) {
      this.router.navigate(['../../'], {relativeTo: this.activateRoute});
    }
  }

  deleteCard() {
    this.cardsService.sendDeletedCard(this.card);
    this.router.navigate(['../../'], {relativeTo: this.activateRoute});
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
