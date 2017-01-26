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
  public leadId: number;
  public leadName: String;
  public leadAddress: String;
  public leadContactPerson: String;
  public leadContactPosition: String;
  public leadContactEmail: String;
  public leadContactNumber: String;
  public leadEncodedByUserId: number;
  public leadAssignedToUserId: number;
  public leadReferredBy: String;
  public leadEncodedUserObservableArray: wijmo.collections.ObservableArray;
  public leadEncodedBySelectedIndex = -1;
  public leadEncodedBySelectedValue: String;
  public leadAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public leadAssignedToSelectedIndex = -1;
  public leadAssignedToSelectedValue: String;
  public leadRemarks: String;
  public leadStatus: String;
  public leadStatusArray = ['Open', 'Close', 'Cancelled'];
  public leadStatusSelectedIndex = -1;
  public leadStatusSelectedValue: String;
  public activityCollectionView: wijmo.collections.CollectionView;
  public activityDetailModalString: String;
  public activityId: number;
  public activityDateValue: Date;
  public activityParticularCategories = [
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
  public activityParticularCategorySelectedIndex = 0;
  public activityParticularCategorySelectedValue: String;
  public activityNoOfHours = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];
  public activityNoOfHoursSelectedIndex = 0;
  public activityNoOfHoursSelectedValue: String;
  public activityStatus = ['Open', 'Close', 'Cancelled'];
  public activityStatusSelectedIndex = 0;
  public activityStatusSelectedValue: String;
  public activityAmount: String;

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

  // lead date ranged
  public setLeadDateValue() {
    this.leadDateValue = new Date();
    this.getListUser();
  }

  // user list
  public getListUser() {
    this.leadEncodedUserObservableArray = this.leadService.getLeadDetailListUserData();
    this.leadAssignedUserObservableArray = this.leadService.getLeadDetailListUserData();

    // activity part
    this.activityDateValue = new Date();
    this.getListActivity();
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

  // set dropdown data
  public setDropdownSelectedValueData() {
    this.leadDateValue = new Date((<HTMLInputElement>document.getElementById("leadDateValue")).value.toString());
    this.leadEncodedBySelectedValue = (<HTMLInputElement>document.getElementById("leadEncodedBySelectedValue")).value.toString();
    this.leadAssignedToSelectedValue = (<HTMLInputElement>document.getElementById("leadAssignedToSelectedValue")).value.toString();
    this.leadStatusSelectedValue = (<HTMLInputElement>document.getElementById("leadStatusSelectedValue")).value.toString();
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
      // EncodedByUserId: this.leadEncodedByUserId.toString(),
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
  public getListActivity() {
    this.activityCollectionView = new wijmo.collections.CollectionView(this.leadService.getListActivityByLeadId(this.getIdUrlParameter()));
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
      this.activityParticularCategorySelectedValue = "New Installation";
      (<HTMLInputElement>document.getElementById("activityParticulars")).value = "";
      this.activityNoOfHoursSelectedValue = "0";
      (<HTMLInputElement>document.getElementById("activityAmount")).value = "0";
      this.activityAmount = "0";
      this.activityStatusSelectedValue = "Open";
    } else {
      this.activityDetailModalString = "Edit";
      let currentSelectedActivity = this.activityCollectionView.currentItem;
      this.activityId = currentSelectedActivity.Id;
      this.activityDateValue = new Date(currentSelectedActivity.ActivityDate);
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
      CustomerId: "NULL",
      ProductId: "NULL",
      ParticularCategory: this.activityParticularCategorySelectedValue,
      Particulars: (<HTMLInputElement>document.getElementById("activityParticulars")).value,
      NumberOfHours: this.activityNoOfHoursSelectedValue,
      ActivityAmount: this.activityAmount,
      ActivityStatus: this.activityStatusSelectedValue,
      LeadId: this.getIdUrlParameter(),
      QuotationId: "NULL",
      DeliveryId: "NULL",
      SupportId: "NULL",
      LeadStatus: this.activityStatusSelectedValue
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

  // initialization
  public ngOnInit(): any {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }
    this.setLeadDateValue();
  }
}
