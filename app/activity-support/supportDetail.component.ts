import { Component, OnInit, Renderer, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SupportService } from './support.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-activity-support-detail',
  templateUrl: 'app/activity-support/supportDetail.html'
})

export class SupportDetailComponent implements OnInit {
  // global variables
  public supportId: number;
  public supportDateValue: Date;
  public supportContinuityObservableArray: wijmo.collections.ObservableArray;
  public supportContinuitySelectedIndex = -1;
  public supportContinuitySelectedValue: String;
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
  public supportIssueCategorySelectedIndex = 0;
  public supportIssueCategorySelectedValue: String;
  public supportIssue: String;
  public supportCustomerObservableArray: wijmo.collections.ObservableArray;
  public supportCustomerSelectedIndex = -1;
  public supportCustomerSelectedValue: String;
  public supportProductObservableArray: wijmo.collections.ObservableArray;
  public supportProductSelectedIndex = -1;
  public supportProductSelectedValue: String;
  public supportSeverityArray = [
    'High (3hrs. resolution)',
    'Moderate (1 day resolution)',
    'Low (2 day resolution)',
    'Gossip'
  ];
  public supportSeveritySelectedIndex = 0;
  public supportSeveritySelectedValue: String;
  public supportCaller: String;
  public supportRemarks: String;
  public supportScreenShotURL: String;
  public supportEncodedUserObservableArray: wijmo.collections.ObservableArray;
  public supportEncodedBySelectedValue: String;
  public supportAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public supportAssignedToSelectedIndex = -1;
  public supportAssignedToSelectedValue: String;
  public supportStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
  public supportStatusSelectedIndex = 0;
  public supportStatusSelectedValue: String;
  public supportAssignedToUserId: number;
  public supportContinuityId: number;
  public supportIssueCategory: String;
  public supportCustomerId: number;
  public supportProductId: number;
  public supportSeverity: String;
  public supportSupportStatus: String;
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
    private supportService: SupportService,
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

  // start loading
  public startLoading() {
    this.slimLoadingBarService.progress = 30;
    this.slimLoadingBarService.start();
  }

  // complete loading
  public completeLoading() {
    this.slimLoadingBarService.complete();
  }

  // lead date ranged
  public setContinuityDateValue() {
    this.activityDateValue = new Date();
    this.supportDateValue = new Date();
    this.getListContinuityData();
    this.getListActivity();
  }

  // support date value changed
  public supportDateOnValueChanged() {

  }

  // list lead
  public getListContinuityData() {
    this.supportContinuityObservableArray = this.supportService.getListContinuityData("supportDetail");
  }

  // list customer
  public getListCustomerData() {
    this.supportCustomerObservableArray = this.supportService.getListArticleData("supportDetail", 2);
  }

  // list product
  public getListProductData() {
    this.supportProductObservableArray = this.supportService.getListArticleData("supportDetail", 1);
  }

  // encoded to user list
  public getListEncodedByUserData() {
    this.supportEncodedUserObservableArray = this.supportService.getListUserData("supportDetail", "encodedByUser");
  }

  // assigned to user list
  public getListAssignedToUserData() {
    this.supportAssignedUserObservableArray = this.supportService.getListUserData("supportDetail", "assignedToUser");
  }

  // get service data
  public getSupportServiceData() {
    this.supportService.getSupportById(this.getIdUrlParameter());
  }

  // drop down data
  public setDropdownSelectedValueData() {
    this.supportDateValue = new Date((<HTMLInputElement>document.getElementById("supportDateValue")).value.toString());
    this.supportContinuitySelectedValue = (<HTMLInputElement>document.getElementById("supportContinuitySelectedValue")).value.toString();
    this.supportIssueCategorySelectedValue = (<HTMLInputElement>document.getElementById("supportIssueCategorySelectedValue")).value.toString();
    this.supportCustomerSelectedValue = (<HTMLInputElement>document.getElementById("supportCustomerSelectedValue")).value.toString();
    this.supportProductSelectedValue = (<HTMLInputElement>document.getElementById("supportProductSelectedValue")).value.toString();
    this.supportSeveritySelectedValue = (<HTMLInputElement>document.getElementById("supportSeveritySelectedValue")).value.toString();
    this.supportEncodedBySelectedValue = (<HTMLInputElement>document.getElementById("supportEncodedBySelectedValue")).value.toString();
    this.supportAssignedToSelectedValue = (<HTMLInputElement>document.getElementById("supportAssignedToSelectedValue")).value.toString();
    this.supportStatusSelectedValue = (<HTMLInputElement>document.getElementById("supportStatusSelectedValue")).value.toString();
  }

  // support continuuity selected index changed
  public cboSupportContinuitySelectedIndexChanged() {
    if (this.supportContinuitySelectedIndex >= 0) {
      this.supportContinuityId = this.supportContinuityObservableArray[this.supportContinuitySelectedIndex].Id;
    } else {
      this.supportContinuityId = 0;
    }
  }

  // support issue category selected index changed
  public cboSupportIssueCategorySelectedIndexChangedClick() {
    this.supportIssueCategory = this.supportIssueCategoryArray[this.supportIssueCategorySelectedIndex];
  }

  // support customer selected index changed
  public cboSupportCustomerSelectedIndexChangedClick() {
    if (this.supportCustomerSelectedIndex >= 0) {
      this.supportCustomerId = this.supportCustomerObservableArray[this.supportCustomerSelectedIndex].Id;
    } else {
      this.supportCustomerId = 0;
    }
  }

  // support product selected index changed
  public cboSupportProductSelectedIndexChangedClick() {
    if (this.supportProductSelectedIndex >= 0) {
      this.supportProductId = this.supportProductObservableArray[this.supportProductSelectedIndex].Id;
    } else {
      this.supportProductId = 0;
    }
  }

  // support severity selected index changed
  public cboSupportSeveritySelectedIndexChangedClick() {
    this.supportSeverity = this.supportSeverityArray[this.supportSeveritySelectedIndex];
  }

  // support assigned to selected index changed
  public cboAssignedToSelectedIndexChangedClick() {
    if (this.supportAssignedToSelectedIndex >= 0) {
      this.supportAssignedToUserId = this.supportAssignedUserObservableArray[this.supportAssignedToSelectedIndex].Id;
    } else {
      this.supportAssignedToUserId = 0;
    }
  }

  // support status to selected index changed
  public cboSupportStatusSelectedIndexChangedClick() {
    this.supportSupportStatus = this.supportStatusArray[this.supportStatusSelectedIndex];
  }

  // support values
  public getSupportObjectValue() {
    let assignedToUserIdValue = "NULL";
    if (this.supportAssignedToUserId > 0) {
      assignedToUserIdValue = this.supportAssignedToUserId.toString();
    }

    let dataObject = {
      SupportDate: this.supportDateValue.toLocaleDateString(),
      ContinuityId: this.supportContinuityId,
      IssueCategory: this.supportIssueCategory,
      Issue: (<HTMLInputElement>document.getElementById("supportIssue")).value,
      CustomerId: this.supportCustomerId,
      ProductId: this.supportProductId,
      Severity: this.supportSeverity,
      Caller: (<HTMLInputElement>document.getElementById("supportCaller")).value,
      Remarks: (<HTMLInputElement>document.getElementById("supportRemarks")).value,
      ScreenShotURL: (<HTMLInputElement>document.getElementById("supportScreenShotURL")).value,
      AssignedToUserId: assignedToUserIdValue,
      SupportStatus: this.supportSupportStatus
    }

    return dataObject;
  }

  // save support detail
  public btnSaveSupportDetailClick() {
    document.getElementById("btn-hidden-start-loading").click();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveSupportDetail")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveSupportDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseSupportDetail")).disabled = true;
    this.supportService.putSupportData(this.getIdUrlParameter(), this.getSupportObjectValue(), toastr);
  }

  // get url Id parameter
  public getIdUrlParameter() {
    this.activatedRoute.params.subscribe(params => {
      this.supportId = params['id'];
    });

    return this.supportId;
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

  // activity line list
  public getListActivity() {
    this.activityCollectionView = new wijmo.collections.CollectionView(this.supportService.getListActivityBySupportId(this.getIdUrlParameter()));
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
      CustomerId: this.supportCustomerId,
      ProductId: this.supportProductId,
      ParticularCategory: this.activityParticularCategorySelectedValue,
      Particulars: (<HTMLInputElement>document.getElementById("activityParticulars")).value,
      NumberOfHours: this.activityNoOfHoursSelectedValue,
      ActivityAmount: this.activityAmount,
      ActivityStatus: this.activityStatusSelectedValue,
      LeadId: "NULL",
      QuotationId: "NULL",
      DeliveryId: "NULL",
      SupportId: this.getIdUrlParameter(),
      LeadStatus: this.activityStatusSelectedValue
    }

    return activityDataObject;
  }

  // save activity
  public btnActivitySaveClick() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = true;
    if (this.activityId == 0) {
      this.supportService.postActivityData(this.getActivityData(), toastr);
    } else {
      this.supportService.putActivityData(this.activityId, this.getActivityData(), toastr);
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
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnActivityCloseDeleteConfirmation")).disabled = true;
    this.supportService.deleteActivityData(this.activityId, toastr);
  }

  // print
  public btnActivityPrintClick() {
    let currentSelectedActivity = this.activityCollectionView.currentItem;
    window.open('http://localhost:22626/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
  }

  // initialization
  public ngOnInit(): any {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }
    this.setContinuityDateValue();
  }
}
