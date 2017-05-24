import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard/dashboard.html'
})

export class DashboardComponent implements OnInit {
  public isLoadingDashboard = true;
  public isFinishedLoadingDashboard = false;
  public listMonths = [
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
  public newDate: Date = new Date();
  public monthSelectedValue: String = this.listMonths[this.newDate.getMonth()];
  public monthNumber = (this.newDate.getMonth() + 1).toString();
  public listYears = [
    "2016", "2017", "2018", "2019", "2020"
  ];
  public yearSelectedValue: string = "2017";
  public listStatus = [
    "ALL", "OPEN", "CLOSE", "CANCELLED", "WAITING FOR CLIENT", "DONE", "FOR CLOSING", "DUPLICATE"
  ];
  public statusSelectedValue: String = "OPEN";
  public listDocument = ['ALL', 'Lead', 'Quotation', 'Delivery', 'Support', 'Support - Technical', 'Support - Functional', 'Support - Customize', 'Software Development'];
  public documentSelectedValue: String = "ALL";
  public calendarCollectionView: wijmo.collections.CollectionView;
  public itemFormatter: any;

  public sundayDateObservableArray: wijmo.collections.ObservableArray;
  public sundayDateCollectionView: wijmo.collections.CollectionView;

  // constructor
  constructor(
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService,
    private elementRef: ElementRef,
    private dashboardService: DashboardService
  ) { }

  // start loading
  public startLoading() {
    this.slimLoadingBarService.progress = 30;
    this.slimLoadingBarService.start();
  }

  // complete loading
  public completeLoading() {
    this.slimLoadingBarService.complete();
  }

  // show menu
  public showMenu() {
    document.getElementById("showTop").click();
  }

  public monthSelectedIndexChangedClick(): void {
    if (this.monthSelectedValue == "January") {
      this.monthNumber = "1";
    } else {
      if (this.monthSelectedValue == "February") {
        this.monthNumber = "2";
      } else {
        if (this.monthSelectedValue == "March") {
          this.monthNumber = "3";
        } else {
          if (this.monthSelectedValue == "April") {
            this.monthNumber = "4";
          } else {
            if (this.monthSelectedValue == "May") {
              this.monthNumber = "5";
            } else {
              if (this.monthSelectedValue == "June") {
                this.monthNumber = "6";
              } else {
                if (this.monthSelectedValue == "July") {
                  this.monthNumber = "7";
                } else {
                  if (this.monthSelectedValue == "August") {
                    this.monthNumber = "8";
                  } else {
                    if (this.monthSelectedValue == "September") {
                      this.monthNumber = "9";
                    } else {
                      if (this.monthSelectedValue == "October") {
                        this.monthNumber = "10";
                      } else {
                        if (this.monthSelectedValue == "November") {
                          this.monthNumber = "11";
                        } else {
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
  }

  public yearSelectedIndexChangedClick(): void {
    this.getCalendarActivityList();
  }

  public statusSelectedIndexChangedClick(): void {
    this.getCalendarActivityList();
  }

  public documentSelectedIndexChangedClick(): void {
    this.getCalendarActivityList();
  }

  public getCalendarActivityList() {
    this.calendarCollectionView = new wijmo.collections.CollectionView(this.dashboardService.getCalendarActivityList(this.monthNumber, this.yearSelectedValue, this.statusSelectedValue, this.documentSelectedValue));
    this.calendarCollectionView.trackChanges = true;

    if (this.calendarCollectionView.items.length > 0) {
      for (var i = 0; i < this.calendarCollectionView.items.length; i++) {
        
      }
    }
  }

  public gridItemFormatter() {
    this.itemFormatter = function (panel: any, r: any, c: any, cell: any) {
      if (panel.cellType == wijmo.grid.CellType.Cell) {
        var flex = panel.grid;
        flex.rows[r].height = 180;
      }
    }
  }

  // initialization
  ngOnInit() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    } else {
      setTimeout(() => {
        this.isLoadingDashboard = false;
        this.isFinishedLoadingDashboard = true;
      }, 500);
    }

    this.getCalendarActivityList();
    this.gridItemFormatter();
  }
}
