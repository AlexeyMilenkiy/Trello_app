import { Injectable} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CardsService } from '@app/services';
import { CardResponse } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CardsResolver {

  constructor(private router: Router,
              private activateRoute: ActivatedRoute,
              private cardsService: CardsService) {
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
          } else if ((error.status !== 401) && (error.status !== 422)) {
            return EMPTY;
          }
        })
      );

  }
}
