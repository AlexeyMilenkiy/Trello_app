import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '@env/environment';
import { UserResponse, UserBeforeLogin } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient,
              public jwtHelper: JwtHelperService) {}

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(user: UserBeforeLogin): Observable<UserResponse> {
    return this.http.post(`${environment.baseUrl}auth/sign-up`, user)
      .pipe(
        tap(this.setStorage),
        catchError(this.checkError.bind(this))
      );
  }

  login(user: UserBeforeLogin): Observable<UserResponse> {
    return this.http.post(`${environment.baseUrl}auth/sign-in`, user)
      .pipe(
        tap(this.setStorage),
        catchError(this.checkError.bind(this))
      );
  }

  socialAuth(idToken: string, id: string): Observable<UserResponse> {
    return this.http.post(`${environment.baseUrl}auth/google-auth`, {token: idToken, clientId: id})
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

  logout() {
    this.setStorage(null);
  }

  getUserName() {
    return localStorage.getItem('name');
  }

  setStorage(response: UserResponse | null) {
    if (response) {
      localStorage.setItem('name', response.name);
      localStorage.setItem('id', `${response.id}`);
      localStorage.setItem('authToken', response.token);
    } else {
      localStorage.clear();
    }
  }
}
