import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BoardsService} from '@app/services/boards.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

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
  isError = false;
  isDelete = false;

  constructor(private boardsService: BoardsService,
              private router: Router) { }

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
    if (this.form.invalid || (this.form.value.boardTitle === this.title)) {
      this.editTitle = false;
      return;
    } else if (!this.form.value.boardTitle.trim().length) {
      this.editTitle = false;
      return;
    }
    this.subscriptions.add(this.boardsService.changeBoardTitle(this.title, this.boardId)

      .subscribe(() => {
          this.title = this.form.value.boardTitle;
          this.editTitle = false;
        },
        (error) => {
          if ((error.status !== 401) && (error.status !== 422)) {
            this.isError = true;
          }
        }
      ));
  }

  deleteBoard() {
    this.isDelete = false;
    this.subscriptions.add(this.boardsService.removeBoard(this.boardId)
      .subscribe(() => {
        this.router.navigate(['/boards']);
        },
        (error) => {
          if ((error.status !== 401) && (error.status !== 422)) {
            this.isError = true;
          }
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
