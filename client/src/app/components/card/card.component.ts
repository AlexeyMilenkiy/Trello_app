import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent {

  @Input() title: string;
  @Input() description: string;
  @Input() tableId: number;
  @Input() index: number;
  @Output() indexDelete = new EventEmitter<number>();

  isEdit = false;

  showDetails($event: string) {
    console.log($event);
  }

  deleteCard(index: number) {
    console.log(index);
    this.indexDelete.emit(index);
  }
}
