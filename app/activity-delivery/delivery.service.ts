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
        let url = "http://api.innosoft.ph/api/quotation/list/byQuotationStatus";
        let quotationObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                for (var i = 0; i <= results.length - 1; i++) {
                    if (results.length > 0) {
                        quotationObservableArray.push({
                            Id: results[i].Id,
                            QuotationNumberDetail: results[i].QuotationNumber + " - " + results[i].Customer + " (" + results[i].Product + ")",
                            QuotationNumber: results[i].QuotationNumber,
                            CustomerId: results[i].CustomerId,
                            ProductId: results[i].ProductId
                        });
                    }
                }

                if (page == "deliveryDetail") {
                    document.getElementById("btn-hidden-sale-user-data").click();
                } else {
                    document.getElementById("btn-hidden-technical-user-data").click();
                }
            }
        );

        return quotationObservableArray;
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
                } else {
                    if (userType == "technical") {
                        document.getElementById("btn-hidden-functional-user-data").click();
                    } else {
                        if (userType == "functional") {
                            document.getElementById("btn-hidden-finished-load").click();
                        }
                    }
                }
            }
        );

        return userObservableArray;
    }

    // list delivery by date ranged (start date and end date)
    public getListDeliveryData(deliveryStartDate: Date, deliveryEndDate: Date): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/delivery/list/byDeliveryDateRange/" + deliveryStartDate.toDateString() + "/" + deliveryEndDate.toDateString();
        let deliveryObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                for (var i = 0; i <= results.length - 1; i++) {
                    if (results.length > 0) {
                        deliveryObservableArray.push({
                            Id: results[i].Id,
                            DeliveryNumber: results[i].DeliveryNumber,
                            DeliveryDate: results[i].DeliveryDate,
                            QuotationId: results[i].QuotationId,
                            QuotationNumber: results[i].QuotationNumber,
                            CustomerId: results[i].CustomerId,
                            Customer: results[i].Customer,
                            ProductId: results[i].ProductId,
                            Product: results[i].Product,
                            MeetingDate: results[i].MeetingDate,
                            Remarks: results[i].Remarks,
                            SalesUserId: results[i].SalesUserId,
                            SalesUser: results[i].SalesUser,
                            TechnicalUserId: results[i].TechnicalUserId,
                            TechnicalUser: results[i].TechnicalUser,
                            FunctionalUserId: results[i].FunctionalUserId,
                            FunctionalUser: results[i].FunctionalUser,
                            DeliveryStatus: results[i].DeliveryStatus,
                        });
                    }
                }

                document.getElementById("btn-hidden-complete-loading").click();

                (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
            }
        );

        return deliveryObservableArray;
    }

    // get delivery by id
    public getDeliveryById(id: number) {
        let url = "http://api.innosoft.ph/api/delivery/get/byId/" + id;
        this.http.get(url, this.options).subscribe(
            response => {
                var results = response.json();
                if (results != null) {
                    document.getElementById("btn-hidden-finished-load").click();
                    setTimeout(() => {
                        (<HTMLInputElement>document.getElementById("deliveryNumber")).value = results.DeliveryNumber;
                        (<HTMLInputElement>document.getElementById("deliveryDateValue")).value = results.DeliveryDate;
                        (<HTMLInputElement>document.getElementById("deliveryQuotaionSelectedValue")).value = results.QuotationId;
                        (<HTMLInputElement>document.getElementById("deliveryMeetingDateValue")).value = results.MeetingDate;
                        (<HTMLInputElement>document.getElementById("deliveryRemarks")).value = results.Remarks;
                        (<HTMLInputElement>document.getElementById("deliverySalesUserSelectedValue")).value = results.SalesUser;
                        (<HTMLInputElement>document.getElementById("deliveryTechnicalUserSelectedValue")).value = results.TechnicalUserId;
                        (<HTMLInputElement>document.getElementById("deliveryFunctionalUserSelectedValue")).value = results.FunctionalUserId;
                        (<HTMLInputElement>document.getElementById("deliveryStatusSelectedValue")).value = results.DeliveryStatus;
                        document.getElementById("btn-hidden-selectedValue-data").click();
                        document.getElementById("btn-hidden-complete-loading").click();
                    }, 200);
                } else {
                    alert("No Data");
                    this.router.navigate(["/delivery"]);
                }
            }
        );
    }

    // add delivery
    public postDeliveryData(deliveryObject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/delivery/post";
        this.http.post(url, JSON.stringify(deliveryObject), this.options).subscribe(
            response => {
                var results = response.json();
                if (results > 0) {
                    this.toastr.success('', 'Save Successful');
                    setTimeout(() => {
                        document.getElementById("btn-hidden-delivery-detail-modal").click();
                        this.router.navigate(['/deliveryDetail', results]);
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
        let url = "http://api.innosoft.ph/api/delivery/put/" + id;
        this.http.put(url, JSON.stringify(deliveryObject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                document.getElementById("btn-hidden-complete-loading").click();
                (<HTMLButtonElement>document.getElementById("btnSaveDeliveryDetail")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveDeliveryDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseDeliveryDetail")).disabled = false;
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
        let url = "http://api.innosoft.ph/api/delivery/delete/" + id;
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
    public getListActivityByQuotationId(deliveryId: number, isLoadActivityOnly: Boolean): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/activity/list/byDeliveryId/" + deliveryId;
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
                    document.getElementById("btn-hidden-quotation-data").click();
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