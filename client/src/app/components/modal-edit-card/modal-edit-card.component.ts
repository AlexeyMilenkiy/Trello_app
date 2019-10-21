import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CardResponse } from '@app/interfaces/card-response';
import { CardsService } from '@app/services/cards.service';

@Component({
  selector: 'app-modal-edit-card',
  templateUrl: './modal-edit-card.component.html',
  styleUrls: ['./modal-edit-card.component.less']
})
export class ModalEditCardComponent implements OnInit, OnChanges {

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

  isEditDescription = false;
  form: FormGroup;

  constructor(private cardsService: CardsService) {}

  ngOnInit() {
      this.form = new FormGroup({
        descriptionText: new FormControl(null, [
          Validators.maxLength(100)
        ]),
      });
  }

  changeTitle() {
    // this.title = this.form.v
    // this.changedTitle.emit(this.title);
  }

  changeDescription() {
    this.card.description = this.form.value.descriptionText;
    // this.changedDescription.emit(this.form.value.descriptionText);
  }

  close(event) {
    const className = event.target.className;
    if ((className === 'modal__card__close') || (className === 'modal__wrapper')) {
      this.isClose.emit(false);
    }
  }

  deleteCard() {
    this.cardsService.sendDeletingCard(this.card);
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.card.currentValue) {
      this.editableCard = changes.card.currentValue;
      }
    }
}
