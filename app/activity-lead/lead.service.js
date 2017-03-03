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
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    userObservableArray.push({
                        Id: results[i].Id,
                        FullName: results[i].FullName
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
            else {
                document.getElementById("btn-hidden-finished-load").click();
            }
        });
        return userObservableArray;
    };
    // list lead by date ranged (start date and end date)
    LeadService.prototype.getListLeadData = function (leadStartDate, leadEndDate) {
        var url = "http://api.innosoft.ph/api/lead/list/byLeadDateRange/" + leadStartDate.toDateString() + "/" + leadEndDate.toDateString();
        var leadObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            for (var i = 0; i <= results.length - 1; i++) {
                if (results.length > 0) {
                    leadObservableArray.push({
                        Id: results[i].Id,
                        LeadDate: results[i].LeadDate,
                        LeadNumber: results[i].LeadNumber,
                        LeadName: results[i].LeadName,
                        Address: results[i].Address,
                        ContactPerson: results[i].ContactPerson,
                        ContactPosition: results[i].ContactPosition,
                        ContactEmail: results[i].ContactEmail,
                        ContactPhoneNo: results[i].ContactPhoneNo,
                        ReferredBy: results[i].ReferredBy,
                        Remarks: results[i].Remarks,
                        EncodedByUserId: results[i].EncodedByUserId,
                        EncodedByUser: results[i].EncodedByUser,
                        AssignedToUserId: results[i].AssignedToUserId,
                        AssignedToUser: results[i].AssignedToUser == null ? " " : results[i].AssignedToUser,
                        LeadStatus: results[i].LeadStatus
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btnRefresh").disabled = false;
            document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
        });
        return leadObservableArray;
    };
    // get lead by id
    LeadService.prototype.getLeadById = function (id) {
        var _this = this;
        var url = "http://api.innosoft.ph/api/lead/get/byId/" + id;
        this.http.get(url, this.options).subscribe(function (response) {
            var results = response.json();
            if (results != null) {
                document.getElementById("btn-hidden-finished-load").click();
                setTimeout(function () {
                    document.getElementById("leadDateValue").value = results.LeadDate;
                    document.getElementById("leadNumber").value = results.LeadNumber;
                    document.getElementById("leadName").value = results.LeadName;
                    document.getElementById("leadAddress").value = results.Address;
                    document.getElementById("leadContactPerson").value = results.ContactPerson;
                    document.getElementById("leadContactPosition").value = results.ContactPosition;
                    document.getElementById("leadContactEmail").value = results.ContactEmail;
                    document.getElementById("leadContactNumber").value = results.ContactPhoneNo;
                    document.getElementById("leadReferredBy").value = results.ReferredBy;
                    document.getElementById("leadRemarks").value = results.Remarks;
                    document.getElementById("leadEncodedBySelectedValue").value = results.EncodedByUser;
                    document.getElementById("leadAssignedToSelectedValue").value = results.AssignedToUserId;
                    document.getElementById("leadStatusSelectedValue").value = results.LeadStatus;
                    document.getElementById("btn-hidden-selectedValue-data").click();
                    document.getElementById("btn-hidden-complete-loading").click();
                }, 200);
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
            var results = response.json();
            if (results > 0) {
                _this.toastr.success('', 'Save Successful');
                setTimeout(function () {
                    document.getElementById("btn-hidden-lead-detail-modal").click();
                    _this.router.navigate(['/leadDetail', results]);
                }, 1000);
            }
            else {
                _this.toastr.error('', 'Something`s went wrong!');
                document.getElementById("btnSaveLead").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                document.getElementById("btnSaveLead").disabled = false;
                document.getElementById("btnCloseLead").disabled = false;
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
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btnSaveLeadDetail").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnSaveLeadDetail").disabled = false;
            document.getElementById("btnCloseLeadDetail").disabled = false;
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
    LeadService.prototype.getListActivityByLeadId = function (leadId, isLoadActivityOnly) {
        var url = "http://api.innosoft.ph/api/activity/list/byLeadId/" + leadId;
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
                document.getElementById("btn-hidden-encoded-user-data").click();
            }
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
            _this.toastr.error('', 'Something`s went wrong!');
            document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
            document.getElementById("btnActivitySave").disabled = false;
            document.getElementById("btnActivityClose").disabled = false;
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