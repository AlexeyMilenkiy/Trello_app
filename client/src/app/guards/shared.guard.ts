import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '@app/services';

@Injectable({
  providedIn: 'root'
})
export class SharedGuard implements CanActivate, CanActivateChild {

  constructor( private router: Router,
               private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const isValidToken = this.authService.isAuthenticated();

    if (isValidToken) {
      return true;
    } else {
      this.router.navigate(['/accept-page']);
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
