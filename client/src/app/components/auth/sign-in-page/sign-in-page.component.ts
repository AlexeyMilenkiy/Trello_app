import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService as GoogleService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@app/interfaces/user';
import { AuthService } from '@app/services/auth.service';
import { SocialUser } from '@app/interfaces/social-user';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.less']
})
export class SignInPageComponent implements OnInit, OnDestroy {
  user: User  = {
    email: '',
    password: ''
  };
  isError =  false;
  subscriptions: Subscription = new Subscription();
  form: FormGroup;

  constructor(private googleService: GoogleService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
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
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.subscriptions.add(this.authService.login(this.user)
      .subscribe(() => {
          this.form.reset();
          this.router.navigate(['/boards']);
        },
        (error) => {
          if ((error.status !== 401) && (error.status !== 422)) {
            this.isError = true;
          }
        }
      ));
  }

  signInWithGoogle(): void {
    this.googleService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {

        this.subscriptions.add(this.authService.socialAuth(user)
          .subscribe(() => {
              this.router.navigate(['/boards']);
            },
            (error) => {
              if ((error.status !== 401) && (error.status !== 422)) {
                this.isError = true;
              }
            }
          ));
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
