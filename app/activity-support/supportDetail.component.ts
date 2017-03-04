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
  public supportNumber: String;
  public supportDateValue: Date;
  public supportCustomerObservableArray: wijmo.collections.ObservableArray;
  public supportCustomerSelectedIndex = 0;
  public supportCustomerSelectedValue: number;
  public supportContinuityObservableArray: wijmo.collections.ObservableArray;
  public supportContinuitySelectedIndex = 0;
  public supportContinuitySelectedValue: number;
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
  public supportIssueCategorySelectedValue: String;
  public supportIssue: String;
  public supportTypeArray = ["Technical", "Functional"];
  public supportTypeSelectedValue: String;
  public supportSeverityArray = [
    'High (3hrs. resolution)',
    'Moderate (1 day resolution)',
    'Low (2 day resolution)',
    'Gossip'
  ];
  public supportSeveritySelectedValue: String;
  public supportCaller: String;
  public supportRemarks: String;
  public supportScreenShotURL: String;
  public supportEncodedUserObservableArray: wijmo.collections.ObservableArray;
  // public supportEncodedBySelectedValue: number;
  public supportEncodedBySelectedValue: String;
  public supportAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public supportAssignedToSelectedValue: number;
  public supportAssignedToUserId: number;
  public supportStatusArray = ['OPEN', 'CLOSE', 'WAITING FOR CLIENT', 'CANCELLED'];
  public supportStatusSelectedValue: String;
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
  public activityParticularCategorySelectedValue: String;
  public activityNoOfHours = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];
  public activityNoOfHoursSelectedValue: String;
  public activityStatus = ['OPEN', 'CLOSE', 'DONE', 'CANCELLED'];
  public activityStatusSelectedValue: String;
  public activityAmount: String;
  public isFinishLoading = false;
  public isLoading = true;
  public activityAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public activityAssignedToSelectedValue: number;
  public isSupport = false;
  public isActivityFinishLoading = false;
  public isActivityLoading = true;

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

  public finishedLoad() {
    this.isFinishLoading = true;
    this.isLoading = false;
    (<HTMLButtonElement>document.getElementById("btnSaveSupportDetail")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseSupportDetail")).disabled = false;
  }

  public activityFinishedLoad() {
    this.isActivityFinishLoading = true;
    this.isActivityLoading = false;
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = false;
  }

  // lead date ranged
  public setContinuityDateValue() {
    this.activityDateValue = new Date();
    this.supportDateValue = new Date();
    (<HTMLButtonElement>document.getElementById("btnSaveSupportDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseSupportDetail")).disabled = true;
    this.getListActivity(false);
  }

  // list customer
  public getListCustomerData() {
    this.supportCustomerObservableArray = this.supportService.getContuinityCustomerData("supportDetail");
  }

  // support customer selected index changed
  public cboSupportCustomerSelectedIndexChangedClick() {
    if (typeof this.supportCustomerSelectedValue != 'undefined') {
      this.getListContinuityData(true);
    }
  }

  // list Continuity
  public getListContinuityData(isSelectedCustomerOnly: Boolean) {
    if (typeof this.supportCustomerObservableArray[this.supportCustomerSelectedIndex] != 'undefined') {
      let customerId = this.supportCustomerObservableArray[this.supportCustomerSelectedIndex].CustomerId;
      if (typeof this.supportCustomerSelectedValue != 'undefined') {
        customerId = this.supportCustomerSelectedValue;
      }

      this.supportContinuityObservableArray = this.supportService.getListContinuityData("supportDetail", customerId, isSelectedCustomerOnly);
    };
  }

  public cboSupportContinuitySelectedIndexChanged() {
    if (typeof this.supportContinuityObservableArray[this.supportContinuitySelectedIndex] != 'undefined') {

    }
  }

  // encoded to user list
  public getListEncodedByUserData() {
    this.supportEncodedUserObservableArray = this.supportService.getListUserData("supportDetail", "encodedByUser");
  }

  // assigned to user list
  public getListAssignedToUserData() {
    this.supportAssignedUserObservableArray = this.supportService.getListUserData("supportDetail", "assignedToUser");
  }

  public getAssignedUser() {
    this.activityAssignedUserObservableArray = this.supportService.getListUserData("supportDetail", "activityAssignedToUser");
  }

  // get service data
  public getSupportServiceData() {
    this.supportService.getSupportById(this.getIdUrlParameter());
  }

  // drop down data
  public setDropdownSelectedValueData() {
    this.supportDateValue = new Date((<HTMLInputElement>document.getElementById("supportDateValue")).value.toString());
    this.supportCustomerSelectedValue = parseInt((<HTMLInputElement>document.getElementById("supportCustomerSelectedValue")).value.toString());
    this.supportIssueCategorySelectedValue = (<HTMLInputElement>document.getElementById("supportIssueCategorySelectedValue")).value.toString();
    this.supportTypeSelectedValue = (<HTMLInputElement>document.getElementById("supportTypeSelectedValue")).value.toString();
    this.supportSeveritySelectedValue = (<HTMLInputElement>document.getElementById("supportSeveritySelectedValue")).value.toString();
    // this.supportEncodedBySelectedValue = parseInt((<HTMLInputElement>document.getElementById("supportEncodedBySelectedValue")).value.toString());
    this.supportAssignedToSelectedValue = parseInt((<HTMLInputElement>document.getElementById("supportAssignedToSelectedValue")).value.toString());
    this.supportStatusSelectedValue = (<HTMLInputElement>document.getElementById("supportStatusSelectedValue")).value.toString();
    setTimeout(() => {
      this.supportContinuitySelectedValue = parseInt((<HTMLInputElement>document.getElementById("supportContinuitySelectedValue")).value.toString());
    }, 1000);
  }

  // support values
  public getSupportObjectValue() {
    let assignedToUserIdValue = "NULL";
    if (this.supportAssignedToSelectedValue != null) {
      assignedToUserIdValue = this.supportAssignedToSelectedValue.toString();
    }

    let productId = this.supportContinuityObservableArray[this.supportContinuitySelectedIndex].ProductId;
    let dataObject = {
      SupportDate: this.supportDateValue.toLocaleDateString(),
      ContinuityId: this.supportContinuitySelectedValue,
      IssueCategory: this.supportIssueCategorySelectedValue,
      Issue: (<HTMLInputElement>document.getElementById("supportIssue")).value,
      CustomerId: this.supportCustomerSelectedValue,
      ProductId: productId,
      SupportType: this.supportTypeSelectedValue,
      Severity: this.supportSeveritySelectedValue,
      Caller: (<HTMLInputElement>document.getElementById("supportCaller")).value,
      Remarks: (<HTMLInputElement>document.getElementById("supportRemarks")).value,
      ScreenShotURL: (<HTMLInputElement>document.getElementById("supportScreenShotURL")).value,
      AssignedToUserId: assignedToUserIdValue,
      SupportStatus: this.supportStatusSelectedValue
    }

    return dataObject;
  }

  // save support detail
  public btnSaveSupportDetailClick() {
    this.startLoading();
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
  public getListActivity(isLoadActivityOnly: Boolean) {
    this.activityCollectionView = new wijmo.collections.CollectionView(this.supportService.getListActivityBySupportId(this.getIdUrlParameter(), isLoadActivityOnly));
    this.activityCollectionView.pageSize = 15;
    this.activityCollectionView.trackChanges = true;
  }

  // activity line detail modal  
  public btnActivityDetailModal(add: boolean) {
    if (add) {
      this.activityDetailModalString = "Add";
      this.activityId = 0;
      this.activityDateValue = new Date();
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
      this.activityParticularCategorySelectedValue = currentSelectedActivity.ParticularCategory;
      (<HTMLInputElement>document.getElementById("activityParticulars")).value = currentSelectedActivity.Particulars;
      this.activityNoOfHoursSelectedValue = currentSelectedActivity.NumberOfHours;
      (<HTMLInputElement>document.getElementById("activityAmount")).value = currentSelectedActivity.ActivityAmount.toLocaleString();
      this.activityAmount = currentSelectedActivity.ActivityAmount.toLocaleString();
      this.activityStatusSelectedValue = currentSelectedActivity.ActivityStatus;
      this.activityAssignedToSelectedValue = currentSelectedActivity.StaffUserId;
    }
  }

  // get activity data
  public getActivityData() {
    let productId = this.supportContinuityObservableArray[this.supportContinuitySelectedIndex].ProductId;
    let activityDataObject = {
      ActivityDate: this.activityDateValue.toLocaleDateString(),
      StaffUserId: this.activityAssignedToSelectedValue,
      CustomerId: this.supportCustomerSelectedValue,
      ProductId: productId,
      ParticularCategory: this.activityParticularCategorySelectedValue,
      Particulars: (<HTMLInputElement>document.getElementById("activityParticulars")).value,
      NumberOfHours: this.activityNoOfHoursSelectedValue,
      ActivityAmount: this.activityAmount,
      ActivityStatus: this.activityStatusSelectedValue,
      LeadId: "NULL",
      QuotationId: "NULL",
      DeliveryId: "NULL",
      SupportId: this.getIdUrlParameter(),
      SoftwareDevelopmentId: "NULL",
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
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnActivityCloseDeleteConfirmation")).disabled = true;
    this.supportService.deleteActivityData(this.activityId, toastr);
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

  public backClicked() {
    window.history.back();
  }

  public viewScreenShotURLLink() {
    let screenShotURLLinkValue = (<HTMLInputElement>document.getElementById("supportScreenShotURL")).value;
    window.open(screenShotURLLinkValue, "_target");
  }

  // initialization
  public ngOnInit(): any {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }
    this.setContinuityDateValue();
  }
}
