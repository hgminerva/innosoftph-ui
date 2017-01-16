import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {
    // list customer
    getListCustomerData(count: number): wijmo.collections.ObservableArray {
        var countries = 'US, Germany, UK, Japan, Italy, Greece'.split(',');
        var customerObservableArray = new wijmo.collections.ObservableArray();

        for (var i = 0; i < count; i++) {
            customerObservableArray.push({
                id: i,
                country: countries[i % countries.length],
                date: new Date(2014, i % 12, i % 28),
                amount: Math.random() * 10000,
                active: i % 4 == 0
            });
        }

        return customerObservableArray;
    }

    // add customer
    addCustomer() {

    }

    // update customer
    updateCustomer() {

    }

    // delete customer
    deleteCustomer() {
        
    }
}