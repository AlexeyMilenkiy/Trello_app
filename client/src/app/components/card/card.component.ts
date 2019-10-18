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

  showDetails($event: string) {
    console.log($event);
  }
}
