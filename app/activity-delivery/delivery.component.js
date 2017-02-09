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
var delivery_service_1 = require('./delivery.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var DeliveryComponent = (function () {
    // inject delivery service
    function DeliveryComponent(deliveryService, router, toastr, vRef, slimLoadingBarService) {
        this.deliveryService = deliveryService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isDeliveryStartDateSelected = true;
        this.isDeliveryEndDateSelected = true;
        this.deliveryFilter = '';
        this.deliveryQuotaionSelectedIndex = -1;
        this.deliveryCustomerSelectedIndex = -1;
        this.deliveryProductSelectedIndex = -1;
        this.deliveryTechnicalUserSelectedIndex = -1;
        this.deliveryFunctionalUserSelectedIndex = -1;
        this.deliveryStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
        this.deliveryStatusSelectedIndex = 0;
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    DeliveryComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    DeliveryComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // delivery date ranged
    DeliveryComponent.prototype.setDeliveryDateRanged = function () {
        this.deliveryStartDateValue = new Date();
        this.deliveryEndDateValue = new Date();
        this.getListDelivery();
    };
    // event: delivery start date
    DeliveryComponent.prototype.deliveryStartDateOnValueChanged = function () {
        if (!this.isDeliveryStartDateSelected) {
            this.getDeliveryData();
        }
        else {
            this.isDeliveryStartDateSelected = false;
        }
    };
    // event: delivery end date
    DeliveryComponent.prototype.deliveryEndDateOnValueChanged = function () {
        if (!this.isDeliveryEndDateSelected) {
            this.getDeliveryData();
        }
        else {
            this.isDeliveryEndDateSelected = false;
        }
    };
    // list delivery
    DeliveryComponent.prototype.getListDelivery = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.getDeliveryData();
    };
    // delivery data
    DeliveryComponent.prototype.getDeliveryData = function () {
        this.deliveryCollectionView = new wijmo.collections.CollectionView(this.deliveryService.getListDeliveryData(this.deliveryStartDateValue, this.deliveryEndDateValue));
        this.deliveryCollectionView.filter = this.filterFunction.bind(this);
        this.deliveryCollectionView.pageSize = 15;
        this.deliveryCollectionView.trackChanges = true;
        this.deliveryDateValue = new Date();
        this.deliveryMeetingDateValue = new Date();
    };
    Object.defineProperty(DeliveryComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.deliveryFilter;
        },
        // filter
        set: function (value) {
            if (this.deliveryFilter != value) {
                this.deliveryFilter = value;
                if (this.deliveryToFilter) {
                    clearTimeout(this.deliveryToFilter);
                }
                var self = this;
                this.deliveryToFilter = setTimeout(function () {
                    self.deliveryCollectionView.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    DeliveryComponent.prototype.filterFunction = function (item) {
        if (this.deliveryFilter) {
            return (item.DeliveryNumber.toLowerCase().indexOf(this.deliveryFilter.toLowerCase()) > -1) ||
                (item.Customer.toLowerCase().indexOf(this.deliveryFilter.toLowerCase()) > -1) ||
                (item.Product.toLowerCase().indexOf(this.deliveryFilter.toLowerCase()) > -1) ||
                (item.Remarks.toLowerCase().indexOf(this.deliveryFilter.toLowerCase()) > -1) ||
                (item.DeliveryStatus.toLowerCase().indexOf(this.deliveryFilter.toLowerCase()) > -1) ||
                (item.FunctionalUser.toLowerCase().indexOf(this.deliveryFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // add delivery
    DeliveryComponent.prototype.btnAddDeliveryClick = function () {
        this.deliveryDateValue = new Date();
        this.getListQuotation();
        document.getElementById("btnSaveDelivery").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnSaveDelivery").disabled = false;
        document.getElementById("btnCloseDelivery").disabled = false;
        this.deliveryCustomerSelectedValue = "";
        this.deliveryProductSelectedValue = "";
    };
    // delivery date on value changed
    DeliveryComponent.prototype.deliveryDateOnValueChanged = function () {
    };
    // list quotation data
    DeliveryComponent.prototype.getListQuotation = function () {
        this.deliveryQuotaionObservableArray = this.deliveryService.getListQuotationData("delivery");
        this.getListCustomer();
    };
    // quotation number selected index changed
    DeliveryComponent.prototype.cboDeliveryQuotaionSelectedIndexChanged = function () {
        if (this.deliveryQuotaionSelectedIndex >= 0) {
            this.deliveryQuotationId = this.deliveryQuotaionObservableArray[this.deliveryQuotaionSelectedIndex].Id;
            this.deliveryCustomerSelectedValue = this.deliveryQuotaionObservableArray[this.deliveryQuotaionSelectedIndex].Customer;
            this.deliveryProductSelectedValue = this.deliveryQuotaionObservableArray[this.deliveryQuotaionSelectedIndex].Product;
        }
        else {
            this.deliveryQuotationId = 0;
        }
    };
    // list customer data
    DeliveryComponent.prototype.getListCustomer = function () {
        this.deliveryCustomerObservableArray = this.deliveryService.getListArticleData("delivery", 2);
        this.getListProduct();
    };
    // customer selected index changed
    DeliveryComponent.prototype.cboDeliveryCustomerSelectedIndexChanged = function () {
        if (this.deliveryCustomerSelectedIndex >= 0) {
            this.deliveryCustomerId = this.deliveryCustomerObservableArray[this.deliveryCustomerSelectedIndex].Id;
        }
        else {
            this.deliveryCustomerId = 0;
        }
    };
    // list product data
    DeliveryComponent.prototype.getListProduct = function () {
        this.deliveryProductObservableArray = this.deliveryService.getListArticleData("delivery", 1);
        this.deliveryMeetingDateValue = new Date();
        this.getListUsers();
    };
    // product selected index changed
    DeliveryComponent.prototype.cboDeliveryProductSelectedIndexChanged = function () {
        if (this.deliveryProductSelectedIndex >= 0) {
            this.deliveryProductId = this.deliveryProductObservableArray[this.deliveryProductSelectedIndex].Id;
        }
        else {
            this.deliveryProductId = 0;
        }
    };
    // meeting date on value changed
    DeliveryComponent.prototype.deliveryMeetingDateOnValueChanged = function () {
    };
    // list product data
    DeliveryComponent.prototype.getListUsers = function () {
        this.deliveryTechnicalUserObservableArray = this.deliveryService.getListUserData("delivery", "");
        this.deliveryFunctionalUserObservableArray = this.deliveryService.getListUserData("delivery", "");
    };
    // technical user selected index changed
    DeliveryComponent.prototype.cboDeliveryTechnicalUserSelectedIndexChanged = function () {
        if (this.deliveryTechnicalUserSelectedIndex >= 0) {
            this.deliveryTechnicalUserId = this.deliveryTechnicalUserObservableArray[this.deliveryTechnicalUserSelectedIndex].Id;
        }
        else {
            this.deliveryTechnicalUserId = 0;
        }
    };
    // functionl user selected index changed
    DeliveryComponent.prototype.cboDeliveryFunctionalUserSelectedIndexChanged = function () {
        if (this.deliveryFunctionalUserSelectedIndex >= 0) {
            this.deliveryFunctionalUserId = this.deliveryFunctionalUserObservableArray[this.deliveryFunctionalUserSelectedIndex].Id;
        }
        else {
            this.deliveryFunctionalUserId = 0;
        }
    };
    // status selected index changed
    DeliveryComponent.prototype.cboStatusSelectedIndexChangedClick = function () {
        this.deliveryStatus = this.deliveryStatusArray[this.deliveryStatusSelectedIndex];
    };
    // delete delivery click
    DeliveryComponent.prototype.btnDeleteDeliveryClick = function () {
        document.getElementById("btnDeleteDelivery").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnDeleteDelivery").disabled = false;
        document.getElementById("btnDeleteCloseDelivery").disabled = false;
    };
    // delete delivery confirm click
    DeliveryComponent.prototype.btnDeleteConfirmDeliveryClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnDeleteDelivery").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnDeleteDelivery").disabled = true;
        document.getElementById("btnDeleteCloseDelivery").disabled = true;
        var currentSelectedDelivery = this.deliveryCollectionView.currentItem;
        this.deliveryService.deleteDeliveryData(currentSelectedDelivery.Id, toastr);
    };
    // edit delivery
    DeliveryComponent.prototype.btnEditDelivery = function () {
        this.startLoading();
        var currentSelectedDelivery = this.deliveryCollectionView.currentItem;
        this.router.navigate(['/deliveryDetail', currentSelectedDelivery.Id]);
    };
    // delivery data
    DeliveryComponent.prototype.getDeliveryValue = function () {
        var dataObject = {
            DeliveryDate: this.deliveryDateValue.toLocaleDateString(),
            QuotationId: this.deliveryQuotationId,
            CustomerId: this.deliveryCustomerId,
            ProductId: this.deliveryProductId,
            MeetingDate: this.deliveryMeetingDateValue.toLocaleDateString(),
            Remarks: this.deliveryRemarks,
            TechnicalUserId: this.deliveryTechnicalUserId,
            FunctionalUserId: this.deliveryFunctionalUserId,
            DeliveryStatus: this.deliveryStatus
        };
        return dataObject;
    };
    // save delivery
    DeliveryComponent.prototype.btnSaveDelivery = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnSaveDelivery").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveDelivery").disabled = true;
        document.getElementById("btnCloseDelivery").disabled = true;
        this.deliveryService.postDeliveryData(this.getDeliveryValue(), toastr);
    };
    // initialization
    DeliveryComponent.prototype.ngOnInit = function () {
        this.setDeliveryDateRanged();
    };
    DeliveryComponent = __decorate([
        core_1.Component({
            selector: 'my-delivery',
            templateUrl: 'app/activity-delivery/delivery.html'
        }), 
        __metadata('design:paramtypes', [delivery_service_1.DeliveryService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], DeliveryComponent);
    return DeliveryComponent;
}());
exports.DeliveryComponent = DeliveryComponent;
//# sourceMappingURL=delivery.component.js.map