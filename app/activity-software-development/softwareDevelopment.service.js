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
                        ProjectNumber: results[i].ProjectNumber,
                        CustomerId: results[i].CustomerId
                    });
                }
            }
            if (page == "softwareDevelopmentDetail") {
                document.getElementById("btn-hidden-user-data").click();
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
                document.getElementById("btn-hidden-software-development-data").click();
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
            var results = response.json();
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
                        AssignedToUser: results[i].AssignedToUser == null ? " " : results[i].AssignedToUser,
                        SoftDevStatus: results[i].SoftDevStatus
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btnRefresh").disabled = false;
            document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
        });
        return softwareDevelopmentObservableArray;
    };
    // get softwareDevelopment by id
    SoftwareDevelopmentService.prototype.getSoftwareDevelopmentById = function (id) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/softwareDevelopment/get/byId/" + id;
        this.http.get(url, this.options).subscribe(function (response) {
            var results = response.json();
            if (results != null) {
                document.getElementById("btn-hidden-finished-load").click();
                setTimeout(function () {
                    document.getElementById("softwareDevelopmentDateValue").value = results.SoftDevDate;
                    document.getElementById("softwareDevelopmentSelectedValue").value = results.SoftDevNumber;
                    document.getElementById("softwareDevelopmentProjectSelectedValue").value = results.ProjectId;
                    document.getElementById("softwareDevelopmentTask").value = results.Task;
                    document.getElementById("softwareDevelopmentRemarks").value = results.Remarks;
                    document.getElementById("softwareDevelopmentNoOfHoursSelectedValue").value = results.NumberOfHours;
                    document.getElementById("softwareDevelopmentEncodedBySelectedValue").value = results.EncodedByUser;
                    document.getElementById("softwareDevelopmentAssignedUserSelectedValue").value = results.AssignedToUserId;
                    document.getElementById("softwareDevelopmentStatusSelectedValue").value = results.SoftDevStatus;
                    document.getElementById("btn-hidden-selectedValue-data").click();
                    document.getElementById("btn-hidden-complete-loading").click();
                }, 200);
            }
            else {
                alert("No Data");
                _this.router.navigate(["/softwareDevelopment"]);
            }
        });
    };
    // add softwareDevelopment
    SoftwareDevelopmentService.prototype.postSoftwareDevelopmentData = function (softwareDevelopmentObject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/softwareDevelopment/post";
        this.http.post(url, JSON.stringify(softwareDevelopmentObject), this.options).subscribe(function (response) {
            var results = response.json();
            if (results > 0) {
                _this.toastr.success('', 'Save Successful');
                setTimeout(function () {
                    document.getElementById("btn-hidden-softwareDevelopment-detail-modal").click();
                    _this.router.navigate(['/softwareDevelopmentDetail', results]);
                }, 1000);
            }
            else {
                _this.toastr.error('', 'Something`s went wrong!');
                document.getElementById("btnSaveSoftwareDevelopment").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                document.getElementById("btnSaveSoftwareDevelopment").disabled = false;
                document.getElementById("btnCloseSoftwareDevelopment").disabled = false;
            }
        }, function (error) {
            alert("Error");
        });
    };
    // update softwareDevelopment
    SoftwareDevelopmentService.prototype.putSoftwareDevelopmentData = function (id, softwareDevelopmentObject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/softwareDevelopment/put/" + id;
        this.http.put(url, JSON.stringify(softwareDevelopmentObject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btnSaveSoftwareDevelopmentDetail").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveSoftwareDevelopmentDetail").disabled = false;
            document.getElementById("btnCloseSoftwareDevelopmentDetail").disabled = false;
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnSaveSoftwareDevelopmentDetail").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveSoftwareDevelopmentDetail").disabled = false;
            document.getElementById("btnCloseSoftwareDevelopmentDetail").disabled = false;
        });
    };
    // delete softwareDevelopment
    SoftwareDevelopmentService.prototype.deleteSoftwareDevelopmentData = function (id, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/softwareDevelopment/delete/" + id;
        this.http.delete(url, this.options).subscribe(function (response) {
            _this.toastr.success('', 'Delete Successful');
            document.getElementById("btn-hidden-softwareDevelopment-delete-modal").click();
            document.getElementById("btn-hidden-refresh-grid").click();
        }, function (error) {
            document.getElementById("btnDeleteSoftwareDevelopment").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
            document.getElementById("btnDeleteSoftwareDevelopment").disabled = false;
            document.getElementById("btnDeleteCloseSoftwareDevelopment").disabled = false;
            _this.toastr.error('', 'Something`s went wrong!');
        });
    };
    // list activity by softwareDevelopment Id
    SoftwareDevelopmentService.prototype.getListActivityBySoftwareDevelopmentId = function (softwareDevelopmentId, isLoadActivityOnly) {
        var url = "http://api.innosoft.ph/api/activity/list/bySoftwareDevelopmentId/" + softwareDevelopmentId;
        var activityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    activityObservableArray.push({
                        Id: results[i].Id,
                        ActivityNumber: results[i].ActivityNumber,
                        ActivityDate: results[i].ActivityDate,
                        StaffUserId: results[i].StaffUserId,
                        StaffUser: results[i].StaffUser,
                        CustomerId: results[i].CustomerId,
                        Customer: results[i].Customer,
                        ProductId: results[i].ProductId,
                        Product: results[i].Product,
                        ParticularCategory: results[i].ParticularCategory,
                        Particulars: results[i].Particulars,
                        NumberOfHours: results[i].NumberOfHours,
                        ActivityAmount: results[i].ActivityAmount,
                        ActivityStatus: results[i].ActivityStatus,
                        LeadId: results[i].LeadId,
                        QuotationId: results[i].QuotationId,
                        DeliveryId: results[i].DeliveryId,
                        SupportId: results[i].SupportId,
                        SoftwareDevelopmentId: results[i].SoftwareDevelopmentId
                    });
                }
            }
            if (!isLoadActivityOnly) {
                document.getElementById("btn-hidden-project-data").click();
            }
        });
        return activityObservableArray;
    };
    // add activity
    SoftwareDevelopmentService.prototype.postActivityData = function (activityOject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/activity/post";
        this.http.post(url, JSON.stringify(activityOject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            document.getElementById("btn-hidden-activity-detail-modal").click();
            document.getElementById("btn-hidden-activity-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnActivitySave").disabled = false;
            document.getElementById("btnActivityClose").disabled = false;
        });
    };
    // update activity
    SoftwareDevelopmentService.prototype.putActivityData = function (id, activityOject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/activity/put/" + id;
        this.http.put(url, JSON.stringify(activityOject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            document.getElementById("btn-hidden-activity-detail-modal").click();
            document.getElementById("btn-hidden-activity-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnActivitySave").disabled = false;
            document.getElementById("btnActivityClose").disabled = false;
        });
    };
    // delete activity
    SoftwareDevelopmentService.prototype.deleteActivityData = function (id, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/activity/delete/" + id;
        this.http.delete(url, this.options).subscribe(function (response) {
            _this.toastr.success('', 'Delete Successful');
            document.getElementById("btn-hidden-activity-delete-modal").click();
            document.getElementById("btn-hidden-activity-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnActivityDeleteConfirmation").disabled = false;
            document.getElementById("btnActivityCloseDeleteConfirmation").disabled = false;
        });
    };
    SoftwareDevelopmentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], SoftwareDevelopmentService);
    return SoftwareDevelopmentService;
}());
exports.SoftwareDevelopmentService = SoftwareDevelopmentService;
//# sourceMappingURL=softwareDevelopment.service.js.map