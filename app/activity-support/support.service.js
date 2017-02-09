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
var SupportService = (function () {
    // constructor
    function SupportService(router, http, toastr) {
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        // global variables
        this.headers = new http_1.Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
        });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    // list continuity by status
    SupportService.prototype.getListContinuityData = function (page) {
        var url = "http://api.innosoft.ph/api/continuity/list/byContinuityStatus";
        var continuityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            for (var key in response.json()) {
                if (response.json().hasOwnProperty(key)) {
                    continuityObservableArray.push({
                        Id: response.json()[key].Id,
                        ContinuityNumber: response.json()[key].ContinuityNumber,
                        Customer: response.json()[key].Customer,
                        Product: response.json()[key].Product,
                    });
                }
            }
            if (page == "supportDetail") {
                document.getElementById("btn-hidden-customer-data").click();
            }
        });
        return continuityObservableArray;
    };
    // list article by article type
    SupportService.prototype.getListArticleData = function (page, articleTypeId) {
        var articleObservableArray = new wijmo.collections.ObservableArray();
        var url = "http://api.innosoft.ph/api/article/list/byArticleTypeId/" + articleTypeId;
        this.http.get(url, this.options).subscribe(function (response) {
            for (var key in response.json()) {
                if (response.json().hasOwnProperty(key)) {
                    articleObservableArray.push({
                        Id: response.json()[key].Id,
                        Article: response.json()[key].Article
                    });
                }
            }
            if (page == "supportDetail") {
                if (articleTypeId == 2) {
                    document.getElementById("btn-hidden-product-data").click();
                }
                else {
                    if (articleTypeId == 1) {
                        document.getElementById("btn-hidden-encoded-by-user-data").click();
                    }
                }
            }
        });
        return articleObservableArray;
    };
    // list user
    SupportService.prototype.getListUserData = function (page, userType) {
        var userObservableArray = new wijmo.collections.ObservableArray();
        var url = "http://api.innosoft.ph/api/user/list";
        this.http.get(url, this.options).subscribe(function (response) {
            for (var key in response.json()) {
                if (response.json().hasOwnProperty(key)) {
                    userObservableArray.push({
                        Id: response.json()[key].Id,
                        FullName: response.json()[key].FullName
                    });
                }
            }
            if (page == "supportDetail") {
                if (userType == "encodedByUser") {
                    document.getElementById("btn-hidden-assigned-to-user-data").click();
                }
                else {
                    if (userType == "assignedToUser") {
                        document.getElementById("btn-hidden-support-data").click();
                    }
                }
            }
        });
        return userObservableArray;
    };
    // list support by date ranged (start date and end date)
    SupportService.prototype.getListSupportData = function (supportStartDate, supportEndDate) {
        var url = "http://api.innosoft.ph/api/support/list/bySupportDateRange/" + supportStartDate.toDateString() + "/" + supportEndDate.toDateString();
        var supportObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            for (var key in response.json()) {
                if (response.json().hasOwnProperty(key)) {
                    supportObservableArray.push({
                        Id: response.json()[key].Id,
                        SupportNumber: response.json()[key].SupportNumber,
                        SupportDate: response.json()[key].SupportDate,
                        ContinuityId: response.json()[key].ContinuityId,
                        ContinuityNumber: response.json()[key].ContinuityNumber,
                        IssueCategory: response.json()[key].IssueCategory,
                        Issue: response.json()[key].Issue,
                        CustomerId: response.json()[key].CustomerId,
                        Customer: response.json()[key].Customer,
                        ProductId: response.json()[key].ProductId,
                        Product: response.json()[key].Product,
                        Severity: response.json()[key].Severity,
                        Caller: response.json()[key].Caller,
                        Remarks: response.json()[key].Remarks,
                        ScreenShotURL: response.json()[key].ScreenShotURL,
                        EncodedByUserId: response.json()[key].EncodedByUserId,
                        EncodedByUser: response.json()[key].EncodedByUser,
                        AssignedToUserId: response.json()[key].AssignedToUserId,
                        AssignedToUser: response.json()[key].AssignedToUser,
                        SupportStatus: response.json()[key].SupportStatus,
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
        });
        return supportObservableArray;
    };
    // get support by id
    SupportService.prototype.getSupportById = function (id) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/support/get/byId/" + id;
        this.http.get(url, this.options).subscribe(function (response) {
            if (response.json() != null) {
                document.getElementById("supportNumber").value = response.json().SupportNumber;
                document.getElementById("supportDateValue").value = response.json().SupportDate;
                document.getElementById("supportContinuitySelectedValue").value = response.json().ContinuityNumber;
                document.getElementById("supportIssueCategorySelectedValue").value = response.json().IssueCategory;
                document.getElementById("supportIssue").value = response.json().Issue;
                document.getElementById("supportCustomerSelectedValue").value = response.json().Customer;
                document.getElementById("supportProductSelectedValue").value = response.json().Product;
                document.getElementById("supportSeveritySelectedValue").value = response.json().Severity;
                document.getElementById("supportCaller").value = response.json().Caller;
                document.getElementById("supportRemarks").value = response.json().Remarks;
                document.getElementById("supportScreenShotURL").value = response.json().ScreenShotURL;
                document.getElementById("supportEncodedBySelectedValue").value = response.json().EncodedByUser;
                document.getElementById("supportAssignedToSelectedValue").value = response.json().AssignedToUser;
                document.getElementById("supportStatusSelectedValue").value = response.json().SupportStatus;
                document.getElementById("btn-hidden-selectedValue-data").click();
                document.getElementById("btn-hidden-complete-loading").click();
            }
            else {
                alert("No Data");
                _this.router.navigate(["/supportActivity"]);
            }
        });
    };
    // add support
    SupportService.prototype.postSupportData = function (supportObject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/support/post";
        this.http.post(url, JSON.stringify(supportObject), this.options).subscribe(function (response) {
            if (response.json() > 0) {
                _this.toastr.success('', 'Save Successful');
                setTimeout(function () {
                    document.getElementById("btn-hidden-support-detail-modal").click();
                    _this.router.navigate(['/supportDetail', response.json()]);
                }, 1000);
            }
            else {
                _this.toastr.error('', 'Something`s went wrong!');
                document.getElementById("btnSaveSupport").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                document.getElementById("btnSaveSupport").disabled = false;
                document.getElementById("btnCloseSupport").disabled = false;
            }
        }, function (error) {
            alert("Error");
        });
    };
    // update support
    SupportService.prototype.putSupportData = function (id, supportObject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/support/put/" + id;
        this.http.put(url, JSON.stringify(supportObject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            setTimeout(function () {
                _this.router.navigate(['/supportActivity']);
            }, 1000);
        }, function (error) {
            _this.toastr.error('', 'Save Unsuccessful');
            // this.toastr.error(error._body.replace(/^"?(.+?)"?$/, '$1'), 'Save Failed');
            document.getElementById("btnSaveSupportDetail").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveSupportDetail").disabled = false;
            document.getElementById("btnCloseSupportDetail").disabled = false;
        });
    };
    // delete support
    SupportService.prototype.deleteSupportData = function (id, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/support/delete/" + id;
        this.http.delete(url, this.options).subscribe(function (response) {
            _this.toastr.success('', 'Delete Successful');
            document.getElementById("btn-hidden-support-delete-modal").click();
            document.getElementById("btn-hidden-refresh-grid").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnDeleteSupport").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
            document.getElementById("btnDeleteSupport").disabled = false;
            document.getElementById("btnDeleteCloseSupport").disabled = false;
        });
    };
    // list activity by support Id
    SupportService.prototype.getListActivityBySupportId = function (supportId) {
        var url = "http://api.innosoft.ph/api/activity/list/bySupportId/" + supportId;
        var activityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            for (var key in response.json()) {
                if (response.json().hasOwnProperty(key)) {
                    activityObservableArray.push({
                        Id: response.json()[key].Id,
                        ActivityNumber: response.json()[key].ActivityNumber,
                        ActivityDate: response.json()[key].ActivityDate,
                        StaffUserId: response.json()[key].StaffUserId,
                        StaffUser: response.json()[key].StaffUser,
                        CustomerId: response.json()[key].CustomerId,
                        Customer: response.json()[key].Customer,
                        ProductId: response.json()[key].ProductId,
                        Product: response.json()[key].Product,
                        ParticularCategory: response.json()[key].ParticularCategory,
                        Particulars: response.json()[key].Particulars,
                        NumberOfHours: response.json()[key].NumberOfHours,
                        ActivityAmount: response.json()[key].ActivityAmount,
                        ActivityStatus: response.json()[key].ActivityStatus,
                        LeadId: response.json()[key].LeadId,
                        QuotationId: response.json()[key].QuotationId,
                        DeliveryId: response.json()[key].DeliveryId,
                        SupportId: response.json()[key].SupportId
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
        });
        return activityObservableArray;
    };
    // add activity
    SupportService.prototype.postActivityData = function (activityOject, toastr) {
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
    SupportService.prototype.putActivityData = function (id, activityOject, toastr) {
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
    SupportService.prototype.deleteActivityData = function (id, toastr) {
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
    SupportService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], SupportService);
    return SupportService;
}());
exports.SupportService = SupportService;
//# sourceMappingURL=support.service.js.map