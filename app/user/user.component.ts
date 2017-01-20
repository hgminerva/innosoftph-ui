import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'my-user',
  templateUrl: 'app/user/user.html'
})

export class UserComponent implements OnInit {
  // global variables
  public userCollectionView: wijmo.collections.CollectionView;

  // constructor
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  // list user
  getListUser() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    let toastr: ToastsManager;
    this.userCollectionView = new wijmo.collections.CollectionView(this.userService.getListUserData(toastr));
    this.userCollectionView.pageSize = 15;
    this.userCollectionView.trackChanges = true;
  }
  
  // initialization
  ngOnInit() {
    this.getListUser();
  }
}
