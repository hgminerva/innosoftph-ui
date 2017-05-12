import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from './request.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-request',
  templateUrl: 'app/activity-request/request.html'
})

export class RequestComponent {
  // global variables
  public requestStartDateValue: Date;
  public isRequestStartDateSelected = true;
  public requestEndDateValue: Date;
  public isRequestEndDateSelected = true;
  public requestCollectionView: wijmo.collections.CollectionView;
  public requestFilter = '';
  public requestToFilter: any;
  public isStartDateClicked = false;
  public isEndDateClicked = false;
  public isFinishLoading = false;
  public isLoading = true;
  public isAdd: Boolean;
  public requestDateValue: Date;
  public isChecked: Boolean;
  public isNotChecked: Boolean;
  public isApproved: Boolean;
  public isNotApproved: Boolean;
  public requestNumber: String;
  public requestParticulars: String;
  public requestEncodedByUser: String;
  public requestCheckedBy: String;
  public requestCheckedRemarks: String;
  public requestApprovedBy: String;
  public requestApprovedRemarks: String;
  public requestId: number;
  public requestDetailModalString: String;
  public requestCheckApproveDetailModalString: String;
  public requestRemarks: String;
  public isCheckedOrApprovedForSave: Boolean;
  public requestTypeFilterObservableArray = ["Purchase", "Payment", "Leave", "Overtime"];
  public requestTypeFilterSelectedValue = "Purchase";
  public requestTypeObservableArray = ["Purchase", "Payment", "Leave", "Overtime"];
  public requestTypeSelectedValue = "Purchase";
  public requestTypeClicked = true;
  public isRequestTypeClicked = false;
  public requestUncheckDisapproveDetailModalString: String;
  public requestUncheckDisapproveDetailConfirmModalString: String;
  public requestUncheckDisapproveDetailConfirmBtnString: String;
  public isUncheckedOrDispprovedForSave: Boolean;
  public fliterRequestStatusArray = ["ALL", "OPEN", "CLOSE", "CANCELLED", "DUPLICATE"];
  public filterRequestStatusSelectedValue = "OPEN";
  public requestStatusClicked = true;
  public requestStatusArray = ["OPEN", "CLOSE", "CANCELLED", "DUPLICATE"];
  public requestStatusSelectedValue = "OPEN";

  // inject request service
  constructor(
    private requestService: RequestService,
    private router: Router,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef,
    private slimLoadingBarService: SlimLoadingBarService,
    private location: Location
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  public backClicked() {
    this.location.back();
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

  // filter
  get filter(): string {
    return this.requestFilter;
  }

  // filter
  set filter(value: string) {
    if (this.requestFilter != value) {
      this.requestFilter = value;

      if (this.requestToFilter) {
        clearTimeout(this.requestToFilter);
      }

      var self = this;
      this.requestToFilter = setTimeout(function () {
        self.requestCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.requestFilter) {
      return (item.RequestNumber.toLowerCase().indexOf(this.requestFilter.toLowerCase()) > -1) ||
        (item.RequestType.toLowerCase().indexOf(this.requestFilter.toLowerCase()) > -1) ||
        (item.Particulars.toLowerCase().indexOf(this.requestFilter.toLowerCase()) > -1) ||
        (item.EncodedByUser.toLowerCase().indexOf(this.requestFilter.toLowerCase()) > -1) ||
        (item.CheckedByUser.toLowerCase().indexOf(this.requestFilter.toLowerCase()) > -1) ||
        (item.ApprovedByUser.toLowerCase().indexOf(this.requestFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // request date ranged
  public setRequestDateRanged() {
    this.startLoading();
    this.requestStartDateValue = new Date();
    this.requestEndDateValue = new Date();
    this.getListRequestDataOnInit();
  }

  // event: request start date
  public requestStartDateOnValueChanged() {
    if (!this.isRequestStartDateSelected) {
      if (this.isStartDateClicked) {
        this.startLoading();
        this.getRequestData();
      } else {
        this.isStartDateClicked = true;
      }
    } else {
      this.isRequestStartDateSelected = false;
    }
  }

  // event: request end date
  public requestEndDateOnValueChanged() {
    if (!this.isRequestEndDateSelected) {
      if (this.isEndDateClicked) {
        this.startLoading();
        this.getRequestData();
      } else {
        this.isEndDateClicked = true;
      }
    } else {
      this.isRequestEndDateSelected = false;
    }
  }

  public cboRequestTypeSelectedIndexChangedClick() {
    if (!this.requestTypeClicked) {
      this.startLoading();
      this.getRequestData();
    } else {
      this.requestTypeClicked = false;
    }
  }

  public getListRequestDataOnInit() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.getRequestData();
  }

  // request data
  public getRequestData() {
    this.requestCollectionView = new wijmo.collections.CollectionView(this.requestService.getListRequestData(this.requestStartDateValue, this.requestEndDateValue, this.requestTypeFilterSelectedValue, this.filterRequestStatusSelectedValue));
    this.requestCollectionView.filter = this.filterFunction.bind(this);
    this.requestCollectionView.pageSize = 15;
    this.requestCollectionView.trackChanges = true;
  }

  // request detail
  public btnRequestDetailClick(add: boolean) {
    this.isFinishLoading = false;
    this.isLoading = true;
    (<HTMLButtonElement>document.getElementById("btnSaveRequest")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnSaveRequest")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseRequest")).disabled = true;
    setTimeout(() => {
      this.isFinishLoading = true;
      this.isLoading = false;
      (<HTMLButtonElement>document.getElementById("btnSaveRequest")).disabled = false;
      (<HTMLButtonElement>document.getElementById("btnCloseRequest")).disabled = false;
      if (add) {
        this.requestDetailModalString = "Add";
        this.isAdd = false;
        this.requestId = 0;
        this.requestDateValue = new Date();
        this.isChecked = false;
        this.isNotChecked = true;
        this.isApproved = false;
        this.isNotApproved = true;
        this.requestNumber = " ";
        this.requestTypeSelectedValue = " ";
        this.requestParticulars = " ";
        this.requestEncodedByUser = " ";
        this.requestCheckedBy = " ";
        this.requestCheckedRemarks = " ";
        this.requestApprovedBy = " ";
        this.requestApprovedRemarks = " ";
      } else {
        this.requestDetailModalString = "Edit";
        this.isAdd = true;
        let currentSelectedRequest = this.requestCollectionView.currentItem;
        this.requestId = currentSelectedRequest.Id;
        this.requestDateValue = new Date(currentSelectedRequest.RequestDate);
        this.requestNumber = currentSelectedRequest.RequestNumber;
        this.requestTypeSelectedValue = currentSelectedRequest.RequestType;
        this.requestParticulars = currentSelectedRequest.Particulars;
        this.requestStatusSelectedValue = currentSelectedRequest.RequestStatus;
        this.requestEncodedByUser = currentSelectedRequest.EncodedByUser;
        if (currentSelectedRequest.CheckedByUserId != null) {
          this.isChecked = true;
          this.isNotChecked = false;
          this.requestCheckedBy = currentSelectedRequest.CheckedByUser;
          this.requestCheckedRemarks = currentSelectedRequest.CheckedRemarks;
        } else {
          this.isChecked = false;
          this.isNotChecked = true;
          this.requestCheckedBy = " ";
          this.requestCheckedRemarks = " ";
        }
        if (currentSelectedRequest.ApprovedByUserId != null) {
          this.isApproved = true;
          this.isNotApproved = false;
          this.requestApprovedBy = currentSelectedRequest.ApprovedByUser;
          this.requestApprovedRemarks = currentSelectedRequest.ApprovedRemarks;
        } else {
          this.isApproved = false;
          this.isNotApproved = true;
          this.requestApprovedBy = " ";
          this.requestApprovedRemarks = " ";
        }
      }
    }, 1000);
  }

  // request data
  public getRequestObjectData() {
    let dataObject = {
      RequestDate: this.requestDateValue.toLocaleDateString(),
      RequestType: this.requestTypeSelectedValue,
      Particulars: this.requestParticulars,
      RequestStatus: this.requestStatusSelectedValue
    }

    return dataObject;
  }

  // save request
  public btnSaveRequest() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveRequest")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveRequest")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseRequest")).disabled = true;
    if (this.requestId == 0) {
      this.requestService.postRequestData(this.getRequestObjectData(), toastr);
    } else {
      this.requestService.putRequestData(this.requestId, this.getRequestObjectData(), toastr);
    }
  }

  // delete request
  public btnDeleteRequestClick() {
    (<HTMLButtonElement>document.getElementById("btnDeleteRequest")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
    (<HTMLButtonElement>document.getElementById("btnDeleteRequest")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseRequest")).disabled = false;
  }

  // delete confirm continuity
  public btnDeleteConfirmRequestClick() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnDeleteRequest")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnDeleteRequest")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseRequest")).disabled = true;
    let currentSelectedRequest = this.requestCollectionView.currentItem;
    this.requestService.deleteRequestData(currentSelectedRequest.Id, toastr);
  }

  // refresh grid
  public refreshGrid() {
    this.startLoading();
    (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
    this.getRequestData();
  }

  public btnCheckApprove(isCheckedApproved: Boolean) {
    (<HTMLButtonElement>document.getElementById("btnSaveCheckApproveRequest")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnSaveCheckApproveRequest")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseCheckApproveRequest")).disabled = false;
    let currentSelectedRequest = this.requestCollectionView.currentItem;
    // checked
    if (isCheckedApproved) {
      this.isCheckedOrApprovedForSave = true;
      this.requestCheckApproveDetailModalString = "Check Remarks";
      this.requestRemarks = currentSelectedRequest.CheckedRemarks;
    } else {
      // approved
      this.isCheckedOrApprovedForSave = false;
      this.requestCheckApproveDetailModalString = "Approve Remarks";
      this.requestRemarks = currentSelectedRequest.ApprovedRemarks;
    }
  }

  public btnSaveCheckApproveRequestClick() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveCheckApproveRequest")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveCheckApproveRequest")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseCheckApproveRequest")).disabled = true;

    let currentSelectedRequest = this.requestCollectionView.currentItem;
    if (this.isCheckedOrApprovedForSave) {
      let checkedRemarksDataObject = {
        CheckedRemarks: this.requestRemarks
      }
      this.requestService.checkRequestData(currentSelectedRequest.Id, checkedRemarksDataObject, toastr);
    } else {
      let approvedRemarksDataObject = {
        ApprovedRemarks: this.requestRemarks
      }
      this.requestService.approveRequestData(currentSelectedRequest.Id, approvedRemarksDataObject, toastr);
    }
  }

  // show menu
  public showMenu() {
    document.getElementById("showTop").click();
  }

  public btnUncheckDisapprove(isUncheckedDisapproved: Boolean) {
    if (isUncheckedDisapproved) {
      this.requestUncheckDisapproveDetailConfirmModalString = "Uncheck Request?"
      this.isUncheckedOrDispprovedForSave = true;
      this.requestUncheckDisapproveDetailModalString = "Uncheck";
    } else {
      if (!isUncheckedDisapproved) {
        this.requestUncheckDisapproveDetailConfirmModalString = "Disapprove Request?"
        this.isUncheckedOrDispprovedForSave = false;
        this.requestUncheckDisapproveDetailModalString = "Disapprove";
      }
    }

    (<HTMLButtonElement>document.getElementById("btnSaveUncheckDisapproveRequest")).innerHTML = "<i class='fa fa-save fa-fw'></i> Yes";
    (<HTMLButtonElement>document.getElementById("btnSaveUncheckDisapproveRequest")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseUncheckDisapproveRequest")).disabled = false;
  }

  public btnSaveUncheckDisapproveRequestClick() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveUncheckDisapproveRequest")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Processing";
    (<HTMLButtonElement>document.getElementById("btnSaveUncheckDisapproveRequest")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseUncheckDisapproveRequest")).disabled = true;

    let currentSelectedRequest = this.requestCollectionView.currentItem;
    if (this.isUncheckedOrDispprovedForSave) {
      this.requestService.uncheckRequestData(currentSelectedRequest.Id, toastr);
    } else {
      this.requestService.disapproveRequestData(currentSelectedRequest.Id, toastr);
    }
  }

  public filterRequestStatusSelectedIndexChangedClick() {
    if (!this.requestStatusClicked) {
      this.startLoading();
      this.getRequestData();
    } else {
      this.requestStatusClicked = false;
    }
  }

  // initialization
  ngOnInit() {
    this.setRequestDateRanged();
  }
}
