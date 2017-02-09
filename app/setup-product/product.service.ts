import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ProductService {
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

    // list product data
    public getListProductData(toastr: ToastsManager): wijmo.collections.ObservableArray {
        let productObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://api.innosoft.ph/api/article/list/byArticleTypeId/1";
        this.http.get(url, this.options).subscribe(
            response => {
                var results = new wijmo.collections.ObservableArray(response.json());
                for (var i = 0; i <= results.length - 1; i++) {
                    if (results.length > 0) {
                        productObservableArray.push({
                            Id: results[i].Id,
                            ArticleCode: results[i].ArticleCode,
                            ManualArticleCode: results[i].ManualArticleCode,
                            Article: results[i].Article,
                            Unit: results[i].Unit,
                            IsInventory: results[i].IsInventory,
                        });
                    }
                }
                
                document.getElementById("btn-hidden-complete-loading").click();
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
            }
        );

        return productObservableArray;
    }
}