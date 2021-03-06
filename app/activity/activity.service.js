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
var ActivityService = (function () {
    // constructor
    function ActivityService(router, http, toastr) {
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
    // list user
    ActivityService.prototype.getListUserData = function () {
        var userObservableArray = new wijmo.collections.ObservableArray();
        var url = "http://api.innosoft.ph/api/user/list";
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
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
    // pad - leading zero for date
    ActivityService.prototype.pad = function (n) {
        return (n < 10) ? ("0" + n) : n;
    };
    // list activity by document and by date ranged (start date and end date)  
    ActivityService.prototype.getListActivityData = function (documentType, activityStartDate, activityEndDate, status) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/activity/list/byDocument/byDateRanged/" + documentType + "/" + activityStartDate.toDateString() + "/" + activityEndDate.toDateString() + "/" + status;
        var activityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    var myActivityDate = new Date(results[i].ActivityDate);
                    var myActivityDateValue = [myActivityDate.getFullYear(), _this.pad(myActivityDate.getMonth() + 1), _this.pad(myActivityDate.getDate())].join('-');
                    activityObservableArray.push({
                        Id: results[i].Id,
                        Document: results[i].DocumentNumber,
                        ActivityDate: myActivityDateValue,
                        Particulars: results[i].Particulars,
                        Location: results[i].Location,
                        Activity: results[i].Activity == null ? " " : results[i].Activity,
                        StaffUserId: results[i].StaffUserId == null ? 0 : results[i].StaffUserId,
                        StaffUser: results[i].StaffUser == null ? " " : results[i].StaffUser,
                        LeadId: results[i].LeadId == null ? 0 : results[i].LeadId,
                        QuotationId: results[i].QuotationId == null ? 0 : results[i].QuotationId,
                        DeliveryId: results[i].DeliveryId == null ? 0 : results[i].DeliveryId,
                        SupportId: results[i].SupportId == null ? 0 : results[i].SupportId,
                        SoftwareDevelopmentId: results[i].SoftwareDevelopmentId == null ? 0 : results[i].SoftwareDevelopmentId,
                        CustomerId: results[i].CustomerId == null ? 0 : results[i].CustomerId,
                        ProductId: results[i].ProductId == null ? 0 : results[i].ProductId,
                        ParticularCategory: results[i].ParticularCategory,
                        NumberOfHours: results[i].NumberOfHours,
                        ActivityAmount: results[i].ActivityAmount,
                        ActivityStatus: results[i].ActivityStatus,
                        HeaderStatus: results[i].HeaderStatus,
                        EncodedBy: results[i].EncodedBy,
                        NoOfDays: parseInt(results[i].NoOfDays),
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btn-hidden-assigned-user").click();
            document.getElementById("btnRefresh").disabled = false;
            document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
        });
        return activityObservableArray;
    };
    // add activity
    ActivityService.prototype.postActivityData = function (activityOject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/activity/post";
        this.http.post(url, JSON.stringify(activityOject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            document.getElementById("btn-hidden-activity-detail-modal").click();
            document.getElementById("btn-hidden-activity-data").click();
        }, function (error) {
            document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnActivitySave").disabled = false;
            document.getElementById("btnActivityClose").disabled = false;
            _this.toastr.error('', 'Something`s went wrong!');
        });
    };
    // update activity
    ActivityService.prototype.putActivityData = function (id, activityOject, toastr) {
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
    ActivityService.prototype.deleteActivityData = function (id, toastr) {
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
    ActivityService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], ActivityService);
    return ActivityService;
}());
exports.ActivityService = ActivityService;
//# sourceMappingURL=activity.service.js.map