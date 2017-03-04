import { Component, OnInit, Renderer, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SoftwareDevelopmentService } from './softwareDevelopment.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-contact',
  templateUrl: 'app/activity-software-development/softwareDevelopmentDetail.html'
})

export class SoftwareDevelopmentDetailComponent implements OnInit {
  // global variables
  public softwareDevelopmentStartDateValue: Date;
  public isSoftwareDevelopmentStartDateSelected = true;
  public softwareDevelopmentEndDateValue: Date;
  public isSoftwareDevelopmentEndDateSelected = true;
  public softwareDevelopmentDateValue: Date;
  public softwareDevelopmentCollectionView: wijmo.collections.CollectionView;
  public isFinishLoading = false;
  public isLoading = true;
  public softwareDevelopmentFilter = '';
  public softwareDevelopmentToFilter: any;
  public softwareDevelopmentProjectObservableArray: wijmo.collections.ObservableArray;
  public softwareDevelopmentProjectSelectedValue: number;
  public softwareDevelopmentProjectSelectedIndex = -1;
  public softwareDevelopmentAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public softwareDevelopmentAssignedUserSelectedValue: number;
  public softwareDevelopmentStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
  public softwareDevelopmentStatusSelectedValue = "OPEN";
  public softwareDevelopmentNoOfHoursArray = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];
  public softwareDevelopmentNoOfHoursSelectedValue = "0";
  public softwareDevelopmentId: number;
  public activityCollectionView: wijmo.collections.CollectionView;
  public activityDetailModalString: String;
  public activityId: number;
  public activityDateValue: Date;
  public activityParticularCategories = [
    'Report',
    'Form',
    'Query',
    'Module',
    'Others'
  ];
  public activityParticularCategorySelectedIndex = 0;
  public activityParticularCategorySelectedValue: String;
  public activityNoOfHours = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];
  public activityNoOfHoursSelectedValue: String;
  public activityStatus = ['OPEN', 'CLOSE', 'DONE', 'CANCELLED'];
  public activityStatusSelectedValue: String;
  public activityAmount: String;

  // inject softwareDevelopment detail service
  constructor(
    private softwareDevelopmentService: SoftwareDevelopmentService,
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
    (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopmentDetail")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseSoftwareDevelopmentDetail")).disabled = false;
  }

  // softwareDevelopment date value
  public setSoftwareDevelopmentDateValue() {
    this.softwareDevelopmentDateValue = new Date();
    this.activityDateValue = new Date();
    this.getListActivity(false);
    (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopmentDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseSoftwareDevelopmentDetail")).disabled = true;
  }

  // get url Id parameter
  public getIdUrlParameter() {
    this.activatedRoute.params.subscribe(params => {
      this.softwareDevelopmentId = params['id'];
    });

    return this.softwareDevelopmentId;
  }

  // project
  public getListProject() {
    this.softwareDevelopmentProjectObservableArray = this.softwareDevelopmentService.getListProjectData("softwareDevelopmentDetail");
  }

  // user
  public getListUser() {
    this.softwareDevelopmentAssignedUserObservableArray = this.softwareDevelopmentService.getListUserData("softwareDevelopmentDetail");
  }

  // set selected value for drop down
  public setDropdownSelectedValueData() {
    this.softwareDevelopmentDateValue = new Date((<HTMLInputElement>document.getElementById("softwareDevelopmentDateValue")).value.toString());
    this.softwareDevelopmentProjectSelectedValue = parseInt((<HTMLInputElement>document.getElementById("softwareDevelopmentProjectSelectedValue")).value.toString());
    this.softwareDevelopmentAssignedUserSelectedValue = parseInt((<HTMLInputElement>document.getElementById("softwareDevelopmentAssignedUserSelectedValue")).value.toString());
    this.softwareDevelopmentStatusSelectedValue = (<HTMLInputElement>document.getElementById("softwareDevelopmentStatusSelectedValue")).value.toString();
  }

  // software dev data
  public getSoftwareDevelopmentServiceData() {
    this.softwareDevelopmentService.getSoftwareDevelopmentById(this.getIdUrlParameter());
  }

  // get software development data
  public getSoftwareDevelopmentDataValue() {
    let softwareDevelopmentAssignedToUserIdValue = "NULL";
    if (this.softwareDevelopmentAssignedUserSelectedValue != null) {
      softwareDevelopmentAssignedToUserIdValue = this.softwareDevelopmentAssignedUserSelectedValue.toString();
    }

    let dataObject = {
      SoftDevDate: this.softwareDevelopmentDateValue.toLocaleDateString(),
      ProjectId: this.softwareDevelopmentProjectSelectedValue,
      Task: (<HTMLButtonElement>document.getElementById("softwareDevelopmentTask")).value,
      Remarks: (<HTMLButtonElement>document.getElementById("softwareDevelopmentRemarks")).value,
      NumberOfHours: this.softwareDevelopmentNoOfHoursSelectedValue,
      AssignedToUserId: softwareDevelopmentAssignedToUserIdValue,
      SoftDevStatus: this.softwareDevelopmentStatusSelectedValue
    }

    return dataObject;
  }

  // save softwareDevelopment detail
  public btnSaveSoftwareDevelopmentDetailClick() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopmentDetail")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopmentDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseSoftwareDevelopmentDetail")).disabled = true;
    this.softwareDevelopmentService.putSoftwareDevelopmentData(this.getIdUrlParameter(), this.getSoftwareDevelopmentDataValue(), toastr);
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
    this.activityCollectionView = new wijmo.collections.CollectionView(this.softwareDevelopmentService.getListActivityBySoftwareDevelopmentId(this.getIdUrlParameter(), isLoadActivityOnly));
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
    }
  }

  // get activity data
  public getActivityData() {
    let softwareDevelopmentCustomerId = this.softwareDevelopmentProjectObservableArray[this.softwareDevelopmentProjectSelectedIndex].CustomerId;
    let activityDataObject = {
      ActivityDate: this.activityDateValue.toLocaleDateString(),
      CustomerId: softwareDevelopmentCustomerId,
      ProductId: "NULL",
      ParticularCategory: this.activityParticularCategorySelectedValue,
      Particulars: (<HTMLInputElement>document.getElementById("activityParticulars")).value,
      NumberOfHours: this.activityNoOfHoursSelectedValue,
      ActivityAmount: this.activityAmount,
      ActivityStatus: this.activityStatusSelectedValue,
      LeadId: "NULL",
      QuotationId: "NULL",
      DeliveryId: "NULL",
      SupportId: "NULL",
      SoftwareDevelopmentId: this.getIdUrlParameter(),
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
      this.softwareDevelopmentService.postActivityData(this.getActivityData(), toastr);
    } else {
      this.softwareDevelopmentService.putActivityData(this.activityId, this.getActivityData(), toastr);
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
    this.softwareDevelopmentService.deleteActivityData(this.activityId, toastr);
  }

  // print
  public btnActivityPrintClick() {
    let currentSelectedActivity = this.activityCollectionView.currentItem;
    window.open('http://api.innosoft.ph/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
  }

  public backClicked() {
    window.history.back();
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
    this.setSoftwareDevelopmentDateValue();
  }
}
