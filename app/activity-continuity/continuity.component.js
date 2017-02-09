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
var continuity_service_1 = require('./continuity.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var ContinuityComponent = (function () {
    // inject continuity service
    function ContinuityComponent(continuityService, router, toastr, vRef, slimLoadingBarService) {
        this.continuityService = continuityService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isContinuityStartDateSelected = true;
        this.isContinuityEndDateSelected = true;
        this.continuityFilter = '';
        this.continuityDeliverySelectedIndex = -1;
        this.continuityCustomerSelectedIndex = -1;
        this.continuityProductSelectedIndex = -1;
        this.continuityStatusArray = ['OPEN', 'EXPIRED'];
        this.continuityStatusSelectedIndex = -1;
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    ContinuityComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    ContinuityComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // continuity date ranged
    ContinuityComponent.prototype.setContinuityDateRanged = function () {
        this.continuityStartDateValue = new Date();
        this.continuityEndDateValue = new Date();
        this.continuityDateValue = new Date();
        this.continuityExpiryDateValue = new Date();
        this.getContinuityData();
        this.getListDeliveryServiceData();
    };
    // continuity date on value changed
    ContinuityComponent.prototype.continuityDateOnValueChanged = function () {
    };
    // expired date on value changed
    ContinuityComponent.prototype.continuityExpiryDateOnValueChanged = function () {
    };
    // event: continuity start date
    ContinuityComponent.prototype.continuityStartDateOnValueChanged = function () {
        this.startLoading();
        if (!this.isContinuityStartDateSelected) {
            this.getContinuityData();
        }
        else {
            this.isContinuityStartDateSelected = false;
        }
    };
    // event: continuity end date
    ContinuityComponent.prototype.continuityEndDateOnValueChanged = function () {
        this.startLoading();
        if (!this.isContinuityEndDateSelected) {
            this.getContinuityData();
        }
        else {
            this.isContinuityEndDateSelected = false;
        }
    };
    // continuity data
    ContinuityComponent.prototype.getContinuityData = function () {
        this.continuityCollectionView = new wijmo.collections.CollectionView(this.continuityService.getListContinuityData(this.continuityStartDateValue, this.continuityEndDateValue));
        this.continuityCollectionView.filter = this.filterFunction.bind(this);
        this.continuityCollectionView.pageSize = 15;
        this.continuityCollectionView.trackChanges = true;
    };
    Object.defineProperty(ContinuityComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.continuityFilter;
        },
        // filter
        set: function (value) {
            if (this.continuityFilter != value) {
                this.continuityFilter = value;
                if (this.continuityToFilter) {
                    clearTimeout(this.continuityToFilter);
                }
                var self = this;
                this.continuityToFilter = setTimeout(function () {
                    self.continuityCollectionView.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    ContinuityComponent.prototype.filterFunction = function (item) {
        if (this.continuityFilter) {
            return (item.ContinuityNumber.toLowerCase().indexOf(this.continuityFilter.toLowerCase()) > -1) ||
                (item.Customer.toLowerCase().indexOf(this.continuityFilter.toLowerCase()) > -1) ||
                (item.Product.toLowerCase().indexOf(this.continuityFilter.toLowerCase()) > -1) ||
                (item.ContinuityStatus.toLowerCase().indexOf(this.continuityFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // delivery data
    ContinuityComponent.prototype.getListDeliveryServiceData = function () {
        this.continuityDeliveryObservableArray = this.continuityService.getListDeliveryData();
        this.getListCustomer();
    };
    // delivery selected index changed
    ContinuityComponent.prototype.cboContinuityDeliverySelectedIndexChanged = function () {
        if (this.continuityDeliverySelectedIndex >= 0) {
            this.continuityDeliveryId = this.continuityDeliveryObservableArray[this.continuityDeliverySelectedIndex].Id;
            this.continuityCustomerSelectedValue = this.continuityDeliveryObservableArray[this.continuityDeliverySelectedIndex].Customer;
            this.continuityProductSelectedValue = this.continuityDeliveryObservableArray[this.continuityDeliverySelectedIndex].Product;
        }
        else {
            this.continuityDeliveryId = 0;
        }
    };
    // list customer data
    ContinuityComponent.prototype.getListCustomer = function () {
        this.continuityCustomerObservableArray = this.continuityService.getListArticleData(2);
        this.getListProduct();
    };
    // customer selected index changed
    ContinuityComponent.prototype.cboContinuityCustomerSelectedIndexChanged = function () {
        if (this.continuityCustomerSelectedIndex >= 0) {
            this.continuitCustomerId = this.continuityCustomerObservableArray[this.continuityCustomerSelectedIndex].Id;
        }
        else {
            this.continuitCustomerId = 0;
        }
    };
    // list product data
    ContinuityComponent.prototype.getListProduct = function () {
        this.continuityProductObservableArray = this.continuityService.getListArticleData(1);
    };
    // product selected index changed
    ContinuityComponent.prototype.cboContinuityProductSelectedIndexChanged = function () {
        if (this.continuityProductSelectedIndex >= 0) {
            this.continuitProductId = this.continuityProductObservableArray[this.continuityProductSelectedIndex].Id;
        }
        else {
            this.continuitProductId = 0;
        }
    };
    // add continuity click
    ContinuityComponent.prototype.btnContinuityDetailClick = function (add) {
        document.getElementById("btnSaveContinuity").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnSaveContinuity").disabled = false;
        document.getElementById("btnCloseContinuity").disabled = false;
        if (add) {
            this.continuityDetailModalString = "Add";
            this.continuityId = 0;
            this.continuityNumber = "--";
            this.continuityDateValue = new Date();
            this.continuityDeliverySelectedIndex = 0;
            // this.continuityCustomerSelectedIndex = 0;
            // this.continuityProductSelectedIndex = 0;
            this.continuityCustomerSelectedValue = this.continuityCustomerObservableArray[0].Customer;
            this.continuityProductSelectedValue = this.continuityCustomerObservableArray[0].Product;
            this.continuityExpiryDateValue = new Date();
            this.continuityStatusSelectedIndex = 0;
            this.continuityStatusSelectedValue = "OPEN";
            this.continuityStatus = "OPEN";
            this.continuityStaffUser = "--";
        }
        else {
            var currentSelectedContinuity = this.continuityCollectionView.currentItem;
            this.continuityDetailModalString = "Edit";
            this.continuityId = currentSelectedContinuity.Id;
            this.continuityNumber = currentSelectedContinuity.ContinuityNumber;
            this.continuityDateValue = new Date(currentSelectedContinuity.ContinuityDate);
            this.continuityDeliverySelectedValue = currentSelectedContinuity.DeliveryNumber;
            this.continuityCustomerSelectedValue = currentSelectedContinuity.Customer;
            this.continuityProductSelectedValue = currentSelectedContinuity.Product;
            this.continuityExpiryDateValue = new Date(currentSelectedContinuity.ExpiryDate);
            this.continuityStatusSelectedValue = currentSelectedContinuity.ContinuityStatus;
            this.continuityStatus = currentSelectedContinuity.ContinuityStatus;
            this.continuityStaffUser = currentSelectedContinuity.StaffUser;
        }
    };
    // continuity status selected index changed
    ContinuityComponent.prototype.cboContinuityStatusSelectedIndexChanged = function () {
        this.continuityStatus = this.continuityStatusArray[this.continuityStatusSelectedIndex];
    };
    // continuity data
    ContinuityComponent.prototype.getContinuityValue = function () {
        var dataObject = {
            ContinuityDate: this.continuityDateValue.toLocaleDateString(),
            DeliveryId: this.continuityDeliveryId,
            CustomerId: this.continuitCustomerId,
            ProductId: this.continuitProductId,
            ExpiryDate: this.continuityExpiryDateValue.toLocaleDateString(),
            ContinuityStatus: this.continuityStatus
        };
        return dataObject;
    };
    // save continuity
    ContinuityComponent.prototype.btnSaveContinuity = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnSaveContinuity").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveContinuity").disabled = true;
        document.getElementById("btnCloseContinuity").disabled = true;
        if (this.continuityId == 0) {
            this.continuityService.postContinuityData(this.getContinuityValue(), toastr);
        }
        else {
            this.continuityService.putContinuityData(this.continuityId, this.getContinuityValue(), toastr);
        }
    };
    // delete continuity
    ContinuityComponent.prototype.btnDeleteContinuityClick = function () {
        document.getElementById("btnDeleteContinuity").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnDeleteContinuity").disabled = false;
        document.getElementById("btnDeleteCloseContinuity").disabled = false;
    };
    // delete confirm continuity
    ContinuityComponent.prototype.btnDeleteConfirmContinuityClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnDeleteContinuity").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnDeleteContinuity").disabled = true;
        document.getElementById("btnDeleteCloseContinuity").disabled = true;
        var currentSelectedContinuity = this.continuityCollectionView.currentItem;
        this.continuityService.deleteContinuityData(currentSelectedContinuity.Id, toastr);
    };
    // initialization
    ContinuityComponent.prototype.ngOnInit = function () {
        this.setContinuityDateRanged();
    };
    ContinuityComponent = __decorate([
        core_1.Component({
            selector: 'my-continuity',
            templateUrl: 'app/activity-continuity/continuity.html'
        }), 
        __metadata('design:paramtypes', [continuity_service_1.ContinuityService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], ContinuityComponent);
    return ContinuityComponent;
}());
exports.ContinuityComponent = ContinuityComponent;
//# sourceMappingURL=continuity.component.js.map