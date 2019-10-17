import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.less']
})
export class BoardHeaderComponent implements OnInit, AfterViewChecked {

  @Input() title: string;
  @ViewChild('titleInput', { static: false }) titleField: ElementRef;
  form: FormGroup;
  editTitle = false;

  constructor(private input: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = new FormGroup({
      boardTitle: new FormControl(null, [
        Validators.minLength(1),
        Validators.maxLength(200)
      ]),
    });
  }

  ngAfterViewChecked() {
    this.input.detectChanges();
  }

  blurField() {
    console.log(this.form.invalid)
    if (this.form.invalid) {
      this.editTitle = false;
      return;
    }
    this.title = this.titleField.nativeElement.value;
    this.editTitle = false;

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
