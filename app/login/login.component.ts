import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

// inject services
import { LoginService } from '../loginService/login.service';

@Component({
  selector: 'my-login',
  templateUrl: 'app/login/login.html'
})

export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  login(username: string, password: string): void {
    this.loginService.login(username, password);
  }
}
