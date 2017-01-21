import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class LeadService {
    // constructor
    constructor(
        private router: Router,
        private http: Http,
    ) { }

    // list lead by date ranged
    getListLeadData(leadStartDate: Date, leadEndDate: Date): wijmo.collections.ObservableArray {
        let leadObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://localhost:22626/api/lead/list/byLeadDateRange/" + leadStartDate.toDateString() + "/" + leadEndDate.toDateString();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.http.get(url, headers).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        leadObservableArray.push({
                            Id: response.json()[key].Id,
                            LeadDate: response.json()[key].LeadDate,
                            LeadNumber: response.json()[key].LeadNumber,
                            LeadName: response.json()[key].LeadName,
                            Address: response.json()[key].LeadName,
                            ContactPerson: response.json()[key].LeadName,
                            ContactPosition: response.json()[key].LeadName,
                            ContactEmail: response.json()[key].LeadName,
                            ContactPhoneNo: response.json()[key].LeadName,
                            ReferredBy: response.json()[key].LeadName,
                            Remarks: response.json()[key].LeadName,
                            EncodedByUserId: response.json()[key].LeadName,
                            EncodedByUser: response.json()[key].LeadName,
                            AssignedToUserId: response.json()[key].LeadName,
                            AssignedToUser: response.json()[key].LeadName,
                            LeadStatus: response.json()[key].LeadName
                        });
                    }
                }
            }
        );

        return leadObservableArray;
    }

    // list user
    getListUserData(): wijmo.collections.ObservableArray {
        let userObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://localhost:22626/api/user/list";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.http.get(url, headers).subscribe(
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
}