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
var lead_service_1 = require('./lead.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var LeadDetailComponent = (function () {
    // inject lead detail service
    function LeadDetailComponent(leadService, router, activatedRoute, renderer, elementRef, toastr, vRef, slimLoadingBarService) {
        this.leadService = leadService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isLeadDateSelected = true;
        this.leadStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
        this.activityParticularCategories = [
            'Lead'
        ];
        this.activityParticularCategorySelectedIndex = 0;
        this.activityNoOfHours = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
        ];
        this.activityStatus = ['OPEN', 'CLOSE', 'CANCELLED'];
        this.isFinishLoading = false;
        this.isLoading = true;
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    LeadDetailComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    LeadDetailComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    LeadDetailComponent.prototype.finishedLoad = function () {
        this.isFinishLoading = true;
        this.isLoading = false;
        document.getElementById("btnSaveLeadDetail").disabled = false;
        document.getElementById("btnCloseLeadDetail").disabled = false;
    };
    // lead date ranged
    LeadDetailComponent.prototype.setLeadDateValue = function () {
        this.leadDateValue = new Date();
        this.activityDateValue = new Date();
        this.getListActivity(false);
        document.getElementById("btnSaveLeadDetail").disabled = true;
        document.getElementById("btnCloseLeadDetail").disabled = true;
    };
    // encoded by user list
    LeadDetailComponent.prototype.getListEncodedByUser = function () {
        this.leadEncodedUserObservableArray = this.leadService.getListUserData("leadDetail", "encodedByUser");
    };
    // assigned to user list
    LeadDetailComponent.prototype.getListAssignedToUser = function () {
        this.leadAssignedUserObservableArray = this.leadService.getListUserData("leadDetail", "assignedToUser");
    };
    // event: assigned to
    LeadDetailComponent.prototype.cboAssignedToSelectedIndexChangedClick = function () {
        this.leadAssignedToUserId = this.leadAssignedToSelectedValue;
    };
    // event: lead date
    LeadDetailComponent.prototype.leadDateOnValueChanged = function () {
        if (this.isLeadDateSelected) {
            this.isLeadDateSelected = false;
        }
    };
    // set dropdown data
    LeadDetailComponent.prototype.setDropdownSelectedValueData = function () {
        this.leadDateValue = new Date(document.getElementById("leadDateValue").value.toString());
        this.leadStatusSelectedValue = document.getElementById("leadStatusSelectedValue").value.toString();
        this.leadEncodedBySelectedValue = parseInt(document.getElementById("leadEncodedBySelectedValue").value.toString());
        this.leadAssignedToSelectedValue = parseInt(document.getElementById("leadAssignedToSelectedValue").value.toString());
    };
    // get lead data
    LeadDetailComponent.prototype.getLeadValue = function () {
        var assignedToUserIdValue = "NULL";
        if (this.leadAssignedToUserId > 0) {
            assignedToUserIdValue = this.leadAssignedToUserId.toString();
        }
        var dataObject = {
            LeadDate: this.leadDateValue.toLocaleDateString(),
            LeadName: document.getElementById("leadName").value,
            Address: document.getElementById("leadAddress").value,
            ContactPerson: document.getElementById("leadContactPerson").value,
            ContactPosition: document.getElementById("leadContactPosition").value,
            ContactEmail: document.getElementById("leadContactEmail").value,
            ContactPhoneNo: document.getElementById("leadContactNumber").value,
            ReferredBy: document.getElementById("leadReferredBy").value,
            Remarks: document.getElementById("leadRemarks").value,
            AssignedToUserId: assignedToUserIdValue,
            LeadStatus: this.leadStatusSelectedValue,
        };
        return dataObject;
    };
    // save lead detail
    LeadDetailComponent.prototype.btnSaveLeadDetailClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnSaveLeadDetail").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveLeadDetail").disabled = true;
        document.getElementById("btnCloseLeadDetail").disabled = true;
        this.leadService.putLeadData(this.getIdUrlParameter(), this.getLeadValue(), toastr);
    };
    // get url Id parameter
    LeadDetailComponent.prototype.getIdUrlParameter = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.leadId = params['id'];
        });
        return this.leadId;
    };
    // on key press decimal key
    LeadDetailComponent.prototype.onKeyPressOnlyDecimalNumberKey = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        else {
            return true;
        }
    };
    // on blur 
    LeadDetailComponent.prototype.onBlurOnlyDecimalNumberKey = function () {
        var _this = this;
        document.getElementById("activityAmount").value = "";
        setTimeout(function () {
            document.getElementById("activityAmount").value = _this.activityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }, 100);
    };
    // get lead data by id
    LeadDetailComponent.prototype.getLeadServiceData = function () {
        this.leadService.getLeadById(this.getIdUrlParameter());
    };
    // activity line list
    LeadDetailComponent.prototype.getListActivity = function (isLoadActivityOnly) {
        this.activityCollectionView = new wijmo.collections.CollectionView(this.leadService.getListActivityByLeadId(this.getIdUrlParameter(), isLoadActivityOnly));
        this.activityCollectionView.pageSize = 15;
        this.activityCollectionView.trackChanges = true;
    };
    // activity line detail modal  
    LeadDetailComponent.prototype.btnActivityDetailModal = function (add) {
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
    LeadDetailComponent.prototype.getActivityData = function () {
        var activityDataObject = {
            ActivityDate: this.activityDateValue.toLocaleDateString(),
            CustomerId: "NULL",
            ProductId: "NULL",
            ParticularCategory: this.activityParticularCategorySelectedValue,
            Particulars: document.getElementById("activityParticulars").value,
            NumberOfHours: this.activityNoOfHoursSelectedValue,
            ActivityAmount: this.activityAmount,
            ActivityStatus: this.activityStatusSelectedValue,
            LeadId: this.getIdUrlParameter(),
            QuotationId: "NULL",
            DeliveryId: "NULL",
            SupportId: "NULL",
            SoftwareDevelopmentId: "NULL",
            LeadStatus: this.activityStatusSelectedValue
        };
        return activityDataObject;
    };
    // save activity
    LeadDetailComponent.prototype.btnActivitySaveClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnActivitySave").disabled = true;
        document.getElementById("btnActivityClose").disabled = true;
        if (this.activityId == 0) {
            this.leadService.postActivityData(this.getActivityData(), toastr);
        }
        else {
            this.leadService.putActivityData(this.activityId, this.getActivityData(), toastr);
        }
    };
    // activity delete confirmation modal
    LeadDetailComponent.prototype.btnActivityDeleteConfirmationModal = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        this.activityId = currentSelectedActivity.Id;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnActivityDeleteConfirmation").disabled = false;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = false;
    };
    // activity delete confirmation click
    LeadDetailComponent.prototype.btnActivityDeleteConfirmationClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnActivityDeleteConfirmation").disabled = true;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = true;
        this.leadService.deleteActivityData(this.activityId, toastr);
    };
    // print
    LeadDetailComponent.prototype.btnActivityPrintClick = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        window.open('http://api.innosoft.ph/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
    };
    // initialization
    LeadDetailComponent.prototype.ngOnInit = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.setLeadDateValue();
    };
    LeadDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-lead-detail',
            templateUrl: 'app/activity-lead/leadDetail.html'
        }), 
        __metadata('design:paramtypes', [lead_service_1.LeadService, router_1.Router, router_1.ActivatedRoute, core_1.Renderer, core_1.ElementRef, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], LeadDetailComponent);
    return LeadDetailComponent;
}());
exports.LeadDetailComponent = LeadDetailComponent;
//# sourceMappingURL=leadDetail.component.js.map