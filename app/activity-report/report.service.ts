import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ReportService {
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
            }
        );

        return userObservableArray;
    }

    // pad - leading zero for date
    public pad(n: number) {
        return (n < 10) ? ("0" + n) : n;
    }

    // list activities
    public getListActivities(documentType: String, startDate: Date, endDate: Date, status: String, staffId: String): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/activity/list/byDocument/byDateRange/withStaff/" + documentType + "/" + startDate.toDateString() + "/" + endDate.toDateString() + "/" + status + "/" + staffId;
        let activityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        var myDate = new Date(results[i].ActivityDate);
                        var myDateValue = [myDate.getFullYear(), this.pad(myDate.getMonth() + 1), this.pad(myDate.getDate())].join('-');

                        activityObservableArray.push({
                            Id: results[i].Id,
                            Document: results[i].DocumentNumber,
                            ActivityNumber: results[i].ActivityNumber,
                            ActivityDate: myDateValue,
                            StaffUserId: results[i].StaffUserId,
                            StaffUser: results[i].StaffUser != null ? results[i].StaffUser : " ",
                            CustomerId: results[i].CustomerId,
                            Customer: results[i].Customer,
                            ProductId: results[i].ProductId,
                            Product: results[i].Product != null ? results[i].Product : " ",
                            ParticularCategory: results[i].ParticularCategory,
                            Particulars: results[i].Particulars,
                            NumberOfHours: results[i].NumberOfHours,
                            ActivityAmount: results[i].ActivityAmount,
                            ActivityStatus: results[i].ActivityStatus,
                            LeadId: results[i].LeadId,
                            QuotationId: results[i].QuotationId,
                            DeliveryId: results[i].DeliveryId,
                            SupportId: results[i].SupportId,
                            SoftwareDevelopmentId: results[i].SoftwareDevelopmentId,
                            HeaderRemarks: results[i].HeaderRemarks,
                            HeaderStatus: results[i].HeaderStatus
                        });
                    }
                }

                document.getElementById("btn-hidden-complete-loading").click();

                (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
            }
        );

        return activityObservableArray;
    }
}