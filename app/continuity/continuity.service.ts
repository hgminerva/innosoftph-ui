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
        let url = "http://localhost:22626/api/delivery/list/byDeliveryStatus";
        let deliveryObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        deliveryObservableArray.push({
                            Id: response.json()[key].Id,
                            DeliveryNumber: response.json()[key].DeliveryNumber
                        });
                    }
                }
            }
        );

        return deliveryObservableArray;
    }

    // list article by article type
    public getListArticleData(articleTypeId: number): wijmo.collections.ObservableArray {
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
            }
        );

        return userObservableArray;
    }

    // list continuity by date ranged (start date and end date)
    public getListContinuityData(continuityStartDate: Date, continuityEndDate: Date): wijmo.collections.ObservableArray {
        let url = "http://localhost:22626/api/continuity/list/byContinuityDateRange/" + continuityStartDate.toDateString() + "/" + continuityEndDate.toDateString();
        let continuityObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        continuityObservableArray.push({
                            Id: response.json()[key].Id,
                            ContinuityNumber: response.json()[key].ContinuityNumber,
                            ContinuityDate: response.json()[key].ContinuityDate,
                            DeliveryId: response.json()[key].DeliveryId,
                            DeliveryNumber: response.json()[key].DeliveryNumber,
                            CustomerId: response.json()[key].CustomerId,
                            Customer: response.json()[key].Customer,
                            ProductId: response.json()[key].ProductId,
                            Product: response.json()[key].Product,
                            ExpiryDate: response.json()[key].ExpiryDate,
                            StaffUserId: response.json()[key].StaffUserId,
                            StaffUser: response.json()[key].StaffUser,
                            ContinuityStatus: response.json()[key].ContinuityStatus
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
        let url = "http://localhost:22626/api/continuity/post";
        this.http.post(url, JSON.stringify(continuityOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                // document.getElementById("btn-hidden-activity-detail-modal").click();
                // document.getElementById("btn-hidden-activity-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                // (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                // (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = false;
                // (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = false;
            }
        )
    }

    // update continuity
    public putContinuityData(id: number, continuityOject: Object, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/continuity/put/" + id;
        this.http.put(url, JSON.stringify(continuityOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                // document.getElementById("btn-hidden-activity-detail-modal").click();
                // document.getElementById("btn-hidden-activity-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                // (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                // (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = false;
                // (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = false;
            }
        )
    }

    // delete continuity
    public deleteContinuityData(id: number, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/continuity/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.toastr.success('', 'Delete Successful');
                // document.getElementById("btn-hidden-activity-delete-modal").click();
                // document.getElementById("btn-hidden-activity-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                // (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                // (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).disabled = false;
                // (<HTMLButtonElement>document.getElementById("btnActivityCloseDeleteConfirmation")).disabled = false;
            }
        )
    }
}