import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from '@interfaces/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.less']
})
export class SignUpPageComponent implements OnInit {
  user: User  = {
    name: '',
    password: '',
    email: ''
  };

  subscriptions: Subscription = new Subscription();
  form: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.user = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };
  }
}
