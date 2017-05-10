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
var softwareDevelopment_service_1 = require('./softwareDevelopment.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var SoftwareDevelopmentDetailComponent = (function () {
    // inject softwareDevelopment detail service
    function SoftwareDevelopmentDetailComponent(softwareDevelopmentService, router, activatedRoute, renderer, elementRef, toastr, vRef, slimLoadingBarService) {
        this.softwareDevelopmentService = softwareDevelopmentService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isSoftwareDevelopmentStartDateSelected = true;
        this.isSoftwareDevelopmentEndDateSelected = true;
        this.isFinishLoading = false;
        this.isLoading = true;
        this.softwareDevelopmentFilter = '';
        this.softwareDevelopmentProjectSelectedIndex = -1;
        this.softwareDevelopmentStatusArray = ['OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING', 'DUPLICATE'];
        this.softwareDevelopmentStatusSelectedValue = "OPEN";
        this.softwareDevelopmentNoOfHoursArray = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
        ];
        this.softwareDevelopmentNoOfHoursSelectedValue = "0";
        this.activityParticularCategories = [
            'Form',
            'Module',
            'Report',
            'Query',
            'Table',
            'Others'
        ];
        this.activityParticularCategorySelectedIndex = 0;
        this.activityNoOfHours = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
        ];
        this.activityStatus = ['OPEN', 'CLOSE', 'DONE', 'CANCELLED', 'FOR CLOSING'];
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    SoftwareDevelopmentDetailComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    SoftwareDevelopmentDetailComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    SoftwareDevelopmentDetailComponent.prototype.finishedLoad = function () {
        this.isFinishLoading = true;
        this.isLoading = false;
        document.getElementById("btnSaveSoftwareDevelopmentDetail").disabled = false;
        document.getElementById("btnCloseSoftwareDevelopmentDetail").disabled = false;
    };
    // softwareDevelopment date value
    SoftwareDevelopmentDetailComponent.prototype.setSoftwareDevelopmentDateValue = function () {
        this.softwareDevelopmentDateValue = new Date();
        this.activityDateValue = new Date();
        this.getListActivity(false);
        document.getElementById("btnSaveSoftwareDevelopmentDetail").disabled = true;
        document.getElementById("btnCloseSoftwareDevelopmentDetail").disabled = true;
    };
    // get url Id parameter
    SoftwareDevelopmentDetailComponent.prototype.getIdUrlParameter = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.softwareDevelopmentId = params['id'];
        });
        return this.softwareDevelopmentId;
    };
    // project
    SoftwareDevelopmentDetailComponent.prototype.getListProject = function () {
        this.softwareDevelopmentProjectObservableArray = this.softwareDevelopmentService.getListProjectData("softwareDevelopmentDetail");
    };
    // user
    SoftwareDevelopmentDetailComponent.prototype.getListUser = function () {
        this.softwareDevelopmentAssignedUserObservableArray = this.softwareDevelopmentService.getListUserData("softwareDevelopmentDetail");
    };
    // set selected value for drop down
    SoftwareDevelopmentDetailComponent.prototype.setDropdownSelectedValueData = function () {
        this.softwareDevelopmentDateValue = new Date(document.getElementById("softwareDevelopmentDateValue").value.toString());
        this.softwareDevelopmentProjectSelectedValue = parseInt(document.getElementById("softwareDevelopmentProjectSelectedValue").value.toString());
        this.softwareDevelopmentAssignedUserSelectedValue = parseInt(document.getElementById("softwareDevelopmentAssignedUserSelectedValue").value.toString());
        this.softwareDevelopmentStatusSelectedValue = document.getElementById("softwareDevelopmentStatusSelectedValue").value.toString();
        this.softwareDevelopmentNoOfHoursSelectedValue = document.getElementById("softwareDevelopmentNoOfHoursSelectedValue").value.toString();
        ;
    };
    // software dev data
    SoftwareDevelopmentDetailComponent.prototype.getSoftwareDevelopmentServiceData = function () {
        this.softwareDevelopmentService.getSoftwareDevelopmentById(this.getIdUrlParameter());
    };
    // get software development data
    SoftwareDevelopmentDetailComponent.prototype.getSoftwareDevelopmentDataValue = function () {
        var softwareDevelopmentAssignedToUserIdValue = "NULL";
        if (this.softwareDevelopmentAssignedUserSelectedValue != null) {
            softwareDevelopmentAssignedToUserIdValue = this.softwareDevelopmentAssignedUserSelectedValue.toString();
        }
        var dataObject = {
            SoftDevDate: this.softwareDevelopmentDateValue.toLocaleDateString(),
            ProjectId: this.softwareDevelopmentProjectSelectedValue,
            Task: document.getElementById("softwareDevelopmentTask").value,
            Remarks: document.getElementById("softwareDevelopmentRemarks").value,
            NumberOfHours: this.softwareDevelopmentNoOfHoursSelectedValue,
            AssignedToUserId: softwareDevelopmentAssignedToUserIdValue,
            SoftDevStatus: this.softwareDevelopmentStatusSelectedValue
        };
        return dataObject;
    };
    // save softwareDevelopment detail
    SoftwareDevelopmentDetailComponent.prototype.btnSaveSoftwareDevelopmentDetailClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnSaveSoftwareDevelopmentDetail").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveSoftwareDevelopmentDetail").disabled = true;
        document.getElementById("btnCloseSoftwareDevelopmentDetail").disabled = true;
        this.softwareDevelopmentService.putSoftwareDevelopmentData(this.getIdUrlParameter(), this.getSoftwareDevelopmentDataValue(), toastr);
    };
    // on key press decimal key
    SoftwareDevelopmentDetailComponent.prototype.onKeyPressOnlyDecimalNumberKey = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        else {
            return true;
        }
    };
    // on blur 
    SoftwareDevelopmentDetailComponent.prototype.onBlurOnlyDecimalNumberKey = function () {
        var _this = this;
        document.getElementById("activityAmount").value = "";
        setTimeout(function () {
            document.getElementById("activityAmount").value = _this.activityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }, 100);
    };
    // activity line list
    SoftwareDevelopmentDetailComponent.prototype.getListActivity = function (isLoadActivityOnly) {
        this.activityCollectionView = new wijmo.collections.CollectionView(this.softwareDevelopmentService.getListActivityBySoftwareDevelopmentId(this.getIdUrlParameter(), isLoadActivityOnly));
        this.activityCollectionView.pageSize = 15;
        this.activityCollectionView.trackChanges = true;
    };
    // activity line detail modal  
    SoftwareDevelopmentDetailComponent.prototype.btnActivityDetailModal = function (add) {
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
    SoftwareDevelopmentDetailComponent.prototype.getActivityData = function () {
        var activityDataObject = {
            ActivityDate: this.activityDateValue.toLocaleDateString(),
            ParticularCategory: this.activityParticularCategorySelectedValue,
            Particulars: document.getElementById("activityParticulars").value,
            NumberOfHours: this.activityNoOfHoursSelectedValue,
            ActivityAmount: this.activityAmount,
            ActivityStatus: this.activityStatusSelectedValue,
            SoftwareDevelopmentId: this.getIdUrlParameter(),
        };
        return activityDataObject;
    };
    // save activity
    SoftwareDevelopmentDetailComponent.prototype.btnActivitySaveClick = function () {
        var toastr;
        document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnActivitySave").disabled = true;
        document.getElementById("btnActivityClose").disabled = true;
        if (this.activityId == 0) {
            this.softwareDevelopmentService.postActivityData(this.getActivityData(), toastr);
        }
        else {
            this.softwareDevelopmentService.putActivityData(this.activityId, this.getActivityData(), toastr);
        }
    };
    // activity delete confirmation modal
    SoftwareDevelopmentDetailComponent.prototype.btnActivityDeleteConfirmationModal = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        this.activityId = currentSelectedActivity.Id;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnActivityDeleteConfirmation").disabled = false;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = false;
    };
    // activity delete confirmation click
    SoftwareDevelopmentDetailComponent.prototype.btnActivityDeleteConfirmationClick = function () {
        var toastr;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnActivityDeleteConfirmation").disabled = true;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = true;
        this.softwareDevelopmentService.deleteActivityData(this.activityId, toastr);
    };
    // print
    SoftwareDevelopmentDetailComponent.prototype.btnActivityPrintClick = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        window.open('http://api.innosoft.ph/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
    };
    SoftwareDevelopmentDetailComponent.prototype.backClicked = function () {
        window.history.back();
    };
    // show menu
    SoftwareDevelopmentDetailComponent.prototype.showMenu = function () {
        document.getElementById("showTop").click();
    };
    // initialization
    SoftwareDevelopmentDetailComponent.prototype.ngOnInit = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.setSoftwareDevelopmentDateValue();
    };
    SoftwareDevelopmentDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-contact',
            templateUrl: 'app/activity-software-development/softwareDevelopmentDetail.html'
        }), 
        __metadata('design:paramtypes', [softwareDevelopment_service_1.SoftwareDevelopmentService, router_1.Router, router_1.ActivatedRoute, core_1.Renderer, core_1.ElementRef, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], SoftwareDevelopmentDetailComponent);
    return SoftwareDevelopmentDetailComponent;
}());
exports.SoftwareDevelopmentDetailComponent = SoftwareDevelopmentDetailComponent;
//# sourceMappingURL=softwareDevelopmentDetail.component.js.map