import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class DashboardService {
    //  Global Variables
    private headers = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
    });
    private options = new RequestOptions({ headers: this.headers });

    // constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // pad - leading zero for date
    public pad(n: number) {
        return (n < 10) ? ("0" + n) : n;
    }

    //Month is 1 based
    public daysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
    }

    public dayNameInADate(newDate: Date): String {
        let thisDate = new Date(newDate);
        let day = "";
        if (thisDate.getDay() == 0) {
            day = "Sunday";
        } else {
            if (thisDate.getDay() == 1) {
                day = "Monday";
            } else {
                if (thisDate.getDay() == 2) {
                    day = "Tuesday";
                } else {
                    if (thisDate.getDay() == 3) {
                        day = "Wednesday";
                    } else {
                        if (thisDate.getDay() == 4) {
                            day = "Thursday";
                        } else {
                            if (thisDate.getDay() == 5) {
                                day = "Friday";
                            } else {
                                if (thisDate.getDay() == 6) {
                                    day = "Saturday";
                                }
                            }
                        }
                    }
                }
            }
        }
        return day;
    }

    // list calendar Activity
    public getCalendarActivityList(month: string, year: string, status: String, documentType: String): wijmo.collections.ObservableArray {
        let calendarObservableArray = new wijmo.collections.ObservableArray();
        let numberOfDaysInAmonth: number = this.daysInMonth(parseInt(month), parseInt(year)); // count no. of days in a month

        let sun = " ";
        let mon = " ";
        let tue = " ";
        let wed = " ";
        let thu = " ";
        let fri = " ";
        let sat = " ";

        let sun_No_of_Lead_Activities = " ";
        let sun_No_of_Quotation_Activities = " ";
        let sun_No_of_Delivery_Activities = " ";
        let sun_No_of_Support_Activities = " ";
        let sun_No_of_Software_Development_Activities = " ";

        let mon_No_of_Lead_Activities = " ";
        let mon_No_of_Quotation_Activities = " ";
        let mon_No_of_Delivery_Activities = " ";
        let mon_No_of_Support_Activities = " ";
        let mon_No_of_Software_Development_Activities = " ";

        let tue_No_of_Lead_Activities = " ";
        let tue_No_of_Quotation_Activities = " ";
        let tue_No_of_Delivery_Activities = " ";
        let tue_No_of_Support_Activities = " ";
        let tue_No_of_Software_Development_Activities = " ";

        let wed_No_of_Lead_Activities = " ";
        let wed_No_of_Quotation_Activities = " ";
        let wed_No_of_Delivery_Activities = " ";
        let wed_No_of_Support_Activities = " ";
        let wed_No_of_Software_Development_Activities = " ";

        let thu_No_of_Lead_Activities = " ";
        let thu_No_of_Quotation_Activities = " ";
        let thu_No_of_Delivery_Activities = " ";
        let thu_No_of_Support_Activities = " ";
        let thu_No_of_Software_Development_Activities = " ";

        let fri_No_of_Lead_Activities = " ";
        let fri_No_of_Quotation_Activities = " ";
        let fri_No_of_Delivery_Activities = " ";
        let fri_No_of_Support_Activities = " ";
        let fri_No_of_Software_Development_Activities = " ";

        let sat_No_of_Lead_Activities = " ";
        let sat_No_of_Quotation_Activities = " ";
        let sat_No_of_Delivery_Activities = " ";
        let sat_No_of_Support_Activities = " ";
        let sat_No_of_Software_Development_Activities = " ";

        let url = "http://api.innosoft.ph/api/activity/list/calendar/numberofActivities/" + month + "/" + status;
        this.http.get(url, this.options).subscribe(
            response => {
                var results = response.json();
                if (results.length > 0) {

                    let countDay = 1;
                    let fixIndex = 0;
                    for (var c = 1; c <= this.daysInMonth(parseInt(month), parseInt(year)) + 7; c++) {
                        var date = new Date(parseInt(year), parseInt(month) - 1, countDay);
                        var dateValue = [date.getFullYear(), this.pad(date.getMonth() + 1), this.pad(date.getDate())].join('-');
                        var day = date.getDay();

                        if (day == 0) {
                            if (c <= numberOfDaysInAmonth) {
                                sun = countDay.toString();
                                if (c < results.length) {
                                    var activityDate = new Date(results[fixIndex].ActivityDate);
                                    var activityDateValue = [activityDate.getFullYear(), this.pad(activityDate.getMonth() + 1), this.pad(activityDate.getDate())].join('-');

                                    if (activityDateValue == dateValue) {
                                        if (results[fixIndex].No_of_Lead_Activities != 0) {
                                            sun_No_of_Lead_Activities = "Leads (" + results[fixIndex].No_of_Lead_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Quotation_Activities != 0) {
                                            sun_No_of_Quotation_Activities = "Quotations (" + results[fixIndex].No_of_Quotation_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Delivery_Activities != 0) {
                                            sun_No_of_Delivery_Activities = "Deliveries (" + results[fixIndex].No_of_Delivery_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Support_Activities != 0) {
                                            sun_No_of_Support_Activities = "Supports (" + results[fixIndex].No_of_Support_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Software_Development_Activities != 0) {
                                            sun_No_of_Software_Development_Activities = "Soft. Dev. (" + results[fixIndex].No_of_Software_Development_Activities + ")";
                                        }
                                    } else {
                                        sun_No_of_Lead_Activities = " ";
                                        sun_No_of_Quotation_Activities = " ";
                                        sun_No_of_Delivery_Activities = " ";
                                        sun_No_of_Support_Activities = " ";
                                        sun_No_of_Software_Development_Activities = " ";
                                        fixIndex -= 1;
                                    }
                                }
                            }
                        }

                        if (day == 1) {
                            if (c <= numberOfDaysInAmonth) {
                                mon = countDay.toString();
                                if (c < results.length) {
                                    var activityDate = new Date(results[fixIndex].ActivityDate);
                                    var activityDateValue = [activityDate.getFullYear(), this.pad(activityDate.getMonth() + 1), this.pad(activityDate.getDate())].join('-');

                                    if (activityDateValue == dateValue) {
                                        if (results[fixIndex].No_of_Lead_Activities != 0) {
                                            mon_No_of_Lead_Activities = "Leads (" + results[fixIndex].No_of_Lead_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Quotation_Activities != 0) {
                                            mon_No_of_Quotation_Activities = "Quotations (" + results[fixIndex].No_of_Quotation_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Delivery_Activities != 0) {
                                            mon_No_of_Delivery_Activities = "Deliveries (" + results[fixIndex].No_of_Delivery_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Support_Activities != 0) {
                                            mon_No_of_Support_Activities = "Supports (" + results[fixIndex].No_of_Support_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Software_Development_Activities != 0) {
                                            mon_No_of_Software_Development_Activities = "Soft. Dev. (" + results[fixIndex].No_of_Software_Development_Activities + ")";
                                        }
                                    } else {
                                        mon_No_of_Lead_Activities = " ";
                                        mon_No_of_Quotation_Activities = " ";
                                        mon_No_of_Delivery_Activities = " ";
                                        mon_No_of_Support_Activities = " ";
                                        mon_No_of_Software_Development_Activities = " ";
                                        fixIndex -= 1;
                                    }
                                }
                            }
                        }

                        if (day == 2) {
                            if (c <= numberOfDaysInAmonth) {
                                tue = countDay.toString();
                                if (c < results.length) {
                                    var activityDate = new Date(results[fixIndex].ActivityDate);
                                    var activityDateValue = [activityDate.getFullYear(), this.pad(activityDate.getMonth() + 1), this.pad(activityDate.getDate())].join('-');

                                    if (activityDateValue == dateValue) {
                                        if (results[fixIndex].No_of_Lead_Activities != 0) {
                                            tue_No_of_Lead_Activities = "Leads (" + results[fixIndex].No_of_Lead_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Quotation_Activities != 0) {
                                            tue_No_of_Quotation_Activities = "Quotations (" + results[fixIndex].No_of_Quotation_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Delivery_Activities != 0) {
                                            tue_No_of_Delivery_Activities = "Deliveries (" + results[fixIndex].No_of_Delivery_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Support_Activities != 0) {
                                            tue_No_of_Support_Activities = "Supports (" + results[fixIndex].No_of_Support_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Software_Development_Activities != 0) {
                                            tue_No_of_Software_Development_Activities = "Soft. Dev. (" + results[fixIndex].No_of_Software_Development_Activities + ")";
                                        }
                                    } else {
                                        tue_No_of_Lead_Activities = " ";
                                        tue_No_of_Quotation_Activities = " ";
                                        tue_No_of_Delivery_Activities = " ";
                                        tue_No_of_Support_Activities = " ";
                                        tue_No_of_Software_Development_Activities = " ";
                                        fixIndex -= 1;
                                    }
                                }
                            }
                        }

                        if (day == 3) {
                            if (c <= numberOfDaysInAmonth) {
                                wed = countDay.toString();
                                if (c < results.length) {
                                    var activityDate = new Date(results[fixIndex].ActivityDate);
                                    var activityDateValue = [activityDate.getFullYear(), this.pad(activityDate.getMonth() + 1), this.pad(activityDate.getDate())].join('-');

                                    if (activityDateValue == dateValue) {
                                        if (results[fixIndex].No_of_Lead_Activities != 0) {
                                            wed_No_of_Lead_Activities = "Leads (" + results[fixIndex].No_of_Lead_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Quotation_Activities != 0) {
                                            wed_No_of_Quotation_Activities = "Quotations (" + results[fixIndex].No_of_Quotation_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Delivery_Activities != 0) {
                                            wed_No_of_Delivery_Activities = "Deliveries (" + results[fixIndex].No_of_Delivery_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Support_Activities != 0) {
                                            wed_No_of_Support_Activities = "Supports (" + results[fixIndex].No_of_Support_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Software_Development_Activities != 0) {
                                            wed_No_of_Software_Development_Activities = "Soft. Dev. (" + results[fixIndex].No_of_Software_Development_Activities + ")";
                                        }
                                    } else {
                                        wed_No_of_Lead_Activities = " ";
                                        wed_No_of_Quotation_Activities = " ";
                                        wed_No_of_Delivery_Activities = " ";
                                        wed_No_of_Support_Activities = " ";
                                        wed_No_of_Software_Development_Activities = " ";
                                        fixIndex -= 1;
                                    }
                                }
                            }
                        }

                        if (day == 4) {
                            if (c <= numberOfDaysInAmonth) {
                                thu = countDay.toString();
                                if (c < results.length) {
                                    var activityDate = new Date(results[fixIndex].ActivityDate);
                                    var activityDateValue = [activityDate.getFullYear(), this.pad(activityDate.getMonth() + 1), this.pad(activityDate.getDate())].join('-');

                                    if (activityDateValue == dateValue) {
                                        if (results[fixIndex].No_of_Lead_Activities != 0) {
                                            thu_No_of_Lead_Activities = "Leads (" + results[fixIndex].No_of_Lead_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Quotation_Activities != 0) {
                                            thu_No_of_Quotation_Activities = "Quotations (" + results[fixIndex].No_of_Quotation_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Delivery_Activities != 0) {
                                            thu_No_of_Delivery_Activities = "Deliveries (" + results[fixIndex].No_of_Delivery_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Support_Activities != 0) {
                                            thu_No_of_Support_Activities = "Supports (" + results[fixIndex].No_of_Support_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Software_Development_Activities != 0) {
                                            thu_No_of_Software_Development_Activities = "Soft. Dev. (" + results[fixIndex].No_of_Software_Development_Activities + ")";
                                        }
                                    } else {
                                        thu_No_of_Lead_Activities = " ";
                                        thu_No_of_Quotation_Activities = " ";
                                        thu_No_of_Delivery_Activities = " ";
                                        thu_No_of_Support_Activities = " ";
                                        thu_No_of_Software_Development_Activities = " ";
                                        fixIndex -= 1;
                                    }
                                }
                            }
                        }

                        if (day == 5) {
                            if (c <= numberOfDaysInAmonth) {
                                fri = countDay.toString();
                                if (c < results.length) {
                                    var activityDate = new Date(results[fixIndex].ActivityDate);
                                    var activityDateValue = [activityDate.getFullYear(), this.pad(activityDate.getMonth() + 1), this.pad(activityDate.getDate())].join('-');

                                    if (activityDateValue == dateValue) {
                                        if (results[fixIndex].No_of_Lead_Activities != 0) {
                                            fri_No_of_Lead_Activities = "Leads (" + results[fixIndex].No_of_Lead_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Quotation_Activities != 0) {
                                            fri_No_of_Quotation_Activities = "Quotations (" + results[fixIndex].No_of_Quotation_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Delivery_Activities != 0) {
                                            fri_No_of_Delivery_Activities = "Deliveries (" + results[fixIndex].No_of_Delivery_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Support_Activities != 0) {
                                            fri_No_of_Support_Activities = "Supports (" + results[fixIndex].No_of_Support_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Software_Development_Activities != 0) {
                                            fri_No_of_Software_Development_Activities = "Soft. Dev. (" + results[fixIndex].No_of_Software_Development_Activities + ")";
                                        }
                                    } else {
                                        fri_No_of_Lead_Activities = " ";
                                        fri_No_of_Quotation_Activities = " ";
                                        fri_No_of_Delivery_Activities = " ";
                                        fri_No_of_Support_Activities = " ";
                                        fri_No_of_Software_Development_Activities = " ";
                                        fixIndex -= 1;
                                    }
                                }
                            }
                        }

                        if (day == 6) {
                            if (c <= numberOfDaysInAmonth) {
                                sat = countDay.toString();
                                if (c < results.length) {
                                    var activityDate = new Date(results[fixIndex].ActivityDate);
                                    var activityDateValue = [activityDate.getFullYear(), this.pad(activityDate.getMonth() + 1), this.pad(activityDate.getDate())].join('-');

                                    if (activityDateValue == dateValue) {
                                        if (results[fixIndex].No_of_Lead_Activities != 0) {
                                            sat_No_of_Lead_Activities = "Leads (" + results[fixIndex].No_of_Lead_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Quotation_Activities != 0) {
                                            sat_No_of_Quotation_Activities = "Quotations (" + results[fixIndex].No_of_Quotation_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Delivery_Activities != 0) {
                                            sat_No_of_Delivery_Activities = "Deliveries (" + results[fixIndex].No_of_Delivery_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Support_Activities != 0) {
                                            sat_No_of_Support_Activities = "Supports (" + results[fixIndex].No_of_Support_Activities + ")";
                                        }

                                        if (results[fixIndex].No_of_Software_Development_Activities != 0) {
                                            sat_No_of_Software_Development_Activities = "Soft. Dev. (" + results[fixIndex].No_of_Software_Development_Activities + ")";
                                        }
                                    } else {
                                        sat_No_of_Lead_Activities = " ";
                                        sat_No_of_Quotation_Activities = " ";
                                        sat_No_of_Delivery_Activities = " ";
                                        sat_No_of_Support_Activities = " ";
                                        sat_No_of_Software_Development_Activities = " ";
                                        fixIndex -= 1;
                                    }
                                }
                            }

                            calendarObservableArray.push({
                                Sunday: {
                                    sunDay: sun,
                                    sun_No_of_Lead_Activities: sun_No_of_Lead_Activities,
                                    sun_No_of_Quotation_Activities: sun_No_of_Quotation_Activities,
                                    sun_No_of_Delivery_Activities: sun_No_of_Delivery_Activities,
                                    sun_No_of_Support_Activities: sun_No_of_Support_Activities,
                                    sun_No_of_Software_Development_Activities: sun_No_of_Software_Development_Activities
                                },
                                Monday: {
                                    monDay: mon,
                                    mon_No_of_Lead_Activities: mon_No_of_Lead_Activities,
                                    mon_No_of_Quotation_Activities: mon_No_of_Quotation_Activities,
                                    mon_No_of_Delivery_Activities: mon_No_of_Delivery_Activities,
                                    mon_No_of_Support_Activities: mon_No_of_Support_Activities,
                                    mon_No_of_Software_Development_Activities: mon_No_of_Software_Development_Activities
                                },
                                Tuesday: {
                                    tuesDay: tue,
                                    tue_No_of_Lead_Activities: tue_No_of_Lead_Activities,
                                    tue_No_of_Quotation_Activities: tue_No_of_Quotation_Activities,
                                    tue_No_of_Delivery_Activities: tue_No_of_Delivery_Activities,
                                    tue_No_of_Support_Activities: tue_No_of_Support_Activities,
                                    tue_No_of_Software_Development_Activities: tue_No_of_Software_Development_Activities
                                },
                                Wednesday: {
                                    wednesDay: wed,
                                    wed_No_of_Lead_Activities: wed_No_of_Lead_Activities,
                                    wed_No_of_Quotation_Activities: wed_No_of_Quotation_Activities,
                                    wed_No_of_Delivery_Activities: wed_No_of_Delivery_Activities,
                                    wed_No_of_Support_Activities: wed_No_of_Support_Activities,
                                    wed_No_of_Software_Development_Activities: wed_No_of_Software_Development_Activities
                                },
                                Thursday: {
                                    thursDay: thu,
                                    thu_No_of_Lead_Activities: thu_No_of_Lead_Activities,
                                    thu_No_of_Quotation_Activities: thu_No_of_Quotation_Activities,
                                    thu_No_of_Delivery_Activities: thu_No_of_Delivery_Activities,
                                    thu_No_of_Support_Activities: thu_No_of_Support_Activities,
                                    thu_No_of_Software_Development_Activities: thu_No_of_Software_Development_Activities
                                },
                                Friday: {
                                    friDay: fri,
                                    fri_No_of_Lead_Activities: fri_No_of_Lead_Activities,
                                    fri_No_of_Quotation_Activities: fri_No_of_Quotation_Activities,
                                    fri_No_of_Delivery_Activities: fri_No_of_Delivery_Activities,
                                    fri_No_of_Support_Activities: fri_No_of_Support_Activities,
                                    fri_No_of_Software_Development_Activities: fri_No_of_Software_Development_Activities
                                },
                                Saturday: {
                                    saturDay: sat,
                                    sat_No_of_Lead_Activities: sat_No_of_Lead_Activities,
                                    sat_No_of_Quotation_Activities: sat_No_of_Quotation_Activities,
                                    sat_No_of_Delivery_Activities: sat_No_of_Delivery_Activities,
                                    sat_No_of_Support_Activities: sat_No_of_Support_Activities,
                                    sat_No_of_Software_Development_Activities: sat_No_of_Software_Development_Activities
                                }
                            });

                            sun = " ";
                            mon = " ";
                            tue = " ";
                            wed = " ";
                            thu = " ";
                            fri = " ";
                            sat = " ";

                            sun_No_of_Lead_Activities = " ";
                            sun_No_of_Quotation_Activities = " ";
                            sun_No_of_Delivery_Activities = " ";
                            sun_No_of_Support_Activities = " ";
                            sun_No_of_Software_Development_Activities = " ";

                            mon_No_of_Lead_Activities = " ";
                            mon_No_of_Quotation_Activities = " ";
                            mon_No_of_Delivery_Activities = " ";
                            mon_No_of_Support_Activities = " ";
                            mon_No_of_Software_Development_Activities = " ";

                            tue_No_of_Lead_Activities = " ";
                            tue_No_of_Quotation_Activities = " ";
                            tue_No_of_Delivery_Activities = " ";
                            tue_No_of_Support_Activities = " ";
                            tue_No_of_Software_Development_Activities = " ";

                            wed_No_of_Lead_Activities = " ";
                            wed_No_of_Quotation_Activities = " ";
                            wed_No_of_Delivery_Activities = " ";
                            wed_No_of_Support_Activities = " ";
                            wed_No_of_Software_Development_Activities = " ";

                            thu_No_of_Lead_Activities = " ";
                            thu_No_of_Quotation_Activities = " ";
                            thu_No_of_Delivery_Activities = " ";
                            thu_No_of_Support_Activities = " ";
                            thu_No_of_Software_Development_Activities = " ";

                            fri_No_of_Lead_Activities = " ";
                            fri_No_of_Quotation_Activities = " ";
                            fri_No_of_Delivery_Activities = " ";
                            fri_No_of_Support_Activities = " ";
                            fri_No_of_Software_Development_Activities = " ";

                            sat_No_of_Lead_Activities = " ";
                            sat_No_of_Quotation_Activities = " ";
                            sat_No_of_Delivery_Activities = " ";
                            sat_No_of_Support_Activities = " ";
                            sat_No_of_Software_Development_Activities = " ";
                        }

                        countDay += 1;
                        fixIndex += 1;
                    }
                }
            }
        );

        // for (var c = 1; c <= this.daysInMonth(parseInt(month), parseInt(year)) + 7; c++) {

        // }


        return calendarObservableArray;
    }
}