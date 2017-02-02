import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from './lead.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-lead',
  templateUrl: 'app/lead/lead.html'
})

export class LeadComponent implements OnInit {
  // global variables
  public leadStartDateValue: Date;
  public isLeadStartDateSelected = true;
  public leadEndDateValue: Date;
  public isLeadEndDateSelected = true;
  public leadDateValue: Date;
  public isLeadDateSelected = true;
  public leadCollectionView: wijmo.collections.CollectionView;
  public leadEncodedUserObservableArray: wijmo.collections.ObservableArray;
  public leadEncodedBySelectedIndex: number;
  public leadAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public leadAssignedToSelectedIndex: number;
  public leadStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
  public leadStatusSelectedIndex = 0;
  public leadName: String;
  public leadAddress: String;
  public leadContactPerson: String;
  public leadContactPosition: String;
  public leadContactEmail: String;
  public leadContactNumber: String;
  public leadEncodedByUserId: number;
  public leadAssignedToUserId: number;
  public leadReferredBy: String;
  public leadRemarks: String;
  public leadStatus: String;
  public leadFilter = '';
  public leadToFilter: any;

  // inject lead service
  constructor(
    private leadService: LeadService,
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

  // lead dates
  public setLeadDateRanged() {
    this.leadStartDateValue = new Date();
    this.leadEndDateValue = new Date();
    this.leadDateValue = new Date();
    this.getListLead();
  }

  // list lead
  public getListLead() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.getLeadData();
  }

  // lead service data
  public getLeadData() {
    this.leadCollectionView = new wijmo.collections.CollectionView(this.leadService.getListLeadData(this.leadStartDateValue, this.leadEndDateValue));
    this.leadCollectionView.filter = this.filterFunction.bind(this);
    this.leadCollectionView.pageSize = 15;
    this.leadCollectionView.trackChanges = true;
  }

  // filter
  get filter(): string {
    return this.leadFilter;
  }

  // filter
  set filter(value: string) {
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
  }

  // filter function
  public filterFunction(item: any) {
    if (this.leadFilter) {
      return (item.LeadNumber.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1) ||
        (item.LeadName.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1) ||
        (item.EncodedByUser.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1) ||
        (item.LeadStatus.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // event: lead start date
  public leadStartDateOnValueChanged() {
    if (!this.isLeadStartDateSelected) {
      document.getElementById("btn-hidden-start-loading").click();
      this.getLeadData();
    } else {
      this.isLeadStartDateSelected = false;
    }
  }

  // event: lead end date
  public leadEndDateOnValueChanged() {
    if (!this.isLeadEndDateSelected) {
      document.getElementById("btn-hidden-start-loading").click();
      this.getLeadData();
    } else {
      this.isLeadEndDateSelected = false;
    }
  }

  // event: lead date
  public leadDateOnValueChanged() {
    if (this.isLeadDateSelected) {
      this.isLeadDateSelected = false;
    }
  }

  // user list
  public getListUser() {
    this.leadEncodedUserObservableArray = this.leadService.getListUserData("lead", "");
    this.leadAssignedUserObservableArray = this.leadService.getListUserData("lead", "");
  }

  // event: encoded by
  public cboEncodedBySelectedIndexChangedClick() {
    if (this.leadEncodedBySelectedIndex >= 0) {
      this.leadEncodedByUserId = this.leadEncodedUserObservableArray[this.leadEncodedBySelectedIndex].Id;
    } else {
      this.leadEncodedByUserId = 0;
    }
  }

  // event: assigned to
  public cboAssignedToSelectedIndexChangedClick() {
    if (this.leadAssignedToSelectedIndex >= 0) {
      this.leadAssignedToUserId = this.leadAssignedUserObservableArray[this.leadAssignedToSelectedIndex].Id;
    } else {
      this.leadAssignedToUserId = 0;
    }
  }

  // event: status
  public cboStatusSelectedIndexChangedClick() {
    this.leadStatus = this.leadStatusArray[this.leadStatusSelectedIndex];
  }

  // btn Add lead
  public btnAddLeadClick() {
    (<HTMLButtonElement>document.getElementById("btnSaveLead")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnSaveLead")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseLead")).disabled = false;
    this.leadStatus = this.leadStatusArray[this.leadStatusSelectedIndex];
    this.getListUser();
  }

  // btn edit lead
  public btnEditLead() {
    document.getElementById("btn-hidden-start-loading").click();
    let currentSelectedLead = this.leadCollectionView.currentItem;
    this.router.navigate(['/leadDetail', currentSelectedLead.Id]);
  }

  // get lead data
  public getLeadValue() {
    let assignedToUserIdValue = "NULL";
    if (this.leadAssignedToUserId > 0) {
      assignedToUserIdValue = this.leadAssignedToUserId.toString();
    }

    let dataObject = {
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
    }

    return dataObject;
  }

  // btn save lead
  public btnSaveLead() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveLead")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveLead")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseLead")).disabled = true;
    this.leadService.postLeadData(this.getLeadValue(), toastr);
  }

  // delete click
  public deleteLeadClick() {
    (<HTMLButtonElement>document.getElementById("btnDeleteLead")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
    (<HTMLButtonElement>document.getElementById("btnDeleteLead")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseLead")).disabled = false;
  }

  // delete lead
  public btnDeleteConfirmLeadClick() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnDeleteLead")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnDeleteLead")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseLead")).disabled = true;
    let currentSelectedLead = this.leadCollectionView.currentItem;
    this.leadService.deleteLeadData(currentSelectedLead.Id, toastr);
  }

  // initialization
  ngOnInit() {
    this.setLeadDateRanged();
  }
}
