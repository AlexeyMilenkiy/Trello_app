import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { User } from '@interfaces/user';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.less']
})
export class SignUpPageComponent implements OnInit, OnDestroy {
  user: User  = {
    name: '',
    password: '',
    email: ''
  };
  isError =  false;
  subscriptions: Subscription = new Subscription();
  form: FormGroup;

  constructor( private auth: AuthService,
               private router: Router) { }

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
        Validators.minLength(8)
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

    this.subscriptions.add(this.auth.register(this.user)
      .subscribe(() => {
          this.form.reset();
          this.router.navigate(['/boards']);
        },
        (error) => {
          if (error.status !== 401) {
            console.log(error);
            this.isError = true;
          }
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
