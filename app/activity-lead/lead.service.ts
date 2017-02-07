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
                    } else {
                        if (userType == "assignedToUser") {
                            document.getElementById("btn-hidden-lead-data").click();
                        }
                    }
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
            }
        );

        return leadObservableArray;
    }

    // get lead by id
    public getLeadById(id: number) {
        let url = "http://api.innosoft.ph/api/lead/get/byId/" + id;
        this.http.get(url, this.options).subscribe(
            response => {
                if (response.json() != null) {
                    (<HTMLInputElement>document.getElementById("leadDateValue")).value = response.json().LeadDate;
                    (<HTMLInputElement>document.getElementById("leadNumber")).value = response.json().LeadNumber;
                    (<HTMLInputElement>document.getElementById("leadName")).value = response.json().LeadName;
                    (<HTMLInputElement>document.getElementById("leadAddress")).value = response.json().Address;
                    (<HTMLInputElement>document.getElementById("leadContactPerson")).value = response.json().ContactPerson;
                    (<HTMLInputElement>document.getElementById("leadContactPosition")).value = response.json().ContactPosition;
                    (<HTMLInputElement>document.getElementById("leadContactEmail")).value = response.json().ContactEmail;
                    (<HTMLInputElement>document.getElementById("leadContactNumber")).value = response.json().ContactPhoneNo;
                    (<HTMLInputElement>document.getElementById("leadReferredBy")).value = response.json().ReferredBy;
                    (<HTMLInputElement>document.getElementById("leadRemarks")).value = response.json().Remarks;
                    (<HTMLInputElement>document.getElementById("leadEncodedBySelectedValue")).value = response.json().EncodedByUser;
                    (<HTMLInputElement>document.getElementById("leadAssignedToSelectedValue")).value = response.json().AssignedToUser;
                    (<HTMLInputElement>document.getElementById("leadStatusSelectedValue")).value = response.json().LeadStatus;
                    document.getElementById("btn-hidden-selectedValue-data").click();
                    document.getElementById("btn-hidden-complete-loading").click();
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
                if (response.json() > 0) {
                    this.toastr.success('', 'Save Successful');
                    setTimeout(() => {
                        document.getElementById("btn-hidden-lead-detail-modal").click();
                        this.router.navigate(['/leadDetail', response.json()]);
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
    public getListActivityByLeadId(leadId: number): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/activity/list/byLeadId/" + leadId;
        let activityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
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