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
  public supportCustomerObservableArray: wijmo.collections.ObservableArray;
  public supportCustomerSelectedValue: number;
  public isSupportCustomerSelected = true;
  public supportContinuityObservableArray: wijmo.collections.ObservableArray;
  public supportContinuitySelectedValue: number;
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
  public supportIssueCategorySelectedValue = "New Installation";
  public supportIssue: String;
  public supportTypeArray = [ "Technical", "Functional" ];
  public supportTypeSelectedValue = "Technical";
  public supportSeverityArray = [
    'High (3hrs. resolution)',
    'Moderate (1 day resolution)',
    'Low (2 day resolution)',
    'Gossip'
  ];
  public supportSeveritySelectedValue = "High (3hrs. resolution)";
  public supportCaller: String;
  public supportRemarks: String;
  public supportScreenShotURL: String;
  public supportAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public supportAssignedToSelectedValue: number;
  public supportAssignedToUserId: number;
  public supportStatusArray = ['OPEN', 'CLOSE', 'WAITING FOR CLIENT', 'CANCELLED'];
  public supportStatusSelectedValue = "OPEN";
  public supportCustomerSelectedIndex: number;
  public isFinishLoading = false;
  public isLoading = true;
  public fliterSupportStatusArray = ['ALL', 'OPEN', 'CLOSE', 'WAITING FOR CLIENT', 'CANCELLED'];
  public filterSupportStatusSelectedValue = "OPEN";
  public isStartDateClicked = false;
  public isEndDateClicked = false;
  public fliterSupportTypeArray = ['ALL', 'Technical', 'Functional'];
  public filterSupportTypeSelectedValue = "ALL";

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

  public finishedLoad() {
    this.isFinishLoading = true;
    this.isLoading = false;
    (<HTMLButtonElement>document.getElementById("btnSaveSupport")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnSaveSupport")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseSupport")).disabled = false;
  }

  // support dates
  public setSupportDateRanged() {
    this.startLoading();
    this.supportStartDateValue = new Date();
    this.supportEndDateValue = new Date();
    this.supportDateValue = new Date();
    this.getListSupport();
  }

  // event: support start date
  public supportStartDateOnValueChanged() {
    if (!this.isSupportStartDateSelected) {
      if (this.isStartDateClicked) {
        this.startLoading();
        this.getSupportData();
      }
      else {
        this.isStartDateClicked = true;
      }
    } else {
      this.isSupportStartDateSelected = false;
    }
  }

  // event: support end date
  public supportEndDateOnValueChanged() {
    if (!this.isSupportEndDateSelected) {
      if (this.isEndDateClicked) {
        this.startLoading();
        this.getSupportData();
      }
      else {
        this.isEndDateClicked = true;
      }
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
    this.isFinishLoading = false;
    this.isLoading = true;
    (<HTMLButtonElement>document.getElementById("btnSaveSupport")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnSaveSupport")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseSupport")).disabled = true;
    this.supportCustomerSelectedIndex = 0;
    this.getListCustomer();
  }

  // support values
  public getSupportObjectValue() {
    let assignedToUserIdValue = "NULL";
    if (this.supportAssignedToSelectedValue != null) {
      assignedToUserIdValue = this.supportAssignedToSelectedValue.toString();
    }

    let dataObject = {
      SupportDate: this.supportDateValue.toLocaleDateString(),
      ContinuityId: this.supportContinuitySelectedValue,
      IssueCategory: this.supportIssueCategorySelectedValue,
      Issue: this.supportIssue,
      CustomerId: this.supportCustomerSelectedValue,
      SupportType: this.supportTypeSelectedValue,
      Severity: this.supportSeveritySelectedValue,
      Caller: this.supportCaller,
      Remarks: this.supportRemarks,
      ScreenShotURL: this.supportScreenShotURL,
      AssignedToUserId: assignedToUserIdValue,
      SupportStatus: this.supportStatusSelectedValue
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

  // list customer
  public getListCustomer() {
    this.supportCustomerObservableArray = this.supportService.getContuinityCustomerData("support");
  }

  // support customer selected index changed
  public cboSupportCustomerSelectedIndexChangedClick() {
    if (typeof this.supportCustomerSelectedValue != 'undefined') {
      this.getListContinuity(true);
    }
  }

  // list continuuity
  public getListContinuity(isSelectedCustomerOnly: Boolean) {
    let customerId = this.supportCustomerObservableArray[this.supportCustomerSelectedIndex].CustomerId;
    if (typeof this.supportCustomerSelectedValue != 'undefined') {
      customerId = this.supportCustomerSelectedValue;
    }

    this.supportContinuityObservableArray = this.supportService.getListContinuityData("support", customerId, isSelectedCustomerOnly);
  }

  // assigned to user list
  public getListAssignedToUser() {
    this.supportAssignedUserObservableArray = this.supportService.getListUserData("support", "assignedToUser");
  }

  // refresh grid
  public refreshGrid() {
    this.startLoading();
    (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
    this.getSupportData();
  }

  // show menu
  public showMenu() {
      document.getElementById("showTop").click();
  }
  
  public backClicked() {
    window.history.back();
  }

  // initialization
  ngOnInit() {
    this.setSupportDateRanged();
  }
}
