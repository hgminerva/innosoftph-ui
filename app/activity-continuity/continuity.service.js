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
var ContinuityService = (function () {
    // constructor
    function ContinuityService(router, http, toastr) {
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
    // list delivery by status
    ContinuityService.prototype.getListDeliveryData = function () {
        var url = "http://api.innosoft.ph/api/delivery/list/byDeliveryStatus";
        var deliveryObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    deliveryObservableArray.push({
                        Id: results[i].Id,
                        DeliveryNumberDetail: results[i].DeliveryNumber + " - " + results[i].Customer + " (" + results[i].Product + ")",
                        DeliveryNumber: results[i].DeliveryNumber,
                        Customer: results[i].Customer,
                        Product: results[i].Product
                    });
                }
            }
            document.getElementById("btn-hidden-finished-load").click();
        });
        return deliveryObservableArray;
    };
    // list article by article type
    ContinuityService.prototype.getListArticleData = function (articleTypeId) {
        var articleObservableArray = new wijmo.collections.ObservableArray();
        var url = "http://api.innosoft.ph/api/article/list/byArticleTypeId/" + articleTypeId;
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    articleObservableArray.push({
                        Id: results[i].Id,
                        Article: results[i].Article
                    });
                }
            }
            if (articleTypeId == 2) {
            }
            else {
                if (articleTypeId == 1) {
                }
            }
        });
        return articleObservableArray;
    };
    // list user
    ContinuityService.prototype.getListUserData = function (page, userType) {
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
    ContinuityService.prototype.pad = function (n) {
        return (n < 10) ? ("0" + n) : n;
    };
    // list continuity by date ranged (start date and end date)
    ContinuityService.prototype.getListContinuityData = function (month, dateType, status) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/continuity/list/byContinuityDateRange/" + month + "/" + dateType + "/" + status;
        var continuityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var totalContinuityAmount = 0;
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    var myDate = new Date(results[i].ContinuityDate);
                    var myDateValue = [myDate.getFullYear(), _this.pad(myDate.getMonth() + 1), _this.pad(myDate.getDate())].join('-');
                    var myExpireDate = new Date(results[i].ExpiryDate);
                    var myExpireDateValue = [myExpireDate.getFullYear(), _this.pad(myExpireDate.getMonth() + 1), _this.pad(myExpireDate.getDate())].join('-');
                    continuityObservableArray.push({
                        Id: results[i].Id,
                        ContinuityNumber: results[i].ContinuityNumber,
                        ContinuityDate: myDateValue,
                        DeliveryId: results[i].DeliveryId,
                        DeliveryNumber: results[i].DeliveryNumber,
                        CustomerId: results[i].CustomerId,
                        Customer: results[i].Customer,
                        ProductId: results[i].ProductId,
                        Product: results[i].Product,
                        ExpiryDate: myExpireDateValue,
                        Remarks: results[i].Remarks,
                        ContinuityAmount: results[i].ContinuityAmount,
                        StaffUserId: results[i].StaffUserId,
                        StaffUser: results[i].StaffUser,
                        ContinuityStatus: results[i].ContinuityStatus
                    });
                    totalContinuityAmount += parseFloat(results[i].ContinuityAmount);
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("totalContinuityAmount").value = totalContinuityAmount.toLocaleString();
            document.getElementById("btnRefresh").disabled = false;
            document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
        });
        return continuityObservableArray;
    };
    // add continuity
    ContinuityService.prototype.postContinuityData = function (continuityOject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/continuity/post";
        this.http.post(url, JSON.stringify(continuityOject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            document.getElementById("btn-hidden-continuity-detail-modal").click();
            document.getElementById("btn-hidden-continuity-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnSaveContinuity").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveContinuity").disabled = false;
            document.getElementById("btnCloseContinuity").disabled = false;
        });
    };
    // update continuity
    ContinuityService.prototype.putContinuityData = function (id, continuityOject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/continuity/put/" + id;
        this.http.put(url, JSON.stringify(continuityOject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            document.getElementById("btn-hidden-continuity-detail-modal").click();
            document.getElementById("btn-hidden-continuity-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnSaveContinuity").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveContinuity").disabled = false;
            document.getElementById("btnCloseContinuity").disabled = false;
        });
    };
    // delete continuity
    ContinuityService.prototype.deleteContinuityData = function (id, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/continuity/delete/" + id;
        this.http.delete(url, this.options).subscribe(function (response) {
            _this.toastr.success('', 'Delete Successful');
            document.getElementById("btn-hidden-continuity-delete-modal").click();
            document.getElementById("btn-hidden-continuity-data").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnDeleteContinuity").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
            document.getElementById("btnDeleteContinuity").disabled = false;
            document.getElementById("btnDeleteCloseContinuity").disabled = false;
        });
    };
    ContinuityService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], ContinuityService);
    return ContinuityService;
}());
exports.ContinuityService = ContinuityService;
//# sourceMappingURL=continuity.service.js.map