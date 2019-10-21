import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CardResponse } from '@app/interfaces/card-response';

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
  top: 0;
  right: 0;
  form: FormGroup;

  openEditModal(event) {
    if (event.target.className === 'card__container') {
      this.isCardEditModal = true;
    }
  }

  createCard() {

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

  ngOnInit() {
    this.form = new FormGroup({
      titleCard: new FormControl(this.card.title, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]),
    });
  }
}
