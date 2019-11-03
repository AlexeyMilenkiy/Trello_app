import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CardsService, BoardsService, ErrorHandlerService } from '@app/services';
import {BoardResponse, CardResponse} from '@app/interfaces';


@Component({
  selector: 'app-modal-edit-card',
  templateUrl: './modal-edit-card.component.html',
  styleUrls: ['./modal-edit-card.component.less']
})
export class ModalEditCardComponent implements OnInit, OnDestroy {

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

    this.subscriptions.add(this.activateRoute.data
      .subscribe(
        (res: { card: CardResponse }) => {
          if (res.card) {
            this.card = {...res.card};
            this.formTitle.setValue({title : this.card.title});
            this.formDescription.setValue({description : this.card.description});
          } else {
            this.errorHandlerService.sendError('Server is not available! Please reload page');
          }
        }
      ));
  }

  openDescriptionForm() {
    this.formDescription.setValue({description : this.card.description});
    this.isEditDescription = true;
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
    if ((formGroup.value[attr] !== null) && (this.card[attr] === formGroup.value[attr].trim())) {
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
