import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class CustomerService {
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

    // list customer data
    public getListCustomerData(toastr: ToastsManager): wijmo.collections.ObservableArray {
        let customerObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://localhost:22626/api/article/list/byArticleTypeId/2";
        this.http.get(url, this.options).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        customerObservableArray.push({
                            Id: response.json()[key].Id,
                            ArticleCode: response.json()[key].ArticleCode,
                            Article: response.json()[key].Article,
                            ContactNumber: response.json()[key].ContactNumber,
                            ArticleGroup: response.json()[key].ArticleGroup
                        });
                    }
                }
                
                document.getElementById("btn-hidden-complete-loading").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
            }
        );

        return customerObservableArray;
    }
}