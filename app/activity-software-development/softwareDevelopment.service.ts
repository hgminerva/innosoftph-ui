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
                            ProjectNumber: results[i].ProjectNumber
                        });
                    }
                }

                if (page == "softwareDevelopmentDetail") {
                    // document.getElementById("btn-hidden-customer-data").click();
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
                    // document.getElementById("btn-hidden-quotation-data").click();
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
                var results = new wijmo.collections.ObservableArray(response.json());
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
                            AssignedToUser: results[i].AssignedToUser,
                            SoftDevStatus: results[i].SoftDevStatus
                        });
                    }
                }

                document.getElementById("btn-hidden-complete-loading").click();
            }
        );

        return softwareDevelopmentObservableArray;
    }


}