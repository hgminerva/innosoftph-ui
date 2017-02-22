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
var SoftwareDevelopmentComponent = (function () {
    // inject softwareDevelopment service
    function SoftwareDevelopmentComponent(softwareDevelopmentService, router, toastr, vRef, slimLoadingBarService) {
        this.softwareDevelopmentService = softwareDevelopmentService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isSoftwareDevelopmentStartDateSelected = true;
        this.isSoftwareDevelopmentEndDateSelected = true;
        this.isFinishLoading = false;
        this.isLoading = true;
        this.softwareDevelopmentFilter = '';
        this.softwareDevelopmentStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
        this.softwareDevelopmentStatusSelectedValue = "OPEN";
        this.softwareDevelopmentNoOfHoursArray = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
        ];
        this.softwareDevelopmentNoOfHoursSelectedValue = "0";
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    SoftwareDevelopmentComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    SoftwareDevelopmentComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    SoftwareDevelopmentComponent.prototype.finishedLoad = function () {
        this.isFinishLoading = true;
        this.isLoading = false;
        document.getElementById("btnSaveSoftwareDevelopment").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnSaveSoftwareDevelopment").disabled = false;
        document.getElementById("btnCloseSoftwareDevelopment").disabled = false;
    };
    // softwareDevelopment dates
    SoftwareDevelopmentComponent.prototype.setSoftwareDevelopmentDateRanged = function () {
        this.softwareDevelopmentStartDateValue = new Date();
        this.softwareDevelopmentEndDateValue = new Date();
        this.softwareDevelopmentDateValue = new Date();
        this.getListSoftwareDevelopment();
    };
    SoftwareDevelopmentComponent.prototype.getListSoftwareDevelopment = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.getSoftwareDevelopmentData();
    };
    // get softwareDevelopment data
    SoftwareDevelopmentComponent.prototype.getSoftwareDevelopmentData = function () {
        this.softwareDevelopmentCollectionView = new wijmo.collections.CollectionView(this.softwareDevelopmentService.getListSoftwareDevelopmentData(this.softwareDevelopmentStartDateValue, this.softwareDevelopmentEndDateValue));
        this.softwareDevelopmentCollectionView.filter = this.filterFunction.bind(this);
        this.softwareDevelopmentCollectionView.pageSize = 15;
        this.softwareDevelopmentCollectionView.trackChanges = true;
    };
    // event: softwareDevelopment start date
    SoftwareDevelopmentComponent.prototype.softwareDevelopmentStartDateOnValueChanged = function () {
        if (!this.isSoftwareDevelopmentStartDateSelected) {
            this.startLoading();
            this.getSoftwareDevelopmentData();
        }
        else {
            this.isSoftwareDevelopmentStartDateSelected = false;
        }
    };
    // event: softwareDevelopment end date
    SoftwareDevelopmentComponent.prototype.softwareDevelopmentEndDateOnValueChanged = function () {
        if (!this.isSoftwareDevelopmentEndDateSelected) {
            this.startLoading();
            this.getSoftwareDevelopmentData();
        }
        else {
            this.isSoftwareDevelopmentEndDateSelected = false;
        }
    };
    Object.defineProperty(SoftwareDevelopmentComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.softwareDevelopmentFilter;
        },
        // filter
        set: function (value) {
            if (this.softwareDevelopmentFilter != value) {
                this.softwareDevelopmentFilter = value;
                if (this.softwareDevelopmentToFilter) {
                    clearTimeout(this.softwareDevelopmentToFilter);
                }
                var self = this;
                this.softwareDevelopmentToFilter = setTimeout(function () {
                    self.softwareDevelopmentCollectionView.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    SoftwareDevelopmentComponent.prototype.filterFunction = function (item) {
        if (this.softwareDevelopmentFilter) {
            return (item.SoftDevNumber.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1) ||
                (item.Task.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1) ||
                (item.Remarks.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1) ||
                (item.EncodedByUser.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1) ||
                (item.AssignedToUser.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1) ||
                (item.SoftDevStatus.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // project
    SoftwareDevelopmentComponent.prototype.getListProject = function () {
        this.softwareDevelopmentProjectObservableArray = this.softwareDevelopmentService.getListProjectData("softwareDevelopment");
    };
    // user
    SoftwareDevelopmentComponent.prototype.getListUser = function () {
        this.softwareDevelopmentAssignedUserObservableArray = this.softwareDevelopmentService.getListUserData("softwareDevelopment");
    };
    // add software development
    SoftwareDevelopmentComponent.prototype.btnAddSoftwareDevelopmentClick = function () {
        this.isFinishLoading = false;
        this.isLoading = true;
        document.getElementById("btnSaveSoftwareDevelopment").disabled = true;
        document.getElementById("btnCloseSoftwareDevelopment").disabled = true;
        this.softwareDevelopmentDateValue = new Date();
        this.getListProject();
    };
    // edit software development
    SoftwareDevelopmentComponent.prototype.btnEditSoftwareDevelopment = function () {
    };
    // delete software development
    SoftwareDevelopmentComponent.prototype.btnDeleteSoftwareDevelopmentClick = function () {
    };
    // delete confirm software development
    SoftwareDevelopmentComponent.prototype.btnDeleteConfirmSoftwareDevelopmentClick = function () {
    };
    // save software development
    SoftwareDevelopmentComponent.prototype.btnSaveSoftwareDevelopment = function () {
    };
    // initialization
    SoftwareDevelopmentComponent.prototype.ngOnInit = function () {
        this.setSoftwareDevelopmentDateRanged();
    };
    SoftwareDevelopmentComponent = __decorate([
        core_1.Component({
            selector: 'my-contact',
            templateUrl: 'app/activity-software-development/softwareDevelopment.html'
        }), 
        __metadata('design:paramtypes', [softwareDevelopment_service_1.SoftwareDevelopmentService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], SoftwareDevelopmentComponent);
    return SoftwareDevelopmentComponent;
}());
exports.SoftwareDevelopmentComponent = SoftwareDevelopmentComponent;
//# sourceMappingURL=softwareDevelopment.component.js.map