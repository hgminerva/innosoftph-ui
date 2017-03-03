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
    // list bcs customer
    SupportService.prototype.getContuinityCustomerData = function (page) {
        var customerObservableArray = new wijmo.collections.ObservableArray();
        var url = "http://api.innosoft.ph/api/continuity/list/continuity/customers";
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    customerObservableArray.push({
                        CustomerId: results[i].CustomerId,
                        Customer: results[i].Customer
                    });
                }
            }
            if (page == "supportDetail") {
                document.getElementById("btn-hidden-continuity-data").click();
            }
            else {
                if (page == "support") {
                    document.getElementById("btn-hidden-continuity-data").click();
                }
            }
        });
        return customerObservableArray;
    };
    // list article by article type
    SupportService.prototype.getListArticleData = function (page, articleTypeId) {
        var articleObservableArray = new wijmo.collections.ObservableArray();
        var url = "http://api.innosoft.ph/api/article/list/byArticleTypeId/" + articleTypeId;
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
            else {
                if (articleTypeId == 2) {
                    document.getElementById("btn-hidden-continuity-data").click();
                }
            }
        });
        return articleObservableArray;
    };
    // list continuity by status
    SupportService.prototype.getListContinuityData = function (page, customerId, isSelectedCustomerOnly) {
        var continuityObservableArray = new wijmo.collections.ObservableArray();
        var url = "http://api.innosoft.ph/api/continuity/list/byCustomerId/byContinuityStatus/" + customerId;
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    continuityObservableArray.push({
                        Id: results[i].Id,
                        ContinuityNumberDetail: results[i].ContinuityNumber + " - " + results[i].Product + " (Exp: " + results[i].ExpiryDate + ")",
                        ContinuityNumber: results[i].ContinuityNumber,
                        Customer: results[i].Customer,
                        ProductId: results[i].ProductId,
                        Product: results[i].Product,
                    });
                }
            }
            if (page == "supportDetail") {
                if (!isSelectedCustomerOnly) {
                    document.getElementById("btn-hidden-encoded-by-user-data").click();
                }
            }
            else {
                if (!isSelectedCustomerOnly) {
                    document.getElementById("btn-hidden-assigned-to-user-data").click();
                }
            }
        });
        return continuityObservableArray;
    };
    // list user
    SupportService.prototype.getListUserData = function (page, userType) {
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
            if (page == "supportDetail") {
                if (userType == "encodedByUser") {
                    document.getElementById("btn-hidden-assigned-to-user-data").click();
                }
                else {
                    if (userType == "assignedToUser") {
                        document.getElementById("btn-hidden-support-data").click();
                    }
                    else {
                        if (userType == "activityAssignedToUser") {
                            document.getElementById("btn-hidden--activity-finished-load").click();
                            document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                            document.getElementById("btnActivitySave").disabled = false;
                            document.getElementById("btnActivityClose").disabled = false;
                        }
                    }
                }
            }
            else {
                if (userType == "assignedToUser") {
                    document.getElementById("btn-hidden-finished-load").click();
                }
            }
        });
        return userObservableArray;
    };
    // list support by date ranged (start date and end date)
    SupportService.prototype.getListSupportData = function (supportStartDate, supportEndDate, status, supportType) {
        var url = "http://api.innosoft.ph/api/support/list/bySupportDateRange/" + supportStartDate.toDateString() + "/" + supportEndDate.toDateString() + "/" + status + "/" + supportType;
        var supportObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    supportObservableArray.push({
                        Id: results[i].Id,
                        SupportNumber: results[i].SupportNumber,
                        SupportDate: results[i].SupportDate,
                        ContinuityId: results[i].ContinuityId,
                        ContinuityNumber: results[i].ContinuityNumber,
                        IssueCategory: results[i].IssueCategory,
                        Issue: results[i].Issue,
                        CustomerId: results[i].CustomerId,
                        Customer: results[i].Customer,
                        ProductId: results[i].ProductId,
                        Product: results[i].Product,
                        SupportType: results[i].SupportType,
                        Severity: results[i].Severity,
                        Caller: results[i].Caller,
                        Remarks: results[i].Remarks,
                        ScreenShotURL: results[i].ScreenShotURL,
                        EncodedByUserId: results[i].EncodedByUserId,
                        EncodedByUser: results[i].EncodedByUser,
                        AssignedToUserId: results[i].AssignedToUserId,
                        AssignedToUser: results[i].AssignedToUser == null ? " " : results[i].AssignedToUser,
                        SupportStatus: results[i].SupportStatus,
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btnRefresh").disabled = false;
            document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
        });
        return supportObservableArray;
    };
    // get support by id
    SupportService.prototype.getSupportById = function (id) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/support/get/byId/" + id;
        this.http.get(url, this.options).subscribe(function (response) {
            var results = response.json();
            if (results != null) {
                document.getElementById("btn-hidden-finished-load").click();
                setTimeout(function () {
                    document.getElementById("supportNumber").value = results.SupportNumber;
                    document.getElementById("supportDateValue").value = results.SupportDate;
                    document.getElementById("supportContinuitySelectedValue").value = results.ContinuityId;
                    document.getElementById("supportIssueCategorySelectedValue").value = results.IssueCategory;
                    document.getElementById("supportIssue").value = results.Issue;
                    document.getElementById("supportCustomerSelectedValue").value = results.CustomerId;
                    document.getElementById("supportTypeSelectedValue").value = results.SupportType;
                    document.getElementById("supportSeveritySelectedValue").value = results.Severity;
                    document.getElementById("supportCaller").value = results.Caller;
                    document.getElementById("supportRemarks").value = results.Remarks;
                    document.getElementById("supportScreenShotURL").value = results.ScreenShotURL;
                    document.getElementById("supportEncodedBySelectedValue").value = results.EncodedByUser;
                    document.getElementById("supportAssignedToSelectedValue").value = results.AssignedToUserId;
                    document.getElementById("supportStatusSelectedValue").value = results.SupportStatus;
                    document.getElementById("btn-hidden-selectedValue-data").click();
                    document.getElementById("btn-hidden-complete-loading").click();
                }, 200);
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
            var results = response.json();
            if (results > 0) {
                _this.toastr.success('', 'Save Successful');
                setTimeout(function () {
                    document.getElementById("btn-hidden-support-detail-modal").click();
                    _this.router.navigate(['/supportDetail', results]);
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
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btnSaveSupportDetail").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveSupportDetail").disabled = false;
            document.getElementById("btnCloseSupportDetail").disabled = false;
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
    SupportService.prototype.getListActivityBySupportId = function (supportId, isLoadActivityOnly) {
        var url = "http://api.innosoft.ph/api/activity/list/bySupportId/" + supportId;
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
                document.getElementById("btn-hidden-customer-data").click();
            }
            document.getElementById("btn-hidden-activity-staffUser").click();
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
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnActivitySave").disabled = false;
            document.getElementById("btnActivityClose").disabled = false;
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