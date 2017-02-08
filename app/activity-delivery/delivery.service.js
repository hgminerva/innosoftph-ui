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
var DeliveryService = (function () {
    // constructor
    function DeliveryService(router, http, toastr) {
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
    // list quotation by status
    DeliveryService.prototype.getListQuotationData = function (page) {
        var url = "http://api.innosoft.ph/api/quotation/list/byQuotationStatus";
        var quotationObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            for (var key in response.json()) {
                if (response.json().hasOwnProperty(key)) {
                    quotationObservableArray.push({
                        Id: response.json()[key].Id,
                        QuotationNumber: response.json()[key].QuotationNumber,
                        Customer: response.json()[key].Customer,
                        Product: response.json()[key].Product
                    });
                }
            }
            if (page == "deliveryDetail") {
                document.getElementById("btn-hidden-customer-data").click();
            }
        });
        return quotationObservableArray;
    };
    // list article by article type
    DeliveryService.prototype.getListArticleData = function (page, articleTypeId) {
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
            if (page == "deliveryDetail") {
                if (articleTypeId == 2) {
                    document.getElementById("btn-hidden-product-data").click();
                }
                else {
                    if (articleTypeId == 1) {
                        document.getElementById("btn-hidden-sale-user-data").click();
                    }
                }
            }
        });
        return articleObservableArray;
    };
    // list user
    DeliveryService.prototype.getListUserData = function (page, userType) {
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
            if (page == "deliveryDetail") {
                if (userType == "sales") {
                    document.getElementById("btn-hidden-technical-user-data").click();
                }
                else {
                    if (userType == "technical") {
                        document.getElementById("btn-hidden-functional-user-data").click();
                    }
                    else {
                        if (userType == "functional") {
                            document.getElementById("btn-hidden-delivery-data").click();
                        }
                    }
                }
            }
        });
        return userObservableArray;
    };
    // list delivery by date ranged (start date and end date)
    DeliveryService.prototype.getListDeliveryData = function (deliveryStartDate, deliveryEndDate) {
        var url = "http://api.innosoft.ph/api/delivery/list/byDeliveryDateRange/" + deliveryStartDate.toDateString() + "/" + deliveryEndDate.toDateString();
        var deliveryObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            for (var key in response.json()) {
                if (response.json().hasOwnProperty(key)) {
                    deliveryObservableArray.push({
                        Id: response.json()[key].Id,
                        DeliveryNumber: response.json()[key].DeliveryNumber,
                        DeliveryDate: response.json()[key].DeliveryDate,
                        QuotationId: response.json()[key].QuotationId,
                        QuotationNumber: response.json()[key].QuotationNumber,
                        CustomerId: response.json()[key].CustomerId,
                        Customer: response.json()[key].Customer,
                        ProductId: response.json()[key].ProductId,
                        Product: response.json()[key].Product,
                        MeetingDate: response.json()[key].MeetingDate,
                        Remarks: response.json()[key].Remarks,
                        SalesUserId: response.json()[key].SalesUserId,
                        SalesUser: response.json()[key].SalesUser,
                        TechnicalUserId: response.json()[key].TechnicalUserId,
                        TechnicalUser: response.json()[key].TechnicalUser,
                        FunctionalUserId: response.json()[key].FunctionalUserId,
                        FunctionalUser: response.json()[key].FunctionalUser,
                        DeliveryStatus: response.json()[key].DeliveryStatus,
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
        });
        return deliveryObservableArray;
    };
    // get delivery by id
    DeliveryService.prototype.getDeliveryById = function (id) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/delivery/get/byId/" + id;
        this.http.get(url, this.options).subscribe(function (response) {
            if (response.json() != null) {
                document.getElementById("deliveryNumber").value = response.json().DeliveryNumber;
                document.getElementById("deliveryDateValue").value = response.json().DeliveryDate;
                document.getElementById("deliveryQuotaionSelectedValue").value = response.json().QuotationNumber;
                document.getElementById("deliveryCustomerSelectedValue").value = response.json().Customer;
                document.getElementById("deliveryProductSelectedValue").value = response.json().Product;
                document.getElementById("deliveryMeetingDateValue").value = response.json().MeetingDate;
                document.getElementById("deliveryRemarks").value = response.json().Remarks;
                document.getElementById("deliverySalesUserSelectedValue").value = response.json().SalesUser;
                document.getElementById("deliveryTechnicalUserSelectedValue").value = response.json().TechnicalUser;
                document.getElementById("deliveryFunctionalUserSelectedValue").value = response.json().FunctionalUser;
                document.getElementById("deliveryStatusSelectedValue").value = response.json().DeliveryStatus;
                document.getElementById("btn-hidden-selectedValue-data").click();
                document.getElementById("btn-hidden-complete-loading").click();
            }
            else {
                alert("No Data");
                _this.router.navigate(["/delivery"]);
            }
        });
    };
    // add delivery
    DeliveryService.prototype.postDeliveryData = function (deliveryObject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/delivery/post";
        this.http.post(url, JSON.stringify(deliveryObject), this.options).subscribe(function (response) {
            if (response.json() > 0) {
                _this.toastr.success('', 'Save Successful');
                setTimeout(function () {
                    document.getElementById("btn-hidden-delivery-detail-modal").click();
                    _this.router.navigate(['/deliveryDetail', response.json()]);
                }, 1000);
            }
            else {
                document.getElementById("btnSaveDelivery").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                document.getElementById("btnSaveDelivery").disabled = false;
                document.getElementById("btnCloseDelivery").disabled = false;
                _this.toastr.error('', 'Something`s went wrong!');
            }
        }, function (error) {
            alert("Error");
        });
    };
    // update delivery
    DeliveryService.prototype.putDeliveryData = function (id, deliveryObject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/delivery/put/" + id;
        this.http.put(url, JSON.stringify(deliveryObject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            setTimeout(function () {
                _this.router.navigate(['/delivery']);
            }, 1000);
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnSaveDeliveryDetail").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveDeliveryDetail").disabled = false;
            document.getElementById("btnCloseDeliveryDetail").disabled = false;
        });
    };
    // delete delivery
    DeliveryService.prototype.deleteDeliveryData = function (id, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/delivery/delete/" + id;
        this.http.delete(url, this.options).subscribe(function (response) {
            _this.toastr.success('', 'Delete Successful');
            document.getElementById("btn-hidden-delivery-delete-modal").click();
            document.getElementById("btn-hidden-refresh-grid").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnDeleteDelivery").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
            document.getElementById("btnDeleteDelivery").disabled = false;
            document.getElementById("btnDeleteCloseDelivery").disabled = false;
        });
    };
    // list activity by delivery Id
    DeliveryService.prototype.getListActivityByQuotationId = function (deliveryId) {
        var url = "http://api.innosoft.ph/api/activity/list/byDeliveryId/" + deliveryId;
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
    DeliveryService.prototype.postActivityData = function (activityOject, toastr) {
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
    DeliveryService.prototype.putActivityData = function (id, activityOject, toastr) {
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
    DeliveryService.prototype.deleteActivityData = function (id, toastr) {
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
    DeliveryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], DeliveryService);
    return DeliveryService;
}());
exports.DeliveryService = DeliveryService;
//# sourceMappingURL=delivery.service.js.map