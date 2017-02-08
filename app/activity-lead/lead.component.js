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
var LeadComponent = (function () {
    // inject lead service
    function LeadComponent(leadService, router, toastr, vRef, slimLoadingBarService) {
        this.leadService = leadService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isLeadStartDateSelected = true;
        this.isLeadEndDateSelected = true;
        this.isLeadDateSelected = true;
        this.leadStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
        this.leadStatusSelectedIndex = 0;
        this.leadFilter = '';
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    LeadComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    LeadComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // lead dates
    LeadComponent.prototype.setLeadDateRanged = function () {
        this.leadStartDateValue = new Date();
        this.leadEndDateValue = new Date();
        this.leadDateValue = new Date();
        this.getListLead();
    };
    // list lead
    LeadComponent.prototype.getListLead = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.getLeadData();
    };
    // lead service data
    LeadComponent.prototype.getLeadData = function () {
        this.leadCollectionView = new wijmo.collections.CollectionView(this.leadService.getListLeadData(this.leadStartDateValue, this.leadEndDateValue));
        this.leadCollectionView.filter = this.filterFunction.bind(this);
        this.leadCollectionView.pageSize = 15;
        this.leadCollectionView.trackChanges = true;
    };
    Object.defineProperty(LeadComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.leadFilter;
        },
        // filter
        set: function (value) {
            if (this.leadFilter != value) {
                this.leadFilter = value;
                if (this.leadToFilter) {
                    clearTimeout(this.leadToFilter);
                }
                var self = this;
                this.leadToFilter = setTimeout(function () {
                    self.leadCollectionView.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    LeadComponent.prototype.filterFunction = function (item) {
        if (this.leadFilter) {
            return (item.LeadNumber.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1) ||
                (item.LeadName.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1) ||
                (item.EncodedByUser.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1) ||
                (item.LeadStatus.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // event: lead start date
    LeadComponent.prototype.leadStartDateOnValueChanged = function () {
        if (!this.isLeadStartDateSelected) {
            document.getElementById("btn-hidden-start-loading").click();
            this.getLeadData();
        }
        else {
            this.isLeadStartDateSelected = false;
        }
    };
    // event: lead end date
    LeadComponent.prototype.leadEndDateOnValueChanged = function () {
        if (!this.isLeadEndDateSelected) {
            document.getElementById("btn-hidden-start-loading").click();
            this.getLeadData();
        }
        else {
            this.isLeadEndDateSelected = false;
        }
    };
    // event: lead date
    LeadComponent.prototype.leadDateOnValueChanged = function () {
        if (this.isLeadDateSelected) {
            this.isLeadDateSelected = false;
        }
    };
    // user list
    LeadComponent.prototype.getListUser = function () {
        this.leadEncodedUserObservableArray = this.leadService.getListUserData("lead", "");
        this.leadAssignedUserObservableArray = this.leadService.getListUserData("lead", "");
    };
    // event: encoded by
    LeadComponent.prototype.cboEncodedBySelectedIndexChangedClick = function () {
        if (this.leadEncodedBySelectedIndex >= 0) {
            this.leadEncodedByUserId = this.leadEncodedUserObservableArray[this.leadEncodedBySelectedIndex].Id;
        }
        else {
            this.leadEncodedByUserId = 0;
        }
    };
    // event: assigned to
    LeadComponent.prototype.cboAssignedToSelectedIndexChangedClick = function () {
        if (this.leadAssignedToSelectedIndex >= 0) {
            this.leadAssignedToUserId = this.leadAssignedUserObservableArray[this.leadAssignedToSelectedIndex].Id;
        }
        else {
            this.leadAssignedToUserId = 0;
        }
    };
    // event: status
    LeadComponent.prototype.cboStatusSelectedIndexChangedClick = function () {
        this.leadStatus = this.leadStatusArray[this.leadStatusSelectedIndex];
    };
    // btn Add lead
    LeadComponent.prototype.btnAddLeadClick = function () {
        document.getElementById("btnSaveLead").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnSaveLead").disabled = false;
        document.getElementById("btnCloseLead").disabled = false;
        this.leadStatus = this.leadStatusArray[this.leadStatusSelectedIndex];
        this.getListUser();
    };
    // btn edit lead
    LeadComponent.prototype.btnEditLead = function () {
        document.getElementById("btn-hidden-start-loading").click();
        var currentSelectedLead = this.leadCollectionView.currentItem;
        this.router.navigate(['/leadDetail', currentSelectedLead.Id]);
    };
    // get lead data
    LeadComponent.prototype.getLeadValue = function () {
        var assignedToUserIdValue = "NULL";
        if (this.leadAssignedToUserId > 0) {
            assignedToUserIdValue = this.leadAssignedToUserId.toString();
        }
        var dataObject = {
            LeadDate: this.leadDateValue.toLocaleDateString(),
            LeadName: this.leadName,
            Address: this.leadAddress,
            ContactPerson: this.leadContactPerson,
            ContactPosition: this.leadContactPosition,
            ContactEmail: this.leadContactEmail,
            ContactPhoneNo: this.leadContactNumber,
            ReferredBy: this.leadReferredBy,
            Remarks: this.leadRemarks,
            AssignedToUserId: assignedToUserIdValue,
            LeadStatus: this.leadStatus,
        };
        return dataObject;
    };
    // btn save lead
    LeadComponent.prototype.btnSaveLead = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnSaveLead").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveLead").disabled = true;
        document.getElementById("btnCloseLead").disabled = true;
        this.leadService.postLeadData(this.getLeadValue(), toastr);
    };
    // delete click
    LeadComponent.prototype.deleteLeadClick = function () {
        document.getElementById("btnDeleteLead").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnDeleteLead").disabled = false;
        document.getElementById("btnDeleteCloseLead").disabled = false;
    };
    // delete lead
    LeadComponent.prototype.btnDeleteConfirmLeadClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnDeleteLead").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnDeleteLead").disabled = true;
        document.getElementById("btnDeleteCloseLead").disabled = true;
        var currentSelectedLead = this.leadCollectionView.currentItem;
        this.leadService.deleteLeadData(currentSelectedLead.Id, toastr);
    };
    // initialization
    LeadComponent.prototype.ngOnInit = function () {
        this.setLeadDateRanged();
    };
    LeadComponent = __decorate([
        core_1.Component({
            selector: 'my-lead',
            templateUrl: 'app/activity-lead/lead.html'
        }), 
        __metadata('design:paramtypes', [lead_service_1.LeadService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], LeadComponent);
    return LeadComponent;
}());
exports.LeadComponent = LeadComponent;
//# sourceMappingURL=lead.component.js.map