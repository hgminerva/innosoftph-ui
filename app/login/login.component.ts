import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

// inject services
import { LoginService } from './login.service';

@Component({
  selector: 'my-login',
  templateUrl: 'app/login/login.html'
})

export class LoginComponent {
  // inject the login service
  constructor(private router: Router, private loginService: LoginService, private toastr: ToastsManager, private vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  // login with login services injected
  login(username: string, password: string, toastr: ToastsManager): void {
    this.loginService.login(username, password, toastr)
  }
}
