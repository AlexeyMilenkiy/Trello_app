import { Component, ComponentRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CardResponse } from '@app/interfaces/card-response';
import { CardsService } from '@app/services/cards.service';


@Component({
  selector: 'app-modal-edit-card',
  templateUrl: './modal-edit-card.component.html',
  styleUrls: ['./modal-edit-card.component.less']
})
export class ModalEditCardComponent implements OnInit, OnChanges, OnDestroy {

  @Input() isEdit: boolean;
  @Input() card: CardResponse;
  @Output() isClose = new EventEmitter<boolean>();

  private editableCard: CardResponse = {
    board_id: 0,
    description: undefined,
    id: 0,
    position: 0,
    table_id: 0,
    title: ''
  };

  ref: ComponentRef<any>;
  isEditDescription = false;
  formTitle: FormGroup;
  formDescription: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(private cardsService: CardsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.card.currentValue) {
      this.editableCard = changes.card.currentValue;
      this.formTitle.setValue({titleText : this.editableCard.title});
      this.formDescription.setValue({descriptionText : this.editableCard.description});
    }
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
    if (this.editableCard.description !== this.formDescription.value.descriptionText.trim()) {
      this.editableCard.description = this.formDescription.value.descriptionText;

      this.subscriptions.add(this.cardsService.updateCard(this.editableCard)
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
    if (this.editableCard.title !== this.formTitle.value.titleText.trim()) {
      this.editableCard.title = this.formTitle.value.titleText;

      this.subscriptions.add(this.cardsService.updateCard(this.editableCard)
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
      this.isClose.emit(false);
    }
  }

  deleteCard() {
    this.ref.destroy();
    this.cardsService.sendDeletingCard(this.editableCard);
    this.isClose.emit(false);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
