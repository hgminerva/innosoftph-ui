import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class LeadDetailService {
    constructor(
        private router: Router,
        private http: Http,
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

    // get by id
    public getLeadById(id: number) {
        let url = "http://localhost:22626/api/lead/get/byId/" + id;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        // get
        this.http.get(url, options).subscribe(
            response => {
                console.log(response.json().LeadNumber);
                console.log(response.json().LeadDate);
                console.log(response.json().LeadName);
                console.log(response.json().Address);
                console.log(response.json().ContactPerson);
                console.log(response.json().ContactPosition);
                console.log(response.json().ContactEmail);
                console.log(response.json().ReferredBy);
                console.log(response.json().Remarks);
                console.log(response.json().EncodedByUserId);
                console.log(response.json().EncodedByUser);
                console.log(response.json().AssignedToUserId);
                console.log(response.json().AssignedToUser);
                console.log(response.json().LeadStatus);
            }
        );
    }

    // list activity line
    public getListActivityData(count: number): wijmo.collections.ObservableArray {
        var countries = 'US, Germany, UK, Japan, Italy, Greece'.split(',');
        var leadDetailObservableArray = new wijmo.collections.ObservableArray();

        for (var i = 0; i < count; i++) {
            leadDetailObservableArray.push({
                id: i,
                country: countries[i % countries.length],
                date: new Date(2014, i % 12, i % 28),
                amount: Math.random() * 10000,
                active: i % 4 == 0
            });
        }

        return leadDetailObservableArray;
    }
}