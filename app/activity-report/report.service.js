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
var ReportService = (function () {
    // constructor
    function ReportService(router, http, toastr) {
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
    ReportService.prototype.getListUserData = function () {
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
        });
        return userObservableArray;
    };
    // pad - leading zero for date
    ReportService.prototype.pad = function (n) {
        return (n < 10) ? ("0" + n) : n;
    };
    // list activities
    ReportService.prototype.getListActivities = function (documentType, startDate, endDate, status, staffId) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/activity/list/byDocument/byDateRange/withStaff/" + documentType + "/" + startDate.toDateString() + "/" + endDate.toDateString() + "/" + status + "/" + staffId;
        var activityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    var myDate = new Date(results[i].ActivityDate);
                    var myDateValue = [myDate.getFullYear(), _this.pad(myDate.getMonth() + 1), _this.pad(myDate.getDate())].join('-');
                    activityObservableArray.push({
                        Id: results[i].Id,
                        Document: results[i].DocumentNumber,
                        ActivityNumber: results[i].ActivityNumber,
                        ActivityDate: myDateValue,
                        StaffUserId: results[i].StaffUserId,
                        StaffUser: results[i].StaffUser != null ? results[i].StaffUser : " ",
                        CustomerId: results[i].CustomerId,
                        Customer: results[i].Customer,
                        ProductId: results[i].ProductId,
                        Product: results[i].Product != null ? results[i].Product : " ",
                        ParticularCategory: results[i].ParticularCategory,
                        Particulars: results[i].Particulars,
                        NumberOfHours: results[i].NumberOfHours,
                        ActivityAmount: results[i].ActivityAmount,
                        ActivityStatus: results[i].ActivityStatus,
                        LeadId: results[i].LeadId == null ? 0 : results[i].LeadId,
                        QuotationId: results[i].QuotationId == null ? 0 : results[i].QuotationId,
                        DeliveryId: results[i].DeliveryId == null ? 0 : results[i].DeliveryId,
                        SupportId: results[i].SupportId == null ? 0 : results[i].SupportId,
                        SoftwareDevelopmentId: results[i].SoftwareDevelopmentId == null ? 0 : results[i].SoftwareDevelopmentId,
                        HeaderRemarks: results[i].HeaderRemarks,
                        HeaderStatus: results[i].HeaderStatus,
                        NoOfDays: parseInt(results[i].NoOfDays)
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btnRefresh").disabled = false;
            document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
        });
        return activityObservableArray;
    };
    // list activities
    ReportService.prototype.getListSummaryActivities = function (startDate, endDate, status) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/activity/list/no_of_activities_per_staff/" + startDate.toDateString() + "/" + endDate.toDateString() + "/" + status;
        var activityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    var myDate = new Date(results[i].ActivityDate);
                    var myDateValue = [myDate.getFullYear(), _this.pad(myDate.getMonth() + 1), _this.pad(myDate.getDate())].join('-');
                    var total = parseInt(results[i].No_of_Lead_Activities) + parseInt(results[i].No_of_Quotation_Activities) + parseInt(results[i].No_of_Delivery_Activities) + parseInt(results[i].No_of_Support_Activities) + parseInt(results[i].No_of_Software_Development_Activities);
                    activityObservableArray.push({
                        Id: results[i].Id,
                        StaffUser: results[i].StaffUser,
                        No_of_Lead_Activities: results[i].No_of_Lead_Activities,
                        No_of_Quotation_Activities: results[i].No_of_Quotation_Activities,
                        No_of_Delivery_Activities: results[i].No_of_Delivery_Activities,
                        No_of_Support_Activities: results[i].No_of_Support_Activities,
                        No_of_Software_Development_Activities: results[i].No_of_Software_Development_Activities,
                        Total: total
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btnRefreshReportSummary").disabled = false;
            document.getElementById("btnRefreshReportSummary").innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
        });
        return activityObservableArray;
    };
    ReportService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], ReportService);
    return ReportService;
}());
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map