import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService as GoogleService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { GoogleLoginProvider } from 'angularx-social-login';

import { AuthService, ErrorHandlerService } from '@app/services';
import { UserBeforeLogin, SocialUser } from '@app/interfaces';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.less']
})
export class SignInPageComponent implements OnInit, OnDestroy {
  user: UserBeforeLogin  = {
    email: '',
    password: ''
  };
  subscriptions: Subscription = new Subscription();
  form: FormGroup;

  constructor( private router: Router,
               private googleService: GoogleService,
               private authService: AuthService,
               private errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit() {
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
            this.errorHandlerService.sendError('Server is not available! Please try again later');
          }
        }
      ));
  }

  signInWithGoogle() {
    this.googleService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {

        this.subscriptions.add(this.authService.socialAuth(user.idToken, user.id)
          .subscribe(() => {
              this.router.navigate(['/boards']);
            },
            (error) => {
              if ((error.status !== 401) && (error.status !== 422)) {
                this.errorHandlerService.sendError('Server is not available! Please try again later');
              }
            }
          ));
      })
      .catch((error) => {
        if (error !== 'User cancelled login or did not fully authorize.') {
          this.errorHandlerService.sendError('Server is not available! Please try again later');
        }
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
