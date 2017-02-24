import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

// inject services
import { LoginService } from './login.service';

@Component({
  selector: 'my-login',
  templateUrl: 'app/security-login/login.html'
})

export class LoginComponent implements OnInit {
  // constructor
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    this.toastr.setRootViewContainerRef(vRef);
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

  // login with login services injected
  public login(username: string, password: string, toastr: ToastsManager): void {
    (<HTMLButtonElement>document.getElementById("login")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Logging in";
    (<HTMLButtonElement>document.getElementById("login")).disabled = true;
    this.loginService.login(username, password, toastr);
  }

  // initilization
  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['dashboard']);
    }
  }
}
