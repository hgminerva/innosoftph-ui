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
        this.continuityFilter = '';
        // public continuityCustomerObservableArray: wijmo.collections.ObservableArray;
        // public continuityCustomerSelectedIndex = -1;
        // public continuityCustomerSelectedValue: String;
        // public continuityProductObservableArray: wijmo.collections.ObservableArray;
        // public continuityProductSelectedIndex = -1;
        // public continuityProductSelectedValue: String;
        this.continuityStatusArray = ['OPEN', 'EXPIRED'];
        this.continuityStatusSelectedValue = "OPEN";
        this.isFinishLoading = false;
        this.isLoading = true;
        this.fliterContinuityStatusArray = ['ALL', 'OPEN', 'EXPIRED'];
        this.filterContinuityStatusSelectedValue = "ALL";
        this.continuityStatusClicked = false;
        this.dateTypeArray = ['Continuity Date', 'Expiry Date'];
        this.dateTypeSelectedValue = "Continuity Date";
        this.isDateTypeSelected = false;
        this.fliterMonthArray = [
            'JANUARY',
            'FEBRUARY',
            'MARCH',
            'APRIL',
            'MAY',
            'JUNE',
            'JULY',
            'AUGUST',
            'SEPTEMBER',
            'OCTOBER',
            'NOVEMBER',
            'DECEMBER'
        ];
        this.newDate = new Date();
        this.filterMonthSelectedValue = this.fliterMonthArray[this.newDate.getMonth()];
        this.monthStatusClicked = false;
        this.isMonthStatusSelected = false;
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
    ContinuityComponent.prototype.finishedLoad = function () {
        this.isFinishLoading = true;
        this.isLoading = false;
        document.getElementById("btnSaveContinuity").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnSaveContinuity").disabled = false;
        document.getElementById("btnCloseContinuity").disabled = false;
    };
    // continuity date ranged
    ContinuityComponent.prototype.setContinuityDateRanged = function () {
        this.startLoading();
        this.continuityDateValue = new Date();
        this.continuityExpiryDateValue = new Date();
        this.getContinuityData();
    };
    // continuity date on value changed
    ContinuityComponent.prototype.continuityDateOnValueChanged = function () {
    };
    // expired date on value changed
    ContinuityComponent.prototype.continuityExpiryDateOnValueChanged = function () {
    };
    ContinuityComponent.prototype.filterMonthSelectedIndexChangedClick = function () {
        if (this.monthStatusClicked) {
            if (this.isMonthStatusSelected) {
                this.startLoading();
                this.getContinuityData();
            }
            else {
                this.isMonthStatusSelected = true;
            }
        }
        else {
            this.monthStatusClicked = true;
        }
    };
    ContinuityComponent.prototype.cboDateTypeSelectedIndexChangedClick = function () {
        if (this.isDateTypeSelected) {
            this.startLoading();
            this.getContinuityData();
        }
        else {
            this.isDateTypeSelected = true;
        }
    };
    ContinuityComponent.prototype.filterContinuityStatusSelectedIndexChangedClick = function () {
        if (this.continuityStatusClicked) {
            this.startLoading();
            this.getContinuityData();
        }
        else {
            this.continuityStatusClicked = true;
        }
    };
    // continuity data
    ContinuityComponent.prototype.getContinuityData = function () {
        this.continuityCollectionView = new wijmo.collections.CollectionView(this.continuityService.getListContinuityData(this.filterMonthSelectedValue, this.dateTypeSelectedValue, this.filterContinuityStatusSelectedValue));
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
        // this.getListCustomer();
    };
    // delivery selected index changed
    ContinuityComponent.prototype.cboContinuityDeliverySelectedIndexChanged = function () {
        this.continuityDeliveryId = this.continuityDeliverySelectedValue;
    };
    // // list customer data
    // public getListCustomer() {
    //   this.continuityCustomerObservableArray = this.continuityService.getListArticleData(2);
    //   this.getListProduct();
    // }
    // // customer selected index changed
    // public cboContinuityCustomerSelectedIndexChanged() {
    //   if (this.continuityCustomerSelectedIndex >= 0) {
    //     this.continuitCustomerId = this.continuityCustomerObservableArray[this.continuityCustomerSelectedIndex].Id;
    //   } else {
    //     this.continuitCustomerId = 0;
    //   }
    // }
    // // list product data
    // public getListProduct() {
    //   this.continuityProductObservableArray = this.continuityService.getListArticleData(1);
    // }
    // // product selected index changed
    // public cboContinuityProductSelectedIndexChanged() {
    //   if (this.continuityProductSelectedIndex >= 0) {
    //     this.continuitProductId = this.continuityProductObservableArray[this.continuityProductSelectedIndex].Id;
    //   } else {
    //     this.continuitProductId = 0;
    //   }
    // }
    // add continuity click
    ContinuityComponent.prototype.btnContinuityDetailClick = function (add) {
        this.isFinishLoading = false;
        this.isLoading = true;
        document.getElementById("btnSaveContinuity").disabled = true;
        document.getElementById("btnCloseContinuity").disabled = true;
        this.getListDeliveryServiceData();
        if (add) {
            this.isAdd = false;
            this.continuityDetailModalString = "Add";
            this.continuityId = 0;
            this.continuityNumber = "--";
            this.continuityDateValue = new Date();
            this.continuityExpiryDateValue = new Date();
            this.continuityStatusSelectedValue = "OPEN";
            this.continuityStatus = "OPEN";
            this.continuityStaffUser = "--";
            this.continuityRemarks = "";
            this.continuityAmount = "0";
        }
        else {
            this.isAdd = true;
            var currentSelectedContinuity = this.continuityCollectionView.currentItem;
            this.continuityDetailModalString = "Edit";
            this.continuityId = currentSelectedContinuity.Id;
            this.continuityNumber = currentSelectedContinuity.ContinuityNumber;
            this.continuityDateValue = new Date(currentSelectedContinuity.ContinuityDate);
            this.continuityDeliverySelectedValue = currentSelectedContinuity.DeliveryId;
            this.continuityExpiryDateValue = new Date(currentSelectedContinuity.ExpiryDate);
            this.continuityStatusSelectedValue = currentSelectedContinuity.ContinuityStatus;
            this.continuityStatus = currentSelectedContinuity.ContinuityStatus;
            this.continuityStaffUser = currentSelectedContinuity.StaffUser;
            this.continuityRemarks = currentSelectedContinuity.Remarks;
            this.continuityAmount = currentSelectedContinuity.ContinuityAmount;
        }
    };
    // on key press decimal key
    ContinuityComponent.prototype.onKeyPressOnlyDecimalNumberKey = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        else {
            return true;
        }
    };
    // on blur 
    ContinuityComponent.prototype.onBlurOnlyDecimalNumberKey = function () {
        var _this = this;
        document.getElementById("continuityAmount").value = "";
        setTimeout(function () {
            document.getElementById("continuityAmount").value = _this.continuityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }, 100);
    };
    // continuity status selected index changed
    ContinuityComponent.prototype.cboContinuityStatusSelectedIndexChanged = function () {
        this.continuityStatus = this.continuityStatusSelectedValue;
    };
    // continuity data
    ContinuityComponent.prototype.getContinuityValue = function () {
        var dataObject = {
            ContinuityDate: this.continuityDateValue.toLocaleDateString(),
            DeliveryId: this.continuityDeliverySelectedValue,
            ExpiryDate: this.continuityExpiryDateValue.toLocaleDateString(),
            Remarks: this.continuityRemarks,
            ContinuityAmount: this.continuityAmount,
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
    // refresh grid
    ContinuityComponent.prototype.refreshGrid = function () {
        this.startLoading();
        document.getElementById("btnRefresh").disabled = true;
        document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
        this.getContinuityData();
    };
    // show menu
    ContinuityComponent.prototype.showMenu = function () {
        document.getElementById("showTop").click();
    };
    ContinuityComponent.prototype.backClicked = function () {
        window.history.back();
    };
    // initialization
    ContinuityComponent.prototype.ngOnInit = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
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