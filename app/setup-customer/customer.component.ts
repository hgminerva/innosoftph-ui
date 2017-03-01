import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from './customer.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-customer',
  templateUrl: 'app/setup-customer/customer.html'
})

export class CustomerComponent implements OnInit {
  // global variables
  public customerCollectionView: wijmo.collections.CollectionView;
  public customerFilter = '';
  public customerToFilter: any;

  // constructor
  constructor(
    private customerService: CustomerService,
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

  // list customer
  public getListCustomer() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    let toastr: ToastsManager;
    this.customerCollectionView = new wijmo.collections.CollectionView(this.customerService.getListCustomerData(toastr));
    this.customerCollectionView.filter = this.filterFunction.bind(this);
    this.customerCollectionView.pageSize = 15;
    this.customerCollectionView.trackChanges = true;
  }

  // filter
  get filter(): string {
    return this.customerFilter;
  }

  // filter
  set filter(value: string) {
    if (this.customerFilter != value) {
      this.customerFilter = value;

      if (this.customerToFilter) {
        clearTimeout(this.customerToFilter);
      }

      var self = this;
      this.customerToFilter = setTimeout(function () {
        self.customerCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.customerFilter) {
      return (item.ArticleCode.toLowerCase().indexOf(this.customerFilter.toLowerCase()) > -1) ||
        (item.Article.toLowerCase().indexOf(this.customerFilter.toLowerCase()) > -1) ||
        (item.ContactNumber.toLowerCase().indexOf(this.customerFilter.toLowerCase()) > -1) ||
        (item.ArticleGroup.toLowerCase().indexOf(this.customerFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // show menu
  public showMenu() {
      document.getElementById("showTop").click();
  }
  
  // initialization
  ngOnInit() {
    this.getListCustomer();
  }
}
