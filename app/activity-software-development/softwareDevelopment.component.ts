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
  public softwareDevelopmentStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
  public softwareDevelopmentStatusSelectedValue = "OPEN";
  public softwareDevelopmentNoOfHoursArray = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];
  public softwareDevelopmentNoOfHoursSelectedValue = "0";

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
    this.softwareDevelopmentCollectionView = new wijmo.collections.CollectionView(this.softwareDevelopmentService.getListSoftwareDevelopmentData(this.softwareDevelopmentStartDateValue, this.softwareDevelopmentEndDateValue));
    this.softwareDevelopmentCollectionView.filter = this.filterFunction.bind(this);
    this.softwareDevelopmentCollectionView.pageSize = 15;
    this.softwareDevelopmentCollectionView.trackChanges = true;
  }

  // event: softwareDevelopment start date
  public softwareDevelopmentStartDateOnValueChanged() {
    if (!this.isSoftwareDevelopmentStartDateSelected) {
      this.startLoading();
      this.getSoftwareDevelopmentData();
    } else {
      this.isSoftwareDevelopmentStartDateSelected = false;
    }
  }

  // event: softwareDevelopment end date
  public softwareDevelopmentEndDateOnValueChanged() {
    if (!this.isSoftwareDevelopmentEndDateSelected) {
      this.startLoading();
      this.getSoftwareDevelopmentData();
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
  }

  // edit software development
  public btnEditSoftwareDevelopment() {

  }

  // delete software development
  public btnDeleteSoftwareDevelopmentClick() {

  }

  // delete confirm software development
  public btnDeleteConfirmSoftwareDevelopmentClick() {

  }

  // save software development
  public btnSaveSoftwareDevelopment() {

  }

  // initialization
  ngOnInit() {
    this.setSoftwareDevelopmentDateRanged();
  }
}
