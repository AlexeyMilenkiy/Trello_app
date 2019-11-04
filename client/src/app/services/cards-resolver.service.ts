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
              private errorHsndlerService: ErrorHandlerService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CardResponse> | Promise<CardResponse> | CardResponse {
    console.log('cards resolver');
    const queryCardId = parseInt(route.params.card_id, 10);

    return this.cardsService.getCard(queryCardId)
      .pipe(
        tap((card: CardResponse) => {
          return of(card);
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          if (error.status === 404) {
            this.router.navigate(['page-not-found']);
            return EMPTY;
          }
          if (error.status === 0) {
            this.errorHsndlerService.sendError('jkhjk');
            return EMPTY;
          }
          if ((error.status !== 401) && (error.status !== 422)) {
            console.log('cards resolver 2344');
            return EMPTY;
          }
        })
      );

  }
}
