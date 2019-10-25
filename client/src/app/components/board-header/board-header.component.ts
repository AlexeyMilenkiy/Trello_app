import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';

import { Subscription} from 'rxjs';

import { BoardsService} from '@app/services/boards.service';


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
  top: number;
  left: number;
  isOpenInviteBlock = false;
  isCreateLink = false;
  textInButton = 'Copy';
  hashLink: string | Int32Array = 'Loading...';

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
    this.subscriptions.add(this.boardsService.changeBoardTitle(this.form.value.boardTitle, this.boardId)

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

  openInviteBlock(event) {
    const path = event.path || (event.composedPath && event.composedPath());
    this.top = path[0].offsetTop + 45;
    this.left = path[0].offsetLeft;
    this.isOpenInviteBlock = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  generateLink() {
    if (!this.isCreateLink) {
      this.isCreateLink = true;
      this.boardsService.createHashLink(this.title, this.boardId);
      this.subscriptions.add(this.boardsService.getHashLink()
        .subscribe((hashLink: string) => {
          this.hashLink = hashLink;
        })
      );
    } else {
      this.isCreateLink = false;
      this.subscriptions.add(this.boardsService.changeBoardShareLink(this.boardId, null)
        .subscribe(() => {
          this.hashLink = 'Loading...';
        })
        // обработать ошибку
      );
    }
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    this.textInButton = 'Copied!';
    setTimeout(() => {
      this.textInButton = 'Copy';
    }, 2000);
  }
}
