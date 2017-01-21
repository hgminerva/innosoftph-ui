import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ProductService {
    // constructor
    constructor(
        private router: Router,
        private http: Http,
        public toastr: ToastsManager
    ) { }

    // list product data
    getListProductData(toastr: ToastsManager): wijmo.collections.ObservableArray {
        let productObservableArray = new wijmo.collections.ObservableArray();
        let url = "http://localhost:22626/api/article/list/byArticleTypeId/1";
        let headers = new Headers({ 'Content-Type': 'application/json' });

        this.http.get(url, headers).subscribe(
            response => {
                for (var key in response.json()) {
                    if (response.json().hasOwnProperty(key)) {
                        productObservableArray.push({
                            Id: response.json()[key].Id,
                            ArticleCode: response.json()[key].ArticleCode,
                            ManualArticleCode: response.json()[key].ManualArticleCode,
                            Article: response.json()[key].Article,
                            Unit: response.json()[key].Unit,
                            IsInventory: response.json()[key].IsInventory,
                        });
                    }
                }
            },
            error => {
                this.toastr.error('', 'Something`s went wrong!');
            }
        );

        return productObservableArray;
    }
}