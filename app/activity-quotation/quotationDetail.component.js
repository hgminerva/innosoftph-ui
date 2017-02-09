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
var quotation_service_1 = require("./quotation.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var QuotationDetailComponent = (function () {
    // inject quotation detail service
    function QuotationDetailComponent(quotationService, router, activatedRoute, renderer, elementRef, toastr, vRef, slimLoadingBarService) {
        this.quotationService = quotationService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isQuotationDateSelected = true;
        this.quotationLeadSelectedIndex = -1;
        this.quotationCustomerSelectedIndex = -1;
        this.quotationProductSelectedIndex = -1;
        this.quotationEncodedBySelectedIndex = -1;
        this.quotationStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
        this.quotationStatusSelectedIndex = -1;
        this.activityParticularCategories = [
            'Quotation'
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
    QuotationDetailComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    QuotationDetailComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // set selected value for drop down
    QuotationDetailComponent.prototype.setDropdownSelectedValueData = function () {
        this.quotationDateValue = new Date(document.getElementById("quotationDateValue").value.toString());
        this.quotationLeadSelectedValue = document.getElementById("quotationLeadSelectedValue").value.toString();
        this.quotationCustomerSelectedValue = document.getElementById("quotationCustomerSelectedValue").value.toString();
        this.quotationProductSelectedValue = document.getElementById("quotationProductSelectedValue").value.toString();
        this.quotationEncodedBySelectedValue = document.getElementById("quotationEncodedBySelectedValue").value.toString();
        this.quotationStatusSelectedValue = document.getElementById("quotationStatusSelectedValue").value.toString();
        this.quotationStatus = this.quotationStatusSelectedValue;
    };
    // quotation date value
    QuotationDetailComponent.prototype.setQuotationDateValue = function () {
        this.quotationDateValue = new Date();
        this.activityDateValue = new Date();
        this.getLeadServiceData();
    };
    // list lead
    QuotationDetailComponent.prototype.getLeadServiceData = function () {
        this.quotationLeadObservableArray = this.quotationService.getListLeadData("quotationDetail");
        this.getListActivity();
    };
    // list customer article
    QuotationDetailComponent.prototype.getCustomerArticleData = function () {
        this.quotationCustomerObservableArray = this.quotationService.getListArticleData("quotationDetail", 2);
    };
    // list product article
    QuotationDetailComponent.prototype.getProductArticleData = function () {
        this.quotationProductObservableArray = this.quotationService.getListArticleData("quotationDetail", 1);
    };
    // list product
    QuotationDetailComponent.prototype.getUserServiceData = function () {
        this.quotationEncodedUserObservableArray = this.quotationService.getListUserData("quotationDetail");
    };
    // quotation data
    QuotationDetailComponent.prototype.getQuotationServiceData = function () {
        this.quotationService.getQuotationById(this.getIdUrlParameter());
    };
    // get url Id parameter
    QuotationDetailComponent.prototype.getIdUrlParameter = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.quotationId = params['id'];
        });
        return this.quotationId;
    };
    // quotataion data value changed
    QuotationDetailComponent.prototype.quotationDateOnValueChanged = function () {
        if (this.isQuotationDateSelected) {
            this.isQuotationDateSelected = false;
        }
    };
    // quotation lead selected index changed
    QuotationDetailComponent.prototype.cboQuotationLeadSelectedIndexChanged = function () {
        if (this.quotationLeadSelectedIndex >= 0) {
            this.quotationLeadId = this.quotationLeadObservableArray[this.quotationLeadSelectedIndex].Id;
        }
        else {
            this.quotationLeadId = 0;
        }
    };
    // quotation customer selected index changed
    QuotationDetailComponent.prototype.cboQuotationCustomerSelectedIndexChangedClick = function () {
        if (this.quotationCustomerSelectedIndex >= 0) {
            this.quotationCustomerId = this.quotationCustomerObservableArray[this.quotationCustomerSelectedIndex].Id;
        }
        else {
            this.quotationCustomerId = 0;
        }
    };
    // quotation product selected index changed
    QuotationDetailComponent.prototype.cboQuotationProductSelectedIndexChangedClick = function () {
        if (this.quotationProductSelectedIndex >= 0) {
            this.quotationProductId = this.quotationProductObservableArray[this.quotationProductSelectedIndex].Id;
        }
        else {
            this.quotationProductId = 0;
        }
    };
    // quotation user selected index changed
    QuotationDetailComponent.prototype.cboquotationEncodedBySelectedIndexChangedClick = function () {
        if (this.quotationEncodedBySelectedIndex >= 0) {
            this.quotationEncodedByUserId = this.quotationEncodedUserObservableArray[this.quotationEncodedBySelectedIndex].Id;
        }
        else {
            this.quotationEncodedByUserId = 0;
        }
    };
    // quotation status selected index changed
    QuotationDetailComponent.prototype.cboQuotationStatusSelectedIndexChangedClick = function () {
        this.quotationStatus = this.quotationStatusArray[this.quotationStatusSelectedIndex];
    };
    // quotation data
    QuotationDetailComponent.prototype.getQuotationValue = function () {
        var dataObject = {
            QuotationDate: this.quotationDateValue.toLocaleDateString(),
            LeadId: this.quotationLeadId,
            CustomerId: this.quotationCustomerId,
            ProductId: this.quotationProductId,
            Remarks: document.getElementById("quotationRemarks").value,
            QuotationStatus: this.quotationStatus
        };
        return dataObject;
    };
    // save quotation detail
    QuotationDetailComponent.prototype.btnSaveQuotationDetailClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnSaveQuotationDetail").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveQuotationDetail").disabled = true;
        document.getElementById("btnCloseQuotationDetail").disabled = true;
        this.quotationService.putQuotationData(this.getIdUrlParameter(), this.getQuotationValue(), toastr);
    };
    // on key press decimal key
    QuotationDetailComponent.prototype.onKeyPressOnlyDecimalNumberKey = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        else {
            return true;
        }
    };
    // on blur 
    QuotationDetailComponent.prototype.onBlurOnlyDecimalNumberKey = function () {
        var _this = this;
        document.getElementById("activityAmount").value = "";
        setTimeout(function () {
            document.getElementById("activityAmount").value = _this.activityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }, 100);
    };
    // activity line list
    QuotationDetailComponent.prototype.getListActivity = function () {
        this.activityCollectionView = new wijmo.collections.CollectionView(this.quotationService.getListActivityByQuotationId(this.getIdUrlParameter()));
        this.activityCollectionView.pageSize = 15;
        this.activityCollectionView.trackChanges = true;
    };
    // activity line detail modal  
    QuotationDetailComponent.prototype.btnActivityDetailModal = function (add) {
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
            this.activityStatusSelectedValue = "OPEN";
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
    QuotationDetailComponent.prototype.getActivityData = function () {
        var activityDataObject = {
            ActivityDate: this.activityDateValue.toLocaleDateString(),
            CustomerId: this.quotationCustomerId,
            ProductId: this.quotationProductId,
            ParticularCategory: this.activityParticularCategorySelectedValue,
            Particulars: document.getElementById("activityParticulars").value,
            NumberOfHours: this.activityNoOfHoursSelectedValue,
            ActivityAmount: this.activityAmount,
            ActivityStatus: this.activityStatusSelectedValue,
            LeadId: "NULL",
            QuotationId: this.getIdUrlParameter(),
            DeliveryId: "NULL",
            SupportId: "NULL",
            LeadStatus: this.activityStatusSelectedValue
        };
        return activityDataObject;
    };
    // save activity
    QuotationDetailComponent.prototype.btnActivitySaveClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnActivitySave").disabled = true;
        document.getElementById("btnActivityClose").disabled = true;
        if (this.activityId == 0) {
            this.quotationService.postActivityData(this.getActivityData(), toastr);
        }
        else {
            this.quotationService.putActivityData(this.activityId, this.getActivityData(), toastr);
        }
    };
    // activity delete confirmation modal
    QuotationDetailComponent.prototype.btnActivityDeleteConfirmationModal = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        this.activityId = currentSelectedActivity.Id;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnActivityDeleteConfirmation").disabled = false;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = false;
    };
    // activity delete confirmation click
    QuotationDetailComponent.prototype.btnActivityDeleteConfirmationClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnActivityDeleteConfirmation").disabled = true;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = true;
        this.quotationService.deleteActivityData(this.activityId, toastr);
    };
    // print
    QuotationDetailComponent.prototype.btnActivityPrintClick = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        window.open('http://api.innosoft.ph/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
    };
    // initialization
    QuotationDetailComponent.prototype.ngOnInit = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.setQuotationDateValue();
    };
    return QuotationDetailComponent;
}());
QuotationDetailComponent = __decorate([
    core_1.Component({
        selector: 'my-quotation-detail',
        templateUrl: 'app/activity-quotation/quotationDetail.html'
    }),
    __metadata("design:paramtypes", [quotation_service_1.QuotationService, typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, typeof (_c = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" && _c || Object, typeof (_d = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _d || Object, typeof (_e = typeof ng2_toastr_1.ToastsManager !== "undefined" && ng2_toastr_1.ToastsManager) === "function" && _e || Object, typeof (_f = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _f || Object, typeof (_g = typeof ng2_slim_loading_bar_1.SlimLoadingBarService !== "undefined" && ng2_slim_loading_bar_1.SlimLoadingBarService) === "function" && _g || Object])
], QuotationDetailComponent);
exports.QuotationDetailComponent = QuotationDetailComponent;
var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=quotationDetail.component.js.map