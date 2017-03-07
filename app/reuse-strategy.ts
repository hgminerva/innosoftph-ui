import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";

// This impl. bases upon one that can be found in the router's test cases.
export class CustomReuseStrategy implements RouteReuseStrategy {

    handlers: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // console.debug('CustomReuseStrategy:shouldDetach', route);
        return true;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // console.debug('CustomReuseStrategy:store', route, handle);
        if (route.routeConfig.path != 'leadDetail/:id') {
            if (route.routeConfig.path != 'quotationDetail/:id') {
                if (route.routeConfig.path != 'deliveryDetail/:id') {
                    if (route.routeConfig.path != 'supportDetail/:id') {
                        if (route.routeConfig.path != 'softwareDevelopmentDetail/:id') {
                            this.handlers[route.routeConfig.path] = handle;
                        }
                    }
                }
            }
        }
        
        // console.log(route.data)
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // console.debug('CustomReuseStrategy:shouldAttach', route);
        // console.debug(route.component);
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        // console.debug('CustomReuseStrategy:retrieve', route);
        if (!route.routeConfig) return null;
        return this.handlers[route.routeConfig.path];
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // console.debug('CustomReuseStrategy:shouldReuseRoute', future, curr);
        return future.routeConfig === curr.routeConfig;
    }

}