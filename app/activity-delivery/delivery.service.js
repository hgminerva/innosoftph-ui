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
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    quotationObservableArray.push({
                        Id: results[i].Id,
                        QuotationNumberDetail: results[i].QuotationNumber + " - " + results[i].Customer + " (" + results[i].Product + ")",
                        QuotationNumber: results[i].QuotationNumber,
                        CustomerId: results[i].CustomerId,
                        ProductId: results[i].ProductId
                    });
                }
            }
            if (page == "deliveryDetail") {
                document.getElementById("btn-hidden-sale-user-data").click();
            }
            else {
                document.getElementById("btn-hidden-technical-user-data").click();
            }
        });
        return quotationObservableArray;
    };
    // list article by article type
    DeliveryService.prototype.getListArticleData = function (page, articleTypeId) {
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
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    userObservableArray.push({
                        Id: results[i].Id,
                        FullName: results[i].FullName
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
            else {
                if (userType == "technical") {
                    document.getElementById("btn-hidden-functional-user-data").click();
                }
                else {
                    if (userType == "functional") {
                        document.getElementById("btn-hidden-finished-load").click();
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
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    deliveryObservableArray.push({
                        Id: results[i].Id,
                        DeliveryNumber: results[i].DeliveryNumber,
                        DeliveryDate: results[i].DeliveryDate,
                        QuotationId: results[i].QuotationId,
                        QuotationNumber: results[i].QuotationNumber,
                        CustomerId: results[i].CustomerId,
                        Customer: results[i].Customer,
                        ProductId: results[i].ProductId,
                        Product: results[i].Product,
                        MeetingDate: results[i].MeetingDate,
                        Remarks: results[i].Remarks,
                        SalesUserId: results[i].SalesUserId,
                        SalesUser: results[i].SalesUser,
                        TechnicalUserId: results[i].TechnicalUserId,
                        TechnicalUser: results[i].TechnicalUser,
                        FunctionalUserId: results[i].FunctionalUserId,
                        FunctionalUser: results[i].FunctionalUser,
                        DeliveryStatus: results[i].DeliveryStatus,
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
            var results = response.json();
            if (results != null) {
                document.getElementById("btn-hidden-finished-load").click();
                setTimeout(function () {
                    document.getElementById("deliveryNumber").value = results.DeliveryNumber;
                    document.getElementById("deliveryDateValue").value = results.DeliveryDate;
                    document.getElementById("deliveryQuotaionSelectedValue").value = results.QuotationId;
                    document.getElementById("deliveryMeetingDateValue").value = results.MeetingDate;
                    document.getElementById("deliveryRemarks").value = results.Remarks;
                    document.getElementById("deliverySalesUserSelectedValue").value = results.SalesUser;
                    document.getElementById("deliveryTechnicalUserSelectedValue").value = results.TechnicalUserId;
                    document.getElementById("deliveryFunctionalUserSelectedValue").value = results.FunctionalUserId;
                    document.getElementById("deliveryStatusSelectedValue").value = results.DeliveryStatus;
                    document.getElementById("btn-hidden-selectedValue-data").click();
                    document.getElementById("btn-hidden-complete-loading").click();
                }, 200);
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
            var results = response.json();
            if (results > 0) {
                _this.toastr.success('', 'Save Successful');
                setTimeout(function () {
                    document.getElementById("btn-hidden-delivery-detail-modal").click();
                    _this.router.navigate(['/deliveryDetail', results]);
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
    DeliveryService.prototype.getListActivityByQuotationId = function (deliveryId, isLoadActivityOnly) {
        var url = "http://api.innosoft.ph/api/activity/list/byDeliveryId/" + deliveryId;
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
                document.getElementById("btn-hidden-quotation-data").click();
            }
            else {
                document.getElementById("btn-hidden-complete-loading").click();
            }
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