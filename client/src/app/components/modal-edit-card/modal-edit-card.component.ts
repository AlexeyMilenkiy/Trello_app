import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CardResponse} from '@app/interfaces/card-response';
import {CardsService} from '@app/services/cards.service';

@Component({
  selector: 'app-modal-edit-card',
  templateUrl: './modal-edit-card.component.html',
  styleUrls: ['./modal-edit-card.component.less']
})
export class ModalEditCardComponent implements OnInit {

  @Input() isEdit: boolean;
  @Input() card: CardResponse;
  @Output() closed = new EventEmitter<boolean>();

  isEditDescription = false;
  form: FormGroup;
  private element: any;

  constructor(private el: ElementRef,
              private cardsService: CardsService) {
    this.element = el.nativeElement;
  }

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
      this.closed.emit(false);
    }
  }

  deleteCard() {
    this.cardsService.sendDeleteCard(this.card);
    }
}
