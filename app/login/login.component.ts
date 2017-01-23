import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// inject services
import { LoginService } from './login.service';

@Component({
  selector: 'my-login',
  templateUrl: 'app/login/login.html'
})

export class LoginComponent implements OnInit {
  // constructor
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  // login with login services injected
  public login(username: string, password: string, toastr: ToastsManager): void {
    this.loginService.login(username, password, toastr)
  }

  // initilization
  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['dashboard']);
    }
  }
}
