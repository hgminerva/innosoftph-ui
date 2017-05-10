import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from './project.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-project',
  templateUrl: 'app/activity-project/project.html'
})

export class ProjectComponent {
  // global variables
  public projectStartDateValue: Date;
  public isProjectStartDateSelected = true;
  public projectEndDateValue: Date;
  public isProjectEndDateSelected = true;
  public projectCollectionView: wijmo.collections.CollectionView;
  public projectFilter = '';
  public projectToFilter: any;
  public isFinishLoading = false;
  public isLoading = true;
  public isAdd: Boolean;
  public projectDetailModalString: String;
  public projectId: number;
  public projectNumber: String;
  public projectDateValue: Date;
  public projectName: String;
  public projectTypeObservableArray = ['Desktop', 'Web Application', 'Integration'];
  public projectTypeSelectedValue = "Desktop";
  public projectCustomerObservableArray: wijmo.collections.ObservableArray;
  public projectCustomerSelectedValue: String;
  public projectParticulars: String;
  public projectEncodedByUser: String;
  public projectManagerObservableArray: wijmo.collections.ObservableArray;
  public projectManagerSelectedValue: String;
  public projectStartDateDataValue: Date;
  public projectEndDateDataValue: Date;
  public projectStatusArray = ['OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING', 'DUPLICATE'];
  public projectStatusSelectedValue = "OPEN";
  public fliterProjectStatusArray = ['ALL', 'OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING', 'DUPLICATE'];
  public filterProjectStatusSelectedValue = "OPEN";
  public isStartDateClicked = false;
  public isEndDateClicked = false;
  public projectStatusClicked = false;
  public isProjectStatusSelected = false;

  // inject project service
  constructor(
    private projectService: ProjectService,
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
    return this.projectFilter;
  }

  // filter
  set filter(value: string) {
    if (this.projectFilter != value) {
      this.projectFilter = value;

      if (this.projectToFilter) {
        clearTimeout(this.projectToFilter);
      }

      var self = this;
      this.projectToFilter = setTimeout(function () {
        self.projectCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.projectFilter) {
      return (item.ProjectNumber.toLowerCase().indexOf(this.projectFilter.toLowerCase()) > -1) ||
        (item.Customer.toLowerCase().indexOf(this.projectFilter.toLowerCase()) > -1) ||
        (item.ProjectName.toLowerCase().indexOf(this.projectFilter.toLowerCase()) > -1) ||
        (item.EncodedByUser.toLowerCase().indexOf(this.projectFilter.toLowerCase()) > -1) ||
        (item.ProjectManagerUser.toLowerCase().indexOf(this.projectFilter.toLowerCase()) > -1) ||
        (item.ProjectStatus.toLowerCase().indexOf(this.projectFilter.toLowerCase()) > -1);
    }

    return true;
  }

  public filterProjectStatusSelectedIndexChangedClick() {
    if (this.projectStatusClicked) {
      if (this.isProjectStatusSelected) {
        this.startLoading();
        this.getListProjectData();
      }
      else {
        this.isProjectStatusSelected = true;
      }

    }
    else {
      this.projectStatusClicked = true;
    }
  }

  // project date ranged
  public setProjectDateRanged() {
    this.startLoading();
    this.projectStartDateValue = new Date();
    this.projectEndDateValue = new Date();
    this.projectDateValue = new Date();
    this.projectStartDateDataValue = new Date();
    this.projectEndDateDataValue = new Date();
    this.getListProjectData();
  }

  // event: project start date
  public projectStartDateOnValueChanged() {
    if (!this.isProjectStartDateSelected) {
      if (this.isStartDateClicked) {
        this.startLoading();
        this.getProjectData();
      }
      else {
        this.isStartDateClicked = true;
      }
    } else {
      this.isProjectStartDateSelected = false;
    }
  }

  // event: project end date
  public projectEndDateOnValueChanged() {
    if (!this.isProjectEndDateSelected) {
      if (this.isEndDateClicked) {
        this.startLoading();
        this.getProjectData();
      }
      else {
        this.isEndDateClicked = true;
      }
    } else {
      this.isProjectEndDateSelected = false;
    }
  }

  public getListProjectData() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.getProjectData();
  }

  // project data
  public getProjectData() {
    this.projectCollectionView = new wijmo.collections.CollectionView(this.projectService.getListProjectData(this.projectStartDateValue, this.projectEndDateValue, this.filterProjectStatusSelectedValue));
    this.projectCollectionView.filter = this.filterFunction.bind(this);
    this.projectCollectionView.pageSize = 15;
    this.projectCollectionView.trackChanges = true;
  }

  public finishedLoad() {
    this.isFinishLoading = true;
    this.isLoading = false;
    (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseProject")).disabled = false;
  }

  // customer data
  public getListCustomerServiceData() {
    this.projectCustomerObservableArray = this.projectService.getListArticleData();
  }

  // user data
  public getListUserServiceData() {
    this.projectManagerObservableArray = this.projectService.getListUserData();
  }

  // add continuity click
  public btnProjectDetailClick(add: boolean) {
    this.isFinishLoading = false;
    this.isLoading = true;
    (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseProject")).disabled = true;
    this.getListCustomerServiceData();
    if (add) {
      this.isAdd = false;
      this.projectDetailModalString = "Add";
      this.projectId = 0;
      this.projectNumber = "--";
      this.projectDateValue = new Date();
      this.projectName = "";
      this.projectTypeSelectedValue = "Desktop";
      this.projectParticulars = "";
      this.projectStartDateDataValue = new Date();
      this.projectEndDateDataValue = new Date();
      this.projectStatusSelectedValue = "OPEN";
    } else {
      this.isAdd = true;
      let currentSelectedContinuity = this.projectCollectionView.currentItem;
      this.projectDetailModalString = "Edit";
      this.projectId = currentSelectedContinuity.Id;
      this.projectNumber = currentSelectedContinuity.ProjectNumber;
      this.projectDateValue = new Date(currentSelectedContinuity.ProjectDate);
      this.projectName = currentSelectedContinuity.ProjectName;
      this.projectTypeSelectedValue = currentSelectedContinuity.ProjectType;
      this.projectCustomerSelectedValue = currentSelectedContinuity.CustomerId;
      this.projectParticulars = currentSelectedContinuity.Particulars;
      this.projectEncodedByUser = currentSelectedContinuity.EncodedByUser;
      this.projectManagerSelectedValue = currentSelectedContinuity.ProjectManagerUserId;
      this.projectStartDateDataValue = new Date(currentSelectedContinuity.ProjectStartDate);
      this.projectEndDateDataValue = new Date(currentSelectedContinuity.ProjectEndDate);
      this.projectStatusSelectedValue = currentSelectedContinuity.ProjectStatus;
    }
  }

  // project data
  public getProjectObjectData() {
    let dataObject = {
      ProjectDate: this.projectDateValue.toLocaleDateString(),
      ProjectName: this.projectName,
      ProjectType: this.projectTypeSelectedValue,
      CustomerId: this.projectCustomerSelectedValue,
      Particulars: this.projectParticulars,
      ProjectManagerUserId: this.projectManagerSelectedValue,
      ProjectStartDate: this.projectStartDateDataValue.toLocaleDateString(),
      ProjectEndDate: this.projectEndDateDataValue.toLocaleDateString(),
      ProjectStatus: this.projectStatusSelectedValue
    }

    return dataObject;
  }

  // save project
  public btnSaveProject() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseProject")).disabled = true;
    if (this.projectId == 0) {
      this.projectService.postProjectData(this.getProjectObjectData(), toastr);
    } else {
      this.projectService.putProjectData(this.projectId, this.getProjectObjectData(), toastr);
    }
  }

  // delete project
  public btnDeleteProjectClick() {
    (<HTMLButtonElement>document.getElementById("btnDeleteProject")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
    (<HTMLButtonElement>document.getElementById("btnDeleteProject")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseProject")).disabled = false;
  }

  // delete confirm continuity
  public btnDeleteConfirmProjectClick() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnDeleteProject")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnDeleteProject")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseProject")).disabled = true;
    let currentSelectedContinuity = this.projectCollectionView.currentItem;
    this.projectService.deleteProjectData(currentSelectedContinuity.Id, toastr);
  }

  // refresh grid
  public refreshGrid() {
    this.startLoading();
    (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
    this.getProjectData();
  }

  // show menu
  public showMenu() {
    document.getElementById("showTop").click();
  }

  // initialization
  ngOnInit() {
    this.setProjectDateRanged();
  }
}
