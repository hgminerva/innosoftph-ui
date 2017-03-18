import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as saveAs from 'file-saver';

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
                var results = new wijmo.collections.ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        leadObservableArray.push({
                            Id: results[i].Id,
                            LeadNumberDetail: results[i].LeadNumber + " - " + results[i].LeadName,
                            LeadNumber: results[i].LeadNumber
                        });
                    }
                }

                if (page == "quotationDetail") {
                    document.getElementById("btn-hidden-customer-data").click();
                } else {
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
                var results = new wijmo.collections.ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        customerObservableArray.push({
                            Id: results[i].Id,
                            ArticleCode: results[i].ArticleCode,
                            Article: results[i].Article,
                            Address: results[i].Address,
                            ContactPerson: results[i].ContactPerson,
                            ContactNumber: results[i].ContactNumber,
                            EmailAddress: results[i].EmailAddress
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
                } else {
                    if (articleTypeId == 2) {
                        document.getElementById("btn-hidden-product-data").click();
                    } else {
                        if (articleTypeId == 1) {
                            document.getElementById("btn-hidden-finished-load").click();
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
                var results = new wijmo.collections.ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        userObservableArray.push({
                            Id: results[i].Id,
                            FullName: results[i].FullName
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

    // pad - leading zero for date
    public pad(n: number) {
        return (n < 10) ? ("0" + n) : n;
    }

    // list quotation by date ranged (start date and end date)
    public getListQuotationData(quotationStartDate: Date, quotationEndDate: Date, quotationStatus: String): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/quotation/list/byQuotationDateRange/" + quotationStartDate.toDateString() + "/" + quotationEndDate.toDateString() + "/" + quotationStatus;
        let quotationObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        var myDate = new Date(results[i].QuotationDate);
                        var myDateValue = [myDate.getFullYear(), this.pad(myDate.getMonth() + 1), this.pad(myDate.getDate())].join('-');

                        quotationObservableArray.push({
                            Id: results[i].Id,
                            QuotationNumber: results[i].QuotationNumber,
                            QuotationDate: myDateValue,
                            LeadId: results[i].LeadId,
                            LeadNumber: results[i].LeadNumber,
                            CustomerId: results[i].CustomerId,
                            Customer: results[i].Customer,
                            ProductId: results[i].ProductId,
                            Product: results[i].Product,
                            Remarks: results[i].Remarks,
                            EncodedByUserId: results[i].EncodedByUserId,
                            EncodedByUser: results[i].EncodedByUser,
                            QuotationStatus: results[i].QuotationStatus,
                        });
                    }
                }

                document.getElementById("btn-hidden-complete-loading").click();

                (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
            }
        );

        return quotationObservableArray;
    }

    // get quotation by id
    public getQuotationById(id: number) {
        let url = "http://api.innosoft.ph/api/quotation/get/byId/" + id;
        this.http.get(url, this.options).subscribe(
            response => {
                var results = response.json();
                if (results != null) {
                    document.getElementById("btn-hidden-finished-load").click();
                    setTimeout(() => {
                        (<HTMLInputElement>document.getElementById("quotationDateValue")).value = results.QuotationDate;
                        (<HTMLInputElement>document.getElementById("quotationNumber")).value = results.QuotationNumber;
                        (<HTMLInputElement>document.getElementById("quotationLeadSelectedValue")).value = results.LeadId;
                        (<HTMLInputElement>document.getElementById("quotationCustomerSelectedValue")).value = results.CustomerId;
                        (<HTMLInputElement>document.getElementById("quotationProductSelectedValue")).value = results.ProductId;
                        (<HTMLInputElement>document.getElementById("quotationEncodedBySelectedValue")).value = results.EncodedByUser;
                        (<HTMLInputElement>document.getElementById("quotationRemarks")).value = results.Remarks;
                        (<HTMLInputElement>document.getElementById("quotationStatusSelectedValue")).value = results.QuotationStatus;
                        document.getElementById("btn-hidden-selectedValue-data").click();
                        document.getElementById("btn-hidden-complete-loading").click();
                    }, 200);
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
                var results = response.json();
                if (results > 0) {
                    this.toastr.success('', 'Save Successful');
                    setTimeout(() => {
                        document.getElementById("btn-hidden-quotation-detail-modal").click();
                        this.router.navigate(['/quotationDetail', results]);
                    }, 1000);
                } else {
                    this.toastr.error('', 'Something`s went wrong!');
                    (<HTMLButtonElement>document.getElementById("btnSaveQuotation")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    (<HTMLButtonElement>document.getElementById("btnSaveQuotation")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnCloseQuotation")).disabled = false;
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
                document.getElementById("btn-hidden-complete-loading").click();
                (<HTMLButtonElement>document.getElementById("btnSaveQuotationDetail")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveQuotationDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseQuotationDetail")).disabled = false;
            },
            error => {
                this.toastr.error(error._body.replace(/^"?(.+?)"?$/, '$1'), 'Save Failed');
                (<HTMLButtonElement>document.getElementById("btnSaveQuotationDetail")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveQuotationDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseQuotationDetail")).disabled = false;
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
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnDeleteQuotation")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
                (<HTMLButtonElement>document.getElementById("btnDeleteQuotation")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnDeleteCloseQuotation")).disabled = false;
            }
        )
    }

    // list activity by quotation Id
    public getListActivityByQuotationId(quotationId: number, isLoadActivityOnly: Boolean): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/activity/list/byQuotationId/" + quotationId;
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
                            ActivityNumber: results[i].ActivityNumber,
                            ActivityDate: myDateValue,
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
                    document.getElementById("btn-hidden-lead-data").click();
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

    // this is my previous code - not working
    // public printQuotationPaper(id: number, quotationObject: Object) {
    //     console.log(JSON.stringify(quotationObject));
    //     let url = "http://localhost:22626/RepQuotationDetail/quotationDetail?quotationId=" + id;
    //     this.http.post(url, JSON.stringify(quotationObject), this.options).subscribe(
    //         (response) => {
    //             var mediaType = 'application/pdf';
    //             var blobFile = new Blob([(<any>response)._body], { type: mediaType });
    //             var filename = 'test.pdf';
    //             saveAs(blobFile, filename);
    //             console.log((<any>response)._body);
    //             // var fileURL = URL.createObjectURL(blobFile);
    //             // window.open(fileURL);
    //             // console.log(fileURL);
    //         },
    //         error => {
    //             alert("Error");
    //         }
    //     )
    // }

    printQuotationPaper(id: number, quotationObject: Object) { //get file from service
        let url = "http://api.innosoft.ph/RepQuotationDetail/quotationDetail?quotationId=" + id;
        // let url = "http://localhost:22626/RepQuotationDetail/quotationDetail?quotationId=" + id;
        this.http.post(url, JSON.stringify(quotationObject), {
            method: RequestMethod.Post,
            responseType: ResponseContentType.Blob,
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json'
            })
        }).subscribe((response) => {
            var blob = new Blob([response.blob()], { type: 'application/pdf' });
            var filename = 'file.pdf';
            // saveAs(blob, filename);
            var fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
        });
    }
}