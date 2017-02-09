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
        let url = "http://api.innosoft.ph/api/article/list/byArticleTypeId/2";
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                for (var i = 0; i <= results.length - 1; i++) {
                    if (results.length > 0) {
                        customerObservableArray.push({
                            Id: results[i].Id,
                            ArticleCode: results[i].ArticleCode,
                            Article: results[i].Article,
                            ContactNumber: results[i].ContactNumber,
                            ArticleGroup: results[i].ArticleGroup
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