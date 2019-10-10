import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BoardsService } from '@app/services/boards.service';
import { Board } from '@app/interfaces/board';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.less']
})

export class ModalCreateComponent implements OnInit, OnDestroy {

  @Input() isModal: boolean;
  @Output() closed = new EventEmitter<boolean>();

  constructor(private service: BoardsService) {}

  board: Board = {
    title: '',
    id: parseInt(localStorage.getItem('id'), 10)
  };
  form: FormGroup;
  subscriptions: Subscription = new Subscription();

  create() {
    if (this.form.invalid) {
      return;
    }
    this.board.title = this.form.value.title;
    this.subscriptions.add(this.service.createBoard(this.board)
      .subscribe((res) => {
          console.log(res)
        },
        (error) => {
          console.log(error)
          }
      ));
  }

  close() {
    this.closed.emit(false);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
