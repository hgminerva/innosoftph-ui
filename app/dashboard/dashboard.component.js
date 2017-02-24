"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var DashboardComponent = (function () {
    // constructor
    function DashboardComponent(router, slimLoadingBarService) {
        this.router = router;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isLoadingDashboard = true;
        this.isFinishedLoadingDashboard = false;
    }
    // start loading
    DashboardComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    DashboardComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // initialization
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        else {
            setTimeout(function () {
                _this.isLoadingDashboard = false;
                _this.isFinishedLoadingDashboard = true;
            }, 500);
        }
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/dashboard/dashboard.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map