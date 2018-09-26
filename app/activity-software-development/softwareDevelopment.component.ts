import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SoftwareDevelopmentService } from './softwareDevelopment.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-contact',
  templateUrl: 'app/activity-software-development/softwareDevelopment.html'
})

export class SoftwareDevelopmentComponent implements OnInit {
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
  public softwareDevelopmentAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public softwareDevelopmentAssignedUserSelectedValue: number;
  public softwareDevelopmentStatusArray = ['OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING', 'DUPLICATE'];
  public softwareDevelopmentStatusSelectedValue = "OPEN";
  public softwareDevelopmentTypeArray = [
    'Request for Quotation',
    'Modification of Existing Program',
    'Software Development',
    'Data Tracing',
    'Integration',
    'Implementation'];
  public softwareDevelopmentTypeSelectedValue = "Software Development";
  public softwareDevelopmentNoOfHoursArray = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];
  public softwareDevelopmentNoOfHoursSelectedValue = "0";
  public softwareDevelopmentAssignedToUserId: number;
  public fliterSoftwareDevelopmentStatusArray = ['ALL', 'OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING', 'DUPLICATE'];
  public filterSoftwareDevelopmentStatusSelectedValue = "OPEN";
  public isStartDateClicked = false;
  public isEndDateClicked = false;
  public softwareDevelopmentStatusClicked = false;
  public isSoftwareDevelopmentStatusSelected = false;
  public softwareDevelopmentTask: String;
  public softwareDevelopmentRemarks: String;
  public softwareDevelopmentAmount: String = "0";

  // inject softwareDevelopment service
  constructor(
    private softwareDevelopmentService: SoftwareDevelopmentService,
    private router: Router,
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
    (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopment")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopment")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseSoftwareDevelopment")).disabled = false;
  }

  // softwareDevelopment dates
  public setSoftwareDevelopmentDateRanged() {
    this.startLoading();
    this.softwareDevelopmentStartDateValue = new Date();
    this.softwareDevelopmentEndDateValue = new Date();
    this.softwareDevelopmentDateValue = new Date();
    this.getListSoftwareDevelopment();
  }

  public getListSoftwareDevelopment() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.getSoftwareDevelopmentData();
  }

  // get softwareDevelopment data
  public getSoftwareDevelopmentData() {
    this.softwareDevelopmentCollectionView = new wijmo.collections.CollectionView(this.softwareDevelopmentService.getListSoftwareDevelopmentData(this.softwareDevelopmentStartDateValue, this.softwareDevelopmentEndDateValue, this.filterSoftwareDevelopmentStatusSelectedValue));
    this.softwareDevelopmentCollectionView.filter = this.filterFunction.bind(this);
    this.softwareDevelopmentCollectionView.pageSize = 15;
    this.softwareDevelopmentCollectionView.trackChanges = true;
  }

  public filterSoftwareDevelopmentStatusSelectedIndexChangedClick() {
    if (this.softwareDevelopmentStatusClicked) {
      if (this.isSoftwareDevelopmentStatusSelected) {
        this.startLoading();
        this.getSoftwareDevelopmentData();
      }
      else {
        this.isSoftwareDevelopmentStatusSelected = true;
      }
    }
    else {
      this.softwareDevelopmentStatusClicked = true;
    }
  }

  // event: softwareDevelopment start date
  public softwareDevelopmentStartDateOnValueChanged() {
    if (!this.isSoftwareDevelopmentStartDateSelected) {
      if (this.isStartDateClicked) {
        this.startLoading();
        this.getSoftwareDevelopmentData();
      }
      else {
        this.isStartDateClicked = true;
      }
    } else {
      this.isSoftwareDevelopmentStartDateSelected = false;
    }
  }

  // event: softwareDevelopment end date
  public softwareDevelopmentEndDateOnValueChanged() {
    if (!this.isSoftwareDevelopmentEndDateSelected) {
      if (this.isEndDateClicked) {
        this.startLoading();
        this.getSoftwareDevelopmentData();
      }
      else {
        this.isEndDateClicked = true;
      }
    } else {
      this.isSoftwareDevelopmentEndDateSelected = false;
    }
  }

  // filter
  get filter(): string {
    return this.softwareDevelopmentFilter;
  }

  // filter
  set filter(value: string) {
    if (this.softwareDevelopmentFilter != value) {
      this.softwareDevelopmentFilter = value;

      if (this.softwareDevelopmentToFilter) {
        clearTimeout(this.softwareDevelopmentToFilter);
      }

      var self = this;
      this.softwareDevelopmentToFilter = setTimeout(function () {
        self.softwareDevelopmentCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.softwareDevelopmentFilter) {
      return (item.SoftDevNumber.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1) ||
        (item.Task.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1) ||
        (item.ProjectName.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1) ||
        (item.Remarks.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1) ||
        (item.EncodedByUser.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1) ||
        (item.AssignedToUser.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1) ||
        (item.SoftDevStatus.toLowerCase().indexOf(this.softwareDevelopmentFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // project
  public getListProject() {
    this.softwareDevelopmentProjectObservableArray = this.softwareDevelopmentService.getListProjectData("softwareDevelopment");
  }

  // user
  public getListUser() {
    this.softwareDevelopmentAssignedUserObservableArray = this.softwareDevelopmentService.getListUserData("softwareDevelopment");
  }

  // add software development
  public btnAddSoftwareDevelopmentClick() {
    this.isFinishLoading = false;
    this.isLoading = true;
    (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopment")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseSoftwareDevelopment")).disabled = true;
    this.softwareDevelopmentDateValue = new Date();
    this.getListProject();

    this.softwareDevelopmentTask = "";
    this.softwareDevelopmentRemarks = "";

    setTimeout(() => {
      (<HTMLButtonElement>document.getElementById("softwareDevelopmentTask")).value = "";
      (<HTMLButtonElement>document.getElementById("softwareDevelopmentRemarks")).value = "";
    }, 1500);
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
      SoftDevType: this.softwareDevelopmentTypeSelectedValue,
      Amount: this.softwareDevelopmentAmount,
      AssignedToUserId: softwareDevelopmentAssignedToUserIdValue,
      SoftDevStatus: this.softwareDevelopmentStatusSelectedValue
    }

    return dataObject;
  }

  // edit software development
  public btnEditSoftwareDevelopment() {
    this.startLoading();
    let currentSelectedSoftwareDevelopment = this.softwareDevelopmentCollectionView.currentItem;
    this.router.navigate(['/softwareDevelopmentDetail', currentSelectedSoftwareDevelopment.Id]);
  }

  // delete software development
  public btnDeleteSoftwareDevelopmentClick() {
    (<HTMLButtonElement>document.getElementById("btnDeleteSoftwareDevelopment")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
    (<HTMLButtonElement>document.getElementById("btnDeleteSoftwareDevelopment")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseSoftwareDevelopment")).disabled = false;
  }

  // delete confirm software development
  public btnDeleteConfirmSoftwareDevelopmentClick() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnDeleteSoftwareDevelopment")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnDeleteSoftwareDevelopment")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseSoftwareDevelopment")).disabled = true;
    let currentSelectedSoftwareDevelopment = this.softwareDevelopmentCollectionView.currentItem;
    this.softwareDevelopmentService.deleteSoftwareDevelopmentData(currentSelectedSoftwareDevelopment.Id, toastr);
  }

  // save software development
  public btnSaveSoftwareDevelopment() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopment")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopment")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseSoftwareDevelopment")).disabled = true;
    this.softwareDevelopmentService.postSoftwareDevelopmentData(this.getSoftwareDevelopmentDataValue(), toastr);
  }

  public backClicked() {
    window.history.back();
  }

  // show menu
  public showMenu() {
    document.getElementById("showTop").click();
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
    (<HTMLInputElement>document.getElementById("softwareDevelopmentAmount")).value = "";
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("softwareDevelopmentAmount")).value = this.softwareDevelopmentAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }, 100);
  }

  // refresh grid
  public refreshGrid() {
    this.startLoading();
    (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
    this.getSoftwareDevelopmentData();
  }

  // initialization
  ngOnInit() {
    this.setSoftwareDevelopmentDateRanged();
  }
}
