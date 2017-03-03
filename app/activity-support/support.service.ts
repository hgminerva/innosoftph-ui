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

    // list bcs customer
    public getContuinityCustomerData(page: String): wijmo.collections.ObservableArray {
        let customerObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://api.innosoft.ph/api/continuity/list/continuity/customers";
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                for (var i = 0; i <= results.length - 1; i++) {
                    if (results.length > 0) {
                        customerObservableArray.push({
                            CustomerId: results[i].CustomerId,
                            Customer: results[i].Customer
                        });
                    }
                }

                if (page == "supportDetail") {
                    document.getElementById("btn-hidden-continuity-data").click();
                } else {
                    if (page == "support") {
                        document.getElementById("btn-hidden-continuity-data").click();
                    }
                }
            }
        );

        return customerObservableArray;
    }

    // list article by article type
    public getListArticleData(page: String, articleTypeId: number): wijmo.collections.ObservableArray {
        let articleObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://api.innosoft.ph/api/article/list/byArticleTypeId/" + articleTypeId;
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                for (var i = 0; i <= results.length - 1; i++) {
                    if (results.length > 0) {
                        articleObservableArray.push({
                            Id: results[i].Id,
                            Article: results[i].Article
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
                } else {
                    if (articleTypeId == 2) {
                        document.getElementById("btn-hidden-continuity-data").click();
                    }
                }
            }
        );

        return articleObservableArray;
    }

    // list continuity by status
    public getListContinuityData(page: String, customerId: number, isSelectedCustomerOnly: Boolean): wijmo.collections.ObservableArray {
        let continuityObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://api.innosoft.ph/api/continuity/list/byCustomerId/byContinuityStatus/" + customerId;
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                for (var i = 0; i <= results.length - 1; i++) {
                    if (results.length > 0) {
                        continuityObservableArray.push({
                            Id: results[i].Id,
                            ContinuityNumberDetail: results[i].ContinuityNumber + " - " + results[i].Product + " (Exp: " + results[i].ExpiryDate + ")",
                            ContinuityNumber: results[i].ContinuityNumber,
                            Customer: results[i].Customer,
                            ProductId: results[i].ProductId,
                            Product: results[i].Product,
                        });
                    }
                }

                if (page == "supportDetail") {
                    if (!isSelectedCustomerOnly) {
                        document.getElementById("btn-hidden-encoded-by-user-data").click();
                    }
                } else {
                    if (!isSelectedCustomerOnly) {
                        document.getElementById("btn-hidden-assigned-to-user-data").click();
                    }
                }
            }
        );

        return continuityObservableArray;
    }

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

                if (page == "supportDetail") {
                    if (userType == "encodedByUser") {
                        document.getElementById("btn-hidden-assigned-to-user-data").click();
                    } else {
                        if (userType == "assignedToUser") {
                            document.getElementById("btn-hidden-support-data").click();
                        }
                    }
                } else {
                    if (userType == "assignedToUser") {
                        document.getElementById("btn-hidden-finished-load").click();
                    }
                }
            }
        );

        return userObservableArray;
    }

    // list support by date ranged (start date and end date)
    public getListSupportData(supportStartDate: Date, supportEndDate: Date): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/support/list/bySupportDateRange/" + supportStartDate.toDateString() + "/" + supportEndDate.toDateString();
        let supportObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                for (var i = 0; i <= results.length - 1; i++) {
                    if (results.length > 0) {
                        supportObservableArray.push({
                            Id: results[i].Id,
                            SupportNumber: results[i].SupportNumber,
                            SupportDate: results[i].SupportDate,
                            ContinuityId: results[i].ContinuityId,
                            ContinuityNumber: results[i].ContinuityNumber,
                            IssueCategory: results[i].IssueCategory,
                            Issue: results[i].Issue,
                            CustomerId: results[i].CustomerId,
                            Customer: results[i].Customer,
                            ProductId: results[i].ProductId,
                            Product: results[i].Product,
                            SupportType: results[i].SupportType,
                            Severity: results[i].Severity,
                            Caller: results[i].Caller,
                            Remarks: results[i].Remarks,
                            ScreenShotURL: results[i].ScreenShotURL,
                            EncodedByUserId: results[i].EncodedByUserId,
                            EncodedByUser: results[i].EncodedByUser,
                            AssignedToUserId: results[i].AssignedToUserId,
                            AssignedToUser: results[i].AssignedToUser == null ? " " : results[i].AssignedToUser,
                            SupportStatus: results[i].SupportStatus,
                        });
                    }
                }

                document.getElementById("btn-hidden-complete-loading").click();

                (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
            }
        );

        return supportObservableArray;
    }

    // get support by id
    public getSupportById(id: number) {
        let url = "http://api.innosoft.ph/api/support/get/byId/" + id;
        this.http.get(url, this.options).subscribe(
            response => {
                var results = response.json();
                if (results != null) {
                    document.getElementById("btn-hidden-finished-load").click();
                    setTimeout(() => {
                        (<HTMLInputElement>document.getElementById("supportNumber")).value = results.SupportNumber;
                        (<HTMLInputElement>document.getElementById("supportDateValue")).value = results.SupportDate;
                        (<HTMLInputElement>document.getElementById("supportContinuitySelectedValue")).value = results.ContinuityId;
                        (<HTMLInputElement>document.getElementById("supportIssueCategorySelectedValue")).value = results.IssueCategory;
                        (<HTMLInputElement>document.getElementById("supportIssue")).value = results.Issue;
                        (<HTMLInputElement>document.getElementById("supportCustomerSelectedValue")).value = results.CustomerId;
                        (<HTMLInputElement>document.getElementById("supportTypeSelectedValue")).value = results.SupportType;
                        (<HTMLInputElement>document.getElementById("supportSeveritySelectedValue")).value = results.Severity;
                        (<HTMLInputElement>document.getElementById("supportCaller")).value = results.Caller;
                        (<HTMLInputElement>document.getElementById("supportRemarks")).value = results.Remarks;
                        (<HTMLInputElement>document.getElementById("supportScreenShotURL")).value = results.ScreenShotURL;
                        (<HTMLInputElement>document.getElementById("supportEncodedBySelectedValue")).value = results.EncodedByUser;
                        (<HTMLInputElement>document.getElementById("supportAssignedToSelectedValue")).value = results.AssignedToUserId;
                        (<HTMLInputElement>document.getElementById("supportStatusSelectedValue")).value = results.SupportStatus;
                        document.getElementById("btn-hidden-selectedValue-data").click();
                        document.getElementById("btn-hidden-complete-loading").click();
                    }, 200);
                } else {
                    alert("No Data");
                    this.router.navigate(["/supportActivity"]);
                }
            }
        );
    }

    // add support
    public postSupportData(supportObject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/support/post";
        this.http.post(url, JSON.stringify(supportObject), this.options).subscribe(
            response => {
                var results = response.json();
                if (results > 0) {
                    this.toastr.success('', 'Save Successful');
                    setTimeout(() => {
                        document.getElementById("btn-hidden-support-detail-modal").click();
                        this.router.navigate(['/supportDetail', results]);
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
        let url = "http://api.innosoft.ph/api/support/put/" + id;
        this.http.put(url, JSON.stringify(supportObject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                document.getElementById("btn-hidden-complete-loading").click();
                (<HTMLButtonElement>document.getElementById("btnSaveSupportDetail")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveSupportDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseSupportDetail")).disabled = false;
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
        let url = "http://api.innosoft.ph/api/support/delete/" + id;
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
    public getListActivityBySupportId(supportId: number, isLoadActivityOnly: Boolean): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/activity/list/bySupportId/" + supportId;
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
                    document.getElementById("btn-hidden-customer-data").click();
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
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = false;
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