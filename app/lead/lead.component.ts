import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from './lead.service';

@Component({
  selector: 'my-lead',
  templateUrl: 'app/lead/lead.html'
})

export class LeadComponent implements OnInit {
  // global variables
  public leadCollectionView: wijmo.collections.CollectionView;
  public leadDateValue: Date;
  public leadReferredUserObservableArray: wijmo.collections.ObservableArray;

  // inject career service
  constructor(private leadService: LeadService, private router: Router) { }

  // lead delete modal
  leadDeleteConfirmationModal() {

  }

  // values for Input date
  setLeadDateValue() {
    this.leadDateValue = new Date();
    this.getListUser();
  }

  // user list
  getListUser() {
    this.leadReferredUserObservableArray = this.leadService.getListUserData();
    this.getListLead();
  }

  getListLead() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.leadCollectionView = new wijmo.collections.CollectionView(this.leadService.getListLeadData(100));
    this.leadCollectionView.pageSize = 15;
    this.leadCollectionView.trackChanges = true;
  }

  // initialization
  ngOnInit() {
    this.setLeadDateValue();
  }
}
