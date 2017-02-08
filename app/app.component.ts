import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-app',
  templateUrl: 'app/shared-header/header.html'
})

export class AppComponent implements OnInit {
  // inject router
  constructor(private router: Router, private slimLoadingBarService: SlimLoadingBarService) { }

  // global variables
  public headerLogin = "";
  public headerCurrentLoggedInUser = "";
  public isLoggedIn = true;
  public isLoggedInDropdown = false;

  // logout
  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('token_type');
    localStorage.removeItem('userName');
    location.reload();
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 500);
  }

  // start loading
  public startLoading() {
    this.slimLoadingBarService.progress = 30;
    this.slimLoadingBarService.start();
  }

  // complete loading
  public completeLoading() {
    this.slimLoadingBarService.complete();
  }

  // initialization
  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      let currentUser = localStorage.getItem('userName');
      this.headerLogin = "YOU  <i class='fa fa-caret-down fa-fw'></i>";
      this.headerCurrentLoggedInUser = "<i class='fa fa-key fa-fw'></i> &nbsp;" + currentUser;
      this.isLoggedIn = false;
      this.isLoggedInDropdown = true;
    } else {
      this.headerLogin = "LOGIN";
      this.headerCurrentLoggedInUser = "Please Login";
    }
  }
}
