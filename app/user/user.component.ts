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
  public leadFilter = '';
  public leadToFilter: any;

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
  public getListUser() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    let toastr: ToastsManager;
    this.userCollectionView = new wijmo.collections.CollectionView(this.userService.getListUserData(toastr));
    this.userCollectionView.filter = this.filterFunction.bind(this);
    this.userCollectionView.pageSize = 15;
    this.userCollectionView.trackChanges = true;
  }

  // filter
  get filter(): string {
    return this.leadFilter;
  }

  // filter
  set filter(value: string) {
    if (this.leadFilter != value) {
      this.leadFilter = value;

      if (this.leadToFilter) {
        clearTimeout(this.leadToFilter);
      }

      var self = this;
      this.leadToFilter = setTimeout(function () {
        self.userCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.leadFilter) {
      return (item.FullName.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // initialization
  ngOnInit() {
    this.getListUser();
  }
}
