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
var support_service_1 = require('./support.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var SupportActivityComponent = (function () {
    // inject support service
    function SupportActivityComponent(supportService, router, toastr, vRef, slimLoadingBarService) {
        this.supportService = supportService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isSupportStartDateSelected = true;
        this.isSupportEndDateSelected = true;
        this.supportFilter = '';
        this.isSupportCustomerSelected = true;
        this.supportIssueCategoryArray = [
            'New Installation',
            'Software Bug',
            'Data Tracing',
            'New Feature',
            'Data Tracing',
            'Hardware or Infrastructure Problem',
            'Retraining',
            'Reinstallation',
            'Progam Update',
            'Data Archive'
        ];
        this.supportIssueCategorySelectedValue = "New Installation";
        this.supportSeverityArray = [
            'High (3hrs. resolution)',
            'Moderate (1 day resolution)',
            'Low (2 day resolution)',
            'Gossip'
        ];
        this.supportSeveritySelectedValue = "High (3hrs. resolution)";
        this.supportStatusArray = ['OPEN', 'CLOSE', 'WAITING FOR CLIENT', 'CANCELLED'];
        this.supportStatusSelectedValue = "OPEN";
        this.isFinishLoading = false;
        this.isLoading = true;
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    SupportActivityComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    SupportActivityComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    SupportActivityComponent.prototype.finishedLoad = function () {
        this.isFinishLoading = true;
        this.isLoading = false;
        document.getElementById("btnSaveSupport").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnSaveSupport").disabled = false;
        document.getElementById("btnCloseSupport").disabled = false;
    };
    // support dates
    SupportActivityComponent.prototype.setSupportDateRanged = function () {
        this.supportStartDateValue = new Date();
        this.supportEndDateValue = new Date();
        this.supportDateValue = new Date();
        this.getListSupport();
    };
    // event: support start date
    SupportActivityComponent.prototype.supportStartDateOnValueChanged = function () {
        if (!this.isSupportStartDateSelected) {
            document.getElementById("btn-hidden-start-loading").click();
            this.getSupportData();
        }
        else {
            this.isSupportStartDateSelected = false;
        }
    };
    // event: support end date
    SupportActivityComponent.prototype.supportEndDateOnValueChanged = function () {
        if (!this.isSupportEndDateSelected) {
            document.getElementById("btn-hidden-start-loading").click();
            this.getSupportData();
        }
        else {
            this.isSupportEndDateSelected = false;
        }
    };
    // list support
    SupportActivityComponent.prototype.getListSupport = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.getSupportData();
    };
    // support data
    SupportActivityComponent.prototype.getSupportData = function () {
        this.supportCollectionView = new wijmo.collections.CollectionView(this.supportService.getListSupportData(this.supportStartDateValue, this.supportEndDateValue));
        this.supportCollectionView.filter = this.filterFunction.bind(this);
        this.supportCollectionView.pageSize = 15;
        this.supportCollectionView.trackChanges = true;
    };
    Object.defineProperty(SupportActivityComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.supportFilter;
        },
        // filter
        set: function (value) {
            if (this.supportFilter != value) {
                this.supportFilter = value;
                if (this.supportToFilter) {
                    clearTimeout(this.supportToFilter);
                }
                var self = this;
                this.supportToFilter = setTimeout(function () {
                    self.supportCollectionView.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    SupportActivityComponent.prototype.filterFunction = function (item) {
        if (this.supportFilter) {
            return (item.SupportNumber.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
                (item.Customer.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
                (item.Product.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
                (item.EncodedByUser.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
                (item.AssignedToUser.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
                (item.Remarks.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
                (item.SupportStatus.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
                (item.Issue.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // add support
    SupportActivityComponent.prototype.btnAddSupportClick = function () {
        this.isFinishLoading = false;
        this.isLoading = true;
        document.getElementById("btnSaveSupport").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnSaveSupport").disabled = true;
        document.getElementById("btnCloseSupport").disabled = true;
        this.supportCustomerSelectedIndex = 0;
        this.getListCustomer();
    };
    // support values
    SupportActivityComponent.prototype.getSupportObjectValue = function () {
        var assignedToUserIdValue = "NULL";
        console.log(this.supportAssignedToSelectedValue);
        if (this.supportAssignedToSelectedValue != null) {
            assignedToUserIdValue = this.supportAssignedToSelectedValue.toString();
        }
        var dataObject = {
            SupportDate: this.supportDateValue.toLocaleDateString(),
            ContinuityId: this.supportContinuitySelectedValue,
            IssueCategory: this.supportIssueCategorySelectedValue,
            Issue: this.supportIssue,
            CustomerId: this.supportCustomerSelectedValue,
            Severity: this.supportSeveritySelectedValue,
            Caller: this.supportCaller,
            Remarks: this.supportRemarks,
            ScreenShotURL: this.supportScreenShotURL,
            AssignedToUserId: assignedToUserIdValue,
            SupportStatus: this.supportStatusSelectedValue
        };
        return dataObject;
    };
    // save support
    SupportActivityComponent.prototype.btnSaveSupport = function () {
        document.getElementById("btn-hidden-start-loading").click();
        var toastr;
        document.getElementById("btnSaveSupport").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveSupport").disabled = true;
        document.getElementById("btnCloseSupport").disabled = true;
        this.supportService.postSupportData(this.getSupportObjectValue(), toastr);
    };
    // edit support
    SupportActivityComponent.prototype.btnEditSupport = function () {
        document.getElementById("btn-hidden-start-loading").click();
        var currentSelectedSupport = this.supportCollectionView.currentItem;
        this.router.navigate(['/supportDetail', currentSelectedSupport.Id]);
    };
    // delete support
    SupportActivityComponent.prototype.btnDeleteSupportClick = function () {
        document.getElementById("btnDeleteSupport").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnDeleteSupport").disabled = false;
        document.getElementById("btnDeleteCloseSupport").disabled = false;
    };
    // delete support confirm
    SupportActivityComponent.prototype.btnDeleteConfirmSupportClick = function () {
        document.getElementById("btn-hidden-start-loading").click();
        var toastr;
        document.getElementById("btnDeleteSupport").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnDeleteSupport").disabled = true;
        document.getElementById("btnDeleteCloseSupport").disabled = true;
        var currentSelectedSupport = this.supportCollectionView.currentItem;
        this.supportService.deleteSupportData(currentSelectedSupport.Id, toastr);
    };
    // list customer
    SupportActivityComponent.prototype.getListCustomer = function () {
        this.supportCustomerObservableArray = this.supportService.getContuinityCustomerData("support");
    };
    // support customer selected index changed
    SupportActivityComponent.prototype.cboSupportCustomerSelectedIndexChangedClick = function () {
        if (typeof this.supportCustomerSelectedValue != 'undefined') {
            this.getListContinuity(true);
        }
    };
    // list continuuity
    SupportActivityComponent.prototype.getListContinuity = function (isSelectedCustomerOnly) {
        var customerId = this.supportCustomerObservableArray[this.supportCustomerSelectedIndex].CustomerId;
        if (typeof this.supportCustomerSelectedValue != 'undefined') {
            customerId = this.supportCustomerSelectedValue;
        }
        this.supportContinuityObservableArray = this.supportService.getListContinuityData("support", customerId, isSelectedCustomerOnly);
    };
    // assigned to user list
    SupportActivityComponent.prototype.getListAssignedToUser = function () {
        this.supportAssignedUserObservableArray = this.supportService.getListUserData("support", "assignedToUser");
    };
    // initialization
    SupportActivityComponent.prototype.ngOnInit = function () {
        this.setSupportDateRanged();
    };
    SupportActivityComponent = __decorate([
        core_1.Component({
            selector: 'my-activity-support',
            templateUrl: 'app/activity-support/support.html'
        }), 
        __metadata('design:paramtypes', [support_service_1.SupportService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], SupportActivityComponent);
    return SupportActivityComponent;
}());
exports.SupportActivityComponent = SupportActivityComponent;
//# sourceMappingURL=support.component.js.map