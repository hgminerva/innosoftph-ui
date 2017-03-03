"use strict";
// This impl. bases upon one that can be found in the router's test cases.
var CustomReuseStrategy = (function () {
    function CustomReuseStrategy() {
        this.handlers = {};
    }
    CustomReuseStrategy.prototype.shouldDetach = function (route) {
        console.debug('CustomReuseStrategy:shouldDetach', route);
        return true;
    };
    CustomReuseStrategy.prototype.store = function (route, handle) {
        console.debug('CustomReuseStrategy:store', route, handle);
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
        console.log(route.data);
    };
    CustomReuseStrategy.prototype.shouldAttach = function (route) {
        console.debug('CustomReuseStrategy:shouldAttach', route);
        console.debug(route.component);
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    };
    CustomReuseStrategy.prototype.retrieve = function (route) {
        console.debug('CustomReuseStrategy:retrieve', route);
        if (!route.routeConfig)
            return null;
        return this.handlers[route.routeConfig.path];
    };
    CustomReuseStrategy.prototype.shouldReuseRoute = function (future, curr) {
        console.debug('CustomReuseStrategy:shouldReuseRoute', future, curr);
        return future.routeConfig === curr.routeConfig;
    };
    return CustomReuseStrategy;
}());
exports.CustomReuseStrategy = CustomReuseStrategy;
//# sourceMappingURL=reuse-strategy.js.map