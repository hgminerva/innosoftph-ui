import { Component, OnInit, Renderer, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from './lead.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
  public leadStatusArray = ['Open', 'Close', 'Cancelled'];
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

  // inject lead service
  constructor(
    private leadService: LeadService,
    private router: Router,
    private renderer: Renderer,
    private elementRef: ElementRef,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  // btn Add lead
  public btnAddLeadClick() {
    let leadNameId = document.getElementById('leadName');
    leadNameId.style.border = '1px solid #ccc;';
    this.getListUser();
  }

  // btn edit lead
  public btnEditLead() {
    var currentSelectedLead = this.leadCollectionView.currentItem;
    this.router.navigate(['/leadDetail', currentSelectedLead.Id]);
  }

  // get lead data from dom html doc.
  public getLeadValue() {
    let assignedToUserIdValue = "NULL";
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
      EncodedByUserId: this.leadEncodedByUserId.toString(),
      AssignedToUserId: assignedToUserIdValue,
      LeadStatus: this.leadStatus,
    }

    return dataObject;
  }

  // validate form
  public validateLeadForm() {

  }

  // btn save lead
  public btnSaveLead() {
    this.leadService.postLeadData(this.getLeadValue());
  }

  // delete lead
  public btnDeleteLeadClick() {
    var currentSelectedLead = this.leadCollectionView.currentItem;
    this.leadService.deleteLeadData(currentSelectedLead.Id);
  }

  // user list
  public getListUser() {
    this.leadEncodedUserObservableArray = this.leadService.getListUserData();
    this.leadAssignedUserObservableArray = this.leadService.getListUserData();
  }

  // lead date ranged
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
    this.leadCollectionView.pageSize = 15;
    this.leadCollectionView.trackChanges = true;
  }

  // event: lead start date
  public leadStartDateOnValueChanged() {
    if (!this.isLeadStartDateSelected) {
      this.getLeadData();
    } else {
      this.isLeadStartDateSelected = false;
    }
  }

  // event: lead end date
  public leadEndDateOnValueChanged() {
    if (!this.isLeadEndDateSelected) {
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

  // initialization
  ngOnInit() {
    this.setLeadDateRanged();
  }
}
