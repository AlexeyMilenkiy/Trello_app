import { Injectable} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {CardsService, ErrorHandlerService} from '@app/services';
import { CardResponse } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CardsResolver {

  constructor(private router: Router,
              private activateRoute: ActivatedRoute,
              private cardsService: CardsService,
              private errorHandlerService: ErrorHandlerService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CardResponse> | Promise<CardResponse> | CardResponse {
    const queryCardId = parseInt(route.params.card_id, 10);

    return this.cardsService.getCard(queryCardId)
      .pipe(
        tap((card: CardResponse) => {
          return of(card);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.router.navigate(['page-not-found']);
            return EMPTY;
          }
          this.errorHandlerService.sendError('Something went wrong and it is impossible to open the card. Please try again later');
          return EMPTY;
        })
      );
  }
}
