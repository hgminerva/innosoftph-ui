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
var SupportDetailComponent = (function () {
    // inject lead detail service
    function SupportDetailComponent(supportService, router, activatedRoute, renderer, elementRef, toastr, vRef, slimLoadingBarService) {
        this.supportService = supportService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
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
        this.activityParticularCategories = [
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
        this.activityParticularCategorySelectedIndex = 0;
        this.activityNoOfHours = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
        ];
        this.activityNoOfHoursSelectedIndex = 0;
        this.activityStatus = ['Open', 'Close', 'Cancelled'];
        this.activityStatusSelectedIndex = 0;
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    SupportDetailComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    SupportDetailComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // lead date ranged
    SupportDetailComponent.prototype.setContinuityDateValue = function () {
        this.activityDateValue = new Date();
        this.supportDateValue = new Date();
        this.getListContinuityData();
        this.getListActivity();
    };
    // support date value changed
    SupportDetailComponent.prototype.supportDateOnValueChanged = function () {
    };
    // list lead
    SupportDetailComponent.prototype.getListContinuityData = function () {
        this.supportContinuityObservableArray = this.supportService.getListContinuityData("supportDetail");
    };
    // list customer
    SupportDetailComponent.prototype.getListCustomerData = function () {
        this.supportCustomerObservableArray = this.supportService.getListArticleData("supportDetail", 2);
    };
    // list product
    SupportDetailComponent.prototype.getListProductData = function () {
        this.supportProductObservableArray = this.supportService.getListArticleData("supportDetail", 1);
    };
    // encoded to user list
    SupportDetailComponent.prototype.getListEncodedByUserData = function () {
        this.supportEncodedUserObservableArray = this.supportService.getListUserData("supportDetail", "encodedByUser");
    };
    // assigned to user list
    SupportDetailComponent.prototype.getListAssignedToUserData = function () {
        this.supportAssignedUserObservableArray = this.supportService.getListUserData("supportDetail", "assignedToUser");
    };
    // get service data
    SupportDetailComponent.prototype.getSupportServiceData = function () {
        this.supportService.getSupportById(this.getIdUrlParameter());
    };
    // drop down data
    SupportDetailComponent.prototype.setDropdownSelectedValueData = function () {
        this.supportDateValue = new Date(document.getElementById("supportDateValue").value.toString());
        this.supportContinuitySelectedValue = document.getElementById("supportContinuitySelectedValue").value.toString();
        this.supportIssueCategorySelectedValue = document.getElementById("supportIssueCategorySelectedValue").value.toString();
        this.supportCustomerSelectedValue = document.getElementById("supportCustomerSelectedValue").value.toString();
        this.supportProductSelectedValue = document.getElementById("supportProductSelectedValue").value.toString();
        this.supportSeveritySelectedValue = document.getElementById("supportSeveritySelectedValue").value.toString();
        this.supportEncodedBySelectedValue = document.getElementById("supportEncodedBySelectedValue").value.toString();
        this.supportAssignedToSelectedValue = document.getElementById("supportAssignedToSelectedValue").value.toString();
        this.supportStatusSelectedValue = document.getElementById("supportStatusSelectedValue").value.toString();
    };
    // support continuuity selected index changed
    SupportDetailComponent.prototype.cboSupportContinuitySelectedIndexChanged = function () {
        if (this.supportContinuitySelectedIndex >= 0) {
            this.supportContinuityId = this.supportContinuityObservableArray[this.supportContinuitySelectedIndex].Id;
        }
        else {
            this.supportContinuityId = 0;
        }
    };
    // support issue category selected index changed
    SupportDetailComponent.prototype.cboSupportIssueCategorySelectedIndexChangedClick = function () {
        this.supportIssueCategory = this.supportIssueCategoryArray[this.supportIssueCategorySelectedIndex];
    };
    // support customer selected index changed
    SupportDetailComponent.prototype.cboSupportCustomerSelectedIndexChangedClick = function () {
        if (this.supportCustomerSelectedIndex >= 0) {
            this.supportCustomerId = this.supportCustomerObservableArray[this.supportCustomerSelectedIndex].Id;
        }
        else {
            this.supportCustomerId = 0;
        }
    };
    // support product selected index changed
    SupportDetailComponent.prototype.cboSupportProductSelectedIndexChangedClick = function () {
        if (this.supportProductSelectedIndex >= 0) {
            this.supportProductId = this.supportProductObservableArray[this.supportProductSelectedIndex].Id;
        }
        else {
            this.supportProductId = 0;
        }
    };
    // support severity selected index changed
    SupportDetailComponent.prototype.cboSupportSeveritySelectedIndexChangedClick = function () {
        this.supportSeverity = this.supportSeverityArray[this.supportSeveritySelectedIndex];
    };
    // support assigned to selected index changed
    SupportDetailComponent.prototype.cboAssignedToSelectedIndexChangedClick = function () {
        if (this.supportAssignedToSelectedIndex >= 0) {
            this.supportAssignedToUserId = this.supportAssignedUserObservableArray[this.supportAssignedToSelectedIndex].Id;
        }
        else {
            this.supportAssignedToUserId = 0;
        }
    };
    // support status to selected index changed
    SupportDetailComponent.prototype.cboSupportStatusSelectedIndexChangedClick = function () {
        this.supportSupportStatus = this.supportStatusArray[this.supportStatusSelectedIndex];
    };
    // support values
    SupportDetailComponent.prototype.getSupportObjectValue = function () {
        var assignedToUserIdValue = "NULL";
        if (this.supportAssignedToUserId > 0) {
            assignedToUserIdValue = this.supportAssignedToUserId.toString();
        }
        var dataObject = {
            SupportDate: this.supportDateValue.toLocaleDateString(),
            ContinuityId: this.supportContinuityId,
            IssueCategory: this.supportIssueCategory,
            Issue: document.getElementById("supportIssue").value,
            CustomerId: this.supportCustomerId,
            ProductId: this.supportProductId,
            Severity: this.supportSeverity,
            Caller: document.getElementById("supportCaller").value,
            Remarks: document.getElementById("supportRemarks").value,
            ScreenShotURL: document.getElementById("supportScreenShotURL").value,
            AssignedToUserId: assignedToUserIdValue,
            SupportStatus: this.supportSupportStatus
        };
        return dataObject;
    };
    // save support detail
    SupportDetailComponent.prototype.btnSaveSupportDetailClick = function () {
        document.getElementById("btn-hidden-start-loading").click();
        var toastr;
        document.getElementById("btnSaveSupportDetail").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveSupportDetail").disabled = true;
        document.getElementById("btnCloseSupportDetail").disabled = true;
        this.supportService.putSupportData(this.getIdUrlParameter(), this.getSupportObjectValue(), toastr);
    };
    // get url Id parameter
    SupportDetailComponent.prototype.getIdUrlParameter = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.supportId = params['id'];
        });
        return this.supportId;
    };
    // on key press decimal key
    SupportDetailComponent.prototype.onKeyPressOnlyDecimalNumberKey = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        else {
            return true;
        }
    };
    // on blur 
    SupportDetailComponent.prototype.onBlurOnlyDecimalNumberKey = function () {
        var _this = this;
        document.getElementById("activityAmount").value = "";
        setTimeout(function () {
            document.getElementById("activityAmount").value = _this.activityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }, 100);
    };
    // activity line list
    SupportDetailComponent.prototype.getListActivity = function () {
        this.activityCollectionView = new wijmo.collections.CollectionView(this.supportService.getListActivityBySupportId(this.getIdUrlParameter()));
        this.activityCollectionView.pageSize = 15;
        this.activityCollectionView.trackChanges = true;
    };
    // activity line detail modal  
    SupportDetailComponent.prototype.btnActivityDetailModal = function (add) {
        document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnActivitySave").disabled = false;
        document.getElementById("btnActivityClose").disabled = false;
        if (add) {
            this.activityDetailModalString = "Add";
            this.activityId = 0;
            this.activityDateValue = new Date();
            this.activityParticularCategorySelectedValue = "New Installation";
            document.getElementById("activityParticulars").value = "";
            this.activityNoOfHoursSelectedValue = "0";
            document.getElementById("activityAmount").value = "0";
            this.activityAmount = "0";
            this.activityStatusSelectedValue = "Open";
        }
        else {
            this.activityDetailModalString = "Edit";
            var currentSelectedActivity = this.activityCollectionView.currentItem;
            this.activityId = currentSelectedActivity.Id;
            this.activityDateValue = new Date(currentSelectedActivity.ActivityDate);
            this.activityParticularCategorySelectedValue = currentSelectedActivity.ParticularCategory;
            document.getElementById("activityParticulars").value = currentSelectedActivity.Particulars;
            this.activityNoOfHoursSelectedValue = currentSelectedActivity.NumberOfHours;
            document.getElementById("activityAmount").value = currentSelectedActivity.ActivityAmount.toLocaleString();
            this.activityAmount = currentSelectedActivity.ActivityAmount.toLocaleString();
            this.activityStatusSelectedValue = currentSelectedActivity.ActivityStatus;
        }
    };
    // get activity data
    SupportDetailComponent.prototype.getActivityData = function () {
        var activityDataObject = {
            ActivityDate: this.activityDateValue.toLocaleDateString(),
            CustomerId: this.supportCustomerId,
            ProductId: this.supportProductId,
            ParticularCategory: this.activityParticularCategorySelectedValue,
            Particulars: document.getElementById("activityParticulars").value,
            NumberOfHours: this.activityNoOfHoursSelectedValue,
            ActivityAmount: this.activityAmount,
            ActivityStatus: this.activityStatusSelectedValue,
            LeadId: "NULL",
            QuotationId: "NULL",
            DeliveryId: "NULL",
            SupportId: this.getIdUrlParameter(),
            LeadStatus: this.activityStatusSelectedValue
        };
        return activityDataObject;
    };
    // save activity
    SupportDetailComponent.prototype.btnActivitySaveClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnActivitySave").disabled = true;
        document.getElementById("btnActivityClose").disabled = true;
        if (this.activityId == 0) {
            this.supportService.postActivityData(this.getActivityData(), toastr);
        }
        else {
            this.supportService.putActivityData(this.activityId, this.getActivityData(), toastr);
        }
    };
    // activity delete confirmation modal
    SupportDetailComponent.prototype.btnActivityDeleteConfirmationModal = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        this.activityId = currentSelectedActivity.Id;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnActivityDeleteConfirmation").disabled = false;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = false;
    };
    // activity delete confirmation click
    SupportDetailComponent.prototype.btnActivityDeleteConfirmationClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnActivityDeleteConfirmation").disabled = true;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = true;
        this.supportService.deleteActivityData(this.activityId, toastr);
    };
    // print
    SupportDetailComponent.prototype.btnActivityPrintClick = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        window.open('http://api.innosoft.ph/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
    };
    // initialization
    SupportDetailComponent.prototype.ngOnInit = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.setContinuityDateValue();
    };
    return SupportDetailComponent;
}());
SupportDetailComponent = __decorate([
    core_1.Component({
        selector: 'my-activity-support-detail',
        templateUrl: 'app/activity-support/supportDetail.html'
    }),
    __metadata("design:paramtypes", [support_service_1.SupportService, typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" && _c || Object, typeof (_d = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _d || Object, typeof (_e = typeof ng2_toastr_1.ToastsManager !== "undefined" && ng2_toastr_1.ToastsManager) === "function" && _e || Object, typeof (_f = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _f || Object, typeof (_g = typeof ng2_slim_loading_bar_1.SlimLoadingBarService !== "undefined" && ng2_slim_loading_bar_1.SlimLoadingBarService) === "function" && _g || Object])
], SupportDetailComponent);
exports.SupportDetailComponent = SupportDetailComponent;
var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=supportDetail.component.js.map