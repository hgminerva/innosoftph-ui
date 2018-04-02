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
var customer_service_1 = require('./customer.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var angular2_json2csv_1 = require("angular2-json2csv");
var CustomerComponent = (function () {
    // constructor
    function CustomerComponent(customerService, router, toastr, vRef, slimLoadingBarService, csvService) {
        this.customerService = customerService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.csvService = csvService;
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
        this.getCustomerData();
    };
    CustomerComponent.prototype.getCustomerData = function () {
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
    // show menu
    CustomerComponent.prototype.showMenu = function () {
        document.getElementById("showTop").click();
    };
    CustomerComponent.prototype.backClicked = function () {
        window.history.back();
    };
    // refresh grid
    CustomerComponent.prototype.refreshGrid = function () {
        this.startLoading();
        document.getElementById("btnRefresh").disabled = true;
        document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
        this.getCustomerData();
    };
    // Export CSV
    CustomerComponent.prototype.btnExportCSV = function () {
        var customers = new wijmo.collections.ObservableArray();
        this.customerCollectionView.moveToFirstPage();
        for (var p = 1; p <= this.customerCollectionView.pageCount; p++) {
            for (var i = 0; i < this.customerCollectionView.items.length; i++) {
                customers.push({
                    Customer: this.customerCollectionView.items[i].Article,
                    ContactNumber: this.customerCollectionView.items[i].ContactNumber,
                    ContactPerson: this.customerCollectionView.items[i].ContactPerson,
                    EmailAddress: this.customerCollectionView.items[i].EmailAddress,
                    Address: this.customerCollectionView.items[i].Address,
                    Particulars: this.customerCollectionView.items[i].Particulars
                });
            }
            this.customerCollectionView.moveToNextPage();
            if (p == this.customerCollectionView.pageCount) {
                this.customerCollectionView.moveToFirstPage();
            }
        }
        this.csvService.download(customers, 'customers');
    };
    // initialization
    CustomerComponent.prototype.ngOnInit = function () {
        this.startLoading();
        this.getListCustomer();
    };
    CustomerComponent = __decorate([
        core_1.Component({
            selector: 'my-customer',
            templateUrl: 'app/setup-customer/customer.html'
        }), 
        __metadata('design:paramtypes', [customer_service_1.CustomerService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService, angular2_json2csv_1.CsvService])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map