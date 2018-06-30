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
var common_1 = require('@angular/common');
var request_service_1 = require('./request.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var RequestComponent = (function () {
    // inject request service
    function RequestComponent(requestService, router, toastr, vRef, slimLoadingBarService, location) {
        this.requestService = requestService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.location = location;
        this.isRequestStartDateSelected = true;
        this.isRequestEndDateSelected = true;
        this.requestFilter = '';
        this.isStartDateClicked = false;
        this.isEndDateClicked = false;
        this.isFinishLoading = false;
        this.isLoading = true;
        this.requestTypeFilterObservableArray = ["Purchase", "Payment", "Leave", "Overtime"];
        this.requestTypeFilterSelectedValue = "Purchase";
        this.requestTypeObservableArray = ["Purchase", "Payment", "Leave", "Overtime"];
        this.requestTypeSelectedValue = "Purchase";
        this.requestTypeClicked = true;
        this.isRequestTypeClicked = false;
        this.fliterRequestStatusArray = ["ALL", "OPEN", "CLOSE", "CANCELLED", "DUPLICATE"];
        this.filterRequestStatusSelectedValue = "OPEN";
        this.requestStatusClicked = true;
        this.requestStatusArray = ["OPEN", "CLOSE", "CANCELLED", "DUPLICATE"];
        this.requestStatusSelectedValue = "OPEN";
        this.isBtnSaveRequestShown = false;
        this.isInpDisbledFields = false;
        this.toastr.setRootViewContainerRef(vRef);
    }
    RequestComponent.prototype.backClicked = function () {
        this.location.back();
    };
    // start loading
    RequestComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    RequestComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    Object.defineProperty(RequestComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.requestFilter;
        },
        // filter
        set: function (value) {
            if (this.requestFilter != value) {
                this.requestFilter = value;
                if (this.requestToFilter) {
                    clearTimeout(this.requestToFilter);
                }
                var self = this;
                this.requestToFilter = setTimeout(function () {
                    self.requestCollectionView.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    RequestComponent.prototype.filterFunction = function (item) {
        if (this.requestFilter) {
            return (item.RequestNumber.toLowerCase().indexOf(this.requestFilter.toLowerCase()) > -1) ||
                (item.RequestType.toLowerCase().indexOf(this.requestFilter.toLowerCase()) > -1) ||
                (item.Particulars.toLowerCase().indexOf(this.requestFilter.toLowerCase()) > -1) ||
                (item.EncodedByUser.toLowerCase().indexOf(this.requestFilter.toLowerCase()) > -1) ||
                (item.CheckedByUser.toLowerCase().indexOf(this.requestFilter.toLowerCase()) > -1) ||
                (item.ApprovedByUser.toLowerCase().indexOf(this.requestFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // request date ranged
    RequestComponent.prototype.setRequestDateRanged = function () {
        this.startLoading();
        this.requestStartDateValue = new Date();
        this.requestEndDateValue = new Date();
        this.getListRequestDataOnInit();
    };
    // event: request start date
    RequestComponent.prototype.requestStartDateOnValueChanged = function () {
        if (!this.isRequestStartDateSelected) {
            if (this.isStartDateClicked) {
                this.startLoading();
                this.getRequestData();
            }
            else {
                this.isStartDateClicked = true;
            }
        }
        else {
            this.isRequestStartDateSelected = false;
        }
    };
    // event: request end date
    RequestComponent.prototype.requestEndDateOnValueChanged = function () {
        if (!this.isRequestEndDateSelected) {
            if (this.isEndDateClicked) {
                this.startLoading();
                this.getRequestData();
            }
            else {
                this.isEndDateClicked = true;
            }
        }
        else {
            this.isRequestEndDateSelected = false;
        }
    };
    RequestComponent.prototype.cboRequestTypeSelectedIndexChangedClick = function () {
        if (!this.requestTypeClicked) {
            this.startLoading();
            this.getRequestData();
        }
        else {
            this.requestTypeClicked = false;
        }
    };
    RequestComponent.prototype.getListRequestDataOnInit = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.getRequestData();
    };
    // request data
    RequestComponent.prototype.getRequestData = function () {
        this.requestCollectionView = new wijmo.collections.CollectionView(this.requestService.getListRequestData(this.requestStartDateValue, this.requestEndDateValue, this.requestTypeFilterSelectedValue, this.filterRequestStatusSelectedValue));
        this.requestCollectionView.filter = this.filterFunction.bind(this);
        this.requestCollectionView.pageSize = 15;
        this.requestCollectionView.trackChanges = true;
    };
    // request detail
    RequestComponent.prototype.btnRequestDetailClick = function (add) {
        var _this = this;
        this.isFinishLoading = false;
        this.isLoading = true;
        if (add) {
            this.isBtnSaveRequestShown = true;
            setTimeout(function () {
                document.getElementById("btnSaveRequest").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                document.getElementById("btnSaveRequest").disabled = true;
                document.getElementById("btnCloseRequest").disabled = true;
            }, 50);
        }
        setTimeout(function () {
            _this.isFinishLoading = true;
            _this.isLoading = false;
            if (add) {
                _this.isBtnSaveRequestShown = true;
                setTimeout(function () {
                    document.getElementById("btnSaveRequest").disabled = false;
                    document.getElementById("btnCloseRequest").disabled = false;
                }, 50);
            }
            if (add) {
                _this.isBtnSaveRequestShown = true;
                _this.isInpDisbledFields = false;
                _this.requestDetailModalString = "Add";
                _this.isAdd = false;
                _this.requestId = 0;
                _this.requestDateValue = new Date();
                _this.isChecked = false;
                _this.isNotChecked = true;
                _this.isApproved = false;
                _this.isNotApproved = true;
                _this.requestNumber = " ";
                _this.requestTypeSelectedValue = " ";
                _this.requestParticulars = " ";
                _this.requestEncodedByUser = " ";
                _this.requestCheckedBy = " ";
                _this.requestCheckedRemarks = " ";
                _this.requestApprovedBy = " ";
                _this.requestApprovedRemarks = " ";
            }
            else {
                _this.isBtnSaveRequestShown = false;
                _this.isInpDisbledFields = true;
                _this.requestDetailModalString = "Edit";
                _this.isAdd = true;
                var currentSelectedRequest = _this.requestCollectionView.currentItem;
                _this.requestId = currentSelectedRequest.Id;
                _this.requestDateValue = new Date(currentSelectedRequest.RequestDate);
                _this.requestNumber = currentSelectedRequest.RequestNumber;
                _this.requestTypeSelectedValue = currentSelectedRequest.RequestType;
                _this.requestParticulars = currentSelectedRequest.Particulars;
                _this.requestStatusSelectedValue = currentSelectedRequest.RequestStatus;
                _this.requestEncodedByUser = currentSelectedRequest.EncodedByUser;
                if (currentSelectedRequest.CheckedByUserId != null) {
                    _this.isChecked = true;
                    _this.isNotChecked = false;
                    _this.requestCheckedBy = currentSelectedRequest.CheckedByUser;
                    _this.requestCheckedRemarks = currentSelectedRequest.CheckedRemarks;
                }
                else {
                    _this.isChecked = false;
                    _this.isNotChecked = true;
                    _this.requestCheckedBy = " ";
                    _this.requestCheckedRemarks = " ";
                }
                if (currentSelectedRequest.ApprovedByUserId != null) {
                    _this.isApproved = true;
                    _this.isNotApproved = false;
                    _this.requestApprovedBy = currentSelectedRequest.ApprovedByUser;
                    _this.requestApprovedRemarks = currentSelectedRequest.ApprovedRemarks;
                }
                else {
                    _this.isApproved = false;
                    _this.isNotApproved = true;
                    _this.requestApprovedBy = " ";
                    _this.requestApprovedRemarks = " ";
                }
            }
        }, 100);
    };
    // request data
    RequestComponent.prototype.getRequestObjectData = function () {
        var dataObject = {
            RequestDate: this.requestDateValue.toLocaleDateString(),
            RequestType: this.requestTypeSelectedValue,
            Particulars: this.requestParticulars,
            RequestStatus: this.requestStatusSelectedValue
        };
        return dataObject;
    };
    // save request
    RequestComponent.prototype.btnSaveRequest = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnSaveRequest").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveRequest").disabled = true;
        document.getElementById("btnCloseRequest").disabled = true;
        if (this.requestId == 0) {
            this.requestService.postRequestData(this.getRequestObjectData(), toastr);
        }
        else {
            this.requestService.putRequestData(this.requestId, this.getRequestObjectData(), toastr);
        }
    };
    // delete request
    RequestComponent.prototype.btnDeleteRequestClick = function () {
        document.getElementById("btnDeleteRequest").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnDeleteRequest").disabled = false;
        document.getElementById("btnDeleteCloseRequest").disabled = false;
    };
    // delete confirm continuity
    RequestComponent.prototype.btnDeleteConfirmRequestClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnDeleteRequest").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnDeleteRequest").disabled = true;
        document.getElementById("btnDeleteCloseRequest").disabled = true;
        var currentSelectedRequest = this.requestCollectionView.currentItem;
        this.requestService.deleteRequestData(currentSelectedRequest.Id, toastr);
    };
    // refresh grid
    RequestComponent.prototype.refreshGrid = function () {
        this.startLoading();
        document.getElementById("btnRefresh").disabled = true;
        document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
        this.getRequestData();
    };
    RequestComponent.prototype.btnCheckApprove = function (isCheckedApproved) {
        document.getElementById("btnSaveCheckApproveRequest").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnSaveCheckApproveRequest").disabled = false;
        document.getElementById("btnCloseCheckApproveRequest").disabled = false;
        var currentSelectedRequest = this.requestCollectionView.currentItem;
        // checked
        if (isCheckedApproved) {
            this.isCheckedOrApprovedForSave = true;
            this.requestCheckApproveDetailModalString = "Check Remarks";
            this.requestRemarks = currentSelectedRequest.CheckedRemarks;
        }
        else {
            // approved
            this.isCheckedOrApprovedForSave = false;
            this.requestCheckApproveDetailModalString = "Approve Remarks";
            this.requestRemarks = currentSelectedRequest.ApprovedRemarks;
        }
    };
    RequestComponent.prototype.btnSaveCheckApproveRequestClick = function () {
        var toastr;
        document.getElementById("btnSaveCheckApproveRequest").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveCheckApproveRequest").disabled = true;
        document.getElementById("btnCloseCheckApproveRequest").disabled = true;
        var currentSelectedRequest = this.requestCollectionView.currentItem;
        if (this.isCheckedOrApprovedForSave) {
            var checkedRemarksDataObject = {
                CheckedRemarks: this.requestRemarks
            };
            this.requestService.checkRequestData(currentSelectedRequest.Id, checkedRemarksDataObject, toastr);
        }
        else {
            var approvedRemarksDataObject = {
                ApprovedRemarks: this.requestRemarks
            };
            this.requestService.approveRequestData(currentSelectedRequest.Id, approvedRemarksDataObject, toastr);
        }
    };
    // show menu
    RequestComponent.prototype.showMenu = function () {
        document.getElementById("showTop").click();
    };
    RequestComponent.prototype.btnUncheckDisapprove = function (isUncheckedDisapproved) {
        if (isUncheckedDisapproved) {
            this.requestUncheckDisapproveDetailConfirmModalString = "Uncheck Request?";
            this.isUncheckedOrDispprovedForSave = true;
            this.requestUncheckDisapproveDetailModalString = "Uncheck";
        }
        else {
            if (!isUncheckedDisapproved) {
                this.requestUncheckDisapproveDetailConfirmModalString = "Disapprove Request?";
                this.isUncheckedOrDispprovedForSave = false;
                this.requestUncheckDisapproveDetailModalString = "Disapprove";
            }
        }
        document.getElementById("btnSaveUncheckDisapproveRequest").innerHTML = "<i class='fa fa-save fa-fw'></i> Yes";
        document.getElementById("btnSaveUncheckDisapproveRequest").disabled = false;
        document.getElementById("btnCloseUncheckDisapproveRequest").disabled = false;
    };
    RequestComponent.prototype.btnSaveUncheckDisapproveRequestClick = function () {
        var toastr;
        document.getElementById("btnSaveUncheckDisapproveRequest").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Processing";
        document.getElementById("btnSaveUncheckDisapproveRequest").disabled = true;
        document.getElementById("btnCloseUncheckDisapproveRequest").disabled = true;
        var currentSelectedRequest = this.requestCollectionView.currentItem;
        if (this.isUncheckedOrDispprovedForSave) {
            this.requestService.uncheckRequestData(currentSelectedRequest.Id, toastr);
        }
        else {
            this.requestService.disapproveRequestData(currentSelectedRequest.Id, toastr);
        }
    };
    RequestComponent.prototype.filterRequestStatusSelectedIndexChangedClick = function () {
        if (!this.requestStatusClicked) {
            this.startLoading();
            this.getRequestData();
        }
        else {
            this.requestStatusClicked = false;
        }
    };
    // initialization
    RequestComponent.prototype.ngOnInit = function () {
        this.setRequestDateRanged();
    };
    RequestComponent = __decorate([
        core_1.Component({
            selector: 'my-request',
            templateUrl: 'app/activity-request/request.html'
        }), 
        __metadata('design:paramtypes', [request_service_1.RequestService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService, common_1.Location])
    ], RequestComponent);
    return RequestComponent;
}());
exports.RequestComponent = RequestComponent;
//# sourceMappingURL=request.component.js.map