import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class DeliveryService {
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

    // list quotation by status
    public getListQuotationData(page: String): wijmo.collections.ObservableArray {
        let url = "http://localhost:22626/api/quotation/list/byQuotationStatus";
        let quotationObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        quotationObservableArray.push({
                            Id: response.json()[key].Id,
                            QuotationNumber: response.json()[key].QuotationNumber
                        });
                    }
                }

                if (page == "deliveryDetail") {

                }
            }
        );

        return quotationObservableArray;
    }

    // list article by article type
    public getListArticleData(page: String, articleTypeId: number): wijmo.collections.ObservableArray {
        let customerObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://localhost:22626/api/article/list/byArticleTypeId/" + articleTypeId;
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

                if (page == "deliveryDetail") {

                }
            }
        );

        return customerObservableArray;
    }

    // list user
    public getListUserData(page: String): wijmo.collections.ObservableArray {
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

                if (page == "deliveryDetail") {

                }
            }
        );

        return userObservableArray;
    }
    
    // list delivery by date ranged (start date and end date)
    public getListDeliveryData(deliveryStartDate: Date, deliveryEndDate: Date): wijmo.collections.ObservableArray {
        let url = "http://localhost:22626/api/delivery/list/byDeliveryDateRange/" + deliveryStartDate.toDateString() + "/" + deliveryEndDate.toDateString();
        let deliveryObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        deliveryObservableArray.push({
                            Id: response.json()[key].Id,
                            DeliveryNumber: response.json()[key].DeliveryNumber,
                            DeliveryDate: response.json()[key].DeliveryDate,
                            QuotationId: response.json()[key].QuotationId,
                            QuotationNumber: response.json()[key].QuotationNumber,
                            CustomerId: response.json()[key].CustomerId,
                            Customer: response.json()[key].Customer,
                            ProductId: response.json()[key].ProductId,
                            Product: response.json()[key].Product,
                            MeetingDate: response.json()[key].MeetingDate,
                            Remarks: response.json()[key].Remarks,
                            SalesUserId: response.json()[key].SalesUserId,
                            SalesUser: response.json()[key].SalesUser,
                            TechnicalUserId: response.json()[key].TechnicalUserId,
                            TechnicalUser: response.json()[key].TechnicalUser,
                            FunctionalUserId: response.json()[key].FunctionalUserId,
                            FunctionalUser: response.json()[key].FunctionalUser,
                            DeliveryStatus: response.json()[key].DeliveryStatus,
                        });
                    }
                }
            }
        );

        return deliveryObservableArray;
    }

    // get delivery by id
    public getDeliveryById(id: number) {
        let url = "http://localhost:22626/api/delivery/get/byId/" + id;
        this.http.get(url, this.options).subscribe(
            response => {
                if (response.json() != null) {
                    
                } else {
                    alert("No Data");
                    this.router.navigate(["/delivery"]);
                }
            }
        );
    }

    // add delivery
    public postDeliveryData(leadObject: Object, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/lead/post";
        this.http.post(url, JSON.stringify(leadObject), this.options).subscribe(
            response => {
                if (response.json() > 0) {
                    this.toastr.success('', 'Save Successful');
                    setTimeout(() => {

                    }, 1000);
                } else {
                    this.toastr.error('', 'Something`s went wrong!');
                }
            },
            error => {
                alert("Error");
            }
        )
    }

    // update delivery
    public putDeliveryData(id: number, leadObject: Object, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/lead/put/" + id;
        this.http.put(url, JSON.stringify(leadObject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                setTimeout(() => {
                    
                }, 1000);
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
            }
        )
    }

    // delete delivery
    public deleteDeliveryData(id: number, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/lead/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.toastr.success('', 'Delete Successful');
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
            }
        )
    }
}