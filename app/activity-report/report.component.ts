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
    public fliterReportDocumentTypeArray = ['Lead', 'Quotation', 'Delivery', 'Support', 'Support - Technical', 'Support - Functional', 'Support - Customize', 'Software Development'];
    public fliterReportDocumentTypeSelectedValue = 'Lead';
    public fliterReportStatusArray = ['ALL', 'OPEN', 'CLOSE', 'DONE', 'WAITING FOR CLIENT', 'CANCELLED'];
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
            this.isReportStartDateSelected = true;
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
            this.isReportEndDateSelected = true;
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
        this.getReporData();
        this.getUserStaff();
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
            return (item.DocumentNumber.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.ActivityNumber.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.Customer.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.Product.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.HeaderRemarks.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.ParticularCategory.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.Activity.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.NumberOfHours.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.ActivityAmount.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.StaffUser.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1) ||
                (item.HeaderStatus.toLowerCase().indexOf(this.reportFilter.toLowerCase()) > -1);
        }

        return true;
    }

    // initialization
    ngOnInit() {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }

        this.setReportDateRanged();
    }
}
