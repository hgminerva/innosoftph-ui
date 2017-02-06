import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SupportService } from './support.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-activity-support',
  templateUrl: 'app/activity-support/support.html'
})

export class SupportActivityComponent implements OnInit {
  // global variables
  public supportStartDateValue: Date;
  public isSupportStartDateSelected = true;
  public supportEndDateValue: Date;
  public isSupportEndDateSelected = true;
  public supportCollectionView: wijmo.collections.CollectionView;
  public supportFilter = '';
  public supportToFilter: any;
  public supportDateValue: Date;
  public supportContinuityObservableArray: wijmo.collections.ObservableArray;
  public supportContinuitySelectedIndex = -1;
  public supportIssueCategoryArray = [
    'New Installation',
    'Software Bug',
    'Data Tracing',
    'New Feature',
    'Data Tracing',
    'Hardware or Infrastructure Problem',
    'Retraining',
    'Reinstallation',
    'Progam Update',
    'Data Archive'
  ];
  public supportIssueCategorySelectedIndex = 0;
  public supportIssue: String;
  public supportCustomerObservableArray: wijmo.collections.ObservableArray;
  public supportCustomerSelectedIndex = -1;
  public supportProductObservableArray: wijmo.collections.ObservableArray;
  public supportProductSelectedIndex = -1;
  public supportSeverityArray = [
    'High (3hrs. resolution)',
    'Moderate (1 day resolution)',
    'Low (2 day resolution)',
    'Gossip'
  ];
  public supportSeveritySelectedIndex = 0;
  public supportCaller: String;
  public supportRemarks: String;
  public supportScreenShotURL: String;
  public supportAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public supportAssignedToSelectedIndex = -1;
  public supportStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
  public supportStatusSelectedIndex = 0;
  public supportAssignedToUserId: number;
  public supportContinuityId: number;
  public supportIssueCategory: String;
  public supportCustomerId: number;
  public supportProductId: number;
  public supportSeverity: String;
  public supportSupportStatus: String;

  // inject support service
  constructor(
    private supportService: SupportService,
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

  // support dates
  public setSupportDateRanged() {
    this.supportStartDateValue = new Date();
    this.supportEndDateValue = new Date();
    this.supportDateValue = new Date();
    this.getListSupport();
  }

  // event: support start date
  public supportStartDateOnValueChanged() {
    if (!this.isSupportStartDateSelected) {
      document.getElementById("btn-hidden-start-loading").click();
      this.getSupportData();
    } else {
      this.isSupportStartDateSelected = false;
    }
  }

  // event: support end date
  public supportEndDateOnValueChanged() {
    if (!this.isSupportEndDateSelected) {
      document.getElementById("btn-hidden-start-loading").click();
      this.getSupportData();
    } else {
      this.isSupportEndDateSelected = false;
    }
  }

  // list support
  public getListSupport() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.getSupportData();
  }

  // support data
  public getSupportData() {
    this.supportCollectionView = new wijmo.collections.CollectionView(this.supportService.getListSupportData(this.supportStartDateValue, this.supportEndDateValue));
    this.supportCollectionView.filter = this.filterFunction.bind(this);
    this.supportCollectionView.pageSize = 15;
    this.supportCollectionView.trackChanges = true;
  }

  // filter
  get filter(): string {
    return this.supportFilter;
  }

  // filter
  set filter(value: string) {
    if (this.supportFilter != value) {
      this.supportFilter = value;

      if (this.supportToFilter) {
        clearTimeout(this.supportToFilter);
      }

      var self = this;
      this.supportToFilter = setTimeout(function () {
        self.supportCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.supportFilter) {
      return (item.SupportNumber.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
        (item.Customer.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
        (item.Product.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
        (item.EncodedByUser.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
        (item.AssignedToUser.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
        (item.Remarks.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
        (item.SupportStatus.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1) ||
        (item.Issue.toLowerCase().indexOf(this.supportFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // add support
  public btnAddSupportClick() {
    this.getListContinuity();
    (<HTMLButtonElement>document.getElementById("btnSaveSupport")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnSaveSupport")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseSupport")).disabled = false;
  }

  // support values
  public getSupportObjectValue() {
    let assignedToUserIdValue = "NULL";
    if (this.supportAssignedToUserId > 0) {
      assignedToUserIdValue = this.supportAssignedToUserId.toString();
    }

    let dataObject = {
      SupportDate: this.supportDateValue.toLocaleDateString(),
      ContinuityId: this.supportContinuityId,
      IssueCategory: this.supportIssueCategory,
      Issue: this.supportIssue,
      CustomerId: this.supportCustomerId,
      ProductId: this.supportProductId,
      Severity: this.supportSeverity,
      Caller: this.supportCaller,
      Remarks: this.supportRemarks,
      ScreenShotURL: this.supportScreenShotURL,
      AssignedToUserId: assignedToUserIdValue,
      SupportStatus: this.supportSupportStatus
    }

    return dataObject;
  }

  // save support
  public btnSaveSupport() {
    document.getElementById("btn-hidden-start-loading").click();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveSupport")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveSupport")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseSupport")).disabled = true;
    this.supportService.postSupportData(this.getSupportObjectValue(), toastr);
  }

  // edit support
  public btnEditSupport() {
    document.getElementById("btn-hidden-start-loading").click();
    let currentSelectedSupport = this.supportCollectionView.currentItem;
    this.router.navigate(['/supportDetail', currentSelectedSupport.Id]);
  }

  // delete support
  public btnDeleteSupportClick() {
    (<HTMLButtonElement>document.getElementById("btnDeleteSupport")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
    (<HTMLButtonElement>document.getElementById("btnDeleteSupport")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseSupport")).disabled = false;
  }

  // delete support confirm
  public btnDeleteConfirmSupportClick() {
    document.getElementById("btn-hidden-start-loading").click();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnDeleteSupport")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnDeleteSupport")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseSupport")).disabled = true;
    let currentSelectedSupport = this.supportCollectionView.currentItem;
    this.supportService.deleteSupportData(currentSelectedSupport.Id, toastr);
  }

  // support date value changed
  public supportDateOnValueChanged() {

  }

  // list lead
  public getListContinuity() {
    this.supportContinuityObservableArray = this.supportService.getListContinuityData("support");
    this.getListCustomer();
  }

  // list customer
  public getListCustomer() {
    this.supportCustomerObservableArray = this.supportService.getListArticleData("support", 2);
    this.supportProductObservableArray = this.supportService.getListArticleData("support", 1);
    this.getListAssignedToUser();
  }

  // assigned to user list
  public getListAssignedToUser() {
    this.supportAssignedUserObservableArray = this.supportService.getListUserData("support", "");
  }

  // support continuuity selected index changed
  public cboSupportContinuitySelectedIndexChanged() {
    if (this.supportContinuitySelectedIndex >= 0) {
      this.supportContinuityId = this.supportContinuityObservableArray[this.supportContinuitySelectedIndex].Id;
    } else {
      this.supportContinuityId = 0;
    }
  }

  // support issue category selected index changed
  public cboSupportIssueCategorySelectedIndexChangedClick() {
    this.supportIssueCategory = this.supportIssueCategoryArray[this.supportIssueCategorySelectedIndex];
  }

  // support customer selected index changed
  public cboSupportCustomerSelectedIndexChangedClick() {
    if (this.supportCustomerSelectedIndex >= 0) {
      this.supportCustomerId = this.supportCustomerObservableArray[this.supportCustomerSelectedIndex].Id;
    } else {
      this.supportCustomerId = 0;
    }
  }

  // support product selected index changed
  public cboSupportProductSelectedIndexChangedClick() {
    if (this.supportProductSelectedIndex >= 0) {
      this.supportProductId = this.supportProductObservableArray[this.supportProductSelectedIndex].Id;
    } else {
      this.supportProductId = 0;
    }
  }

  // support severity selected index changed
  public cboSupportSeveritySelectedIndexChangedClick() {
    this.supportSeverity = this.supportSeverityArray[this.supportSeveritySelectedIndex];
  }

  // support assigned to selected index changed
  public cboAssignedToSelectedIndexChangedClick() {
    if (this.supportAssignedToSelectedIndex >= 0) {
      this.supportAssignedToUserId = this.supportAssignedUserObservableArray[this.supportAssignedToSelectedIndex].Id;
    } else {
      this.supportAssignedToUserId = 0;
    }
  }

  // support status to selected index changed
  public cboSupportStatusSelectedIndexChangedClick() {
    this.supportSupportStatus = this.supportStatusArray[this.supportStatusSelectedIndex];
  }

  // initialization
  ngOnInit() {
    this.setSupportDateRanged();
  }
}
