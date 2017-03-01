import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard/dashboard.html'
})

export class DashboardComponent implements OnInit {
  public isLoadingDashboard = true;
  public isFinishedLoadingDashboard = false;

  // constructor
  constructor(
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService,
    private elementRef: ElementRef
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
  }
}
