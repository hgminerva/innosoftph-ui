import { Component, OnInit, Renderer, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LeadService } from './lead.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-lead-detail',
  templateUrl: 'app/activity-lead/leadDetail.html'
})

export class LeadDetailComponent implements OnInit {
  // global variables
  public leadDateValue: Date;
  public isLeadDateSelected = true;
  public leadId: number;
  public leadName: String;
  public leadAddress: String;
  public leadContactPerson: String;
  public leadContactPosition: String;
  public leadContactEmail: String;
  public leadContactNumber: String;
  public leadAssignedToUserId: number;
  public leadReferredBy: String;
  public leadEncodedUserObservableArray: wijmo.collections.ObservableArray;
  // public leadEncodedBySelectedValue: number;
  public leadEncodedBySelectedValue: String;
  public leadAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public leadAssignedToSelectedValue: number;
  public leadRemarks: String;
  public leadStatusArray = ['OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING', 'DUPLICATE'];
  public leadStatusSelectedValue: String;
  public activityCollectionView: wijmo.collections.CollectionView;
  public activityDetailModalString: String;
  public activityId: number;
  public activityDateValue: Date;
  public activityLocations = [
    'Off-Site',
    'On-Site'
  ];
  public activityLocationsSelectedValue: String;
  public activityParticularCategories = [
    'Lead'
  ];
  public activityParticularCategorySelectedIndex = 0;
  public activityParticularCategorySelectedValue: String;
  public activityNoOfHours = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];
  public activityNoOfHoursSelectedValue: String;
  public activityStatus = ['OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING'];
  public activityStatusSelectedValue: String;
  public activityAmount: String;
  public isFinishLoading = false;
  public isLoading = true;

  // inject lead detail service
  constructor(
    private leadService: LeadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer,
    private elementRef: ElementRef,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  public backClicked() {
    window.history.back();
  }

  // start loading
  public startLoading() {
    this.slimLoadingBarService.start();
    this.slimLoadingBarService.progress = 30;
  }

  // complete loading
  public completeLoading() {
    this.slimLoadingBarService.complete();
  }

  public finishedLoad() {
    this.isFinishLoading = true;
    this.isLoading = false;
    (<HTMLButtonElement>document.getElementById("btnSaveLeadDetail")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseLeadDetail")).disabled = false;
  }

  // lead date ranged
  public setLeadDateValue() {
    this.leadDateValue = new Date();
    this.activityDateValue = new Date();
    this.getListActivity(false);
    (<HTMLButtonElement>document.getElementById("btnSaveLeadDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseLeadDetail")).disabled = true;
  }

  // encoded by user list
  public getListEncodedByUser() {
    this.leadEncodedUserObservableArray = this.leadService.getListUserData("leadDetail", "encodedByUser");
  }

  // assigned to user list
  public getListAssignedToUser() {
    this.leadAssignedUserObservableArray = this.leadService.getListUserData("leadDetail", "assignedToUser");
  }

  // event: assigned to
  public cboAssignedToSelectedIndexChangedClick() {
    this.leadAssignedToUserId = this.leadAssignedToSelectedValue;
  }

  // event: lead date
  public leadDateOnValueChanged() {
    if (this.isLeadDateSelected) {
      this.isLeadDateSelected = false;
    }
  }

  // set dropdown data
  public setDropdownSelectedValueData() {
    this.leadDateValue = new Date((<HTMLInputElement>document.getElementById("leadDateValue")).value.toString());
    this.leadStatusSelectedValue = (<HTMLInputElement>document.getElementById("leadStatusSelectedValue")).value.toString();
    // this.leadEncodedBySelectedValue = parseInt((<HTMLInputElement>document.getElementById("leadEncodedBySelectedValue")).value.toString());
    this.leadAssignedToSelectedValue = parseInt((<HTMLInputElement>document.getElementById("leadAssignedToSelectedValue")).value.toString());
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
      AssignedToUserId: assignedToUserIdValue,
      LeadStatus: this.leadStatusSelectedValue,
    }

    return dataObject;
  }

  // save lead detail
  public btnSaveLeadDetailClick() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveLeadDetail")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveLeadDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseLeadDetail")).disabled = true;
    this.leadService.putLeadData(this.getIdUrlParameter(), this.getLeadValue(), toastr);
  }

  // get url Id parameter
  public getIdUrlParameter() {
    this.activatedRoute.params.subscribe(params => {
      this.leadId = params['id'];
    });

    return this.leadId;
  }

  // on key press decimal key
  public onKeyPressOnlyDecimalNumberKey(event: any) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  // on blur 
  public onBlurOnlyDecimalNumberKey() {
    (<HTMLInputElement>document.getElementById("activityAmount")).value = "";
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("activityAmount")).value = this.activityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }, 100);
  }

  // get lead data by id
  public getLeadServiceData() {
    this.leadService.getLeadById(this.getIdUrlParameter());
  }

  // activity line list
  public getListActivity(isLoadActivityOnly: Boolean) {
    this.activityCollectionView = new wijmo.collections.CollectionView(this.leadService.getListActivityByLeadId(this.getIdUrlParameter(), isLoadActivityOnly));
    this.activityCollectionView.pageSize = 15;
    this.activityCollectionView.trackChanges = true;
  }

  // activity line detail modal  
  public btnActivityDetailModal(add: boolean) {
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = false;
    if (add) {
      this.activityDetailModalString = "Add";
      this.activityId = 0;
      this.activityDateValue = new Date();
      this.activityLocationsSelectedValue = "Off-Site";
      this.activityParticularCategorySelectedValue = "New Installation";
      (<HTMLInputElement>document.getElementById("activityParticulars")).value = "";
      this.activityNoOfHoursSelectedValue = "0";
      (<HTMLInputElement>document.getElementById("activityAmount")).value = "0";
      this.activityAmount = "0";
      this.activityStatusSelectedValue = "OPEN";
    } else {
      this.activityDetailModalString = "Edit";
      let currentSelectedActivity = this.activityCollectionView.currentItem;
      this.activityId = currentSelectedActivity.Id;
      this.activityDateValue = new Date(currentSelectedActivity.ActivityDate);
      this.activityLocationsSelectedValue = currentSelectedActivity.Location;
      this.activityParticularCategorySelectedValue = currentSelectedActivity.ParticularCategory;
      (<HTMLInputElement>document.getElementById("activityParticulars")).value = currentSelectedActivity.Particulars;
      this.activityNoOfHoursSelectedValue = currentSelectedActivity.NumberOfHours;
      (<HTMLInputElement>document.getElementById("activityAmount")).value = currentSelectedActivity.ActivityAmount.toLocaleString();
      this.activityAmount = currentSelectedActivity.ActivityAmount.toLocaleString();
      this.activityStatusSelectedValue = currentSelectedActivity.ActivityStatus;
    }
  }

  // get activity data
  public getActivityData() {
    let activityDataObject = {
      ActivityDate: this.activityDateValue.toLocaleDateString(),
      Location: this.activityLocationsSelectedValue,
      ParticularCategory: this.activityParticularCategorySelectedValue,
      Particulars: (<HTMLInputElement>document.getElementById("activityParticulars")).value,
      NumberOfHours: this.activityNoOfHoursSelectedValue,
      ActivityAmount: this.activityAmount,
      ActivityStatus: this.activityStatusSelectedValue,
      LeadId: this.getIdUrlParameter()
    }

    return activityDataObject;
  }

  // save activity
  public btnActivitySaveClick() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = true;
    if (this.activityId == 0) {
      this.leadService.postActivityData(this.getActivityData(), toastr);
    } else {
      this.leadService.putActivityData(this.activityId, this.getActivityData(), toastr);
    }
  }

  // activity delete confirmation modal
  public btnActivityDeleteConfirmationModal() {
    let currentSelectedActivity = this.activityCollectionView.currentItem;
    this.activityId = currentSelectedActivity.Id;
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnActivityCloseDeleteConfirmation")).disabled = false;
  }

  // activity delete confirmation click
  public btnActivityDeleteConfirmationClick() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnActivityCloseDeleteConfirmation")).disabled = true;
    this.leadService.deleteActivityData(this.activityId, toastr);
  }

  // print
  public btnActivityPrintClick() {
    let currentSelectedActivity = this.activityCollectionView.currentItem;
    window.open('http://api.innosoft.ph/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
  }

  // show menu
  public showMenu() {
    document.getElementById("showTop").click();
  }

  // initialization
  public ngOnInit(): any {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }
    this.setLeadDateValue();
  }
}
