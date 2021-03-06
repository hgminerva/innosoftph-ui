import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-app',
  templateUrl: 'app/shared-header/header.html'
})

export class AppComponent implements OnInit {
  // inject router
  constructor(
    private router: Router, 
    private elementRef: ElementRef,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  // global variables
  public headerLogin = "";
  public headerCurrentLoggedInUser = "";
  public isLoggedIn = true;
  public isLoggedInDropdown = false;

  // start loading
  public startLoading() {
    this.slimLoadingBarService.progress = 30;
    this.slimLoadingBarService.start();
  }

  // complete loading
  public completeLoading() {
    this.slimLoadingBarService.complete();
  }

  // logout
  public logout() {
    (<HTMLButtonElement>document.getElementById("btnLogout")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnLogoutClose")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnLogout")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Logging out";
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('token_type');
    localStorage.removeItem('userName');
    setTimeout(() => {
      // document.getElementById("btn-hidden-logout-modal").click();
      // this.router.navigate(['/home']);
      location.reload();
      this.headerCurrentUserChanges();
    }, 500);
  }

  // logout changes
  public logoutChanges() {
    (<HTMLButtonElement>document.getElementById("btnLogout")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnLogoutClose")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnLogout")).innerHTML = "<i class='fa fa-power-off fa-fw'></i> Logout";
  }

  // login changes
  public loginChanges() {
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
      this.headerCurrentUserChanges();
    }, 500);
  }

  // header changes
  public headerCurrentUserChanges() {
    if (localStorage.getItem('access_token')) {
      let currentUser = localStorage.getItem('userName');
      this.headerLogin = "YOU  <i class='fa fa-caret-down fa-fw'></i>";
      this.headerCurrentLoggedInUser = "<i class='fa fa-key fa-fw'></i> &nbsp;" + currentUser;
      this.isLoggedIn = false;
      this.isLoggedInDropdown = true;
    } else {
      this.headerLogin = "LOGIN";
      this.headerCurrentLoggedInUser = "Please Login";
      this.isLoggedIn = true;
      this.isLoggedInDropdown = false;
    }
  }

  // show menu
  public showMenu() {
      document.getElementById("showTop").click();
  }

  // show menu
  public selectedMenu() {
    this.startLoading();
    document.getElementById("showTop").click();
  }

  // initialization
  ngOnInit() {
    this.headerCurrentUserChanges();
  }

  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "app/scripts/classie.js";
    this.elementRef.nativeElement.appendChild(s);

    var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = "app/scripts/scripts.js";
    this.elementRef.nativeElement.appendChild(s2);
  }
}
