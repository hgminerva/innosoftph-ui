import { Injectable } from '@angular/core';

@Injectable()
export class AboutService {
    // data used to generate random items - sample get data
    getData(count: number): wijmo.collections.ObservableArray {
        var countries = 'US, Germany, UK, Japan, Italy, Greece'.split(',');
        var data = new wijmo.collections.ObservableArray();
        
        for (var i = 0; i < count; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                date: new Date(2014, i % 12, i % 28),
                amount: Math.random() * 10000,
                active: i % 4 == 0
            });
        }

        return data;
    }
}