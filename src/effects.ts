import { Injectable } from '@angular/core';
import { Router, ActivationStart } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ROUTER_GO_TYPE, ROUTER_BACK_TYPE, ROUTER_FORWARD_TYPE, RouteNavigation } from './actions';
import { map, tap, filter } from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(ROUTER_GO_TYPE),
    map((action: any) => action.payload),
    tap(({ path, queryParams, extras }) => setTimeout(() => this.router.navigate(path, { queryParams, ...extras })))
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(ofType(ROUTER_BACK_TYPE), tap(() => setTimeout(() => this.location.back())));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType(ROUTER_FORWARD_TYPE),
    tap(() => setTimeout(() => this.location.forward()))
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store: Store<any>
  ) {
    this.listenToRouter();
  }

  private listenToRouter() {
    this.router.events.pipe(filter(event => event instanceof ActivationStart)).subscribe((event: any) => {
      let route = event.snapshot;
      if (route.component !== undefined) {
        const path: any[] = [];
        const { params, queryParams } = route;

        while (route.parent) {
          if (route.routeConfig && route.routeConfig.path) {
            path.push(route.routeConfig.path);
          }
          route = route.parent;
        }
        const routerState = { params, queryParams, path: path.reverse().join('/') };
        this.store.dispatch(new RouteNavigation(routerState));
      }
    });
  }
}
