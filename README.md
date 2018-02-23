# NGRX Router
Router bindings for NGRX Effects. It allows you to bind to route activation
to fetch data along with some common route actions such as go, back, foward.

This is different from ngrx-router-store in the fact this doesn't actually
add anything to your store, it just emits events.

For more information, checkout this [blog post](https://medium.com/@amcdnl/angular-routing-data-with-ngrx-effects-1cda1bd5e579).

## Getting Started
To get started, lets install the package thru npm:

```
npm i ngrx-router --S
```

then include the effect in your module:

```javascript
import { RouterEffects } from 'ngrx-router';

@NgModule({
    imports: [
        EffectsModule.forRoot([
            ...effects, // < Your other effects
            RouterEffects
        ]),
    ]
})
export class MyModule {}
```

### Bindings
In an effect, you can do bind to route activations like:

```javascript
import { ofRoute, RouteNavigation } from 'ngrx-router';

@Injectable()
export class MyEffect {
    constructor(private update$: Actions) {}

    @Effect()
    navigate$ = this.update$.pipe(
        ofRoute('pizza/:id'),
        map((action: RouteNavigation) => action.payload.params.id),
        map(id => new LoadPizza(id))
    );
}
```

### Actions
You can also do navigation events with this library.

```javascript
this.store.dispatch(new RouterGo({ path: ['pizza'] }))
this.store.dispatch(new RouterBack())
this.store.dispatch(new RouterForward())
```
