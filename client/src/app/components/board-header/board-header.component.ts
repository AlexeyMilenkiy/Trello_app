import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BoardsService} from '@app/services/boards.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.less']
})
export class BoardHeaderComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() boardId: number;
  form: FormGroup;
  editTitle = false;
  subscriptions: Subscription = new Subscription();

  constructor(private boardsService: BoardsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      boardTitle: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]),
    });
  }

  changeBoardTitle() {
    if (this.form.invalid) {
      this.editTitle = false;
      return;
    }
    this.title = this.form.value.boardTitle;
    this.editTitle = false;

    this.subscriptions.add(this.boardsService.changeBoardTitle(this.title, this.boardId)
      .subscribe((res) => {
          console.log(res);
        },
        (error) => console.log(error)
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
