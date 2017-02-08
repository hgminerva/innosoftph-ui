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
var DeliveryDetailComponent = (function () {
    // inject quotation detail service
    function DeliveryDetailComponent(deliveryService, router, activatedRoute, renderer, elementRef, toastr, vRef, slimLoadingBarService) {
        this.deliveryService = deliveryService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.deliveryQuotaionSelectedIndex = -1;
        this.deliveryCustomerSelectedIndex = -1;
        this.deliveryProductSelectedIndex = -1;
        this.deliveryTechnicalUserSelectedIndex = -1;
        this.deliveryFunctionalUserSelectedIndex = -1;
        this.deliveryStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
        this.deliveryStatusSelectedIndex = 0;
        this.activityParticularCategories = [
            'Delivery'
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
    DeliveryDetailComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    DeliveryDetailComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // get url Id parameter
    DeliveryDetailComponent.prototype.getIdUrlParameter = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.deliveryId = params['id'];
        });
        return this.deliveryId;
    };
    // set delivery date
    DeliveryDetailComponent.prototype.setDeliveryDate = function () {
        this.deliveryDateValue = new Date();
        this.deliveryMeetingDateValue = new Date();
        this.activityDateValue = new Date();
        this.getQuotationData();
        this.getListActivity();
    };
    // list article
    DeliveryDetailComponent.prototype.getQuotationData = function () {
        this.deliveryQuotaionObservableArray = this.deliveryService.getListQuotationData("deliveryDetail");
    };
    // list customer article
    DeliveryDetailComponent.prototype.getCustomerArticleData = function () {
        this.deliveryCustomerObservableArray = this.deliveryService.getListArticleData("deliveryDetail", 2);
    };
    // list product article
    DeliveryDetailComponent.prototype.getProductArticleData = function () {
        this.deliveryProductObservableArray = this.deliveryService.getListArticleData("deliveryDetail", 1);
    };
    // list sales user
    DeliveryDetailComponent.prototype.getSalesUserServiceData = function () {
        this.deliverySalesUserObservableArray = this.deliveryService.getListUserData("deliveryDetail", "sales");
    };
    // list technical user
    DeliveryDetailComponent.prototype.getTechnicalUserServiceData = function () {
        this.deliveryTechnicalUserObservableArray = this.deliveryService.getListUserData("deliveryDetail", "technical");
    };
    // list functional user
    DeliveryDetailComponent.prototype.getFunctionalUserServiceData = function () {
        this.deliveryFunctionalUserObservableArray = this.deliveryService.getListUserData("deliveryDetail", "functional");
    };
    // set selected value
    DeliveryDetailComponent.prototype.setDropdownSelectedValueData = function () {
        this.deliveryDateValue = new Date(document.getElementById("deliveryDateValue").value.toString());
        this.deliveryQuotaionSelectedValue = document.getElementById("deliveryQuotaionSelectedValue").value.toString();
        this.deliveryCustomerSelectedValue = document.getElementById("deliveryCustomerSelectedValue").value.toString();
        this.deliveryProductSelectedValue = document.getElementById("deliveryProductSelectedValue").value.toString();
        this.deliveryMeetingDateValue = new Date(document.getElementById("deliveryMeetingDateValue").value.toString());
        this.deliverySalesUserSelectedValue = document.getElementById("deliverySalesUserSelectedValue").value.toString();
        this.deliveryTechnicalUserSelectedValue = document.getElementById("deliveryTechnicalUserSelectedValue").value.toString();
        this.deliveryFunctionalUserSelectedValue = document.getElementById("deliveryFunctionalUserSelectedValue").value.toString();
        this.deliveryStatusSelectedValue = document.getElementById("deliveryStatusSelectedValue").value.toString();
        this.deliveryStatus = document.getElementById("deliveryStatusSelectedValue").value.toString();
    };
    // delivery date on value changed
    DeliveryDetailComponent.prototype.deliveryDateOnValueChanged = function () {
    };
    // meeting date on value changed
    DeliveryDetailComponent.prototype.deliveryMeetingDateOnValueChanged = function () {
    };
    // quotation number selected index changed
    DeliveryDetailComponent.prototype.cboDeliveryQuotaionSelectedIndexChanged = function () {
        if (this.deliveryQuotaionSelectedIndex >= 0) {
            this.deliveryQuotationId = this.deliveryQuotaionObservableArray[this.deliveryQuotaionSelectedIndex].Id;
            this.deliveryCustomerSelectedValue = this.deliveryQuotaionObservableArray[this.deliveryQuotaionSelectedIndex].Customer;
            this.deliveryProductSelectedValue = this.deliveryQuotaionObservableArray[this.deliveryQuotaionSelectedIndex].Product;
        }
        else {
            this.deliveryQuotationId = 0;
        }
    };
    // customer selected index changed
    DeliveryDetailComponent.prototype.cboDeliveryCustomerSelectedIndexChanged = function () {
        if (this.deliveryCustomerSelectedIndex >= 0) {
            this.deliveryCustomerId = this.deliveryCustomerObservableArray[this.deliveryCustomerSelectedIndex].Id;
        }
        else {
            this.deliveryCustomerId = 0;
        }
    };
    // product selected index changed
    DeliveryDetailComponent.prototype.cboDeliveryProductSelectedIndexChanged = function () {
        if (this.deliveryProductSelectedIndex >= 0) {
            this.deliveryProductId = this.deliveryProductObservableArray[this.deliveryProductSelectedIndex].Id;
        }
        else {
            this.deliveryProductId = 0;
        }
    };
    // technical user selected index changed
    DeliveryDetailComponent.prototype.cboDeliveryTechnicalUserSelectedIndexChanged = function () {
        if (this.deliveryTechnicalUserSelectedIndex >= 0) {
            this.deliveryTechnicalUserId = this.deliveryTechnicalUserObservableArray[this.deliveryTechnicalUserSelectedIndex].Id;
        }
        else {
            this.deliveryTechnicalUserId = 0;
        }
    };
    // functionl user selected index changed
    DeliveryDetailComponent.prototype.cboDeliveryFunctionalUserSelectedIndexChanged = function () {
        if (this.deliveryFunctionalUserSelectedIndex >= 0) {
            this.deliveryFunctionalUserId = this.deliveryFunctionalUserObservableArray[this.deliveryFunctionalUserSelectedIndex].Id;
        }
        else {
            this.deliveryFunctionalUserId = 0;
        }
    };
    // status selected index changed
    DeliveryDetailComponent.prototype.cboStatusSelectedIndexChangedClick = function () {
        this.deliveryStatus = this.deliveryStatusArray[this.deliveryStatusSelectedIndex];
    };
    // delivery data
    DeliveryDetailComponent.prototype.getDeliveryServiceData = function () {
        this.deliveryService.getDeliveryById(this.getIdUrlParameter());
    };
    // on key press decimal key
    DeliveryDetailComponent.prototype.onKeyPressOnlyDecimalNumberKey = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        else {
            return true;
        }
    };
    // on blur 
    DeliveryDetailComponent.prototype.onBlurOnlyDecimalNumberKey = function () {
        var _this = this;
        document.getElementById("activityAmount").value = "";
        setTimeout(function () {
            document.getElementById("activityAmount").value = _this.activityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }, 100);
    };
    // delivery data
    DeliveryDetailComponent.prototype.getDeliveryValue = function () {
        var dataObject = {
            DeliveryDate: this.deliveryDateValue.toLocaleDateString(),
            QuotationId: this.deliveryQuotationId,
            CustomerId: this.deliveryCustomerId,
            ProductId: this.deliveryProductId,
            MeetingDate: this.deliveryMeetingDateValue.toLocaleDateString(),
            Remarks: document.getElementById("deliveryRemarks").value,
            TechnicalUserId: this.deliveryTechnicalUserId,
            FunctionalUserId: this.deliveryFunctionalUserId,
            DeliveryStatus: this.deliveryStatus
        };
        return dataObject;
    };
    // save delivery
    DeliveryDetailComponent.prototype.btnSaveDeliveryDetailClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnSaveDeliveryDetail").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveDeliveryDetail").disabled = true;
        document.getElementById("btnCloseDeliveryDetail").disabled = true;
        this.deliveryService.putDeliveryData(this.getIdUrlParameter(), this.getDeliveryValue(), toastr);
    };
    // activity line list
    DeliveryDetailComponent.prototype.getListActivity = function () {
        this.activityCollectionView = new wijmo.collections.CollectionView(this.deliveryService.getListActivityByQuotationId(this.getIdUrlParameter()));
        this.activityCollectionView.pageSize = 15;
        this.activityCollectionView.trackChanges = true;
    };
    // activity line detail modal  
    DeliveryDetailComponent.prototype.btnActivityDetailModal = function (add) {
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
    DeliveryDetailComponent.prototype.getActivityData = function () {
        var activityDataObject = {
            ActivityDate: this.activityDateValue.toLocaleDateString(),
            CustomerId: this.deliveryCustomerId,
            ProductId: this.deliveryProductId,
            ParticularCategory: this.activityParticularCategorySelectedValue,
            Particulars: document.getElementById("activityParticulars").value,
            NumberOfHours: this.activityNoOfHoursSelectedValue,
            ActivityAmount: this.activityAmount,
            ActivityStatus: this.activityStatusSelectedValue,
            LeadId: "NULL",
            QuotationId: "NULL",
            DeliveryId: this.getIdUrlParameter(),
            SupportId: "NULL",
            LeadStatus: this.activityStatusSelectedValue
        };
        return activityDataObject;
    };
    // save activity
    DeliveryDetailComponent.prototype.btnActivitySaveClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnActivitySave").disabled = true;
        document.getElementById("btnActivityClose").disabled = true;
        if (this.activityId == 0) {
            this.deliveryService.postActivityData(this.getActivityData(), toastr);
        }
        else {
            this.deliveryService.putActivityData(this.activityId, this.getActivityData(), toastr);
        }
    };
    // activity delete confirmation modal
    DeliveryDetailComponent.prototype.btnActivityDeleteConfirmationModal = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        this.activityId = currentSelectedActivity.Id;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnActivityDeleteConfirmation").disabled = false;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = false;
    };
    // activity delete confirmation click
    DeliveryDetailComponent.prototype.btnActivityDeleteConfirmationClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnActivityDeleteConfirmation").disabled = true;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = true;
        this.deliveryService.deleteActivityData(this.activityId, toastr);
    };
    // print
    DeliveryDetailComponent.prototype.btnActivityPrintClick = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        window.open('http://api.innosoft.ph/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
    };
    // initialization
    DeliveryDetailComponent.prototype.ngOnInit = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.setDeliveryDate();
    };
    DeliveryDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-delivery-detail',
            templateUrl: 'app/activity-delivery/deliveryDetail.html'
        }), 
        __metadata('design:paramtypes', [delivery_service_1.DeliveryService, router_1.Router, router_1.ActivatedRoute, core_1.Renderer, core_1.ElementRef, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], DeliveryDetailComponent);
    return DeliveryDetailComponent;
}());
exports.DeliveryDetailComponent = DeliveryDetailComponent;
//# sourceMappingURL=deliveryDetail.component.js.map