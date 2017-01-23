import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class LeadService {
    // constructor
    constructor(
        private router: Router,
        private http: Http
    ) { }

    // list user
    public getListUserData(): wijmo.collections.ObservableArray {
        let userObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://localhost:22626/api/user/list";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        // get
        this.http.get(url, options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        userObservableArray.push({
                            Id: response.json()[key].Id,
                            UserName: response.json()[key].UserName,
                            FullName: response.json()[key].FullName
                        });
                    }
                }
            }
        );

        return userObservableArray;
    }

    // list lead by date ranged
    public getListLeadData(leadStartDate: Date, leadEndDate: Date): wijmo.collections.ObservableArray {
        let leadObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://localhost:22626/api/lead/list/byLeadDateRange/" + leadStartDate.toDateString() + "/" + leadEndDate.toDateString();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        // get
        this.http.get(url, options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        leadObservableArray.push({
                            Id: response.json()[key].Id,
                            LeadDate: response.json()[key].LeadDate,
                            LeadNumber: response.json()[key].LeadNumber,
                            LeadName: response.json()[key].LeadName,
                            Address: response.json()[key].Address,
                            ContactPerson: response.json()[key].ContactPerson,
                            ContactPosition: response.json()[key].ContactPosition,
                            ContactEmail: response.json()[key].ContactEmail,
                            ContactPhoneNo: response.json()[key].ContactPhoneNo,
                            ReferredBy: response.json()[key].ReferredBy,
                            Remarks: response.json()[key].Remarks,
                            EncodedByUserId: response.json()[key].EncodedByUserId,
                            EncodedByUser: response.json()[key].EncodedByUser,
                            AssignedToUserId: response.json()[key].AssignedToUserId,
                            AssignedToUser: response.json()[key].AssignedToUser,
                            LeadStatus: response.json()[key].LeadStatus
                        });
                    }
                }
            }
        );

        return leadObservableArray;
    }

    // add leads
    public postLeadData(leadObject: Object) {
        let url = "http://localhost:22626/api/lead/post";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        // post
        this.http.post(url, JSON.stringify(leadObject), options).subscribe(
            response => {
                if (response.json() > 0) {
                    this.router.navigate(['/leadDetail', response.json()]);
                } else {
                    alert("Error")
                }
            },
            error => {
                alert("Error")
            }
        )
    }

    // delete leads
    public deleteLeadData(id: number) {
        let url = "http://localhost:22626/api/lead/delete/" + id;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        // post
        this.http.delete(url, options).subscribe(
            response => {
                if (response.status == 200) {

                } else if (response.status == 404) {

                } else if (response.status == 400) {

                } else {
                    
                }
            },
            error => {
                alert("Error")
            }
        )
    }
}