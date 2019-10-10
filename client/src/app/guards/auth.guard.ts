import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthService} from '@app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.authService.getToken();

    switch (state.url) {
      case '/' :
        if (token) {
          this.router.navigate(['/boards']);
        } else {
          return true;
        }
        break;
      case '/sign-up' :
        if (token) {
          this.router.navigate(['/boards']);
        } else {
          return true;
        }
        break;
      case '/login' :
        if (token) {
          this.router.navigate(['/boards']);
        } else {
          return true;
        }
        break;
      default:
        if (!token) {
          this.router.navigate(['/']);
        } else {
          return true;
        }
    }
  }
}
