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
var customer_service_1 = require("./customer.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var CustomerComponent = (function () {
    // constructor
    function CustomerComponent(customerService, router, toastr, vRef, slimLoadingBarService) {
        this.customerService = customerService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.customerFilter = '';
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    CustomerComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    CustomerComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // list customer
    CustomerComponent.prototype.getListCustomer = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        var toastr;
        this.customerCollectionView = new wijmo.collections.CollectionView(this.customerService.getListCustomerData(toastr));
        this.customerCollectionView.filter = this.filterFunction.bind(this);
        this.customerCollectionView.pageSize = 15;
        this.customerCollectionView.trackChanges = true;
    };
    Object.defineProperty(CustomerComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.customerFilter;
        },
        // filter
        set: function (value) {
            if (this.customerFilter != value) {
                this.customerFilter = value;
                if (this.customerToFilter) {
                    clearTimeout(this.customerToFilter);
                }
                var self = this;
                this.customerToFilter = setTimeout(function () {
                    self.customerCollectionView.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    CustomerComponent.prototype.filterFunction = function (item) {
        if (this.customerFilter) {
            return (item.ArticleCode.toLowerCase().indexOf(this.customerFilter.toLowerCase()) > -1) ||
                (item.Article.toLowerCase().indexOf(this.customerFilter.toLowerCase()) > -1) ||
                (item.ContactNumber.toLowerCase().indexOf(this.customerFilter.toLowerCase()) > -1) ||
                (item.ArticleGroup.toLowerCase().indexOf(this.customerFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // initialization
    CustomerComponent.prototype.ngOnInit = function () {
        this.getListCustomer();
    };
    return CustomerComponent;
}());
CustomerComponent = __decorate([
    core_1.Component({
        selector: 'my-customer',
        templateUrl: 'app/setup-customer/customer.html'
    }),
    __metadata("design:paramtypes", [customer_service_1.CustomerService, typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof ng2_toastr_1.ToastsManager !== "undefined" && ng2_toastr_1.ToastsManager) === "function" && _b || Object, typeof (_c = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _c || Object, typeof (_d = typeof ng2_slim_loading_bar_1.SlimLoadingBarService !== "undefined" && ng2_slim_loading_bar_1.SlimLoadingBarService) === "function" && _d || Object])
], CustomerComponent);
exports.CustomerComponent = CustomerComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=customer.component.js.map