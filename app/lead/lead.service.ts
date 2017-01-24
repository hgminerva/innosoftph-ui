import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class LeadService {
    //  Global Variables
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    // constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // list user
    public getListUserData(): wijmo.collections.ObservableArray {
        let userObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://localhost:22626/api/user/list";
        this.http.get(url, this.options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        userObservableArray.push({
                            Id: response.json()[key].Id,
                            UserName: response.json()[key].UserName,
                            FullName: response.json()[key].FullName
                        });
                    }
                }
            }
        );

        return userObservableArray;
    }

    // list lead by date ranged (start date and end date)
    public getListLeadData(leadStartDate: Date, leadEndDate: Date): wijmo.collections.ObservableArray {
        let url = "http://localhost:22626/api/lead/list/byLeadDateRange/" + leadStartDate.toDateString() + "/" + leadEndDate.toDateString();
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
            }
        );

        return leadObservableArray;
    }

    // get lead by id
    public getLeadById(id: number): wijmo.collections.ObservableArray {
        let url = "http://localhost:22626/api/lead/get/byId/" + id;
        let leadObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                if (response.json() != null) {
                    (<HTMLInputElement>document.getElementById("leadNumber")).value = response.json().LeadNumber;
                    (<HTMLInputElement>document.getElementById("leadName")).value = response.json().LeadName;
                    (<HTMLInputElement>document.getElementById("leadAddress")).value = response.json().Address;
                    (<HTMLInputElement>document.getElementById("leadContactPerson")).value = response.json().ContactPerson;
                    (<HTMLInputElement>document.getElementById("leadContactPosition")).value = response.json().ContactPosition;
                    (<HTMLInputElement>document.getElementById("leadContactEmail")).value = response.json().ContactEmail;
                    (<HTMLInputElement>document.getElementById("leadContactNumber")).value = response.json().ContactPhoneNo;
                    (<HTMLInputElement>document.getElementById("leadReferredBy")).value = response.json().ReferredBy;
                    (<HTMLInputElement>document.getElementById("leadRemarks")).value = response.json().Remarks;
                } else {
                    alert("No Data");
                    this.router.navigate(["/lead"]);
                }
            }
        );

        return leadObservableArray;
    }

    // add leads
    public postLeadData(leadObject: Object, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/lead/post";
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
        let url = "http://localhost:22626/api/lead/put/" + id;
        this.http.put(url, JSON.stringify(leadObject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                (<HTMLButtonElement>document.getElementById("btnSaveLeadDetail")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveLeadDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnPrintLeadDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseLeadDetail")).disabled = false;
                setTimeout(() => {
                    this.router.navigate(['/lead']);
                }, 1000);
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveLeadDetail")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveLeadDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnPrintLeadDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseLeadDetail")).disabled = false;
            }
        )
    }

    // delete leads
    public deleteLeadData(id: number, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/lead/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.toastr.success('', 'Delete Successful');
                document.getElementById("btn-hidden-lead-delete-modal").click();
                document.getElementById("btn-hidden-refresh-grid").click();
                (<HTMLButtonElement>document.getElementById("btnDeleteLead")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
                (<HTMLButtonElement>document.getElementById("btnDeleteCloseLead")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnDeleteCloseLead")).disabled = false;
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
            }
        )
    }
}