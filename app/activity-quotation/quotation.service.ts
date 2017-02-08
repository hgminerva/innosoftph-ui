import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class QuotationService {
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

    // list lead by status
    public getListLeadData(page: String): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/lead/list/byLeadStatus";
        let leadObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        leadObservableArray.push({
                            Id: response.json()[key].Id,
                            LeadNumber: response.json()[key].LeadNumber,
                        });
                    }
                }

                if (page == "quotationDetail") {
                    document.getElementById("btn-hidden-customer-data").click();
                }
            }
        );

        return leadObservableArray;
    }

    // list article by article type
    public getListArticleData(page: String, articleTypeId: number): wijmo.collections.ObservableArray {
        let customerObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://api.innosoft.ph/api/article/list/byArticleTypeId/" + articleTypeId;
        this.http.get(url, this.options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        customerObservableArray.push({
                            Id: response.json()[key].Id,
                            Article: response.json()[key].Article
                        });
                    }
                }

                if (page == "quotationDetail") {
                    if (articleTypeId == 2) {
                        document.getElementById("btn-hidden-product-data").click();
                    } else {
                        if (articleTypeId == 1) {
                            document.getElementById("btn-hidden-encoded-user-data").click();
                        }
                    }
                }
            }
        );

        return customerObservableArray;
    }

    // list user
    public getListUserData(page: String): wijmo.collections.ObservableArray {
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

                if (page == "quotationDetail") {
                    document.getElementById("btn-hidden-quotation-data").click();
                }
            }
        );

        return userObservableArray;
    }

    // list quotation by date ranged (start date and end date)
    public getListQuotationData(quotationStartDate: Date, quotationEndDate: Date): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/quotation/list/byQuotationDateRange/" + quotationStartDate.toDateString() + "/" + quotationEndDate.toDateString();
        let quotationObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        quotationObservableArray.push({
                            Id: response.json()[key].Id,
                            QuotationNumber: response.json()[key].QuotationNumber,
                            QuotationDate: response.json()[key].QuotationDate,
                            LeadId: response.json()[key].LeadId,
                            LeadNumber: response.json()[key].LeadNumber,
                            CustomerId: response.json()[key].CustomerId,
                            Customer: response.json()[key].Customer,
                            ProductId: response.json()[key].ProductId,
                            Product: response.json()[key].Product,
                            Remarks: response.json()[key].Remarks,
                            EncodedByUserId: response.json()[key].EncodedByUserId,
                            EncodedByUser: response.json()[key].EncodedByUser,
                            QuotationStatus: response.json()[key].QuotationStatus,
                        });
                    }
                }

                console.log(quotationObservableArray);

                document.getElementById("btn-hidden-complete-loading").click();
            }
        );

        return quotationObservableArray;
    }

    // get quotation by id
    public getQuotationById(id: number) {
        let url = "http://api.innosoft.ph/api/quotation/get/byId/" + id;
        this.http.get(url, this.options).subscribe(
            response => {
                if (response.json() != null) {
                    (<HTMLInputElement>document.getElementById("quotationDateValue")).value = response.json().QuotationDate;
                    (<HTMLInputElement>document.getElementById("quotationNumber")).value = response.json().QuotationNumber;
                    (<HTMLInputElement>document.getElementById("quotationLeadSelectedValue")).value = response.json().LeadNumber;
                    (<HTMLInputElement>document.getElementById("quotationCustomerSelectedValue")).value = response.json().Customer;
                    (<HTMLInputElement>document.getElementById("quotationProductSelectedValue")).value = response.json().Product;
                    (<HTMLInputElement>document.getElementById("quotationEncodedBySelectedValue")).value = response.json().EncodedByUser;
                    (<HTMLInputElement>document.getElementById("quotationRemarks")).value = response.json().Remarks;
                    (<HTMLInputElement>document.getElementById("quotationStatusSelectedValue")).value = response.json().QuotationStatus;
                    document.getElementById("btn-hidden-selectedValue-data").click();
                    document.getElementById("btn-hidden-complete-loading").click();
                } else {
                    alert("No Data");
                    this.router.navigate(["/quotation"]);
                }
            }
        );
    }

    // add quotation
    public postQuotationData(quotationObject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/quotation/post";
        this.http.post(url, JSON.stringify(quotationObject), this.options).subscribe(
            response => {
                if (response.json() > 0) {
                    this.toastr.success('', 'Save Successful');
                    setTimeout(() => {
                        document.getElementById("btn-hidden-quotation-detail-modal").click();
                        this.router.navigate(['/quotationDetail', response.json()]);
                    }, 1000);
                } else {
                    (<HTMLButtonElement>document.getElementById("btnSaveQuotation")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    (<HTMLButtonElement>document.getElementById("btnSaveQuotation")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnCloseQuotation")).disabled = false;
                    this.toastr.error('', 'Something`s went wrong!');
                }
            },
            error => {
                alert("Error");
            }
        )
    }

    // update quotation
    public putQuotationData(id: number, quotationObject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/quotation/put/" + id;
        this.http.put(url, JSON.stringify(quotationObject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                setTimeout(() => {
                    this.router.navigate(['/quotation']);
                }, 1000);
            },
            error => {
                this.toastr.error(error._body.replace(/^"?(.+?)"?$/, '$1'), 'Save Failed');
                (<HTMLButtonElement>document.getElementById("btnSaveQuotationDetail")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveQuotationDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseQuotationDetail")).disabled = false;
                console.log(error);
            }
        )
    }

    // delete quotation
    public deleteQuotationData(id: number, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/quotation/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.toastr.success('', 'Delete Successful');
                document.getElementById("btn-hidden-quotation-delete-modal").click();
                document.getElementById("btn-hidden-refresh-grid").click();
            },
            error => {
                (<HTMLButtonElement>document.getElementById("btnDeleteQuotation")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
                (<HTMLButtonElement>document.getElementById("btnDeleteQuotation")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnDeleteCloseQuotation")).disabled = false;
                this.toastr.error('', 'Something`s went wrong!');
            }
        )
    }

    // list activity by quotation Id
    public getListActivityByQuotationId(quotationId: number): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/activity/list/byQuotationId/" + quotationId;
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