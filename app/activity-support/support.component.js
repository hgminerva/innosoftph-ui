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
var support_service_1 = require("./support.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
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
        this.supportContinuitySelectedIndex = -1;
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
        this.supportIssueCategorySelectedIndex = 0;
        this.supportCustomerSelectedIndex = -1;
        this.supportProductSelectedIndex = -1;
        this.supportSeverityArray = [
            'High (3hrs. resolution)',
            'Moderate (1 day resolution)',
            'Low (2 day resolution)',
            'Gossip'
        ];
        this.supportSeveritySelectedIndex = 0;
        this.supportAssignedToSelectedIndex = -1;
        this.supportStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
        this.supportStatusSelectedIndex = 0;
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
        this.getListContinuity();
        this.supportCustomerSelectedValue = "";
        this.supportProductSelectedValue = "";
        document.getElementById("btnSaveSupport").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnSaveSupport").disabled = false;
        document.getElementById("btnCloseSupport").disabled = false;
    };
    // support values
    SupportActivityComponent.prototype.getSupportObjectValue = function () {
        var assignedToUserIdValue = "NULL";
        if (this.supportAssignedToUserId > 0) {
            assignedToUserIdValue = this.supportAssignedToUserId.toString();
        }
        var dataObject = {
            SupportDate: this.supportDateValue.toLocaleDateString(),
            ContinuityId: this.supportContinuityId,
            IssueCategory: this.supportIssueCategory,
            Issue: this.supportIssue,
            CustomerId: this.supportCustomerId,
            ProductId: this.supportProductId,
            Severity: this.supportSeverity,
            Caller: this.supportCaller,
            Remarks: this.supportRemarks,
            ScreenShotURL: this.supportScreenShotURL,
            AssignedToUserId: assignedToUserIdValue,
            SupportStatus: this.supportSupportStatus
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
    // support date value changed
    SupportActivityComponent.prototype.supportDateOnValueChanged = function () {
    };
    // list lead
    SupportActivityComponent.prototype.getListContinuity = function () {
        this.supportContinuityObservableArray = this.supportService.getListContinuityData("support");
        this.getListCustomer();
    };
    // list customer
    SupportActivityComponent.prototype.getListCustomer = function () {
        this.supportCustomerObservableArray = this.supportService.getListArticleData("support", 2);
        this.supportProductObservableArray = this.supportService.getListArticleData("support", 1);
        this.getListAssignedToUser();
    };
    // assigned to user list
    SupportActivityComponent.prototype.getListAssignedToUser = function () {
        this.supportAssignedUserObservableArray = this.supportService.getListUserData("support", "");
    };
    // support continuuity selected index changed
    SupportActivityComponent.prototype.cboSupportContinuitySelectedIndexChanged = function () {
        if (this.supportContinuitySelectedIndex >= 0) {
            this.supportContinuityId = this.supportContinuityObservableArray[this.supportContinuitySelectedIndex].Id;
            this.supportCustomerSelectedValue = this.supportContinuityObservableArray[this.supportContinuitySelectedIndex].Customer;
            this.supportProductSelectedValue = this.supportContinuityObservableArray[this.supportContinuitySelectedIndex].Product;
        }
        else {
            this.supportContinuityId = 0;
        }
    };
    // support issue category selected index changed
    SupportActivityComponent.prototype.cboSupportIssueCategorySelectedIndexChangedClick = function () {
        this.supportIssueCategory = this.supportIssueCategoryArray[this.supportIssueCategorySelectedIndex];
    };
    // support customer selected index changed
    SupportActivityComponent.prototype.cboSupportCustomerSelectedIndexChangedClick = function () {
        if (this.supportCustomerSelectedIndex >= 0) {
            this.supportCustomerId = this.supportCustomerObservableArray[this.supportCustomerSelectedIndex].Id;
        }
        else {
            this.supportCustomerId = 0;
        }
    };
    // support product selected index changed
    SupportActivityComponent.prototype.cboSupportProductSelectedIndexChangedClick = function () {
        if (this.supportProductSelectedIndex >= 0) {
            this.supportProductId = this.supportProductObservableArray[this.supportProductSelectedIndex].Id;
        }
        else {
            this.supportProductId = 0;
        }
    };
    // support severity selected index changed
    SupportActivityComponent.prototype.cboSupportSeveritySelectedIndexChangedClick = function () {
        this.supportSeverity = this.supportSeverityArray[this.supportSeveritySelectedIndex];
    };
    // support assigned to selected index changed
    SupportActivityComponent.prototype.cboAssignedToSelectedIndexChangedClick = function () {
        if (this.supportAssignedToSelectedIndex >= 0) {
            this.supportAssignedToUserId = this.supportAssignedUserObservableArray[this.supportAssignedToSelectedIndex].Id;
        }
        else {
            this.supportAssignedToUserId = 0;
        }
    };
    // support status to selected index changed
    SupportActivityComponent.prototype.cboSupportStatusSelectedIndexChangedClick = function () {
        this.supportSupportStatus = this.supportStatusArray[this.supportStatusSelectedIndex];
    };
    // initialization
    SupportActivityComponent.prototype.ngOnInit = function () {
        this.setSupportDateRanged();
    };
    return SupportActivityComponent;
}());
SupportActivityComponent = __decorate([
    core_1.Component({
        selector: 'my-activity-support',
        templateUrl: 'app/activity-support/support.html'
    }),
    __metadata("design:paramtypes", [support_service_1.SupportService, typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof ng2_toastr_1.ToastsManager !== "undefined" && ng2_toastr_1.ToastsManager) === "function" && _b || Object, typeof (_c = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _c || Object, typeof (_d = typeof ng2_slim_loading_bar_1.SlimLoadingBarService !== "undefined" && ng2_slim_loading_bar_1.SlimLoadingBarService) === "function" && _d || Object])
], SupportActivityComponent);
exports.SupportActivityComponent = SupportActivityComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=support.component.js.map