import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CardsService, BoardsService, ErrorHandlerService } from '@app/services';
import { CardResponse } from '@app/interfaces';


@Component({
  selector: 'app-modal-edit-card',
  templateUrl: './modal-edit-card.component.html',
  styleUrls: ['./modal-edit-card.component.less']
})
export class ModalEditCardComponent implements OnInit, OnDestroy {

  queryCardId: number;
  card: CardResponse;
  isError = false;
  textInError = '';
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

    this.subscriptions.add(this.errorHandlerService.getEventClose()
      .subscribe(() => {
        this.router.navigate(['../../'], {relativeTo: this.activateRoute});
        }
      )
    );
  }

  ngOnInit() {
    this.formTitle = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]),
    });
    this.formDescription = new FormGroup({
      description: new FormControl(null, [
        Validators.maxLength(200)
      ]),
    });

    this.queryCardId = parseInt(this.activateRoute.snapshot.params.card_id, 10);
    this.userId = this.boardsService.getUserId();
    this.authorId = this.boardsService.getAuthorId();

    this.subscriptions.add(this.cardsService.getCard(this.queryCardId)
      .subscribe((card: CardResponse) => {
        if (!card) {
          this.router.navigate(['../../'], {relativeTo: this.activateRoute});
          return;
        }
        this.card = {...card};
        this.formTitle.setValue({title : this.card.title});
        this.formDescription.setValue({description : this.card.description});
        },
        (error) => {
          if ((error.status !== 401) && (error.status !== 422)) {
            this.errorHandlerService.sendError('Server is not available! Please try again later!');
          }
        }
      ));
  }

  closeDescriptionForm() {
    this.isEditDescription = false;
    this.formDescription.setValue({description : this.card.description});
  }

  blurOnTitle(elem: HTMLTextAreaElement) {
    if (this.formTitle.invalid || !this.formTitle.value.title.trim()) {
      elem.focus();
    } else {
      this.changeCard('title');
    }
  }

  changeCard(attr: string) {
    let formGroup = this.formTitle;

    if (attr === 'description') {
      this.isEditDescription = false;
      formGroup = this.formDescription;
    }
    if (this.card[attr] === formGroup.value[attr].trim()) {
      return;
    }
    this.card[attr] = formGroup.value[attr];
    this.subscriptions.add(this.cardsService.updateCard(this.card)
      .subscribe(
        () => this.cardsService.sendUpdatedCard(this.card),
        () => {
          this.textInError = 'changed';
          this.isError = true;
        }
      )
    );
  }

  close() {
    this.router.navigate(['../../'], {relativeTo: this.activateRoute});
  }

  deleteCard() {
    this.subscriptions.add(this.cardsService.deleteCard(this.card)
      .subscribe(
        () => {
          this.cardsService.sendDeletedCard(this.card);
          this.router.navigate(['../../'], {relativeTo: this.activateRoute});
        },
        () => {
          this.textInError = 'deleted';
          this.isError = true;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
