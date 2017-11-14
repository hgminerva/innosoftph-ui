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
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    leadObservableArray.push({
                        Id: results[i].Id,
                        LeadNumberDetail: results[i].LeadNumber + " - " + results[i].LeadName,
                        LeadNumber: results[i].LeadNumber
                    });
                }
            }
            if (page == "quotationDetail") {
                document.getElementById("btn-hidden-customer-data").click();
            }
            else {
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
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    customerObservableArray.push({
                        Id: results[i].Id,
                        ArticleCode: results[i].ArticleCode,
                        Article: results[i].Article,
                        Address: results[i].Address,
                        ContactPerson: results[i].ContactPerson,
                        ContactNumber: results[i].ContactNumber,
                        EmailAddress: results[i].EmailAddress
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
            else {
                if (articleTypeId == 2) {
                    document.getElementById("btn-hidden-product-data").click();
                }
                else {
                    if (articleTypeId == 1) {
                        document.getElementById("btn-hidden-finished-load").click();
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
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    userObservableArray.push({
                        Id: results[i].Id,
                        FullName: results[i].FullName
                    });
                }
            }
            if (page == "quotationDetail") {
                document.getElementById("btn-hidden-quotation-data").click();
            }
        });
        return userObservableArray;
    };
    // pad - leading zero for date
    QuotationService.prototype.pad = function (n) {
        return (n < 10) ? ("0" + n) : n;
    };
    // list quotation by date ranged (start date and end date)
    QuotationService.prototype.getListQuotationData = function (quotationStartDate, quotationEndDate, quotationStatus) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/quotation/list/byQuotationDateRange/" + quotationStartDate.toDateString() + "/" + quotationEndDate.toDateString() + "/" + quotationStatus;
        var quotationObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    var myDate = new Date(results[i].QuotationDate);
                    var myDateValue = [myDate.getFullYear(), _this.pad(myDate.getMonth() + 1), _this.pad(myDate.getDate())].join('-');
                    quotationObservableArray.push({
                        Id: results[i].Id,
                        QuotationNumber: results[i].QuotationNumber,
                        QuotationDate: myDateValue,
                        LeadId: results[i].LeadId,
                        LeadNumber: results[i].LeadNumber,
                        CustomerId: results[i].CustomerId,
                        Customer: results[i].Customer,
                        ProductId: results[i].ProductId,
                        Product: results[i].Product,
                        Remarks: results[i].Remarks,
                        EncodedByUserId: results[i].EncodedByUserId,
                        EncodedByUser: results[i].EncodedByUser,
                        QuotationStatus: results[i].QuotationStatus,
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btnRefresh").disabled = false;
            document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
        });
        return quotationObservableArray;
    };
    // get quotation by id
    QuotationService.prototype.getQuotationById = function (id) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/quotation/get/byId/" + id;
        this.http.get(url, this.options).subscribe(function (response) {
            var results = response.json();
            if (results != null) {
                document.getElementById("btn-hidden-finished-load").click();
                setTimeout(function () {
                    document.getElementById("quotationDateValue").value = results.QuotationDate;
                    document.getElementById("quotationNumber").value = results.QuotationNumber;
                    document.getElementById("quotationLeadSelectedValue").value = results.LeadId;
                    document.getElementById("quotationCustomerSelectedValue").value = results.CustomerId;
                    document.getElementById("quotationProductSelectedValue").value = results.ProductId;
                    document.getElementById("quotationEncodedBySelectedValue").value = results.EncodedByUser;
                    document.getElementById("quotationRemarks").value = results.Remarks;
                    document.getElementById("quotationStatusSelectedValue").value = results.QuotationStatus;
                    document.getElementById("btn-hidden-selectedValue-data").click();
                    document.getElementById("btn-hidden-complete-loading").click();
                }, 200);
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
            var results = response.json();
            if (results > 0) {
                _this.toastr.success('', 'Save Successful');
                setTimeout(function () {
                    document.getElementById("btn-hidden-quotation-detail-modal").click();
                    _this.router.navigate(['/quotationDetail', results]);
                }, 1000);
            }
            else {
                _this.toastr.error('', 'Something`s went wrong!');
                document.getElementById("btnSaveQuotation").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                document.getElementById("btnSaveQuotation").disabled = false;
                document.getElementById("btnCloseQuotation").disabled = false;
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
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btnSaveQuotationDetail").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveQuotationDetail").disabled = false;
            document.getElementById("btnPrintQuotationDetail").disabled = false;
            document.getElementById("btnCloseQuotationDetail").disabled = false;
        }, function (error) {
            _this.toastr.error(error._body.replace(/^"?(.+?)"?$/, '$1'), 'Save Failed');
            document.getElementById("btnSaveQuotationDetail").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveQuotationDetail").disabled = false;
            document.getElementById("btnPrintQuotationDetail").disabled = false;
            document.getElementById("btnCloseQuotationDetail").disabled = false;
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
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnDeleteQuotation").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
            document.getElementById("btnDeleteQuotation").disabled = false;
            document.getElementById("btnDeleteCloseQuotation").disabled = false;
        });
    };
    // list activity by quotation Id
    QuotationService.prototype.getListActivityByQuotationId = function (quotationId, isLoadActivityOnly) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/activity/list/byQuotationId/" + quotationId;
        var activityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    var myDate = new Date(results[i].ActivityDate);
                    var myDateValue = [myDate.getFullYear(), _this.pad(myDate.getMonth() + 1), _this.pad(myDate.getDate())].join('-');
                    activityObservableArray.push({
                        Id: results[i].Id,
                        ActivityNumber: results[i].ActivityNumber,
                        ActivityDate: myDateValue,
                        StaffUserId: results[i].StaffUserId,
                        StaffUser: results[i].StaffUser,
                        CustomerId: results[i].CustomerId,
                        Customer: results[i].Customer,
                        ProductId: results[i].ProductId,
                        Product: results[i].Product,
                        ParticularCategory: results[i].ParticularCategory,
                        Particulars: results[i].Particulars,
                        Location: results[i].Location,
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
                document.getElementById("btn-hidden-lead-data").click();
            }
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
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnActivitySave").disabled = false;
            document.getElementById("btnActivityClose").disabled = false;
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
    // this is my previous code - not working
    // public printQuotationPaper(id: number, quotationObject: Object) {
    //     console.log(JSON.stringify(quotationObject));
    //     let url = "http://api.innosoft.ph/RepQuotationDetail/quotationDetail?quotationId=" + id;
    //     this.http.post(url, JSON.stringify(quotationObject), this.options).subscribe(
    //         (response) => {
    //             var mediaType = 'application/pdf';
    //             var blobFile = new Blob([(<any>response)._body], { type: mediaType });
    //             var filename = 'test.pdf';
    //             saveAs(blobFile, filename);
    //             console.log((<any>response)._body);
    //             // var fileURL = URL.createObjectURL(blobFile);
    //             // window.open(fileURL);
    //             // console.log(fileURL);
    //         },
    //         error => {
    //             alert("Error");
    //         }
    //     )
    // }
    QuotationService.prototype.printQuotationPaper = function (id, quotationObject) {
        var url = "http://api.innosoft.ph/RepQuotationDetail/quotationDetail?quotationId=" + id;
        this.http.post(url, JSON.stringify(quotationObject), {
            method: http_1.RequestMethod.Post,
            responseType: http_1.ResponseContentType.Blob,
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json'
            })
        }).subscribe(function (response) {
            var blob = new Blob([response.blob()], { type: 'application/pdf' });
            var filename = 'file.pdf';
            var fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
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