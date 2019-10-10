import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AuthResponse } from '@app/interfaces/auth-response';
import { User } from '@app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

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
        this.error$.next('Such an email does not exist');
        break;
      case 'invalid_password':
        this.error$.next('Wrong password');
        break;
      case 'email_registered':
        this.error$.next('Such email address is registered');
    }
    return throwError(error);
  }

  logout() {
    this.setStorage(null);
  }

  setStorage(response: AuthResponse | null) {
    if (response) {
      localStorage.setItem('name', response[0]);
      localStorage.setItem('id', response[1]);
      localStorage.setItem('authToken', response[2].token);
    } else {
      localStorage.clear();
    }
  }
}