import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from './report.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
    selector: 'my-report',
    templateUrl: 'app/activity-report/report.html'
})

export class ReportComponent implements OnInit {
    // global variables
    public reportStartDateValue: Date;
    public isReportStartDateSelected = true;
    public isReportStartDateClicked = false;
    public reportEndDateValue: Date;
    public isReportEndDateSelected = true;
    public isReportEndDateClicked = false;
    public fliterReportDocumentTypeArray = ['ALL', 'Lead', 'Quotation', 'Delivery', 'Support', 'Support - Technical', 'Support - Functional', 'Support - Customize', 'Software Development'];
    public fliterReportDocumentTypeSelectedValue = 'Lead';
    public fliterReportStatusArray = ['ALL', 'OPEN', 'CLOSE', 'DONE', 'WAITING FOR CLIENT', 'CANCELLED', 'FOR CLOSING'];
    public filterReportStatusSelectedValue = 'OPEN';
    public reportStatusClicked = false;
    public isReportStatusSelected = false;
    public reportCollectionView: wijmo.collections.CollectionView;
    public reportFilter = '';
    public reportToFilter: any;
    public reportAssignedUserObservableArray: wijmo.collections.ObservableArray;
    public reportAssignedToSelectedValue: number;
    public reportDocumentTypeClicked = true;
    public isReportDocumentTypeSelected = false;
    public assignedUserClicked = true;
    public isAssignedUserSelected = false;

    public reportSummaryStartDateValue: Date;
    public isReportSummaryStartDateValueSelected = true;
    public reportSummaryEndDateValue: Date;
    public isReportSummaryEndDateValueSelected = true;
    public isReportSummaryStartdDateClicked = false;
    public isReportSummaryEndDateClicked = false;

    public fliterReportSummaryStatusArray = ['ALL', 'OPEN', 'CLOSE', 'DONE', 'WAITING FOR CLIENT', 'CANCELLED', 'FOR CLOSING'];
    public filterReportSummaryStatusSelectedValue = 'OPEN';
    public reportSummaryStatusClicked = false;
    public isReportSummaryStatusSelected = false;
    public reportSummaryCollectionView: wijmo.collections.CollectionView;
    public filterSummaryReportFilter = '';
    public filterSummaryReportToFilter: any;

    // inject service
    constructor(
        private reportService: ReportService,
        private router: Router,
        private toastr: ToastsManager,
        private vRef: ViewContainerRef,
        private slimLoadingBarService: SlimLoadingBarService
    ) {
        this.toastr.setRootViewContainerRef(vRef);
    }

    // start loading
    public startLoading() {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    }

    // complete loading
    public completeLoading() {
        this.slimLoadingBarService.complete();
    }

    // start date value changed
    public reportStartDateOnValueChanged() {
        if (!this.isReportStartDateSelected) {
            if (this.isReportStartDateClicked) {
                this.startLoading();
                this.getReporData();
            } else {
                this.isReportStartDateClicked = true;
            }
        } else {
            this.isReportStartDateSelected = false;
        }
    }

    // end date value changed
    public reportEndDateOnValueChanged() {
        if (!this.isReportEndDateSelected) {
            if (this.isReportEndDateClicked) {
                this.startLoading();
                this.getReporData();
            } else {
                this.isReportEndDateClicked = true;
            }
        } else {
            this.isReportEndDateSelected = false;
        }
    }

    // status selected index changed
    public filterReportStatusSelectedIndexChangedClick() {
        if (this.reportStatusClicked) {
            if (this.isReportStatusSelected) {
                this.startLoading();
                this.getReporData();
            } else {
                this.isReportStatusSelected = true;
            }
        } else {
            this.reportStatusClicked = true;
        }
    }

    public fliterReportDocumentTypeSelectedIndexChangedClick() {
        if (this.reportDocumentTypeClicked) {
            if (this.isReportDocumentTypeSelected) {
                this.startLoading();
                this.getReporData();
            } else {
                this.isReportDocumentTypeSelected = true;
            }
        } else {
            this.reportDocumentTypeClicked = true;
        }
    }

    public reportAssignedToSelectedIndexChangedClick() {
        if (this.assignedUserClicked) {
            if (this.isAssignedUserSelected) {
                this.startLoading();
                this.getReporData();
            } else {
                this.isAssignedUserSelected = true;
            }
        } else {
            this.assignedUserClicked = true;
        }
    }

    // report date ranged
    public setReportDateRanged() {
        this.startLoading();
        this.reportStartDateValue = new Date();
        this.reportEndDateValue = new Date();
        this.reportSummaryStartDateValue = new Date();
        this.reportSummaryEndDateValue = new Date();
        this.getReporData();
        this.getUserStaff();
        this.getActivitySummaryReportData();
    }

    public getUserStaff() {
        this.reportAssignedUserObservableArray = this.reportService.getListUserData();
    }

    public getReporData() {
        let userAssigned = "NULL";
        if (this.reportAssignedToSelectedValue != null) {
            userAssigned = this.reportAssignedToSelectedValue.toString();
        }

        this.reportCollectionView = new wijmo.collections.CollectionView(this.reportService.getListActivities(this.fliterReportDocumentTypeSelectedValue, this.reportStartDateValue, this.reportEndDateValue, this.filterReportStatusSelectedValue, userAssigned));
        this.reportCollectionView.filter = this.filterFunction.bind(this);
        this.reportCollectionView.pageSize = 15;
        this.reportCollectionView.trackChanges = true;
    }

    // filter
    get filter(): string {
        return this.reportFilter;
    }

    // filter
    set filter(value: string) {
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
    }

    // filter function
    public filterFunction(item: any) {
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
    }

    // refresh grid
    public refreshGrid() {
        this.startLoading();
        (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = true;
        (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
        this.getReporData();
    }

    public backClicked() {
        window.history.back();
    }

    // document
    public btnDocumentClick() {
        let currentSelectedActivity = this.reportCollectionView.currentItem;
        if (currentSelectedActivity.LeadId > 0) {
            this.startLoading()
            this.router.navigate(['/leadDetail', currentSelectedActivity.LeadId]);
        } else {
            if (currentSelectedActivity.QuotationId > 0) {
                this.startLoading()
                this.router.navigate(['/quotationDetail', currentSelectedActivity.QuotationId]);
            } else {
                if (currentSelectedActivity.DeliveryId > 0) {
                    this.startLoading()
                    this.router.navigate(['/deliveryDetail', currentSelectedActivity.DeliveryId]);
                } else {
                    if (currentSelectedActivity.SupportId > 0) {
                        this.startLoading()
                        this.router.navigate(['/supportDetail', currentSelectedActivity.SupportId]);
                    } else {
                        if (currentSelectedActivity.SoftwareDevelopmentId > 0) {
                            this.startLoading()
                            this.router.navigate(['/softwareDevelopmentDetail', currentSelectedActivity.SoftwareDevelopmentId]);
                        } else {
                            this.toastr.error('', 'No Document');
                        }
                    }
                }
            }
        }
    }

    public activityReportTabClick() {
        this.refreshGrid();
    }

    public activitySummaryReportTabClick() {
        this.refreshReportSummaryGrid();
    }

    public reportSummaryStartDateOnValueChanged() {
        if (!this.isReportSummaryStartDateValueSelected) {
            if (this.isReportStartDateClicked) {
                this.startLoading();
                this.getActivitySummaryReportData();
            } else {
                this.isReportStartDateClicked = true;
            }
        } else {
            this.isReportSummaryStartDateValueSelected = false;
        }
    }

    public reportSummaryEndDateOnValueChanged() {
        if (!this.isReportSummaryEndDateValueSelected) {
            if (this.isReportEndDateClicked) {
                this.startLoading();
                this.getActivitySummaryReportData();
            } else {
                this.isReportEndDateClicked = true;
            }
        } else {
            this.isReportSummaryEndDateValueSelected = false;
        }
    }

    public filterReportSummaryStatusSelectedIndexChangedClick() {
        if (this.reportSummaryStatusClicked) {
            if (this.isReportSummaryStatusSelected) {
                this.startLoading();
                this.getActivitySummaryReportData();
            } else {
                this.isReportSummaryStatusSelected = true;
            }
        } else {
            this.reportSummaryStatusClicked = true;
        }
    }

    public getActivitySummaryReportData() {
        this.reportSummaryCollectionView = new wijmo.collections.CollectionView(this.reportService.getListSummaryActivities(this.reportSummaryStartDateValue, this.reportSummaryEndDateValue, this.filterReportSummaryStatusSelectedValue));
        this.reportSummaryCollectionView.filter = this.filterSummaryReportFunction.bind(this);
        this.reportSummaryCollectionView.pageSize = 15;
        this.reportSummaryCollectionView.trackChanges = true;
    }

    // filter
    get filterSummaryReport(): string {
        return this.filterSummaryReportFilter;
    }

    // filter
    set filterSummaryReport(value: string) {
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
    }

    // filter function
    public filterSummaryReportFunction(item: any) {
        if (this.filterSummaryReportFilter) {
            return (item.StaffUser.toLowerCase().indexOf(this.filterSummaryReportFilter.toLowerCase()) > -1);
        }

        return true;
    }

    // refresh grid
    public refreshReportSummaryGrid() {
        this.startLoading();
        (<HTMLButtonElement>document.getElementById("btnRefreshReportSummary")).disabled = true;
        (<HTMLButtonElement>document.getElementById("btnRefreshReportSummary")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
        this.getActivitySummaryReportData();
    }

    // initialization
    ngOnInit() {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }

        this.setReportDateRanged();
    }
}
