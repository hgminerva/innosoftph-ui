import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class UserService {
    // global variables
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });

    // constructor
    constructor(
        private router: Router,
        private http: Http,
        public toastr: ToastsManager
    ) { }

    // list user data
    public getListUserData(toastr: ToastsManager): wijmo.collections.ObservableArray {
        let userObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://localhost:22626/api/user/list";
        this.http.get(url, this.options).subscribe(
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
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
            }
        );

        return userObservableArray;
    }
}