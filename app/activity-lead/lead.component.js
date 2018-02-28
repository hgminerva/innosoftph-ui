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
var angular2_json2csv_1 = require("angular2-json2csv");
var LeadComponent = (function () {
    // inject lead service
    function LeadComponent(leadService, router, toastr, vRef, slimLoadingBarService, csvService) {
        this.leadService = leadService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.csvService = csvService;
        this.isLeadStartDateSelected = true;
        this.isLeadEndDateSelected = true;
        this.isLeadDateSelected = true;
        this.leadStatusArray = ['OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING', 'DUPLICATE'];
        this.leadStatusSelectedValue = "OPEN";
        this.leadFilter = '';
        this.isFinishLoading = false;
        this.isLoading = true;
        this.isStartDateClicked = false;
        this.isEndDateClicked = false;
        this.fliterLeadStatusArray = ['ALL', 'OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING', 'DUPLICATE'];
        this.filterLeadStatusSelectedValue = "OPEN";
        this.leadStatusClicked = false;
        this.isLeadStatusSelected = false;
        this.toastr.setRootViewContainerRef(vRef);
    }
    LeadComponent.prototype.backClicked = function () {
        window.history.back();
    };
    // start loading
    LeadComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    LeadComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    LeadComponent.prototype.finishedLoad = function () {
        this.isFinishLoading = true;
        this.isLoading = false;
        document.getElementById("btnSaveLead").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnSaveLead").disabled = false;
        document.getElementById("btnCloseLead").disabled = false;
    };
    // lead dates
    LeadComponent.prototype.setLeadDateRanged = function () {
        this.startLoading();
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
        this.leadCollectionView = new wijmo.collections.CollectionView(this.leadService.getListLeadData(this.leadStartDateValue, this.leadEndDateValue, this.filterLeadStatusSelectedValue));
        this.leadCollectionView.filter = this.filterFunction.bind(this);
        this.leadCollectionView.pageSize = 15;
        this.leadCollectionView.trackChanges = true;
    };
    LeadComponent.prototype.filterLeadStatusSelectedIndexChangedClick = function () {
        if (this.leadStatusClicked) {
            if (this.isLeadStatusSelected) {
                this.startLoading();
                this.getLeadData();
            }
            else {
                this.isLeadStatusSelected = true;
            }
        }
        else {
            this.leadStatusClicked = true;
        }
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
            if (this.isStartDateClicked) {
                this.startLoading();
                this.getLeadData();
            }
            else {
                this.isStartDateClicked = true;
            }
        }
        else {
            this.isLeadStartDateSelected = false;
        }
    };
    // event: lead end date
    LeadComponent.prototype.leadEndDateOnValueChanged = function () {
        if (!this.isLeadEndDateSelected) {
            if (this.isEndDateClicked) {
                this.startLoading();
                this.getLeadData();
            }
            else {
                this.isEndDateClicked = true;
            }
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
        this.leadAssignedUserObservableArray = this.leadService.getListUserData("lead", "");
    };
    // event: assigned to
    LeadComponent.prototype.cboAssignedToSelectedIndexChangedClick = function () {
        this.leadAssignedToUserId = this.leadAssignedToSelectedValue;
        this.validNull = true;
        // if ((typeof this.leadAssignedToUserId == 'undefined') || (this.leadAssignedToUserId == null)) {
        if (this.leadAssignedToUserId == null) {
            this.valid = false;
            this.getBorderColor();
            this.isValidNullValues = true;
        }
        else {
            this.valid = true;
            this.getBorderColor();
            this.isValidNullValues = false;
        }
    };
    // css classes
    LeadComponent.prototype.getBorderColor = function () {
        if (this.valid == true) {
            return '5px solid #42A948';
        }
        else {
            if (this.validNull == true) {
                return '5px solid #42A948';
            }
            else {
                return '5px solid #a94442';
            }
        }
    };
    // event: status
    LeadComponent.prototype.cboStatusSelectedIndexChangedClick = function () {
        this.leadStatus = this.leadStatusSelectedValue;
    };
    // btn Add lead
    LeadComponent.prototype.btnAddLeadClick = function () {
        this.isFinishLoading = false;
        this.isLoading = true;
        document.getElementById("btnSaveLead").disabled = true;
        document.getElementById("btnCloseLead").disabled = true;
        this.getListUser();
        this.leadName = "";
        this.leadAddress = "";
        this.leadContactPerson = "";
        this.leadContactPosition = "";
        this.leadContactEmail = "";
        this.leadContactNumber = "";
        this.leadReferredBy = "";
        this.leadRemarks = "";
        document.getElementById("leadName").value = " ";
        document.getElementById("leadAddress").value = " ";
        document.getElementById("leadContactPerson").value = " ";
        document.getElementById("leadContactPosition").value = " ";
        document.getElementById("leadContactEmail").value = " ";
        document.getElementById("leadContactNumber").value = " ";
        document.getElementById("leadReferredBy").value = " ";
        document.getElementById("leadRemarks").value = " ";
    };
    // btn edit lead
    LeadComponent.prototype.btnEditLead = function () {
        this.startLoading();
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
        var toastr;
        document.getElementById("btnDeleteLead").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnDeleteLead").disabled = true;
        document.getElementById("btnDeleteCloseLead").disabled = true;
        var currentSelectedLead = this.leadCollectionView.currentItem;
        this.leadService.deleteLeadData(currentSelectedLead.Id, toastr);
    };
    // refresh grid
    LeadComponent.prototype.refreshGrid = function () {
        this.startLoading();
        document.getElementById("btnRefresh").disabled = true;
        document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
        this.getLeadData();
    };
    // Export Leads
    LeadComponent.prototype.btnExportCSV = function () {
        var leadItems = new wijmo.collections.ObservableArray();
        this.leadCollectionView.moveToFirstPage();
        for (var p = 1; p <= this.leadCollectionView.pageCount; p++) {
            for (var i = 0; i < this.leadCollectionView.items.length; i++) {
                leadItems.push({
                    LeadDate: this.leadCollectionView.items[i].LeadDate,
                    LeadNumber: "LD-" + this.leadCollectionView.items[i].LeadNumber,
                    Lead: this.leadCollectionView.items[i].LeadName,
                    Address: this.leadCollectionView.items[i].Address,
                    ContactPerson: this.leadCollectionView.items[i].ContactPerson,
                    ContactPosition: this.leadCollectionView.items[i].ContactPosition,
                    ContactEmail: this.leadCollectionView.items[i].ContactEmail,
                    ContactPhoneNo: this.leadCollectionView.items[i].ContactPhoneNo,
                    ReferredBy: this.leadCollectionView.items[i].ReferredBy,
                    Remarks: this.leadCollectionView.items[i].Remarks,
                    EncodedByUser: this.leadCollectionView.items[i].EncodedByUser,
                    AssignedToUser: this.leadCollectionView.items[i].AssignedToUser,
                    LeadStatus: this.leadCollectionView.items[i].LeadStatus,
                });
            }
            this.leadCollectionView.moveToNextPage();
            if (p == this.leadCollectionView.pageCount) {
                this.leadCollectionView.moveToFirstPage();
            }
        }
        this.csvService.download(leadItems, 'Leads');
    };
    // show menu
    LeadComponent.prototype.showMenu = function () {
        document.getElementById("showTop").click();
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
        __metadata('design:paramtypes', [lead_service_1.LeadService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService, angular2_json2csv_1.CsvService])
    ], LeadComponent);
    return LeadComponent;
}());
exports.LeadComponent = LeadComponent;
//# sourceMappingURL=lead.component.js.map