import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
    // list customer
    getListProductData(count: number): wijmo.collections.ObservableArray {
        var countries = 'US, Germany, UK, Japan, Italy, Greece'.split(',');
        var productObservableArray = new wijmo.collections.ObservableArray();

        for (var i = 0; i < count; i++) {
            productObservableArray.push({
                id: i,
                country: countries[i % countries.length],
                date: new Date(2014, i % 12, i % 28),
                amount: Math.random() * 10000,
                active: i % 4 == 0
            });
        }

        return productObservableArray;
    }

    // add product
    addProduct() {

    }

    // update product
    updateProduct() {

    }

    // delete product
    deleteProduct() {
        
    }
}