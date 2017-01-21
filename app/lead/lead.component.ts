import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from './lead.service';

@Component({
  selector: 'my-lead',
  templateUrl: 'app/lead/lead.html'
})

export class LeadComponent implements OnInit {
  // global variables
  public leadStartDateValue: Date;
  public leadEndDateValue: Date;
  public isLeadStartDateSelected = true;
  public isLeadEndDateSelected = true;
  public leadCollectionView: wijmo.collections.CollectionView;
  public leadDateValue: Date;
  public leadReferredUserObservableArray: wijmo.collections.ObservableArray;

  // inject career service
  constructor(private leadService: LeadService, private router: Router) { }

  // btn Add lead
  btnAddLeadClick() {
    this.leadDateValue = new Date();
    this.getListUser();
  }

  // lead delete modal
  leadDeleteConfirmationModal() {

  }

  // user list
  getListUser() {
    this.leadReferredUserObservableArray = this.leadService.getListUserData();
  }

  // lead date ranged
  setLeadDateRanged() {
    this.leadStartDateValue = new Date();
    this.leadEndDateValue = new Date();
    this.leadDateValue = new Date();
    this.getListLead();
  }

  // list lead
  getListLead() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.getLeadData();
  }

  // lead service data
  getLeadData() {
    this.leadCollectionView = new wijmo.collections.CollectionView(this.leadService.getListLeadData(this.leadStartDateValue, this.leadEndDateValue));
    this.leadCollectionView.pageSize = 15;
    this.leadCollectionView.trackChanges = true;
  }

  // event: lead start date
  leadStartDateOnValueChanged() {
    if (!this.isLeadStartDateSelected) {
      this.getLeadData();
    } else {
      this.isLeadStartDateSelected = false;
    }
  }

  // event: lead end date
  leadEndDateOnValueChanged() {
    if (!this.isLeadEndDateSelected) {
      this.getLeadData();
    } else {
      this.isLeadEndDateSelected = false;
    }
  }

  // initialization
  ngOnInit() {
    this.setLeadDateRanged();
  }
}
