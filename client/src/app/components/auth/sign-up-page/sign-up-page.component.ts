import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AuthService as GoogleService, GoogleLoginProvider } from 'angularx-social-login';

import { AuthService, ErrorHandlerService } from '@app/services';
import { UserBeforeLogin, SocialUser } from '@app/interfaces';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.less']
})
export class SignUpPageComponent implements OnInit, OnDestroy {
  user: UserBeforeLogin  = {
    name: '',
    password: '',
    email: ''
  };
  isError =  false;
  subscriptions: Subscription = new Subscription();
  form: FormGroup;

  constructor( private router: Router,
               private googleService: GoogleService,
               private authService: AuthService,
               private errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit() {
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

    this.subscriptions.add(this.authService.register(this.user)
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
