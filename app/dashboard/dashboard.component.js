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
var router_1 = require('@angular/router');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var dashboard_service_1 = require('./dashboard.service');
var DashboardComponent = (function () {
    // constructor
    function DashboardComponent(router, slimLoadingBarService, elementRef, dashboardService) {
        this.router = router;
        this.slimLoadingBarService = slimLoadingBarService;
        this.elementRef = elementRef;
        this.dashboardService = dashboardService;
        this.isLoadingDashboard = true;
        this.isFinishedLoadingDashboard = false;
        this.listMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        this.newDate = new Date();
        this.monthSelectedValue = this.listMonths[this.newDate.getMonth()];
        this.monthNumber = (this.newDate.getMonth() + 1).toString();
        this.listYears = [
            "2016", "2017", "2018", "2019", "2020"
        ];
        this.yearSelectedValue = "2017";
        this.listStatus = [
            "ALL", "OPEN", "CLOSE", "CANCELLED", "WAITING FOR CLIENT", "DONE", "FOR CLOSING", "DUPLICATE"
        ];
        this.statusSelectedValue = "OPEN";
        this.listDocument = ['ALL', 'Lead', 'Quotation', 'Delivery', 'Support', 'Support - Technical', 'Support - Functional', 'Support - Customize', 'Software Development'];
        this.documentSelectedValue = "ALL";
    }
    // start loading
    DashboardComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    DashboardComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // show menu
    DashboardComponent.prototype.showMenu = function () {
        document.getElementById("showTop").click();
    };
    DashboardComponent.prototype.monthSelectedIndexChangedClick = function () {
        if (this.monthSelectedValue == "January") {
            this.monthNumber = "1";
        }
        else {
            if (this.monthSelectedValue == "February") {
                this.monthNumber = "2";
            }
            else {
                if (this.monthSelectedValue == "March") {
                    this.monthNumber = "3";
                }
                else {
                    if (this.monthSelectedValue == "April") {
                        this.monthNumber = "4";
                    }
                    else {
                        if (this.monthSelectedValue == "May") {
                            this.monthNumber = "5";
                        }
                        else {
                            if (this.monthSelectedValue == "June") {
                                this.monthNumber = "6";
                            }
                            else {
                                if (this.monthSelectedValue == "July") {
                                    this.monthNumber = "7";
                                }
                                else {
                                    if (this.monthSelectedValue == "August") {
                                        this.monthNumber = "8";
                                    }
                                    else {
                                        if (this.monthSelectedValue == "September") {
                                            this.monthNumber = "9";
                                        }
                                        else {
                                            if (this.monthSelectedValue == "October") {
                                                this.monthNumber = "10";
                                            }
                                            else {
                                                if (this.monthSelectedValue == "November") {
                                                    this.monthNumber = "11";
                                                }
                                                else {
                                                    if (this.monthSelectedValue == "December") {
                                                        this.monthNumber = "12";
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.getCalendarActivityList();
    };
    DashboardComponent.prototype.yearSelectedIndexChangedClick = function () {
        this.getCalendarActivityList();
    };
    DashboardComponent.prototype.statusSelectedIndexChangedClick = function () {
        this.getCalendarActivityList();
    };
    DashboardComponent.prototype.documentSelectedIndexChangedClick = function () {
        this.getCalendarActivityList();
    };
    DashboardComponent.prototype.getCalendarActivityList = function () {
        this.calendarCollectionView = new wijmo.collections.CollectionView(this.dashboardService.getCalendarActivityList(this.monthNumber, this.yearSelectedValue, this.statusSelectedValue, this.documentSelectedValue));
        this.calendarCollectionView.trackChanges = true;
        if (this.calendarCollectionView.items.length > 0) {
            for (var i = 0; i < this.calendarCollectionView.items.length; i++) {
            }
        }
    };
    DashboardComponent.prototype.gridItemFormatter = function () {
        this.itemFormatter = function (panel, r, c, cell) {
            if (panel.cellType == wijmo.grid.CellType.Cell) {
                var flex = panel.grid;
                flex.rows[r].height = 180;
            }
        };
    };
    // initialization
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        else {
            setTimeout(function () {
                _this.isLoadingDashboard = false;
                _this.isFinishedLoadingDashboard = true;
            }, 500);
        }
        this.getCalendarActivityList();
        this.gridItemFormatter();
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/dashboard/dashboard.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, ng2_slim_loading_bar_1.SlimLoadingBarService, core_1.ElementRef, dashboard_service_1.DashboardService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map