import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from './lead.service';
import { Lead } from './lead';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-lead',
  templateUrl: 'app/activity-lead/lead.html'
})

export class LeadComponent implements OnInit {
  // global variables
  public leadStartDateValue: Date;
  public isLeadStartDateSelected = true;
  public leadEndDateValue: Date;
  public isLeadEndDateSelected = true;
  public leadDateValue: Date;
  public isLeadDateSelected = true;
  public leadCollectionView: wijmo.collections.CollectionView;
  public leadAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public leadAssignedToSelectedValue: number;
  public leadStatusArray = ['OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING'];
  public leadStatusSelectedValue = "OPEN";
  public leadName: String;
  public leadAddress: String;
  public leadContactPerson: String;
  public leadContactPosition: String;
  public leadContactEmail: String;
  public leadContactNumber: String;
  public leadAssignedToUserId: number;
  public leadReferredBy: String;
  public leadRemarks: String;
  public leadStatus: String;
  public leadFilter = '';
  public leadToFilter: any;
  public isFinishLoading = false;
  public isLoading = true;
  public valid: Boolean;
  public validNull: Boolean;
  public isValidNullValues: Boolean;
  public isStartDateClicked = false;
  public isEndDateClicked = false;
  public fliterLeadStatusArray = ['ALL', 'OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING'];
  public filterLeadStatusSelectedValue = "OPEN";
  public leadStatusClicked = false;
  public isLeadStatusSelected = false;

  // inject lead service
  constructor(
    private leadService: LeadService,
    private router: Router,
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
    (<HTMLButtonElement>document.getElementById("btnSaveLead")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnSaveLead")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseLead")).disabled = false;
  }

  // lead dates
  public setLeadDateRanged() {
    this.startLoading();
    this.leadStartDateValue = new Date();
    this.leadEndDateValue = new Date();
    this.leadDateValue = new Date();
    this.getListLead();
  }

  // list lead
  public getListLead() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.getLeadData();
  }

  // lead service data
  public getLeadData() {
    this.leadCollectionView = new wijmo.collections.CollectionView(this.leadService.getListLeadData(this.leadStartDateValue, this.leadEndDateValue, this.filterLeadStatusSelectedValue));
    this.leadCollectionView.filter = this.filterFunction.bind(this);
    this.leadCollectionView.pageSize = 15;
    this.leadCollectionView.trackChanges = true;
  }

  public filterLeadStatusSelectedIndexChangedClick() {
    if (this.leadStatusClicked) {
      if (this.isLeadStatusSelected) {
        this.startLoading();
        this.getLeadData();
      }
      else {
        this.isLeadStatusSelected = true;
      }
    }
    else {
      this.leadStatusClicked = true;
    }
  }

  // filter
  get filter(): string {
    return this.leadFilter;
  }

  // filter
  set filter(value: string) {
    if (this.leadFilter != value) {
      this.leadFilter = value;

      if (this.leadToFilter) {
        clearTimeout(this.leadToFilter);
      }

      var self = this;
      this.leadToFilter = setTimeout(function () {
        self.leadCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.leadFilter) {
      return (item.LeadNumber.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1) ||
        (item.LeadName.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1) ||
        (item.EncodedByUser.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1) ||
        (item.LeadStatus.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // event: lead start date
  public leadStartDateOnValueChanged() {
    if (!this.isLeadStartDateSelected) {
      if (this.isStartDateClicked) {
        this.startLoading();
        this.getLeadData();
      }
      else {
        this.isStartDateClicked = true;
      }
    } else {
      this.isLeadStartDateSelected = false;
    }
  }

  // event: lead end date
  public leadEndDateOnValueChanged() {
    if (!this.isLeadEndDateSelected) {
      if (this.isEndDateClicked) {
        this.startLoading();
        this.getLeadData();
      }
      else {
        this.isEndDateClicked = true;
      }
    } else {
      this.isLeadEndDateSelected = false;
    }
  }

  // event: lead date
  public leadDateOnValueChanged() {
    if (this.isLeadDateSelected) {
      this.isLeadDateSelected = false;
    }
  }

  // user list
  public getListUser() {
    this.leadAssignedUserObservableArray = this.leadService.getListUserData("lead", "");
  }

  // event: assigned to
  public cboAssignedToSelectedIndexChangedClick() {
    this.leadAssignedToUserId = this.leadAssignedToSelectedValue;
    this.validNull = true;
    // if ((typeof this.leadAssignedToUserId == 'undefined') || (this.leadAssignedToUserId == null)) {
    if (this.leadAssignedToUserId == null) {
      this.valid = false;
      this.getBorderColor();
      this.isValidNullValues = true;
      // (<HTMLButtonElement>document.getElementById("btnSaveLead")).disabled = true;
    } else {
      this.valid = true;
      this.getBorderColor();
      this.isValidNullValues = false;
    }
  }

  // css classes
  public getBorderColor() {
    if (this.valid == true) {
      return '5px solid #42A948';
    } else {
      if (this.validNull == true) {
        return '5px solid #42A948';
      } else {
        return '5px solid #a94442';
      }
    }
  }

  // event: status
  public cboStatusSelectedIndexChangedClick() {
    this.leadStatus = this.leadStatusSelectedValue;
  }

  // btn Add lead
  public btnAddLeadClick() {
    this.isFinishLoading = false;
    this.isLoading = true;
    (<HTMLButtonElement>document.getElementById("btnSaveLead")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseLead")).disabled = true;
    this.getListUser();

    this.leadName = "";
    this.leadAddress = "";
    this.leadContactPerson = "";
    this.leadContactPosition = "";
    this.leadContactEmail = "";
    this.leadContactNumber = "";
    this.leadReferredBy = "";
    this.leadRemarks = "";

    (<HTMLButtonElement>document.getElementById("leadName")).value = " ";
    (<HTMLButtonElement>document.getElementById("leadAddress")).value = " ";
    (<HTMLButtonElement>document.getElementById("leadContactPerson")).value = " ";
    (<HTMLButtonElement>document.getElementById("leadContactPosition")).value = " ";
    (<HTMLButtonElement>document.getElementById("leadContactEmail")).value = " ";
    (<HTMLButtonElement>document.getElementById("leadContactNumber")).value = " ";
    (<HTMLButtonElement>document.getElementById("leadReferredBy")).value = " ";
    (<HTMLButtonElement>document.getElementById("leadRemarks")).value = " ";
  }

  // btn edit lead
  public btnEditLead() {
    this.startLoading();
    let currentSelectedLead = this.leadCollectionView.currentItem;
    this.router.navigate(['/leadDetail', currentSelectedLead.Id]);
  }

  // get lead data
  public getLeadValue() {
    let assignedToUserIdValue = "NULL";
    if (this.leadAssignedToUserId > 0) {
      assignedToUserIdValue = this.leadAssignedToUserId.toString();
    }

    let dataObject = {
      LeadDate: this.leadDateValue.toLocaleDateString(),
      LeadName: this.leadName,
      Address: this.leadAddress,
      ContactPerson: this.leadContactPerson,
      ContactPosition: this.leadContactPosition,
      ContactEmail: this.leadContactEmail,
      ContactPhoneNo: this.leadContactNumber,
      ReferredBy: this.leadReferredBy,
      Remarks: this.leadRemarks,
      AssignedToUserId: assignedToUserIdValue,
      LeadStatus: this.leadStatus,
    }

    return dataObject;
  }

  // btn save lead
  public btnSaveLead() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveLead")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveLead")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseLead")).disabled = true;
    this.leadService.postLeadData(this.getLeadValue(), toastr);
  }

  // delete click
  public deleteLeadClick() {
    (<HTMLButtonElement>document.getElementById("btnDeleteLead")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
    (<HTMLButtonElement>document.getElementById("btnDeleteLead")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseLead")).disabled = false;
  }

  // delete lead
  public btnDeleteConfirmLeadClick() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnDeleteLead")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnDeleteLead")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseLead")).disabled = true;
    let currentSelectedLead = this.leadCollectionView.currentItem;
    this.leadService.deleteLeadData(currentSelectedLead.Id, toastr);
  }

  // refresh grid
  public refreshGrid() {
    this.startLoading();
    (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
    this.getLeadData();
  }

  // show menu
  public showMenu() {
    document.getElementById("showTop").click();
  }

  // initialization
  ngOnInit() {
    this.setLeadDateRanged();
  }
}
