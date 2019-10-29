import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { Subscription } from 'rxjs';

import { CardsService, BoardsService, ErrorHandlerService } from '@app/services';
import { CardResponse } from '@app/interfaces';


@Component({
  selector: 'app-modal-edit-card',
  templateUrl: './modal-edit-card.component.html',
  styleUrls: ['./modal-edit-card.component.less']
})
export class ModalEditCardComponent implements OnInit, OnDestroy {

  isDownloaded = false;
  queryCardId: number;
  card: CardResponse;
  userId: number;
  authorId: number;
  isEditDescription = false;
  formTitle: FormGroup;
  formDescription: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(private router: Router,
              private activateRoute: ActivatedRoute,
              private cardsService: CardsService,
              private boardsService: BoardsService,
              private errorHandlerService: ErrorHandlerService) {
  }


  ngOnInit() {
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

    this.queryCardId = parseInt(this.activateRoute.snapshot.params.card_id, 10);
    this.userId = this.boardsService.getUserId();
    this.authorId = this.boardsService.getAuthorId();

    this.subscriptions.add(this.cardsService.getCard(this.queryCardId)
      .subscribe((card: CardResponse) => {
        this.card = {...card};
        this.formTitle.setValue({titleText : this.card.title});
        this.formDescription.setValue({descriptionText : this.card.description});
        this.isDownloaded = true;
        },
        (error) => {
          if ((error.status !== 401) && (error.status !== 422)) {
            this.errorHandlerService.sendError('Server is not available! Please try again later');
          }
        }
      ));
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
      this.cardsService.sendUpdatedCard(this.card);
    }
  }

  changeTitle() {
    if (this.card.title !== this.formTitle.value.titleText.trim()) {
      this.card.title = this.formTitle.value.titleText;
      this.cardsService.sendUpdatedCard(this.card);
    }
  }

  close(event) {
    const className = event.target.className;
    if ((className === 'modal__card__close') || (className === 'modal__wrapper')) {
      this.isDownloaded = false;
      this.router.navigate(['../../'], {relativeTo: this.activateRoute});
    }
  }

  deleteCard() {
    this.cardsService.sendDeletedCard(this.card);
    this.isDownloaded = false;
    this.router.navigate(['../../'], {relativeTo: this.activateRoute});
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
