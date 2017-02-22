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
var SoftwareDevelopmentService = (function () {
    // constructor
    function SoftwareDevelopmentService(router, http, toastr) {
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
    // list project by status
    SoftwareDevelopmentService.prototype.getListProjectData = function (page) {
        var url = "http://api.innosoft.ph/api/project/list/byProjectStatus";
        var projectObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    projectObservableArray.push({
                        Id: results[i].Id,
                        ProjectNumberDetail: results[i].ProjectNumber + " - " + results[i].ProjectName,
                        ProjectNumber: results[i].ProjectNumber
                    });
                }
            }
            if (page == "softwareDevelopmentDetail") {
            }
            else {
                document.getElementById("btn-hidden-user-data").click();
            }
        });
        return projectObservableArray;
    };
    // list user
    SoftwareDevelopmentService.prototype.getListUserData = function (page) {
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
            if (page == "softwareDevelopmentDetail") {
            }
            else {
                document.getElementById("btn-hidden-finished-load").click();
            }
        });
        return userObservableArray;
    };
    // list software development by date ranged (start date and end date)
    SoftwareDevelopmentService.prototype.getListSoftwareDevelopmentData = function (softwareDevelopmentStartDate, softwareDevelopmentEndDate) {
        var url = "http://api.innosoft.ph/api/softwareDevelopment/list/bySoftwareDevelopmentDateRange/" + softwareDevelopmentStartDate.toDateString() + "/" + softwareDevelopmentEndDate.toDateString();
        var softwareDevelopmentObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    softwareDevelopmentObservableArray.push({
                        Id: results[i].Id,
                        SoftDevNumber: results[i].SoftDevNumber,
                        SoftDevDate: results[i].SoftDevDate,
                        ProjectId: results[i].ProjectId,
                        ProjectNumber: results[i].ProjectNumber,
                        ProjectName: results[i].ProjectName,
                        Task: results[i].Task,
                        Remarks: results[i].Remarks,
                        NumberOfHours: results[i].NumberOfHours,
                        EncodedByUserId: results[i].EncodedByUserId,
                        EncodedByUser: results[i].EncodedByUser,
                        AssignedToUserId: results[i].AssignedToUserId,
                        AssignedToUser: results[i].AssignedToUser,
                        SoftDevStatus: results[i].SoftDevStatus
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
        });
        return softwareDevelopmentObservableArray;
    };
    SoftwareDevelopmentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], SoftwareDevelopmentService);
    return SoftwareDevelopmentService;
}());
exports.SoftwareDevelopmentService = SoftwareDevelopmentService;
//# sourceMappingURL=softwareDevelopment.service.js.map