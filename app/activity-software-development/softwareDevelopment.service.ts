import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class SoftwareDevelopmentService {
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

    // list project by status
    public getListProjectData(page: String): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/project/list/byProjectStatus";
        let projectObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                for (var i = 0; i <= results.length - 1; i++) {
                    if (results.length > 0) {
                        projectObservableArray.push({
                            Id: results[i].Id,
                            ProjectNumberDetail: results[i].ProjectNumber + " - " + results[i].ProjectName,
                            ProjectNumber: results[i].ProjectNumber,
                            CustomerId: results[i].CustomerId
                        });
                    }
                }

                if (page == "softwareDevelopmentDetail") {
                    document.getElementById("btn-hidden-user-data").click();
                } else {
                    document.getElementById("btn-hidden-user-data").click();
                }
            }
        );

        return projectObservableArray;
    }

    // list user
    public getListUserData(page: String): wijmo.collections.ObservableArray {
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

                if (page == "softwareDevelopmentDetail") {
                    document.getElementById("btn-hidden-software-development-data").click();
                } else {
                    document.getElementById("btn-hidden-finished-load").click();
                }
            }
        );

        return userObservableArray;
    }

    // list software development by date ranged (start date and end date)
    public getListSoftwareDevelopmentData(softwareDevelopmentStartDate: Date, softwareDevelopmentEndDate: Date): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/softwareDevelopment/list/bySoftwareDevelopmentDateRange/" + softwareDevelopmentStartDate.toDateString() + "/" + softwareDevelopmentEndDate.toDateString();
        let softwareDevelopmentObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = response.json();
                for (var i = 0; i <= results.length - 1; i++) {
                    if (results.length > 0) {
                        softwareDevelopmentObservableArray.push({
                            Id: results[i].Id,
                            SoftDevNumber: results[i].SoftDevNumber,
                            SoftDevDate: results[i].SoftDevDate,
                            ProjectId: results[i].ProjectId,
                            ProjectNumber: results[i].ProjectNumber,
                            ProjectName: results[i].ProjectName,
                            Task: results[i].Task,
                            Remarks: results[i].Remarks,
                            NumberOfHours: results[i].NumberOfHours,
                            EncodedByUserId: results[i].EncodedByUserId,
                            EncodedByUser: results[i].EncodedByUser,
                            AssignedToUserId: results[i].AssignedToUserId,
                            AssignedToUser: results[i].AssignedToUser == null ? " " : results[i].AssignedToUser,
                            SoftDevStatus: results[i].SoftDevStatus
                        });
                    }
                }

                document.getElementById("btn-hidden-complete-loading").click();
            }
        );

        return softwareDevelopmentObservableArray;
    }

    // get softwareDevelopment by id
    public getSoftwareDevelopmentById(id: number) {
        let url = "http://api.innosoft.ph/api/softwareDevelopment/get/byId/" + id;
        this.http.get(url, this.options).subscribe(
            response => {
                var results = response.json();
                if (results != null) {
                    document.getElementById("btn-hidden-finished-load").click();
                    setTimeout(() => {
                        (<HTMLInputElement>document.getElementById("softwareDevelopmentDateValue")).value = results.SoftDevDate;
                        (<HTMLInputElement>document.getElementById("softwareDevelopmentSelectedValue")).value = results.SoftDevNumber;
                        (<HTMLInputElement>document.getElementById("softwareDevelopmentProjectSelectedValue")).value = results.ProjectId;
                        (<HTMLInputElement>document.getElementById("softwareDevelopmentTask")).value = results.Task;
                        (<HTMLInputElement>document.getElementById("softwareDevelopmentRemarks")).value = results.Remarks;
                        (<HTMLInputElement>document.getElementById("softwareDevelopmentNoOfHoursSelectedValue")).value = results.NumberOfHours;
                        (<HTMLInputElement>document.getElementById("softwareDevelopmentEncodedBySelectedValue")).value = results.EncodedByUser;
                        (<HTMLInputElement>document.getElementById("softwareDevelopmentAssignedUserSelectedValue")).value = results.AssignedToUserId;
                        (<HTMLInputElement>document.getElementById("softwareDevelopmentStatusSelectedValue")).value = results.SoftDevStatus;
                        document.getElementById("btn-hidden-selectedValue-data").click();
                        document.getElementById("btn-hidden-complete-loading").click();
                    }, 200);
                } else {
                    alert("No Data");
                    this.router.navigate(["/softwareDevelopment"]);
                }
            }
        );
    }

    // add softwareDevelopment
    public postSoftwareDevelopmentData(softwareDevelopmentObject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/softwareDevelopment/post";
        this.http.post(url, JSON.stringify(softwareDevelopmentObject), this.options).subscribe(
            response => {
                var results = response.json();
                if (results > 0) {
                    this.toastr.success('', 'Save Successful');
                    setTimeout(() => {
                        document.getElementById("btn-hidden-softwareDevelopment-detail-modal").click();
                        this.router.navigate(['/softwareDevelopmentDetail', results]);
                    }, 1000);
                } else {
                    (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopment")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                    (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopment")).disabled = false;
                    (<HTMLButtonElement>document.getElementById("btnCloseSoftwareDevelopment")).disabled = false;
                    this.toastr.error('', 'Something`s went wrong!');
                }
            },
            error => {
                alert("Error");
            }
        )
    }

    // update softwareDevelopment
    public putSoftwareDevelopmentData(id: number, softwareDevelopmentObject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/softwareDevelopment/put/" + id;
        this.http.put(url, JSON.stringify(softwareDevelopmentObject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                setTimeout(() => {
                    this.router.navigate(['/softwareDevelopment']);
                }, 1000);
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopmentDetail")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveSoftwareDevelopmentDetail")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseSoftwareDevelopmentDetail")).disabled = false;
            }
        )
    }

    // delete softwareDevelopment
    public deleteSoftwareDevelopmentData(id: number, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/softwareDevelopment/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.toastr.success('', 'Delete Successful');
                document.getElementById("btn-hidden-softwareDevelopment-delete-modal").click();
                document.getElementById("btn-hidden-refresh-grid").click();
            },
            error => {
                (<HTMLButtonElement>document.getElementById("btnDeleteSoftwareDevelopment")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
                (<HTMLButtonElement>document.getElementById("btnDeleteSoftwareDevelopment")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnDeleteCloseSoftwareDevelopment")).disabled = false;
                this.toastr.error('', 'Something`s went wrong!');
            }
        )
    }

    // list activity by softwareDevelopment Id
    public getListActivityBySoftwareDevelopmentId(softwareDevelopmentId: number, isLoadActivityOnly: Boolean): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/activity/list/bySoftwareDevelopmentId/" + softwareDevelopmentId;
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
                    document.getElementById("btn-hidden-project-data").click();
                } else {
                    document.getElementById("btn-hidden-complete-loading").click();
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