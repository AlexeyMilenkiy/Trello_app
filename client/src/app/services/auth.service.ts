import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AuthResponse } from '@app/interfaces/auth-response';
import { User } from '@app/interfaces/user';
import { SocialUser } from '@app/interfaces/social-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient,
              private router: Router) {}

  register(user: User): Observable<AuthResponse> {
    return this.http.post(`${environment.baseUrl}auth/sign-up`, user)
      .pipe(
        tap(this.setStorage),
        catchError(this.checkError.bind(this))
      );
  }

  login(user: User): Observable<AuthResponse> {
    return this.http.post(`${environment.baseUrl}auth/sign-in`, user)
      .pipe(
        tap(this.setStorage),
        catchError(this.checkError.bind(this))
      );
  }

  socialAuth(user: SocialUser): Observable<AuthResponse> {
    return this.http.post(`${environment.baseUrl}auth/google-auth`, {
      email: user.email, name: user.name, token: user.authToken
    })
      .pipe(
        tap(this.setStorage),
        catchError(this.checkError.bind(this))
      );
  }

  checkError(error: HttpErrorResponse) {
    if (error.error.errors) {
      switch (error.error.errors[0].param) {
        case 'name':
          this.error$.next('Invalid name');
          break;
        case 'email':
          this.error$.next('Invalid email');
          break;
        case 'password':
          this.error$.next('Invalid password');
      }
    }
    switch (error.error) {
      case 'invalid_email':
        this.error$.next('There isn\'t an account for this email');
        break;
      case 'invalid_password':
        this.error$.next('Wrong password');
        break;
      case 'password_null':
        this.error$.next('This account doesn\'t have a password set - perhaps you normally log in with Google?');
        break;
      case 'email_registered':
        this.error$.next('Email already in use by another account. You can use sign in');
    }
    return throwError(error);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  checkToken() {
    return this.http.get(`${environment.baseUrl}check-token`);
  }

  logout() {
    this.setStorage(null);
    this.router.navigate(['/']);
  }

  setStorage(response: AuthResponse | null) {
    if (response) {
      localStorage.setItem('name', response.name);
      localStorage.setItem('id', `${response.id}`);
      localStorage.setItem('authToken', response.token);
    } else {
      localStorage.clear();
    }
  }
}
