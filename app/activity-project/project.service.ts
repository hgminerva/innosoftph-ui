import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ProjectService {
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

    // list article - customer
    public getListArticleData(): wijmo.collections.ObservableArray {
        let articleObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://api.innosoft.ph/api/article/list/byArticleTypeId/2";
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        articleObservableArray.push({
                            Id: results[i].Id,
                            Article: results[i].Article
                        });
                    }
                }

                document.getElementById("btn-hidden-user-data").click();
            }
        );

        return articleObservableArray;
    }

    // list user
    public getListUserData(): wijmo.collections.ObservableArray {
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

                document.getElementById("btn-hidden-finished-load").click();
            }
        );

        return userObservableArray;
    }

    // pad - leading zero for date
    public pad(n: number) {
        return (n < 10) ? ("0" + n) : n;
    }

    // list project by date ranged (start date and end date)
    public getListProjectData(projectStartDate: Date, projectEndDate: Date, status: String): wijmo.collections.ObservableArray {
        let url = "http://api.innosoft.ph/api/project/list/byProjectDateRange/" + projectStartDate.toDateString() + "/" + projectEndDate.toDateString() + "/" + status;
        let projectObservableArray = new wijmo.collections.ObservableArray();
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                if (results.length > 0) {
                    for (var i = 0; i <= results.length - 1; i++) {
                        var myDate = new Date(results[i].ProjectDate);
                        var myDateValue = [myDate.getFullYear(), this.pad(myDate.getMonth() + 1), this.pad(myDate.getDate())].join('-');

                        var myProjectStartDate = new Date(results[i].ProjectStartDate);
                        var myProjectStartDateValue = [myProjectStartDate.getFullYear(), this.pad(myProjectStartDate.getMonth() + 1), this.pad(myProjectStartDate.getDate())].join('-');

                        var myProjectEndDate = new Date(results[i].ProjectEndDate);
                        var myProjectEndDateValue = [myProjectEndDate.getFullYear(), this.pad(myProjectEndDate.getMonth() + 1), this.pad(myProjectEndDate.getDate())].join('-');

                        projectObservableArray.push({
                            Id: results[i].Id,
                            ProjectNumber: results[i].ProjectNumber,
                            ProjectDate: myDateValue,
                            ProjectName: results[i].ProjectName,
                            ProjectType: results[i].ProjectType,
                            CustomerId: results[i].CustomerId,
                            Customer: results[i].Customer,
                            Particulars: results[i].Particulars,
                            EncodedByUserId: results[i].EncodedByUserId,
                            EncodedByUser: results[i].EncodedByUser,
                            ProjectManagerUserId: results[i].ProjectManagerUserId,
                            ProjectManagerUser: results[i].ProjectManagerUser,
                            ProjectStartDate: myProjectStartDateValue,
                            ProjectEndDate: myProjectEndDateValue,
                            ProjectStatus: results[i].ProjectStatus
                        });
                    }
                }

                document.getElementById("btn-hidden-complete-loading").click();

                (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
            }
        );

        return projectObservableArray;
    }

    // add project
    public postProjectData(projectOject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/project/post";
        this.http.post(url, JSON.stringify(projectOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                document.getElementById("btn-hidden-project-detail-modal").click();
                document.getElementById("btn-hidden-project-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseProject")).disabled = false;
                document.getElementById("btn-hidden-complete-loading").click();
            }
        )
    }

    // update project
    public putProjectData(id: number, projectOject: Object, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/project/put/" + id;
        this.http.put(url, JSON.stringify(projectOject), this.options).subscribe(
            response => {
                this.toastr.success('', 'Save Successful');
                document.getElementById("btn-hidden-project-detail-modal").click();
                document.getElementById("btn-hidden-project-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnSaveProject")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
                (<HTMLButtonElement>document.getElementById("btnSaveProject")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnCloseProject")).disabled = false;
                document.getElementById("btn-hidden-complete-loading").click();
            }
        )
    }

    // delete project
    public deleteProjectData(id: number, toastr: ToastsManager) {
        let url = "http://api.innosoft.ph/api/project/delete/" + id;
        this.http.delete(url, this.options).subscribe(
            response => {
                this.toastr.success('', 'Delete Successful');
                document.getElementById("btn-hidden-project-delete-modal").click();
                document.getElementById("btn-hidden-project-data").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
                (<HTMLButtonElement>document.getElementById("btnDeleteProject")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
                (<HTMLButtonElement>document.getElementById("btnDeleteProject")).disabled = false;
                (<HTMLButtonElement>document.getElementById("btnDeleteCloseProject")).disabled = false;
                document.getElementById("btn-hidden-complete-loading").click();
            }
        )
    }
}