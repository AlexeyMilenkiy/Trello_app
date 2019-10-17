import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.less']
})
export class BoardHeaderComponent implements OnInit {

  @Input() title: string;
  form: FormGroup;
  editTitle = false;

  constructor() { }

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
  }
}
