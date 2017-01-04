import { Component, ElementRef, ViewChild, Renderer, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: 'app/header/header.html'
})

export class AppComponent implements OnInit {
  constructor(private renderer: Renderer, private router: Router) { }

  @ViewChild('currentLoggedInUser') currentLoggedInUser: ElementRef;

  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      let currentUser = localStorage.getItem('userName')
      this.renderer.setElementProperty(this.currentLoggedInUser.nativeElement, 'innerHTML', '<i class="fa fa-key fa-fw"></i> ' + currentUser);
    } else {
      this.renderer.setElementProperty(this.currentLoggedInUser.nativeElement, 'innerHTML', 'LOGIN');
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
