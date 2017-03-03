"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var project_service_1 = require('./project.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var ProjectComponent = (function () {
    // inject project service
    function ProjectComponent(projectService, router, toastr, vRef, slimLoadingBarService, location) {
        this.projectService = projectService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.location = location;
        this.isProjectStartDateSelected = true;
        this.isProjectEndDateSelected = true;
        this.projectFilter = '';
        this.isFinishLoading = false;
        this.isLoading = true;
        this.projectTypeObservableArray = ['Desktop', 'Web Application', 'Integration'];
        this.projectTypeSelectedValue = "Desktop";
        this.projectStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
        this.projectStatusSelectedValue = "OPEN";
        this.fliterProjectStatusArray = ['ALL', 'OPEN', 'CLOSE', 'CANCELLED'];
        this.filterProjectStatusSelectedValue = "OPEN";
        this.isStartDateClicked = false;
        this.isEndDateClicked = false;
        this.projectStatusClicked = false;
        this.toastr.setRootViewContainerRef(vRef);
    }
    ProjectComponent.prototype.backClicked = function () {
        this.location.back();
    };
    // start loading
    ProjectComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    ProjectComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    Object.defineProperty(ProjectComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.projectFilter;
        },
        // filter
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    ProjectComponent.prototype.filterFunction = function (item) {
        if (this.projectFilter) {
            return (item.ProjectNumber.toLowerCase().indexOf(this.projectFilter.toLowerCase()) > -1) ||
                (item.Customer.toLowerCase().indexOf(this.projectFilter.toLowerCase()) > -1) ||
                (item.ProjectName.toLowerCase().indexOf(this.projectFilter.toLowerCase()) > -1) ||
                (item.EncodedByUser.toLowerCase().indexOf(this.projectFilter.toLowerCase()) > -1) ||
                (item.ProjectManagerUser.toLowerCase().indexOf(this.projectFilter.toLowerCase()) > -1) ||
                (item.ProjectStatus.toLowerCase().indexOf(this.projectFilter.toLowerCase()) > -1);
        }
        return true;
    };
    ProjectComponent.prototype.filterProjectStatusSelectedIndexChangedClick = function () {
        if (this.projectStatusClicked) {
            this.startLoading();
            this.getListProjectData();
        }
        else {
            this.projectStatusClicked = true;
        }
    };
    // project date ranged
    ProjectComponent.prototype.setProjectDateRanged = function () {
        this.startLoading();
        this.projectStartDateValue = new Date();
        this.projectEndDateValue = new Date();
        this.projectDateValue = new Date();
        this.projectStartDateDataValue = new Date();
        this.projectEndDateDataValue = new Date();
        this.getListProjectData();
    };
    // event: project start date
    ProjectComponent.prototype.projectStartDateOnValueChanged = function () {
        if (!this.isProjectStartDateSelected) {
            if (this.isStartDateClicked) {
                this.startLoading();
                this.getProjectData();
            }
            else {
                this.isStartDateClicked = true;
            }
        }
        else {
            this.isProjectStartDateSelected = false;
        }
    };
    // event: project end date
    ProjectComponent.prototype.projectEndDateOnValueChanged = function () {
        if (!this.isProjectEndDateSelected) {
            if (this.isEndDateClicked) {
                this.startLoading();
                this.getProjectData();
            }
            else {
                this.isEndDateClicked = true;
            }
        }
        else {
            this.isProjectEndDateSelected = false;
        }
    };
    ProjectComponent.prototype.getListProjectData = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.getProjectData();
    };
    // project data
    ProjectComponent.prototype.getProjectData = function () {
        this.projectCollectionView = new wijmo.collections.CollectionView(this.projectService.getListProjectData(this.projectStartDateValue, this.projectEndDateValue, this.filterProjectStatusSelectedValue));
        this.projectCollectionView.filter = this.filterFunction.bind(this);
        this.projectCollectionView.pageSize = 15;
        this.projectCollectionView.trackChanges = true;
    };
    ProjectComponent.prototype.finishedLoad = function () {
        this.isFinishLoading = true;
        this.isLoading = false;
        document.getElementById("btnSaveProject").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnSaveProject").disabled = false;
        document.getElementById("btnCloseProject").disabled = false;
    };
    // customer data
    ProjectComponent.prototype.getListCustomerServiceData = function () {
        this.projectCustomerObservableArray = this.projectService.getListArticleData();
    };
    // user data
    ProjectComponent.prototype.getListUserServiceData = function () {
        this.projectManagerObservableArray = this.projectService.getListUserData();
    };
    // add continuity click
    ProjectComponent.prototype.btnProjectDetailClick = function (add) {
        this.isFinishLoading = false;
        this.isLoading = true;
        document.getElementById("btnSaveProject").disabled = true;
        document.getElementById("btnCloseProject").disabled = true;
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
        }
        else {
            this.isAdd = true;
            var currentSelectedContinuity = this.projectCollectionView.currentItem;
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
    };
    // project data
    ProjectComponent.prototype.getProjectObjectData = function () {
        var dataObject = {
            ProjectDate: this.projectDateValue.toLocaleDateString(),
            ProjectName: this.projectName,
            ProjectType: this.projectTypeSelectedValue,
            CustomerId: this.projectCustomerSelectedValue,
            Particulars: this.projectParticulars,
            ProjectManagerUserId: this.projectManagerSelectedValue,
            ProjectStartDate: this.projectStartDateDataValue.toLocaleDateString(),
            ProjectEndDate: this.projectEndDateDataValue.toLocaleDateString(),
            ProjectStatus: this.projectStatusSelectedValue
        };
        return dataObject;
    };
    // save project
    ProjectComponent.prototype.btnSaveProject = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnSaveProject").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveProject").disabled = true;
        document.getElementById("btnCloseProject").disabled = true;
        if (this.projectId == 0) {
            this.projectService.postProjectData(this.getProjectObjectData(), toastr);
        }
        else {
            this.projectService.putProjectData(this.projectId, this.getProjectObjectData(), toastr);
        }
    };
    // delete project
    ProjectComponent.prototype.btnDeleteProjectClick = function () {
        document.getElementById("btnDeleteProject").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnDeleteProject").disabled = false;
        document.getElementById("btnDeleteCloseProject").disabled = false;
    };
    // delete confirm continuity
    ProjectComponent.prototype.btnDeleteConfirmProjectClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnDeleteProject").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnDeleteProject").disabled = true;
        document.getElementById("btnDeleteCloseProject").disabled = true;
        var currentSelectedContinuity = this.projectCollectionView.currentItem;
        this.projectService.deleteProjectData(currentSelectedContinuity.Id, toastr);
    };
    // refresh grid
    ProjectComponent.prototype.refreshGrid = function () {
        this.startLoading();
        document.getElementById("btnRefresh").disabled = true;
        document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
        this.getProjectData();
    };
    // initialization
    ProjectComponent.prototype.ngOnInit = function () {
        this.setProjectDateRanged();
    };
    ProjectComponent = __decorate([
        core_1.Component({
            selector: 'my-project',
            templateUrl: 'app/activity-project/project.html'
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService, common_1.Location])
    ], ProjectComponent);
    return ProjectComponent;
}());
exports.ProjectComponent = ProjectComponent;
//# sourceMappingURL=project.component.js.map