import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class LeadService {
    //  Global Variables
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });

    // constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // list user
    public getListUserData(page: String, userType: String): wijmo.collections.ObservableArray {
        let userObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://api.innosoft.ph/api/user/list";
        this.http.get(url, this.options).subscribe(
            response => {
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
                    } else {
                        if (userType == "assignedToUser") {
                            document.getElementById("btn-hidden-lead-data").click();
                        }
                    }
                } else {
                    document.getElementById("btn-hidden-finished-load").click();
                }
            }
        );

        return userObservableArray;
    }

    // list lead by date ranged (start date and end date)
    public getListLeadData(leadStartDate: Date, leadEndDate: Date): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/lead/list/byLeadDateRange/" + leadStartDate.toDateString() + "/" + leadEndDate.toDateString();
        let leadObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
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
            }
        );

        return leadObservableArray;
    }

    // get lead by id
    public getLeadById(id: number) {
        let url = "http://api.innosoft.ph/api/lead/get/byId/" + id;
        this.http.get(url, this.options).subscribe(
            response => {
                var results = response.json();
                if (results != null) {
                    document.getElementById("btn-hidden-finished-load").click();
                     setTimeout(() => {
                        (<HTMLInputElement>document.getElementById("leadDateValue")).value = results.LeadDate;
                        (<HTMLInputElement>document.getElementById("leadNumber")).value = results.LeadNumber;
                        (<HTMLInputElement>document.getElementById("leadName")).value = results.LeadName;
                        (<HTMLInputElement>document.getElementById("leadAddress")).value = results.Address;
                        (<HTMLInputElement>document.getElementById("leadContactPerson")).value = results.ContactPerson;
                        (<HTMLInputElement>document.getElementById("leadContactPosition")).value = results.ContactPosition;
                        (<HTMLInputElement>document.getElementById("leadContactEmail")).value = results.ContactEmail;
                        (<HTMLInputElement>document.getElementById("leadContactNumber")).value = results.ContactPhoneNo;
                        (<HTMLInputElement>document.getElementById("leadReferredBy")).value = results.ReferredBy;
                        (<HTMLInputElement>document.getElementById("leadRemarks")).value = results.Remarks;
                        (<HTMLInputElement>document.getElementById("leadEncodedBySelectedValue")).value = results.EncodedByUser;
                        (<HTMLInputElement>document.getElementById("leadAssignedToSelectedValue")).value = results.AssignedToUserId;
                        (<HTMLInputElement>document.getElementById("leadStatusSelectedValue")).value = results.LeadStatus;
                        document.getElementById("btn-hidden-selectedValue-data").click();
                        document.getElementById("btn-hidden-complete-loading").click();
                    }, 200);
                } else {
                    alert("No Data");
                    this.router.navigate(["/lead"]);
                }
            }
        );
    }

    // add leads
    public postLeadData(leadObject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/lead/post";
        this.http.post(url, JSON.stringify(leadObject), this.options).subscribe(
            response => {
                var results = response.json();
                if (results > 0) {
                    this.toastr.success('', 'Save Successful');
                    setTimeout(() => {
                        document.getElementById("btn-hidden-lead-detail-modal").click();
                        this.router.navigate(['/leadDetail', results]);
                    }, 1000);
                } else {
                    (<HTMLButtonElement>document.getElementById("btnSaveLead")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    (<HTMLButtonElement>document.getElementById("btnSaveLead")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnCloseLead")).disabled = false;
                    this.toastr.error('', 'Something`s went wrong!');
                }
            },
            error => {
                alert("Error");
            }
        )
    }

    // update leads
    public putLeadData(id: number, leadObject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/lead/put/" + id;
        this.http.put(url, JSON.stringify(leadObject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                setTimeout(() => {
                    this.router.navigate(['/lead']);
                }, 1000);
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveLeadDetail")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveLeadDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseLeadDetail")).disabled = false;
            }
        )
    }

    // delete leads
    public deleteLeadData(id: number, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/lead/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.toastr.success('', 'Delete Successful');
                document.getElementById("btn-hidden-lead-delete-modal").click();
                document.getElementById("btn-hidden-refresh-grid").click();
            },
            error => {
                (<HTMLButtonElement>document.getElementById("btnDeleteLead")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
                (<HTMLButtonElement>document.getElementById("btnDeleteLead")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnDeleteCloseLead")).disabled = false;
                this.toastr.error('', 'Something`s went wrong!');
            }
        )
    }

    // list activity by lead Id
    public getListActivityByLeadId(leadId: number, isLoadActivityOnly: Boolean): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/activity/list/byLeadId/" + leadId;
        let activityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
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
                } else {
                    document.getElementById("btn-hidden-complete-loading").click();
                }
            }
        );

        return activityObservableArray;
    }

    // add activity
    public postActivityData(activityOject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/activity/post";
        this.http.post(url, JSON.stringify(activityOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                document.getElementById("btn-hidden-activity-detail-modal").click();
                document.getElementById("btn-hidden-activity-data").click();
            },
            error => {
                (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = false;
                this.toastr.error('', 'Something`s went wrong!');
            }
        )
    }

    // update activity
    public putActivityData(id: number, activityOject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/activity/put/" + id;
        this.http.put(url, JSON.stringify(activityOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                document.getElementById("btn-hidden-activity-detail-modal").click();
                document.getElementById("btn-hidden-activity-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = false;
            }
        )
    }

    // delete activity
    public deleteActivityData(id: number, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/activity/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.toastr.success('', 'Delete Successful');
                document.getElementById("btn-hidden-activity-delete-modal").click();
                document.getElementById("btn-hidden-activity-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnActivityCloseDeleteConfirmation")).disabled = false;
            }
        )
    }
}