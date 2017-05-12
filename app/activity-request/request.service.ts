import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class RequestService {
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

    // pad - leading zero for date
    public pad(n: number) {
        return (n < 10) ? ("0" + n) : n;
    }

    // list request by date ranged (start date and end date)
    public getListRequestData(requestStartDate: Date, requestEndDate: Date, filterRequestType: String, filterRequestStatusSelectedValue: String): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/request/list/byRequestDateRange/" + requestStartDate.toDateString() + "/" + requestEndDate.toDateString() + "/" + filterRequestType + "/" + filterRequestStatusSelectedValue;
        let requestObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        var myDate = new Date(results[i].RequestDate);
                        var myDateValue = [myDate.getFullYear(), this.pad(myDate.getMonth() + 1), this.pad(myDate.getDate())].join('-');

                        requestObservableArray.push({
                            Id: results[i].Id,
                            RequestNumber: results[i].RequestNumber,
                            RequestDate: myDateValue,
                            RequestType: results[i].RequestType,
                            Particulars: results[i].Particulars,
                            EncodedByUserId: results[i].EncodedByUserId,
                            EncodedByUser: results[i].EncodedByUser,
                            CheckedByUserId: results[i].CheckedByUserId,
                            CheckedByUserRemarks: results[i].CheckedByUser == null && results[i].CheckedRemarks == null ? " " : results[i].CheckedByUser + " - " + results[i].CheckedRemarks,
                            CheckedByUser: results[i].CheckedByUser,
                            CheckedRemarks: results[i].CheckedRemarks,
                            ApprovedByUserId: results[i].ApprovedByUserId,
                            ApprovedByUserRemarks: results[i].ApprovedByUser == null && results[i].ApprovedRemarks == null ? " " : results[i].ApprovedByUser + " - " + results[i].ApprovedRemarks,
                            ApprovedByUser: results[i].ApprovedByUser,
                            ApprovedRemarks: results[i].ApprovedRemarks,
                            RequestStatus: results[i].RequestStatus
                        });
                    }
                }

                document.getElementById("btn-hidden-complete-loading").click();

                (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
            }
        );

        return requestObservableArray;
    }

    // add request
    public postRequestData(requestOject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/request/post";
        this.http.post(url, JSON.stringify(requestOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                document.getElementById("btn-hidden-request-detail-modal").click();
                document.getElementById("btn-hidden-request-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveRequest")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveRequest")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseRequest")).disabled = false;
                document.getElementById("btn-hidden-complete-loading").click();
            }
        )
    }

    // update request
    public putRequestData(id: number, requestOject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/request/put/" + id;
        this.http.put(url, JSON.stringify(requestOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                document.getElementById("btn-hidden-request-detail-modal").click();
                document.getElementById("btn-hidden-request-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveRequest")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveRequest")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseRequest")).disabled = false;
                document.getElementById("btn-hidden-complete-loading").click();
            }
        )
    }

    // delete request
    public deleteRequestData(id: number, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/request/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.toastr.success('', 'Delete Successful');
                document.getElementById("btn-hidden-request-delete-modal").click();
                document.getElementById("btn-hidden-request-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnDeleteRequest")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
                (<HTMLButtonElement>document.getElementById("btnDeleteRequest")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnDeleteCloseRequest")).disabled = false;
                document.getElementById("btn-hidden-complete-loading").click();
            }
        )
    }

    // check request
    public checkRequestData(id: number, requestOject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/request/check/" + id;
        this.http.put(url, JSON.stringify(requestOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Check Successful');
                document.getElementById("btn-hidden-request-check-approve-modal").click();
                document.getElementById("btn-hidden-request-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveCheckApproveRequest")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveCheckApproveRequest")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseCheckApproveRequest")).disabled = false;
                document.getElementById("btn-hidden-complete-loading").click();
            }
        )
    }

    // approve request
    public approveRequestData(id: number, requestOject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/request/approve/" + id;
        this.http.put(url, JSON.stringify(requestOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Approve Successful');
                document.getElementById("btn-hidden-request-check-approve-modal").click();
                document.getElementById("btn-hidden-request-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveCheckApproveRequest")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveCheckApproveRequest")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseCheckApproveRequest")).disabled = false;
                document.getElementById("btn-hidden-complete-loading").click();
            }
        )
    }

    // uncheck request
    public uncheckRequestData(id: number, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/request/uncheck/" + id;
        let requestOject: Object = null;

        this.http.put(url, JSON.stringify(requestOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Uncheck Successful');
                document.getElementById("btn-hidden-request-uncheck-disapprove-modal").click();
                document.getElementById("btn-hidden-request-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveUncheckDisapproveRequest")).innerHTML = "<i class='fa fa-save fa-fw'></i> Yes";
                (<HTMLButtonElement>document.getElementById("btnSaveUncheckDisapproveRequest")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseUncheckDisapproveRequest")).disabled = false;
                document.getElementById("btn-hidden-complete-loading").click();
            }
        )
    }

    // disapprove request
    public disapproveRequestData(id: number, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/request/disapprove/" + id;
        let requestOject: Object = null;

        this.http.put(url, JSON.stringify(requestOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Disapprove Successful');
                document.getElementById("btn-hidden-request-uncheck-disapprove-modal").click();
                document.getElementById("btn-hidden-request-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveUncheckDisapproveRequest")).innerHTML = "<i class='fa fa-save fa-fw'></i> Yes";
                (<HTMLButtonElement>document.getElementById("btnSaveUncheckDisapproveRequest")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseUncheckDisapproveRequest")).disabled = false;
                document.getElementById("btn-hidden-complete-loading").click();
            }
        )
    }

}