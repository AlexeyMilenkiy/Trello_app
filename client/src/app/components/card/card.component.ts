import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardResponse} from '@app/interfaces/card-response';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent {

  @Input() card: CardResponse;
  @Output() indexDelete = new EventEmitter<number>();

  isEdit = false;
  color: any;

  changeTitle() {
    console.log('click');
    this.card.title = 'blablalbla';
  }

  showDetails($event) {
    console.log($event);
  }
}
