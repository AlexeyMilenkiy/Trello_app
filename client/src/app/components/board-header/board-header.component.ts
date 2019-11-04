import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { BoardsService, ErrorHandlerService } from '@app/services';

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
  topPosition: number;
  leftPosition: number;
  isOpenInviteBlock = false;
  isCreateLink = false;
  textInButton = 'Copy';
  hashLink: string | Int32Array = 'Loading...';

  constructor(private router: Router,
              private boardsService: BoardsService,
              private errorHandlerService: ErrorHandlerService) {
  }

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
    }
    if (!this.form.value.boardTitle.trim().length) {
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
            this.errorHandlerService.sendError('Server is not available! Please try again later');
          }
        }
      ));
  }

  toggleInviteBlock(event) {
    const path = event.path || (event.composedPath && event.composedPath());
    this.topPosition = path[0].offsetTop + 45;

    if ((path[0].offsetLeft + 350) >= event.view.innerWidth) {     // 350 it's width invite's block
      this.leftPosition = event.view.innerWidth - 360;
    } else {
      this.leftPosition = path[0].offsetLeft;
    }
    this.isOpenInviteBlock = !this.isOpenInviteBlock;
    if (this.isCreateLink) {
      this.isCreateLink = false;
    }
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
          },
          () => {
            this.hashLink = 'Sorry, server is unavailable';
          })
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

  onClickedOutside($event) {
    if ($event.target.className !== 'board__header__btn') {
      this.isOpenInviteBlock = false;
      this.isCreateLink = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  showInput() {
    this.form.setValue({boardTitle: this.title});
    this.editTitle = true;
  }
}
