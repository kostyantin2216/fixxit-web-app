import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Event, NavigationEnd, NavigationStart, Params, Router } from '@angular/router';

@Injectable()
export class GlobalStateService {
  private _profession: number;
  private _address: string;
  private _userId: string;

  constructor(router: Router) {
    router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart) {
        let params: Params;
        if(router.routerState.root.firstChild) {
          params = router.routerState.root.firstChild.snapshot.params;
        } else {
          params = router.routerState.root.snapshot.params
        }
        this.updateState(params);
      }
    });
  }

  updateState(params: Params) {
    this._profession = parseInt(params['profession']);
    this._address = params['address'];
    this._userId = params['user'];
    console.log(`current state: profession = ${this.profession}, address = ${this.address}, userId = ${this.userId}`);
  }

  get profession() {
    return this._profession;
  }

  get address() {
    return this._address;
  }

  get userId() {
    return this._userId;
  }

}
