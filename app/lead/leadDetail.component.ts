import { Component, OnInit, Renderer, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeadDetailService } from './leadDetail.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'my-lead-detail',
  templateUrl: 'app/lead/leadDetail.html'
})

export class LeadDetailComponent implements OnInit {
  @ViewChild('viewChildLeadName') viewChildLeadName: ElementRef;

  // global variables
  public leadDateValue: Date;
  public isLeadDateSelected = true;
  public leadCollectionView: wijmo.collections.CollectionView;
  public activityCollectionView: wijmo.collections.CollectionView;
  public leadEncodedUserObservableArray: wijmo.collections.ObservableArray;
  public leadEncodedBySelectedIndex = 0;
  public leadAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public leadAssignedToSelectedIndex = 0;
  public leadStatusArray = ['Open', 'Close', 'Cancelled'];
  public leadStatusSelectedIndex = -1;
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
  public activityDetailModalString: String;
  public id: number;

  // inject lead detail service
  constructor(
    private leadDetailService: LeadDetailService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer,
    private elementRef: ElementRef,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  // activity line detail modal  
  public activityDetailModal(add: boolean) {
    if (add) {
      this.activityDetailModalString = "Add";
    } else {
      this.activityDetailModalString = "Edit";
    }
  }

  // delete confirmation modal
  public activityDeleteConfirmationModal() {

  }

  // lead date ranged
  public setLeadDateValue() {
    this.leadDateValue = new Date();
    this.getListUser();
    this.getLeadServiceData();
  }

  // get lead data by id
  public getLeadServiceData() {
    this.leadDetailService.getLeadById(this.getIdUrlParameter());
  }

  // user list
  public getListUser() {
    this.leadEncodedUserObservableArray = this.leadDetailService.getListUserData();
    this.leadAssignedUserObservableArray = this.leadDetailService.getListUserData();
    this.getListActivity();
  }

  // get url Id parameter
  public getIdUrlParameter() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    return this.id;
  }

  // activity line list
  public getListActivity() {
    this.activityCollectionView = new wijmo.collections.CollectionView(this.leadDetailService.getListActivityData(100));
    this.activityCollectionView.pageSize = 15;
    this.activityCollectionView.trackChanges = true;
  }

  // event: lead date
  public leadDateOnValueChanged() {
    // if (this.isLeadDateSelected) {
    //   this.isLeadDateSelected = false;
    // }
  }

  // event: encoded by
  public cboEncodedBySelectedIndexChangedClick() {
    // if (this.leadEncodedBySelectedIndex >= 0) {
    //   this.leadEncodedByUserId = this.leadEncodedUserObservableArray[this.leadEncodedBySelectedIndex].Id;
    // } else {
    //   this.leadEncodedByUserId = 0;
    // }
  }

  // event: assigned to
  public cboAssignedToSelectedIndexChangedClick() {
    // if (this.leadAssignedToSelectedIndex >= 0) {
    //   this.leadAssignedToUserId = this.leadAssignedUserObservableArray[this.leadAssignedToSelectedIndex].Id;
    // } else {
    //   this.leadAssignedToUserId = 0;
    // }
  }

  // event: status
  public cboStatusSelectedIndexChangedClick() {
    this.leadStatus = this.leadStatusArray[this.leadStatusSelectedIndex];
  }

  // initialization
  ngOnInit() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.setLeadDateValue();
    // this.renderer.setElementProperty(this.viewChildLeadName.nativeElement, 'innerHTML', 'weee');
  }
}
