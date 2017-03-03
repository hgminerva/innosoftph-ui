import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-user',
  templateUrl: 'app/setup-user/user.html'
})

export class UserComponent implements OnInit {
  // global variables
  public userCollectionView: wijmo.collections.CollectionView;
  public userFilter = '';
  public userToFilter: any;

  // constructor
  constructor(
    private userService: UserService,
    private router: Router,
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
    return this.userFilter;
  }

  // filter
  set filter(value: string) {
    if (this.userFilter != value) {
      this.userFilter = value;

      if (this.userToFilter) {
        clearTimeout(this.userToFilter);
      }

      var self = this;
      this.userToFilter = setTimeout(function () {
        self.userCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.userFilter) {
      return (item.FullName.toLowerCase().indexOf(this.userFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // show menu
  public showMenu() {
      document.getElementById("showTop").click();
  }
  
  public backClicked() {
    window.history.back();
  }

  // initialization
  ngOnInit() {
    this.getListUser();
  }
}
