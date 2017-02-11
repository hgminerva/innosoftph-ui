import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ContinuityService {
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

    // list delivery by status
    public getListDeliveryData(): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/delivery/list/byDeliveryStatus";
        let deliveryObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                for (var i = 0; i <= results.length - 1; i++) {
                    if (results.length > 0) {
                        deliveryObservableArray.push({
                            Id: results[i].Id,
                            DeliveryNumberDetail: results[i].DeliveryNumber + " - " + results[i].Customer + " (" + results[i].Product + ")",
                            DeliveryNumber: results[i].DeliveryNumber,
                            Customer: results[i].Customer,
                            Product: results[i].Product
                        });
                    }
                }

                document.getElementById("btn-hidden-finished-load").click();
            }
        );

        return deliveryObservableArray;
    }

    // list article by article type
    public getListArticleData(articleTypeId: number): wijmo.collections.ObservableArray {
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

                if (articleTypeId == 2) {
                    // document.getElementById("btn-hidden-product-data").click();
                } else {
                    if (articleTypeId == 1) {
                        // document.getElementById("btn-hidden-sale-user-data").click();
                    }
                }
            }
        );

        return articleObservableArray;
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
            }
        );

        return userObservableArray;
    }

    // list continuity by date ranged (start date and end date)
    public getListContinuityData(continuityStartDate: Date, continuityEndDate: Date): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/continuity/list/byContinuityDateRange/" + continuityStartDate.toDateString() + "/" + continuityEndDate.toDateString();
        let continuityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                for (var i = 0; i <= results.length - 1; i++) {
                    if (results.length > 0) {
                        continuityObservableArray.push({
                            Id: results[i].Id,
                            ContinuityNumber: results[i].ContinuityNumber,
                            ContinuityDate: results[i].ContinuityDate,
                            DeliveryId: results[i].DeliveryId,
                            DeliveryNumber: results[i].DeliveryNumber,
                            CustomerId: results[i].CustomerId,
                            Customer: results[i].Customer,
                            ProductId: results[i].ProductId,
                            Product: results[i].Product,
                            ExpiryDate: results[i].ExpiryDate,
                            StaffUserId: results[i].StaffUserId,
                            StaffUser: results[i].StaffUser,
                            ContinuityStatus: results[i].ContinuityStatus
                        });
                    }
                }

                document.getElementById("btn-hidden-complete-loading").click();
            }
        );

        return continuityObservableArray;
    }

    // add continuity
    public postContinuityData(continuityOject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/continuity/post";
        this.http.post(url, JSON.stringify(continuityOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                document.getElementById("btn-hidden-continuity-detail-modal").click();
                document.getElementById("btn-hidden-continuity-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveContinuity")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveContinuity")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseContinuity")).disabled = false;
            }
        )
    }

    // update continuity
    public putContinuityData(id: number, continuityOject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/continuity/put/" + id;
        this.http.put(url, JSON.stringify(continuityOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                document.getElementById("btn-hidden-continuity-detail-modal").click();
                document.getElementById("btn-hidden-continuity-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveContinuity")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveContinuity")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseContinuity")).disabled = false;
            }
        )
    }

    // delete continuity
    public deleteContinuityData(id: number, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/continuity/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.toastr.success('', 'Delete Successful');
                document.getElementById("btn-hidden-continuity-delete-modal").click();
                document.getElementById("btn-hidden-continuity-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnDeleteContinuity")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
                (<HTMLButtonElement>document.getElementById("btnDeleteContinuity")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnDeleteCloseContinuity")).disabled = false;
            }
        )
    }
}