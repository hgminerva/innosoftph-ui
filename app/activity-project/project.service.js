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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ProjectService = (function () {
    // constructor
    function ProjectService(router, http, toastr) {
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        //  Global Variables
        this.headers = new http_1.Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
        });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    // list article - customer
    ProjectService.prototype.getListArticleData = function () {
        var articleObservableArray = new wijmo.collections.ObservableArray();
        var url = "http://api.innosoft.ph/api/article/list/byArticleTypeId/2";
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    articleObservableArray.push({
                        Id: results[i].Id,
                        Article: results[i].Article
                    });
                }
            }
            document.getElementById("btn-hidden-user-data").click();
        });
        return articleObservableArray;
    };
    // list user
    ProjectService.prototype.getListUserData = function () {
        var userObservableArray = new wijmo.collections.ObservableArray();
        var url = "http://api.innosoft.ph/api/user/list";
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    userObservableArray.push({
                        Id: results[i].Id,
                        FullName: results[i].FullName
                    });
                }
            }
            document.getElementById("btn-hidden-finished-load").click();
        });
        return userObservableArray;
    };
    // list project by date ranged (start date and end date)
    ProjectService.prototype.getListProjectData = function (projectStartDate, projectEndDate) {
        var url = "http://api.innosoft.ph/api/project/list/byProjectDateRange/" + projectStartDate.toDateString() + "/" + projectEndDate.toDateString();
        var projectObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    projectObservableArray.push({
                        Id: results[i].Id,
                        ProjectNumber: results[i].ProjectNumber,
                        ProjectDate: results[i].ProjectDate,
                        ProjectName: results[i].ProjectName,
                        ProjectType: results[i].ProjectType,
                        CustomerId: results[i].CustomerId,
                        Customer: results[i].Customer,
                        Particulars: results[i].Particulars,
                        EncodedByUserId: results[i].EncodedByUserId,
                        EncodedByUser: results[i].EncodedByUser,
                        ProjectManagerUserId: results[i].ProjectManagerUserId,
                        ProjectManagerUser: results[i].ProjectManagerUser,
                        ProjectStartDate: results[i].ProjectStartDate,
                        ProjectEndDate: results[i].ProjectEndDate,
                        ProjectStatus: results[i].ProjectStatus
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
        });
        return projectObservableArray;
    };
    // add project
    ProjectService.prototype.postProjectData = function (projectOject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/project/post";
        this.http.post(url, JSON.stringify(projectOject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            document.getElementById("btn-hidden-project-detail-modal").click();
            document.getElementById("btn-hidden-project-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnSaveProject").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveProject").disabled = false;
            document.getElementById("btnCloseProject").disabled = false;
        });
    };
    // update project
    ProjectService.prototype.putProjectData = function (id, projectOject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/project/put/" + id;
        this.http.put(url, JSON.stringify(projectOject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            document.getElementById("btn-hidden-project-detail-modal").click();
            document.getElementById("btn-hidden-project-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnSaveProject").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveProject").disabled = false;
            document.getElementById("btnCloseProject").disabled = false;
        });
    };
    // delete project
    ProjectService.prototype.deleteProjectData = function (id, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/project/delete/" + id;
        this.http.delete(url, this.options).subscribe(function (response) {
            _this.toastr.success('', 'Delete Successful');
            document.getElementById("btn-hidden-project-delete-modal").click();
            document.getElementById("btn-hidden-project-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnDeleteProject").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
            document.getElementById("btnDeleteProject").disabled = false;
            document.getElementById("btnDeleteCloseProject").disabled = false;
        });
    };
    ProjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map