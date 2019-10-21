import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { CardResponse } from '@app/interfaces/card-response';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit{

  @Input() card: CardResponse;
  @Output() indexDelete = new EventEmitter<number>();

  isEdit = false;
  isShowMenu = false;
  isOpenEditTitle = false;
  top: 0;
  right: 0;
  form: FormGroup;

  openEditModal(event) {
    if (event.target.className === 'card__wrapper') {
      this.isEdit = true;
    }
  }

  createCard() {

  }

  openEditor(ev) {
    this.top = ev.path[3].offsetTop;
    this.right = ev.path[3].offsetLeft;
    this.isOpenEditTitle = true;
  }

  close(ev) {
    if (ev.className === 'form__container' || ev.className === 'form__close') {
      this.isOpenEditTitle = false;
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      titleCard: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]),
    });
  }
}
