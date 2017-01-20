import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard/dashboard.html'
})

export class DashboardComponent implements OnInit {
  // constructor
  constructor(private router: Router) { }

  // initialization
  ngOnInit() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }
  }
}
