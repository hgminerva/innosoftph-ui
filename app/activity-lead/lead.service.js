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
var LeadService = (function () {
    // constructor
    function LeadService(router, http, toastr) {
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
    LeadService.prototype.getListUserData = function (page, userType) {
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
            if (page == "leadDetail") {
                if (userType == "encodedByUser") {
                    document.getElementById("btn-hidden-assigned-user-data").click();
                }
                else {
                    if (userType == "assignedToUser") {
                        document.getElementById("btn-hidden-lead-data").click();
                    }
                }
            }
        });
        return userObservableArray;
    };
    // list lead by date ranged (start date and end date)
    LeadService.prototype.getListLeadData = function (leadStartDate, leadEndDate) {
        var url = "http://api.innosoft.ph/api/lead/list/byLeadDateRange/" + leadStartDate.toDateString() + "/" + leadEndDate.toDateString();
        var leadObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            for (var key in response.json()) {
                if (response.json().hasOwnProperty(key)) {
                    leadObservableArray.push({
                        Id: response.json()[key].Id,
                        LeadDate: response.json()[key].LeadDate,
                        LeadNumber: response.json()[key].LeadNumber,
                        LeadName: response.json()[key].LeadName,
                        Address: response.json()[key].Address,
                        ContactPerson: response.json()[key].ContactPerson,
                        ContactPosition: response.json()[key].ContactPosition,
                        ContactEmail: response.json()[key].ContactEmail,
                        ContactPhoneNo: response.json()[key].ContactPhoneNo,
                        ReferredBy: response.json()[key].ReferredBy,
                        Remarks: response.json()[key].Remarks,
                        EncodedByUserId: response.json()[key].EncodedByUserId,
                        EncodedByUser: response.json()[key].EncodedByUser,
                        AssignedToUserId: response.json()[key].AssignedToUserId,
                        AssignedToUser: response.json()[key].AssignedToUser,
                        LeadStatus: response.json()[key].LeadStatus
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
        });
        return leadObservableArray;
    };
    // get lead by id
    LeadService.prototype.getLeadById = function (id) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/lead/get/byId/" + id;
        this.http.get(url, this.options).subscribe(function (response) {
            if (response.json() != null) {
                document.getElementById("leadDateValue").value = response.json().LeadDate;
                document.getElementById("leadNumber").value = response.json().LeadNumber;
                document.getElementById("leadName").value = response.json().LeadName;
                document.getElementById("leadAddress").value = response.json().Address;
                document.getElementById("leadContactPerson").value = response.json().ContactPerson;
                document.getElementById("leadContactPosition").value = response.json().ContactPosition;
                document.getElementById("leadContactEmail").value = response.json().ContactEmail;
                document.getElementById("leadContactNumber").value = response.json().ContactPhoneNo;
                document.getElementById("leadReferredBy").value = response.json().ReferredBy;
                document.getElementById("leadRemarks").value = response.json().Remarks;
                document.getElementById("leadEncodedBySelectedValue").value = response.json().EncodedByUser;
                document.getElementById("leadAssignedToSelectedValue").value = response.json().AssignedToUser;
                document.getElementById("leadStatusSelectedValue").value = response.json().LeadStatus;
                document.getElementById("btn-hidden-selectedValue-data").click();
                document.getElementById("btn-hidden-complete-loading").click();
            }
            else {
                alert("No Data");
                _this.router.navigate(["/lead"]);
            }
        });
    };
    // add leads
    LeadService.prototype.postLeadData = function (leadObject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/lead/post";
        this.http.post(url, JSON.stringify(leadObject), this.options).subscribe(function (response) {
            if (response.json() > 0) {
                _this.toastr.success('', 'Save Successful');
                setTimeout(function () {
                    document.getElementById("btn-hidden-lead-detail-modal").click();
                    _this.router.navigate(['/leadDetail', response.json()]);
                }, 1000);
            }
            else {
                document.getElementById("btnSaveLead").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                document.getElementById("btnSaveLead").disabled = false;
                document.getElementById("btnCloseLead").disabled = false;
                _this.toastr.error('', 'Something`s went wrong!');
            }
        }, function (error) {
            alert("Error");
        });
    };
    // update leads
    LeadService.prototype.putLeadData = function (id, leadObject, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/lead/put/" + id;
        this.http.put(url, JSON.stringify(leadObject), this.options).subscribe(function (response) {
            _this.toastr.success('', 'Save Successful');
            setTimeout(function () {
                _this.router.navigate(['/lead']);
            }, 1000);
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnSaveLeadDetail").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveLeadDetail").disabled = false;
            document.getElementById("btnCloseLeadDetail").disabled = false;
        });
    };
    // delete leads
    LeadService.prototype.deleteLeadData = function (id, toastr) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/lead/delete/" + id;
        this.http.delete(url, this.options).subscribe(function (response) {
            _this.toastr.success('', 'Delete Successful');
            document.getElementById("btn-hidden-lead-delete-modal").click();
            document.getElementById("btn-hidden-refresh-grid").click();
        }, function (error) {
            document.getElementById("btnDeleteLead").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
            document.getElementById("btnDeleteLead").disabled = false;
            document.getElementById("btnDeleteCloseLead").disabled = false;
            _this.toastr.error('', 'Something`s went wrong!');
        });
    };
    // list activity by lead Id
    LeadService.prototype.getListActivityByLeadId = function (leadId) {
        var url = "http://api.innosoft.ph/api/activity/list/byLeadId/" + leadId;
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
    LeadService.prototype.postActivityData = function (activityOject, toastr) {
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
    LeadService.prototype.putActivityData = function (id, activityOject, toastr) {
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
    LeadService.prototype.deleteActivityData = function (id, toastr) {
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
    LeadService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], LeadService);
    return LeadService;
}());
exports.LeadService = LeadService;
//# sourceMappingURL=lead.service.js.map