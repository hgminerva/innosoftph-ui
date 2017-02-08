import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class LoginService {
    // constructor
    constructor(
        private router: Router,
        private http: Http,
        private toastr: ToastsManager
    ) { }

    // Login
    public login(username: string, password: string, toastr: ToastsManager): void {
        let loginTokenUrl = 'http://api.innosoft.ph/Token';
        let body = "username=" + username + "&password=" + password + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        this.http.post(loginTokenUrl, body, options).subscribe(
            response => {
                localStorage.setItem('access_token', response.json().access_token);
                localStorage.setItem('expires_in', response.json().expires_in);
                localStorage.setItem('token_type', response.json().token_type);
                localStorage.setItem('userName', response.json().userName);
                (<HTMLButtonElement>document.getElementById("login")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Logging in";
                (<HTMLButtonElement>document.getElementById("login")).disabled = true;
                location.reload();
                setTimeout(() => {
                    this.router.navigate(['/dashboard']);
                }, 500);
            },
            error => {
                this.toastr.error('Username or Password is Incorrect. Please try again.', 'Login Failed');
                (<HTMLButtonElement>document.getElementById("login")).innerHTML = "Login";
                (<HTMLButtonElement>document.getElementById("login")).disabled = false;
            }
        );
    }
}