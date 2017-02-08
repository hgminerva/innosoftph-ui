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
var QuotationService = (function () {
    // constructor
    function QuotationService(router, http, toastr) {
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
    // list lead by status
    QuotationService.prototype.getListLeadData = function (page) {
        var url = "http://api.innosoft.ph/api/lead/list/byLeadStatus";
        var leadObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            for (var key in response.json()) {
                if (response.json().hasOwnProperty(key)) {
                    leadObservableArray.push({
                        Id: response.json()[key].Id,
                        LeadNumber: response.json()[key].LeadNumber,
                    });
                }
            }
            if (page == "quotationDetail") {
                document.getElementById("btn-hidden-customer-data").click();
            }
        });
        return leadObservableArray;
    };
    // list article by article type
    QuotationService.prototype.getListArticleData = function (page, articleTypeId) {
        var customerObservableArray = new wijmo.collections.ObservableArray();
        var url = "http://api.innosoft.ph/api/article/list/byArticleTypeId/" + articleTypeId;
        this.http.get(url, this.options).subscribe(function (response) {
            for (var key in response.json()) {
                if (response.json().hasOwnProperty(key)) {
                    customerObservableArray.push({
                        Id: response.json()[key].Id,
                        Article: response.json()[key].Article
                    });
                }
            }
            if (page == "quotationDetail") {
                if (articleTypeId == 2) {
                    document.getElementById("btn-hidden-product-data").click();
                }
                else {
                    if (articleTypeId == 1) {
                        document.getElementById("btn-hidden-encoded-user-data").click();
                    }
                }
            }
        });
        return customerObservableArray;
    };
    // list user
    QuotationService.prototype.getListUserData = function (page) {
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
            if (page == "quotationDetail") {
                document.getElementById("btn-hidden-quotation-data").click();
            }
        });
        return userObservableArray;
    };
    // list quotation by date ranged (start date and end date)
    QuotationService.prototype.getListQuotationData = function (quotationStartDate, quotationEndDate) {
        var url = "http://api.innosoft.ph/api/quotation/list/byQuotationDateRange/" + quotationStartDate.toDateString() + "/" + quotationEndDate.toDateString();
        var quotationObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            for (var key in response.json()) {
                if (response.json().hasOwnProperty(key)) {
                    quotationObservableArray.push({
                        Id: response.json()[key].Id,
                        QuotationNumber: response.json()[key].QuotationNumber,
                        QuotationDate: response.json()[key].QuotationDate,
                        LeadId: response.json()[key].LeadId,
                        LeadNumber: response.json()[key].LeadNumber,
                        CustomerId: response.json()[key].CustomerId,
                        Customer: response.json()[key].Customer,
                        ProductId: response.json()[key].ProductId,
                        Product: response.json()[key].Product,
                        Remarks: response.json()[key].Remarks,
                        EncodedByUserId: response.json()[key].EncodedByUserId,
                        EncodedByUser: response.json()[key].EncodedByUser,
                        QuotationStatus: response.json()[key].QuotationStatus,
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
        });
        return quotationObservableArray;
    };
    // get quotation by id
    QuotationService.prototype.getQuotationById = function (id) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/quotation/get/byId/" + id;
        this.http.get(url, this.options).subscribe(function (response) {
            if (response.json() != null) {
                document.getElementById("quotationDateValue").value = response.json().QuotationDate;
                document.getElementById("quotationNumber").value = response.json().QuotationNumber;
                document.getElementById("quotationLeadSelectedValue").value = response.json().LeadNumber;
                document.getElementById("quotationCustomerSelectedValue").value = response.json().Customer;
                document.getElementById("quotationProductSelectedValue").value = response.json().Product;
                document.getElementById("quotationEncodedBySelectedValue").value = response.json().EncodedByUser;
                document.getElementById("quotationRemarks").value = response.json().Remarks;
                document.getElementById("quotationStatusSelectedValue").value = response.json().QuotationStatus;
                document.getElementById("btn-hidden-selectedValue-data").click();
                document.getElementById("btn-hidden-complete-loading").click();
            }
            else {
                alert("No Data");
                _this.router.navigate(["/quotation"]);
            }
        });
    };
    // add quotation
    QuotationService.prototype.postQuotationData = function (quotationObject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/quotation/post";
        this.http.post(url, JSON.stringify(quotationObject), this.options).subscribe(function (response) {
            if (response.json() > 0) {
                _this.toastr.success('', 'Save Successful');
                setTimeout(function () {
                    document.getElementById("btn-hidden-quotation-detail-modal").click();
                    _this.router.navigate(['/quotationDetail', response.json()]);
                }, 1000);
            }
            else {
                document.getElementById("btnSaveQuotation").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                document.getElementById("btnSaveQuotation").disabled = false;
                document.getElementById("btnCloseQuotation").disabled = false;
                _this.toastr.error('', 'Something`s went wrong!');
            }
        }, function (error) {
            alert("Error");
        });
    };
    // update quotation
    QuotationService.prototype.putQuotationData = function (id, quotationObject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/quotation/put/" + id;
        this.http.put(url, JSON.stringify(quotationObject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            setTimeout(function () {
                _this.router.navigate(['/quotation']);
            }, 1000);
        }, function (error) {
            _this.toastr.error(error._body.replace(/^"?(.+?)"?$/, '$1'), 'Save Failed');
            document.getElementById("btnSaveQuotationDetail").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveQuotationDetail").disabled = false;
            document.getElementById("btnCloseQuotationDetail").disabled = false;
            console.log(error);
        });
    };
    // delete quotation
    QuotationService.prototype.deleteQuotationData = function (id, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/quotation/delete/" + id;
        this.http.delete(url, this.options).subscribe(function (response) {
            _this.toastr.success('', 'Delete Successful');
            document.getElementById("btn-hidden-quotation-delete-modal").click();
            document.getElementById("btn-hidden-refresh-grid").click();
        }, function (error) {
            document.getElementById("btnDeleteQuotation").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
            document.getElementById("btnDeleteQuotation").disabled = false;
            document.getElementById("btnDeleteCloseQuotation").disabled = false;
            _this.toastr.error('', 'Something`s went wrong!');
        });
    };
    // list activity by quotation Id
    QuotationService.prototype.getListActivityByQuotationId = function (quotationId) {
        var url = "http://api.innosoft.ph/api/activity/list/byQuotationId/" + quotationId;
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
    QuotationService.prototype.postActivityData = function (activityOject, toastr) {
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
    QuotationService.prototype.putActivityData = function (id, activityOject, toastr) {
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
    QuotationService.prototype.deleteActivityData = function (id, toastr) {
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
    QuotationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], QuotationService);
    return QuotationService;
}());
exports.QuotationService = QuotationService;
//# sourceMappingURL=quotation.service.js.map