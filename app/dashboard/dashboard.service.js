"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var DashboardService = (function () {
    // constructor
    function DashboardService(router, http, toastr) {
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        //  Global Variables
        this.headers = new http_1.Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
        });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    // pad - leading zero for date
    DashboardService.prototype.pad = function (n) {
        return (n < 10) ? ("0" + n) : n;
    };
    //Month is 1 based
    DashboardService.prototype.daysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };
    DashboardService.prototype.dayNameInADate = function (newDate) {
        var thisDate = new Date(newDate);
        var day = "";
        if (thisDate.getDay() == 0) {
            day = "Sunday";
        }
        else {
            if (thisDate.getDay() == 1) {
                day = "Monday";
            }
            else {
                if (thisDate.getDay() == 2) {
                    day = "Tuesday";
                }
                else {
                    if (thisDate.getDay() == 3) {
                        day = "Wednesday";
                    }
                    else {
                        if (thisDate.getDay() == 4) {
                            day = "Thursday";
                        }
                        else {
                            if (thisDate.getDay() == 5) {
                                day = "Friday";
                            }
                            else {
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
    };
    // list calendar Activity
    DashboardService.prototype.getCalendarActivityList = function (month, year, status, documentType) {
        var _this = this;
        var calendarObservableArray = new wijmo.collections.ObservableArray();
        var numberOfDaysInAmonth = this.daysInMonth(parseInt(month), parseInt(year)); // count no. of days in a month
        var sun = " ";
        var mon = " ";
        var tue = " ";
        var wed = " ";
        var thu = " ";
        var fri = " ";
        var sat = " ";
        var sun_No_of_Lead_Activities = "0";
        var sun_No_of_Quotation_Activities = "0";
        var sun_No_of_Delivery_Activities = "0";
        var sun_No_of_Support_Activities = "0";
        var sun_No_of_Software_Development_Activities = "0";
        var mon_No_of_Lead_Activities = "0";
        var mon_No_of_Quotation_Activities = "0";
        var mon_No_of_Delivery_Activities = "0";
        var mon_No_of_Support_Activities = "0";
        var mon_No_of_Software_Development_Activities = "0";
        var tue_No_of_Lead_Activities = "0";
        var tue_No_of_Quotation_Activities = "0";
        var tue_No_of_Delivery_Activities = "0";
        var tue_No_of_Support_Activities = "0";
        var tue_No_of_Software_Development_Activities = "0";
        var wed_No_of_Lead_Activities = "0";
        var wed_No_of_Quotation_Activities = "0";
        var wed_No_of_Delivery_Activities = "0";
        var wed_No_of_Support_Activities = "0";
        var wed_No_of_Software_Development_Activities = "0";
        var thu_No_of_Lead_Activities = "0";
        var thu_No_of_Quotation_Activities = "0";
        var thu_No_of_Delivery_Activities = "0";
        var thu_No_of_Support_Activities = "0";
        var thu_No_of_Software_Development_Activities = "0";
        var fri_No_of_Lead_Activities = "0";
        var fri_No_of_Quotation_Activities = "0";
        var fri_No_of_Delivery_Activities = "0";
        var fri_No_of_Support_Activities = "0";
        var fri_No_of_Software_Development_Activities = "0";
        var sat_No_of_Lead_Activities = "0";
        var sat_No_of_Quotation_Activities = "0";
        var sat_No_of_Delivery_Activities = "0";
        var sat_No_of_Support_Activities = "0";
        var sat_No_of_Software_Development_Activities = "0";
        var url = "http://api.innosoft.ph/api/activity/list/calendar/numberofActivities/" + month + "/" + status;
        this.http.get(url, this.options).subscribe(function (response) {
            var results = response.json();
            if (results.length > 0) {
                var countDay = 1;
                var fixIndex = 0;
                for (var c = 1; c <= _this.daysInMonth(parseInt(month), parseInt(year)) + 7; c++) {
                    var date = new Date(parseInt(year), parseInt(month) - 1, countDay);
                    var dateValue = [date.getFullYear(), _this.pad(date.getMonth() + 1), _this.pad(date.getDate())].join('-');
                    var day = date.getDay();
                    if (day == 0) {
                        if (c <= numberOfDaysInAmonth) {
                            sun = countDay.toString();
                            if (c < results.length) {
                                var activityDate = new Date(results[fixIndex].ActivityDate);
                                var activityDateValue = [activityDate.getFullYear(), _this.pad(activityDate.getMonth() + 1), _this.pad(activityDate.getDate())].join('-');
                                if (activityDateValue == dateValue) {
                                    sun_No_of_Lead_Activities = results[fixIndex].No_of_Lead_Activities;
                                    sun_No_of_Quotation_Activities = results[fixIndex].No_of_Quotation_Activities;
                                    sun_No_of_Delivery_Activities = results[fixIndex].No_of_Delivery_Activities;
                                    sun_No_of_Support_Activities = results[fixIndex].No_of_Support_Activities;
                                    sun_No_of_Software_Development_Activities = results[fixIndex].No_of_Software_Development_Activities;
                                }
                                else {
                                    sun_No_of_Lead_Activities = "0";
                                    sun_No_of_Quotation_Activities = "0";
                                    sun_No_of_Delivery_Activities = "0";
                                    sun_No_of_Support_Activities = "0";
                                    sun_No_of_Software_Development_Activities = "0";
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
                                var activityDateValue = [activityDate.getFullYear(), _this.pad(activityDate.getMonth() + 1), _this.pad(activityDate.getDate())].join('-');
                                if (activityDateValue == dateValue) {
                                    mon_No_of_Lead_Activities = results[fixIndex].No_of_Lead_Activities;
                                    mon_No_of_Quotation_Activities = results[fixIndex].No_of_Quotation_Activities;
                                    mon_No_of_Delivery_Activities = results[fixIndex].No_of_Delivery_Activities;
                                    mon_No_of_Support_Activities = results[fixIndex].No_of_Support_Activities;
                                    mon_No_of_Software_Development_Activities = results[fixIndex].No_of_Software_Development_Activities;
                                }
                                else {
                                    mon_No_of_Lead_Activities = "0";
                                    mon_No_of_Quotation_Activities = "0";
                                    mon_No_of_Delivery_Activities = "0";
                                    mon_No_of_Support_Activities = "0";
                                    mon_No_of_Software_Development_Activities = "0";
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
                                var activityDateValue = [activityDate.getFullYear(), _this.pad(activityDate.getMonth() + 1), _this.pad(activityDate.getDate())].join('-');
                                if (activityDateValue == dateValue) {
                                    tue_No_of_Lead_Activities = results[fixIndex].No_of_Lead_Activities;
                                    tue_No_of_Quotation_Activities = results[fixIndex].No_of_Quotation_Activities;
                                    tue_No_of_Delivery_Activities = results[fixIndex].No_of_Delivery_Activities;
                                    tue_No_of_Support_Activities = results[fixIndex].No_of_Support_Activities;
                                    tue_No_of_Software_Development_Activities = results[fixIndex].No_of_Software_Development_Activities;
                                }
                                else {
                                    tue_No_of_Lead_Activities = "0";
                                    tue_No_of_Quotation_Activities = "0";
                                    tue_No_of_Delivery_Activities = "0";
                                    tue_No_of_Support_Activities = "0";
                                    tue_No_of_Software_Development_Activities = "0";
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
                                var activityDateValue = [activityDate.getFullYear(), _this.pad(activityDate.getMonth() + 1), _this.pad(activityDate.getDate())].join('-');
                                if (activityDateValue == dateValue) {
                                    wed_No_of_Lead_Activities = results[fixIndex].No_of_Lead_Activities;
                                    wed_No_of_Quotation_Activities = results[fixIndex].No_of_Quotation_Activities;
                                    wed_No_of_Delivery_Activities = results[fixIndex].No_of_Delivery_Activities;
                                    wed_No_of_Support_Activities = results[fixIndex].No_of_Support_Activities;
                                    wed_No_of_Software_Development_Activities = results[fixIndex].No_of_Software_Development_Activities;
                                }
                                else {
                                    wed_No_of_Lead_Activities = "0";
                                    wed_No_of_Quotation_Activities = "0";
                                    wed_No_of_Delivery_Activities = "0";
                                    wed_No_of_Support_Activities = "0";
                                    wed_No_of_Software_Development_Activities = "0";
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
                                var activityDateValue = [activityDate.getFullYear(), _this.pad(activityDate.getMonth() + 1), _this.pad(activityDate.getDate())].join('-');
                                if (activityDateValue == dateValue) {
                                    thu_No_of_Lead_Activities = results[fixIndex].No_of_Lead_Activities;
                                    thu_No_of_Quotation_Activities = results[fixIndex].No_of_Quotation_Activities;
                                    thu_No_of_Delivery_Activities = results[fixIndex].No_of_Delivery_Activities;
                                    thu_No_of_Support_Activities = results[fixIndex].No_of_Support_Activities;
                                    thu_No_of_Software_Development_Activities = results[fixIndex].No_of_Software_Development_Activities;
                                }
                                else {
                                    thu_No_of_Lead_Activities = "0";
                                    thu_No_of_Quotation_Activities = "0";
                                    thu_No_of_Delivery_Activities = "0";
                                    thu_No_of_Support_Activities = "0";
                                    thu_No_of_Software_Development_Activities = "0";
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
                                var activityDateValue = [activityDate.getFullYear(), _this.pad(activityDate.getMonth() + 1), _this.pad(activityDate.getDate())].join('-');
                                if (activityDateValue == dateValue) {
                                    fri_No_of_Lead_Activities = results[fixIndex].No_of_Lead_Activities;
                                    fri_No_of_Quotation_Activities = results[fixIndex].No_of_Quotation_Activities;
                                    fri_No_of_Delivery_Activities = results[fixIndex].No_of_Delivery_Activities;
                                    fri_No_of_Support_Activities = results[fixIndex].No_of_Support_Activities;
                                    fri_No_of_Software_Development_Activities = results[fixIndex].No_of_Software_Development_Activities;
                                }
                                else {
                                    fri_No_of_Lead_Activities = "0";
                                    fri_No_of_Quotation_Activities = "0";
                                    fri_No_of_Delivery_Activities = "0";
                                    fri_No_of_Support_Activities = "0";
                                    fri_No_of_Software_Development_Activities = "0";
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
                                var activityDateValue = [activityDate.getFullYear(), _this.pad(activityDate.getMonth() + 1), _this.pad(activityDate.getDate())].join('-');
                                if (activityDateValue == dateValue) {
                                    sat_No_of_Lead_Activities = results[fixIndex].No_of_Lead_Activities;
                                    sat_No_of_Quotation_Activities = results[fixIndex].No_of_Quotation_Activities;
                                    sat_No_of_Delivery_Activities = results[fixIndex].No_of_Delivery_Activities;
                                    sat_No_of_Support_Activities = results[fixIndex].No_of_Support_Activities;
                                    sat_No_of_Software_Development_Activities = results[fixIndex].No_of_Software_Development_Activities;
                                }
                                else {
                                    sat_No_of_Lead_Activities = "0";
                                    sat_No_of_Quotation_Activities = "0";
                                    sat_No_of_Delivery_Activities = "0";
                                    sat_No_of_Support_Activities = "0";
                                    sat_No_of_Software_Development_Activities = "0";
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
                        sun_No_of_Lead_Activities = "0";
                        sun_No_of_Quotation_Activities = "0";
                        sun_No_of_Delivery_Activities = "0";
                        sun_No_of_Support_Activities = "0";
                        sun_No_of_Software_Development_Activities = "0";
                        mon_No_of_Lead_Activities = "0";
                        mon_No_of_Quotation_Activities = "0";
                        mon_No_of_Delivery_Activities = "0";
                        mon_No_of_Support_Activities = "0";
                        mon_No_of_Software_Development_Activities = "0";
                        tue_No_of_Lead_Activities = "0";
                        tue_No_of_Quotation_Activities = "0";
                        tue_No_of_Delivery_Activities = "0";
                        tue_No_of_Support_Activities = "0";
                        tue_No_of_Software_Development_Activities = "0";
                        wed_No_of_Lead_Activities = "0";
                        wed_No_of_Quotation_Activities = "0";
                        wed_No_of_Delivery_Activities = "0";
                        wed_No_of_Support_Activities = "0";
                        wed_No_of_Software_Development_Activities = "0";
                        thu_No_of_Lead_Activities = "0";
                        thu_No_of_Quotation_Activities = "0";
                        thu_No_of_Delivery_Activities = "0";
                        thu_No_of_Support_Activities = "0";
                        thu_No_of_Software_Development_Activities = "0";
                        fri_No_of_Lead_Activities = "0";
                        fri_No_of_Quotation_Activities = "0";
                        fri_No_of_Delivery_Activities = "0";
                        fri_No_of_Support_Activities = "0";
                        fri_No_of_Software_Development_Activities = "0";
                        sat_No_of_Lead_Activities = "0";
                        sat_No_of_Quotation_Activities = "0";
                        sat_No_of_Delivery_Activities = "0";
                        sat_No_of_Support_Activities = "0";
                        sat_No_of_Software_Development_Activities = "0";
                    }
                    countDay += 1;
                    fixIndex += 1;
                }
            }
        });
        // for (var c = 1; c <= this.daysInMonth(parseInt(month), parseInt(year)) + 7; c++) {
        // }
        return calendarObservableArray;
    };
    DashboardService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map