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
var report_service_1 = require('./report.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var ReportComponent = (function () {
    // inject service
    function ReportComponent(reportService, router, toastr, vRef, slimLoadingBarService) {
        this.reportService = reportService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isReportStartDateSelected = true;
        this.isReportStartDateClicked = false;
        this.isReportEndDateSelected = true;
        this.isReportEndDateClicked = false;
        this.fliterReportDocumentTypeArray = ['ALL', 'Lead', 'Quotation', 'Delivery', 'Support', 'Support - Technical', 'Support - Functional', 'Support - Customize', 'Software Development'];
        this.fliterReportDocumentTypeSelectedValue = 'Lead';
        this.fliterReportStatusArray = ['ALL', 'OPEN', 'CLOSE', 'DONE', 'WAITING FOR CLIENT', 'CANCELLED'];
        this.filterReportStatusSelectedValue = 'OPEN';
        this.reportStatusClicked = false;
        this.isReportStatusSelected = false;
        this.reportFilter = '';
        this.reportDocumentTypeClicked = true;
        this.isReportDocumentTypeSelected = false;
        this.assignedUserClicked = true;
        this.isAssignedUserSelected = false;
        this.isReportSummaryStartDateValueSelected = true;
        this.isReportSummaryEndDateValueSelected = true;
        this.isReportSummaryStartdDateClicked = false;
        this.isReportSummaryEndDateClicked = false;
        this.fliterReportSummaryStatusArray = ['ALL', 'OPEN', 'CLOSE', 'DONE', 'WAITING FOR CLIENT', 'CANCELLED'];
        this.filterReportSummaryStatusSelectedValue = 'OPEN';
        this.reportSummaryStatusClicked = false;
        this.isReportSummaryStatusSelected = false;
        this.filterSummaryReportFilter = '';
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    ReportComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    ReportComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // start date value changed
    ReportComponent.prototype.reportStartDateOnValueChanged = function () {
        if (!this.isReportStartDateSelected) {
            if (this.isReportStartDateClicked) {
                this.startLoading();
                this.getReporData();
            }
            else {
                this.isReportStartDateClicked = true;
            }
        }
        else {
            this.isReportStartDateSelected = false;
        }
    };
    // end date value changed
    ReportComponent.prototype.reportEndDateOnValueChanged = function () {
        if (!this.isReportEndDateSelected) {
            if (this.isReportEndDateClicked) {
                this.startLoading();
                this.getReporData();
            }
            else {
                this.isReportEndDateClicked = true;
            }
        }
        else {
            this.isReportEndDateSelected = false;
        }
    };
    // status selected index changed
    ReportComponent.prototype.filterReportStatusSelectedIndexChangedClick = function () {
        if (this.reportStatusClicked) {
            if (this.isReportStatusSelected) {
                this.startLoading();
                this.getReporData();
            }
            else {
                this.isReportStatusSelected = true;
            }
        }
        else {
            this.reportStatusClicked = true;
        }
    };
    ReportComponent.prototype.fliterReportDocumentTypeSelectedIndexChangedClick = function () {
        if (this.reportDocumentTypeClicked) {
            if (this.isReportDocumentTypeSelected) {
                this.startLoading();
                this.getReporData();
            }
            else {
                this.isReportDocumentTypeSelected = true;
            }
        }
        else {
            this.reportDocumentTypeClicked = true;
        }
    };
    ReportComponent.prototype.reportAssignedToSelectedIndexChangedClick = function () {
        if (this.assignedUserClicked) {
            if (this.isAssignedUserSelected) {
                this.startLoading();
                this.getReporData();
            }
            else {
                this.isAssignedUserSelected = true;
            }
        }
        else {
            this.assignedUserClicked = true;
        }
    };
    // report date ranged
    ReportComponent.prototype.setReportDateRanged = function () {
        this.startLoading();
        this.reportStartDateValue = new Date();
        this.reportEndDateValue = new Date();
        this.reportSummaryStartDateValue = new Date();
        this.reportSummaryEndDateValue = new Date();
        this.getReporData();
        this.getUserStaff();
        this.getActivitySummaryReportData();
    };
    ReportComponent.prototype.getUserStaff = function () {
        this.reportAssignedUserObservableArray = this.reportService.getListUserData();
    };
    ReportComponent.prototype.getReporData = function () {
        var userAssigned = "NULL";
        if (this.reportAssignedToSelectedValue != null) {
            userAssigned = this.reportAssignedToSelectedValue.toString();
        }
        this.reportCollectionView = new wijmo.collections.CollectionView(this.reportService.getListActivities(this.fliterReportDocumentTypeSelectedValue, this.reportStartDateValue, this.reportEndDateValue, this.filterReportStatusSelectedValue, userAssigned));
        this.reportCollectionView.filter = this.filterFunction.bind(this);
        this.reportCollectionView.pageSize = 15;
        this.reportCollectionView.trackChanges = true;
    };
    Object.defineProperty(ReportComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.reportFilter;
        },
        // filter
        set: function (value) {
            if (this.reportFilter != value) {
                this.reportFilter = value;
                if (this.reportToFilter) {
                    clearTimeout(this.reportToFilter);
                }
                var self = this;
                this.reportToFilter = setTimeout(function () {
                    self.reportCollectionView.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    ReportComponent.prototype.filterFunction = function (item) {
        if (this.reportFilter) {
            return (item.Document.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.ActivityNumber.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.Customer.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.Product.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.HeaderRemarks.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.ParticularCategory.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.Particulars.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.StaffUser.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.HeaderStatus.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // refresh grid
    ReportComponent.prototype.refreshGrid = function () {
        this.startLoading();
        document.getElementById("btnRefresh").disabled = true;
        document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
        this.getReporData();
    };
    ReportComponent.prototype.backClicked = function () {
        window.history.back();
    };
    // document
    ReportComponent.prototype.btnDocumentClick = function () {
        var currentSelectedActivity = this.reportCollectionView.currentItem;
        if (currentSelectedActivity.LeadId > 0) {
            this.startLoading();
            this.router.navigate(['/leadDetail', currentSelectedActivity.LeadId]);
        }
        else {
            if (currentSelectedActivity.QuotationId > 0) {
                this.startLoading();
                this.router.navigate(['/quotationDetail', currentSelectedActivity.QuotationId]);
            }
            else {
                if (currentSelectedActivity.DeliveryId > 0) {
                    this.startLoading();
                    this.router.navigate(['/deliveryDetail', currentSelectedActivity.DeliveryId]);
                }
                else {
                    if (currentSelectedActivity.SupportId > 0) {
                        this.startLoading();
                        this.router.navigate(['/supportDetail', currentSelectedActivity.SupportId]);
                    }
                    else {
                        if (currentSelectedActivity.SoftwareDevelopmentId > 0) {
                            this.startLoading();
                            this.router.navigate(['/softwareDevelopmentDetail', currentSelectedActivity.SoftwareDevelopmentId]);
                        }
                        else {
                            this.toastr.error('', 'No Document');
                        }
                    }
                }
            }
        }
    };
    ReportComponent.prototype.activityReportTabClick = function () {
        this.refreshGrid();
    };
    ReportComponent.prototype.activitySummaryReportTabClick = function () {
        this.refreshReportSummaryGrid();
    };
    ReportComponent.prototype.reportSummaryStartDateOnValueChanged = function () {
        if (!this.isReportSummaryStartDateValueSelected) {
            if (this.isReportStartDateClicked) {
                this.startLoading();
                this.getActivitySummaryReportData();
            }
            else {
                this.isReportStartDateClicked = true;
            }
        }
        else {
            this.isReportSummaryStartDateValueSelected = false;
        }
    };
    ReportComponent.prototype.reportSummaryEndDateOnValueChanged = function () {
        if (!this.isReportSummaryEndDateValueSelected) {
            if (this.isReportEndDateClicked) {
                this.startLoading();
                this.getActivitySummaryReportData();
            }
            else {
                this.isReportEndDateClicked = true;
            }
        }
        else {
            this.isReportSummaryEndDateValueSelected = false;
        }
    };
    ReportComponent.prototype.filterReportSummaryStatusSelectedIndexChangedClick = function () {
        if (this.reportSummaryStatusClicked) {
            if (this.isReportSummaryStatusSelected) {
                this.startLoading();
                this.getActivitySummaryReportData();
            }
            else {
                this.isReportSummaryStatusSelected = true;
            }
        }
        else {
            this.reportSummaryStatusClicked = true;
        }
    };
    ReportComponent.prototype.getActivitySummaryReportData = function () {
        this.reportSummaryCollectionView = new wijmo.collections.CollectionView(this.reportService.getListSummaryActivities(this.reportSummaryStartDateValue, this.reportSummaryEndDateValue, this.filterReportSummaryStatusSelectedValue));
        this.reportSummaryCollectionView.filter = this.filterSummaryReportFunction.bind(this);
        this.reportSummaryCollectionView.pageSize = 15;
        this.reportSummaryCollectionView.trackChanges = true;
    };
    Object.defineProperty(ReportComponent.prototype, "filterSummaryReport", {
        // filter
        get: function () {
            return this.filterSummaryReportFilter;
        },
        // filter
        set: function (value) {
            if (this.filterSummaryReportFilter != value) {
                this.filterSummaryReportFilter = value;
                if (this.filterSummaryReportToFilter) {
                    clearTimeout(this.filterSummaryReportToFilter);
                }
                var self = this;
                this.filterSummaryReportToFilter = setTimeout(function () {
                    self.reportSummaryCollectionView.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    ReportComponent.prototype.filterSummaryReportFunction = function (item) {
        if (this.filterSummaryReportFilter) {
            return (item.StaffUser.toLowerCase().indexOf(this.filterSummaryReportFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // refresh grid
    ReportComponent.prototype.refreshReportSummaryGrid = function () {
        this.startLoading();
        document.getElementById("btnRefreshReportSummary").disabled = true;
        document.getElementById("btnRefreshReportSummary").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
        this.getActivitySummaryReportData();
    };
    // initialization
    ReportComponent.prototype.ngOnInit = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.setReportDateRanged();
    };
    ReportComponent = __decorate([
        core_1.Component({
            selector: 'my-report',
            templateUrl: 'app/activity-report/report.html'
        }), 
        __metadata('design:paramtypes', [report_service_1.ReportService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], ReportComponent);
    return ReportComponent;
}());
exports.ReportComponent = ReportComponent;
//# sourceMappingURL=report.component.js.map