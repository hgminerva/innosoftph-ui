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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("./user.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var UserComponent = (function () {
    // constructor
    function UserComponent(userService, router, toastr, vRef, slimLoadingBarService) {
        this.userService = userService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.userFilter = '';
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    UserComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    UserComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // list user
    UserComponent.prototype.getListUser = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        var toastr;
        this.userCollectionView = new wijmo.collections.CollectionView(this.userService.getListUserData(toastr));
        this.userCollectionView.filter = this.filterFunction.bind(this);
        this.userCollectionView.pageSize = 15;
        this.userCollectionView.trackChanges = true;
    };
    Object.defineProperty(UserComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.userFilter;
        },
        // filter
        set: function (value) {
            if (this.userFilter != value) {
                this.userFilter = value;
                if (this.userToFilter) {
                    clearTimeout(this.userToFilter);
                }
                var self = this;
                this.userToFilter = setTimeout(function () {
                    self.userCollectionView.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    UserComponent.prototype.filterFunction = function (item) {
        if (this.userFilter) {
            return (item.FullName.toLowerCase().indexOf(this.userFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // initialization
    UserComponent.prototype.ngOnInit = function () {
        this.getListUser();
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        selector: 'my-user',
        templateUrl: 'app/setup-user/user.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof ng2_toastr_1.ToastsManager !== "undefined" && ng2_toastr_1.ToastsManager) === "function" && _b || Object, typeof (_c = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _c || Object, typeof (_d = typeof ng2_slim_loading_bar_1.SlimLoadingBarService !== "undefined" && ng2_slim_loading_bar_1.SlimLoadingBarService) === "function" && _d || Object])
], UserComponent);
exports.UserComponent = UserComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=user.component.js.map