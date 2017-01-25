import { Component, OnInit, Renderer, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeadService } from './lead.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'my-lead-detail',
  templateUrl: 'app/lead/leadDetail.html'
})

export class LeadDetailComponent implements OnInit {
  // global variables
  public leadDateValue: Date;
  public isLeadDateSelected = true;
  public leadCollectionView: wijmo.collections.CollectionView;
  public activityCollectionView: wijmo.collections.CollectionView;
  public leadEncodedUserObservableArray: wijmo.collections.ObservableArray;
  public leadEncodedBySelectedIndex = -1;
  public leadEncodedBySelectedValue: String;
  public leadAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public leadAssignedToSelectedIndex = -1;
  public leadAssignedToSelectedValue: String;
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
  public leadStatusSelectedValue: String;
  public activityDetailModalString: String;
  public id: number;

  // inject lead detail service
  constructor(
    private leadService: LeadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer,
    private elementRef: ElementRef,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef,
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

  // get lead data
  public getLeadValue() {
    let assignedToUserIdValue = "NULL";
    if (this.leadAssignedToUserId > 0) {
      assignedToUserIdValue = this.leadAssignedToUserId.toString();
    }

    let dataObject = {
      LeadDate: this.leadDateValue.toLocaleDateString(),
      LeadName: (<HTMLInputElement>document.getElementById("leadName")).value,
      Address: (<HTMLInputElement>document.getElementById("leadAddress")).value,
      ContactPerson: (<HTMLInputElement>document.getElementById("leadContactPerson")).value,
      ContactPosition: (<HTMLInputElement>document.getElementById("leadContactPosition")).value,
      ContactEmail: (<HTMLInputElement>document.getElementById("leadContactEmail")).value,
      ContactPhoneNo: (<HTMLInputElement>document.getElementById("leadContactNumber")).value,
      ReferredBy: (<HTMLInputElement>document.getElementById("leadReferredBy")).value,
      Remarks: (<HTMLInputElement>document.getElementById("leadRemarks")).value,
      EncodedByUserId: this.leadEncodedByUserId.toString(),
      AssignedToUserId: assignedToUserIdValue,
      LeadStatus: this.leadStatus,
    }

    return dataObject;
  }

  // save lead detail
  public btnSaveLeadDetailClick() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveLeadDetail")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveLeadDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnPrintLeadDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseLeadDetail")).disabled = true;
    this.leadService.putLeadData(this.getIdUrlParameter(), this.getLeadValue(), toastr);
  }

  // activity delete confirmation modal
  public activityDeleteConfirmationModal() {

  }

  // lead date ranged
  public setLeadDateValue() {
    this.leadDateValue = new Date();
    this.getListUser();
  }

  // user list
  public getListUser() {
    this.leadEncodedUserObservableArray = this.leadService.getLeadDetailListUserData();
    this.leadAssignedUserObservableArray = this.leadService.getLeadDetailListUserData();
  }

  // set dropdown data
  public setDropdownSelectedValueData() {
    this.leadDateValue = new Date((<HTMLInputElement>document.getElementById("leadDateValue")).value.toString());
    this.leadEncodedBySelectedValue = (<HTMLInputElement>document.getElementById("leadEncodedBySelectedValue")).value.toString();
    this.leadAssignedToSelectedValue = (<HTMLInputElement>document.getElementById("leadAssignedToSelectedValue")).value.toString();
    this.leadStatusSelectedValue = (<HTMLInputElement>document.getElementById("leadStatusSelectedValue")).value.toString();
  }

  // get url Id parameter
  public getIdUrlParameter() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    return this.id;
  }

  // get lead data by id
  public getLeadServiceData() {
    this.leadService.getLeadById(this.getIdUrlParameter());
    this.getListActivity();
  }

  // activity line list
  public getListActivity() {
    this.activityCollectionView = new wijmo.collections.CollectionView();
    this.activityCollectionView.pageSize = 15;
    this.activityCollectionView.trackChanges = true;
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
  public ngOnInit(): any {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }
    this.setLeadDateValue();
  }
}
