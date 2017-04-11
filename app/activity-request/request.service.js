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
var RequestService = (function () {
    // constructor
    function RequestService(router, http, toastr) {
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
    // pad - leading zero for date
    RequestService.prototype.pad = function (n) {
        return (n < 10) ? ("0" + n) : n;
    };
    // list request by date ranged (start date and end date)
    RequestService.prototype.getListRequestData = function (requestStartDate, requestEndDate, filterRequestType) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/request/list/byRequestDateRange/" + requestStartDate.toDateString() + "/" + requestEndDate.toDateString() + "/" + filterRequestType;
        var requestObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    var myDate = new Date(results[i].RequestDate);
                    var myDateValue = [myDate.getFullYear(), _this.pad(myDate.getMonth() + 1), _this.pad(myDate.getDate())].join('-');
                    requestObservableArray.push({
                        Id: results[i].Id,
                        RequestNumber: results[i].RequestNumber,
                        RequestDate: myDateValue,
                        RequestType: results[i].RequestType,
                        Particulars: results[i].Particulars,
                        EncodedByUserId: results[i].EncodedByUserId,
                        EncodedByUser: results[i].EncodedByUser,
                        CheckedByUserId: results[i].CheckedByUserId,
                        CheckedByUser: results[i].CheckedByUser == null && results[i].CheckedRemarks == null ? " " : results[i].CheckedByUser + " - " + results[i].CheckedRemarks,
                        CheckedRemarks: results[i].CheckedRemarks,
                        ApprovedByUserId: results[i].ApprovedByUserId,
                        ApprovedByUser: results[i].ApprovedByUser == null && results[i].ApprovedRemarks == null ? " " : results[i].ApprovedByUser + " - " + results[i].ApprovedRemarks,
                        ApprovedRemarks: results[i].ApprovedRemarks
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btnRefresh").disabled = false;
            document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
        });
        return requestObservableArray;
    };
    // add request
    RequestService.prototype.postRequestData = function (requestOject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/request/post";
        this.http.post(url, JSON.stringify(requestOject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            document.getElementById("btn-hidden-request-detail-modal").click();
            document.getElementById("btn-hidden-request-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnSaveRequest").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveRequest").disabled = false;
            document.getElementById("btnCloseRequest").disabled = false;
            document.getElementById("btn-hidden-complete-loading").click();
        });
    };
    // update request
    RequestService.prototype.putRequestData = function (id, requestOject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/request/put/" + id;
        this.http.put(url, JSON.stringify(requestOject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            document.getElementById("btn-hidden-request-detail-modal").click();
            document.getElementById("btn-hidden-request-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnSaveRequest").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveRequest").disabled = false;
            document.getElementById("btnCloseRequest").disabled = false;
            document.getElementById("btn-hidden-complete-loading").click();
        });
    };
    // delete request
    RequestService.prototype.deleteRequestData = function (id, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/request/delete/" + id;
        this.http.delete(url, this.options).subscribe(function (response) {
            _this.toastr.success('', 'Delete Successful');
            document.getElementById("btn-hidden-request-delete-modal").click();
            document.getElementById("btn-hidden-request-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnDeleteRequest").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
            document.getElementById("btnDeleteRequest").disabled = false;
            document.getElementById("btnDeleteCloseRequest").disabled = false;
            document.getElementById("btn-hidden-complete-loading").click();
        });
    };
    // check request
    RequestService.prototype.checkRequestData = function (id, requestOject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/request/check/" + id;
        this.http.put(url, JSON.stringify(requestOject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Check Successful');
            document.getElementById("btn-hidden-request-check-approve-modal").click();
            document.getElementById("btn-hidden-request-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnSaveCheckApproveRequest").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveCheckApproveRequest").disabled = false;
            document.getElementById("btnCloseCheckApproveRequest").disabled = false;
            document.getElementById("btn-hidden-complete-loading").click();
        });
    };
    // approve request
    RequestService.prototype.approveRequestData = function (id, requestOject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/request/approve/" + id;
        this.http.put(url, JSON.stringify(requestOject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Approve Successful');
            document.getElementById("btn-hidden-request-check-approve-modal").click();
            document.getElementById("btn-hidden-request-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnSaveCheckApproveRequest").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveCheckApproveRequest").disabled = false;
            document.getElementById("btnCloseCheckApproveRequest").disabled = false;
            document.getElementById("btn-hidden-complete-loading").click();
        });
    };
    RequestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], RequestService);
    return RequestService;
}());
exports.RequestService = RequestService;
//# sourceMappingURL=request.service.js.map