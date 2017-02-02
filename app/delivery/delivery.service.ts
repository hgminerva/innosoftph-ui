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
                    document.getElementById("btn-hidden-customer-data").click();
                }
            }
        );

        return quotationObservableArray;
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

                if (page == "deliveryDetail") {
                    if (articleTypeId == 2) {
                        document.getElementById("btn-hidden-product-data").click();
                    } else {
                        if (articleTypeId == 1) {
                            document.getElementById("btn-hidden-sale-user-data").click();
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

                if (page == "deliveryDetail") {
                    if (userType == "sales") {
                        document.getElementById("btn-hidden-technical-user-data").click();
                    } else {
                        if (userType == "technical") {
                            document.getElementById("btn-hidden-functional-user-data").click();
                        } else {
                            if (userType == "functional") {
                                document.getElementById("btn-hidden-delivery-data").click();
                            }
                        }
                    }
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

                document.getElementById("btn-hidden-complete-loading").click();
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
                    (<HTMLInputElement>document.getElementById("deliveryNumber")).value = response.json().DeliveryNumber;
                    (<HTMLInputElement>document.getElementById("deliveryDateValue")).value = response.json().DeliveryDate;
                    (<HTMLInputElement>document.getElementById("deliveryQuotaionSelectedValue")).value = response.json().QuotationNumber;
                    (<HTMLInputElement>document.getElementById("deliveryCustomerSelectedValue")).value = response.json().Customer;
                    (<HTMLInputElement>document.getElementById("deliveryProductSelectedValue")).value = response.json().Product;
                    (<HTMLInputElement>document.getElementById("deliveryMeetingDateValue")).value = response.json().MeetingDate;
                    (<HTMLInputElement>document.getElementById("deliveryRemarks")).value = response.json().Remarks;
                    (<HTMLInputElement>document.getElementById("deliverySalesUserSelectedValue")).value = response.json().SalesUser;
                    (<HTMLInputElement>document.getElementById("deliveryTechnicalUserSelectedValue")).value = response.json().TechnicalUser;
                    (<HTMLInputElement>document.getElementById("deliveryFunctionalUserSelectedValue")).value = response.json().FunctionalUser;
                    (<HTMLInputElement>document.getElementById("deliveryStatusSelectedValue")).value = response.json().DeliveryStatus;
                    document.getElementById("btn-hidden-selectedValue-data").click();
                    document.getElementById("btn-hidden-complete-loading").click();
                } else {
                    alert("No Data");
                    this.router.navigate(["/delivery"]);
                }
            }
        );
    }

    // add delivery
    public postDeliveryData(deliveryObject: Object, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/delivery/post";
        this.http.post(url, JSON.stringify(deliveryObject), this.options).subscribe(
            response => {
                if (response.json() > 0) {
                    this.toastr.success('', 'Save Successful');
                    setTimeout(() => {
                        document.getElementById("btn-hidden-delivery-detail-modal").click();
                        this.router.navigate(['/deliveryDetail', response.json()]);
                    }, 1000);
                } else {
                    (<HTMLButtonElement>document.getElementById("btnSaveDelivery")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    (<HTMLButtonElement>document.getElementById("btnSaveDelivery")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnCloseDelivery")).disabled = false;
                    this.toastr.error('', 'Something`s went wrong!');
                }
            },
            error => {
                alert("Error");
            }
        )
    }

    // update delivery
    public putDeliveryData(id: number, deliveryObject: Object, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/delivery/put/" + id;
        this.http.put(url, JSON.stringify(deliveryObject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                setTimeout(() => {
                    this.router.navigate(['/delivery']);
                }, 1000);
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveDeliveryDetail")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveDeliveryDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseDeliveryDetail")).disabled = false;
            }
        )
    }

    // delete delivery
    public deleteDeliveryData(id: number, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/delivery/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.toastr.success('', 'Delete Successful');
                document.getElementById("btn-hidden-delivery-delete-modal").click();
                document.getElementById("btn-hidden-refresh-grid").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnDeleteDelivery")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
                (<HTMLButtonElement>document.getElementById("btnDeleteDelivery")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnDeleteCloseDelivery")).disabled = false;
            }
        )
    }

    // list activity by delivery Id
    public getListActivityByQuotationId(deliveryId: number): wijmo.collections.ObservableArray {
        let url = "http://localhost:22626/api/activity/list/byDeliveryId/" + deliveryId;
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
    public putActivityData(id: number, leadObject: Object, toastr: ToastsManager) {
        let url = "http://localhost:22626/api/activity/put/" + id;
        this.http.put(url, JSON.stringify(leadObject), this.options).subscribe(
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