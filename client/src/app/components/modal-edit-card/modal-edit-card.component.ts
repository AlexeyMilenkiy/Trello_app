import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-edit-card',
  templateUrl: './modal-edit-card.component.html',
  styleUrls: ['./modal-edit-card.component.less']
})
export class ModalEditCardComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

  showTitle() {
    console.log(this.title);
  }
}
