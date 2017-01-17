import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: 'app/header/header.html'
})

export class AppComponent implements OnInit {
  // inject router
  constructor(private router: Router) { }

  // global variables
  public headerLogin = "";
  public headerCurrentLoggedInUser = "";
  public isLoggedIn = true;
  public isLoggedInDropdown = false;

  // logout
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('token_type');
    localStorage.removeItem('userName');
    location.reload();
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
