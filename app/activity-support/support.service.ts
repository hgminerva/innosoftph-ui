import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class SupportService {
    // global variables
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });

    // constructor
    constructor(
        private router: Router,
        private http: Http,
        public toastr: ToastsManager
    ) { }

    // list continuity by status
    public getListContinuityData(page: String): wijmo.collections.ObservableArray {
        let url = "http://localhost:22626/api/continuity/list/byContinuityStatus";
        let continuityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        continuityObservableArray.push({
                            Id: response.json()[key].Id,
                            ContinuityNumber: response.json()[key].ContinuityNumber,
                            Customer: response.json()[key].Customer,
                            Product: response.json()[key].Product,
                        });
                    }
                }

                if (page == "supportDetail") {
                    document.getElementById("btn-hidden-customer-data").click();
                }
            }
        );

        return continuityObservableArray;
    }

    // list article by article type
    public getListArticleData(page: String, articleTypeId: number): wijmo.collections.ObservableArray {
        let articleObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://localhost:22626/api/article/list/byArticleTypeId/" + articleTypeId;
        this.http.get(url, this.options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        articleObservableArray.push({
                            Id: response.json()[key].Id,
                            Article: response.json()[key].Article
                        });
                    }
                }

                if (page == "supportDetail") {
                    if (articleTypeId == 2) {
                        document.getElementById("btn-hidden-product-data").click();
                    } else {
                        if (articleTypeId == 1) {
                            document.getElementById("btn-hidden-encoded-by-user-data").click();
                        }
                    }
                }
            }
        );

        return articleObservableArray;
    }

    // list user
    public getListUserData(page: String, userType: String): wijmo.collections.ObservableArray {
        let userObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://localhost:22626/api/user/list";
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

                if (page == "supportDetail") {
                    if (userType == "encodedByUser") {
                        document.getElementById("btn-hidden-assigned-to-user-data").click();
                    } else {
                        if (userType == "assignedToUser") {
                            document.getElementById("btn-hidden-support-data").click();
                        }
                    }
                }
            }
        );

        return userObservableArray;
    }

    // list support by date ranged (start date and end date)
    public getListSupportData(supportStartDate: Date, supportEndDate: Date): wijmo.collections.ObservableArray {
        let url = "http://localhost:22626/api/support/list/bySupportDateRange/" + supportStartDate.toDateString() + "/" + supportEndDate.toDateString();
        let supportObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        supportObservableArray.push({
                            Id: response.json()[key].Id,
                            SupportNumber: response.json()[key].SupportNumber,
                            SupportDate: response.json()[key].SupportDate,
                            ContinuityId: response.json()[key].ContinuityId,
                            ContinuityNumber: response.json()[key].ContinuityNumber,
                            IssueCategory: response.json()[key].IssueCategory,
                            Issue: response.json()[key].Issue,
                            CustomerId: response.json()[key].CustomerId,
                            Customer: response.json()[key].Customer,
                            ProductId: response.json()[key].ProductId,
                            Product: response.json()[key].Product,
                            Severity: response.json()[key].Severity,
                            Caller: response.json()[key].Caller,
                            Remarks: response.json()[key].Remarks,
                            ScreenShotURL: response.json()[key].ScreenShotURL,
                            EncodedByUserId: response.json()[key].EncodedByUserId,
                            EncodedByUser: response.json()[key].EncodedByUser,
                            AssignedToUserId: response.json()[key].AssignedToUserId,
                            AssignedToUser: response.json()[key].AssignedToUser,
                            SupportStatus: response.json()[key].SupportStatus,
                        });
                    }
                }

                document.getElementById("btn-hidden-complete-loading").click();
            }
        );

        return supportObservableArray;
    }

    // get support by id
    public getSupportById(id: number) {
        let url = "http://localhost:22626/api/support/get/byId/" + id;
        this.http.get(url, this.options).subscribe(
            response => {
                if (response.json() != null) {
                    (<HTMLInputElement>document.getElementById("supportNumber")).value = response.json().SupportNumber;
                    (<HTMLInputElement>document.getElementById("supportDateValue")).value = response.json().SupportDate;
                    (<HTMLInputElement>document.getElementById("supportContinuitySelectedValue")).value = response.json().ContinuityNumber;
                    (<HTMLInputElement>document.getElementById("supportIssueCategorySelectedValue")).value = response.json().IssueCategory;
                    (<HTMLInputElement>document.getElementById("supportIssue")).value = response.json().Issue;
                    (<HTMLInputElement>document.getElementById("supportCustomerSelectedValue")).value = response.json().Customer;
                    (<HTMLInputElement>document.getElementById("supportProductSelectedValue")).value = response.json().Product;
                    (<HTMLInputElement>document.getElementById("supportSeveritySelectedValue")).value = response.json().Severity;
                    (<HTMLInputElement>document.getElementById("supportCaller")).value = response.json().Caller;
                    (<HTMLInputElement>document.getElementById("supportRemarks")).value = response.json().Remarks;
                    (<HTMLInputElement>document.getElementById("supportScreenShotURL")).value = response.json().ScreenShotURL;
                    (<HTMLInputElement>document.getElementById("supportEncodedBySelectedValue")).value = response.json().EncodedByUser;
                    (<HTMLInputElement>document.getElementById("supportAssignedToSelectedValue")).value = response.json().AssignedToUser;
                    (<HTMLInputElement>document.getElementById("supportStatusSelectedValue")).value = response.json().SupportStatus;
                    document.getElementById("btn-hidden-selectedValue-data").click();
                    document.getElementById("btn-hidden-complete-loading").click();
                } else {
                    alert("No Data");
                    this.router.navigate(["/supportActivity"]);
                }
            }
        );
    }

    // add support
    public postSupportData(supportObject: Object, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/support/post";
        this.http.post(url, JSON.stringify(supportObject), this.options).subscribe(
            response => {
                if (response.json() > 0) {
                    this.toastr.success('', 'Save Successful');
                    setTimeout(() => {
                        document.getElementById("btn-hidden-support-detail-modal").click();
                        this.router.navigate(['/supportDetail', response.json()]);
                    }, 1000);
                } else {
                    this.toastr.error('', 'Something`s went wrong!');
                    (<HTMLButtonElement>document.getElementById("btnSaveSupport")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    (<HTMLButtonElement>document.getElementById("btnSaveSupport")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnCloseSupport")).disabled = false;
                }
            },
            error => {
                alert("Error");
            }
        )
    }

    // update support
    public putSupportData(id: number, supportObject: Object, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/support/put/" + id;
        this.http.put(url, JSON.stringify(supportObject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                setTimeout(() => {
                    this.router.navigate(['/supportActivity']);
                }, 1000);
            },
            error => {
                this.toastr.error('', 'Save Unsuccessful');
                // this.toastr.error(error._body.replace(/^"?(.+?)"?$/, '$1'), 'Save Failed');
                (<HTMLButtonElement>document.getElementById("btnSaveSupportDetail")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveSupportDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseSupportDetail")).disabled = false;
            }
        )
    }

    // delete support
    public deleteSupportData(id: number, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/support/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.toastr.success('', 'Delete Successful');
                document.getElementById("btn-hidden-support-delete-modal").click();
                document.getElementById("btn-hidden-refresh-grid").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnDeleteSupport")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
                (<HTMLButtonElement>document.getElementById("btnDeleteSupport")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnDeleteCloseSupport")).disabled = false;
            }
        )
    }

    // list activity by support Id
    public getListActivityBySupportId(supportId: number): wijmo.collections.ObservableArray {
        let url = "http://localhost:22626/api/activity/list/bySupportId/" + supportId;
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
        let url = "http://localhost:22626/api/activity/post";
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
        let url = "http://localhost:22626/api/activity/put/" + id;
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
        let url = "http://localhost:22626/api/activity/delete/" + id;
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