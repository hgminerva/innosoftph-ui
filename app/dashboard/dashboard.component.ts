import { Component, ElementRef, ViewChild, Renderer, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WjGridModule, WjFlexGrid } from 'wijmo/wijmo.angular2.grid';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard/dashboard.html'
})

export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private renderer: Renderer
  ) { }

  @ViewChild('currentLoggedInUser') currentLoggedInUser: ElementRef;

  ngOnInit() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('token_type');
    localStorage.removeItem('userName');
    this.router.navigate(['home']);
  }
}
