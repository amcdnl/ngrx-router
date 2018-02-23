import { OperatorFunction } from 'rxjs/interfaces';
import { Action } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { RouteNavigation, ROUTER_NAVIGATION_TYPE } from './actions';

export function ofRoute(route: string | string[]): OperatorFunction<Action, Action> {
  return filter((action: Action) => {
    const isRouteAction = action.type === ROUTER_NAVIGATION_TYPE;
    if (isRouteAction) {
      const routeAction = action as RouteNavigation;
      const routePath = routeAction.payload.path;
      if (Array.isArray(route)) {
        return route.indexOf(routePath) > -1;
      } else {
        return routePath === route;
      }
    }
    return isRouteAction;
  });
}
