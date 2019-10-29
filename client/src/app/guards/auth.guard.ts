import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '@app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router,
               private authService: AuthService){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const isValidToken = this.authService.isAuthenticated();

    switch (state.url) {
      case '/' :
        if (isValidToken) {
          this.router.navigate(['/boards']);
        } else {
          return true;
        }
        break;
      case '/sign-up' :
        if (isValidToken) {
          this.router.navigate(['/boards']);
        } else {
          return true;
        }
        break;
      case '/login' :
        if (isValidToken) {
          this.router.navigate(['/boards']);
        } else {
          return true;
        }
        break;
      case '/accept-page' :
        if (isValidToken) {
          this.router.navigate(['/boards']);
        } else {
          return true;
        }
        break;
      default:
        if (!isValidToken) {
          this.router.navigate(['/']);
        } else {
          return true;
        }
    }
  }
}
