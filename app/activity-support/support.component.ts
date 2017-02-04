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
  public supportIssueCategorySelectedIndex = -1;
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
  public supportSeveritySelectedIndex = -1;
  public supportCaller: String;
  public supportRemarks: String;
  public supportScreenShotURL: String;
  public supportAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public supportAssignedToSelectedIndex = -1;
  public supportStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
  public supportStatusSelectedIndex = -1;

  // inject lead service
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
  }

  // edit support
  public btnEditSupport() {
    document.getElementById("btn-hidden-start-loading").click();
    let currentSelectedLead = this.supportCollectionView.currentItem;
    this.router.navigate(['/supportDetail', currentSelectedLead.Id]);
  }

  // delete support
  public btnDeleteSupportClick() {

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
    this.supportAssignedUserObservableArray = this.supportService.getListUserData("support");
  }

  // support continuuity selected index changed
  public cboSupportContinuitySelectedIndexChanged() {

  }

  // support issue category selected index changed
  public cboSupportIssueCategorySelectedIndexChangedClick() {

  }

  // support customer selected index changed
  public cboSupportCustomerSelectedIndexChangedClick() {

  }

  // support product selected index changed
  public cboSupportProductSelectedIndexChangedClick() {

  }

  // support severity selected index changed
  public cboSupportSeveritySelectedIndexChangedClick() {

  }

  // support assigned to selected index changed
  public cboAssignedToSelectedIndexChangedClick() {

  }

  // support status to selected index changed
  public cboSupportStatusSelectedIndexChangedClick() {

  }

  // initialization
  ngOnInit() {
    this.setSupportDateRanged();
  }
}
