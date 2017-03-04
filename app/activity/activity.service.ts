import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ActivityService {
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
    public getListUserData(): wijmo.collections.ObservableArray {
        let userObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://api.innosoft.ph/api/user/list";
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        userObservableArray.push({
                            Id: results[i].Id,
                            FullName: results[i].FullName
                        });
                    }
                }

                document.getElementById("btn-hidden-finished-load").click();
            }
        );

        return userObservableArray;
    }

    // pad - leading zero for date
    public pad(n: number) {
        return (n < 10) ? ("0" + n) : n;
    }

    // list activity by document and by date ranged (start date and end date)  
    public getListActivityData(documentType: String, activityStartDate: Date, activityEndDate: Date, status: String): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/activity/list/byDocument/byDateRanged/" + documentType + "/" + activityStartDate.toDateString() + "/" + activityEndDate.toDateString() + "/" + status;
        let activityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        var myActivityDate = new Date(results[i].ActivityDate);
                        var myActivityDateValue = [myActivityDate.getFullYear(), this.pad(myActivityDate.getMonth() + 1), this.pad(myActivityDate.getDate())].join('-');

                        activityObservableArray.push({
                            Id: results[i].Id,
                            Document: results[i].DocumentNumber,
                            ActivityDate: myActivityDateValue,
                            Particulars: results[i].Particulars,
                            Activity: results[i].Activity == null ? " " : results[i].Activity,
                            StaffUserId: results[i].StaffUserId == null ? 0 : results[i].StaffUserId,
                            StaffUser: results[i].StaffUser == null ? " " : results[i].StaffUser,
                            LeadId: results[i].LeadId == null ? 0 : results[i].LeadId,
                            QuotationId: results[i].QuotationId == null ? 0 : results[i].QuotationId,
                            DeliveryId: results[i].DeliveryId == null ? 0 : results[i].DeliveryId,
                            SupportId: results[i].SupportId == null ? 0 : results[i].SupportId,
                            SoftwareDevelopmentId: results[i].SoftwareDevelopmentId == null ? 0 : results[i].SoftwareDevelopmentId,
                            CustomerId: results[i].CustomerId == null ? 0 : results[i].CustomerId,
                            ProductId: results[i].ProductId == null ? 0 : results[i].ProductId,
                            ParticularCategory: results[i].ParticularCategory,
                            NumberOfHours: results[i].NumberOfHours,
                            ActivityAmount: results[i].ActivityAmount,
                            ActivityStatus: results[i].ActivityStatus,
                            HeaderStatus: results[i].HeaderStatus,
                            EncodedBy: results[i].EncodedBy,
                        });
                    }
                }

                document.getElementById("btn-hidden-complete-loading").click();
                document.getElementById("btn-hidden-assigned-user").click();

                (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
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