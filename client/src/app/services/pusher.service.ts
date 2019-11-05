import { Injectable } from '@angular/core';

import Pusher from 'pusher-js';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  cardsChannel: any;
  boardsChannel: any;

  constructor() {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.cardsChannel = this.pusher.subscribe('cards-channel');
    this.boardsChannel = this.pusher.subscribe('boards-channel');
  }
}
