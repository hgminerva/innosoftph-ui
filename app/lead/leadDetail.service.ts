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
    getListUserData(): wijmo.collections.ObservableArray {
        let userObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://easyfiswebsite-innosoft.azurewebsites.net/api/user/list";
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

    // list activity line
    getListActivityData(count: number): wijmo.collections.ObservableArray {
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