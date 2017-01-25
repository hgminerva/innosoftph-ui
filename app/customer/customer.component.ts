import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from './customer.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'my-customer',
  templateUrl: 'app/customer/customer.html'
})

export class CustomerComponent implements OnInit {
  // global variables
  public customerCollectionView: wijmo.collections.CollectionView;
  public leadFilter = '';
  public leadToFilter: any;

  // constructor
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
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
        self.customerCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.leadFilter) {
      return (item.ArticleCode.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1) ||
             (item.Article.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1) ||
             (item.ContactNumber.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1) ||
             (item.ArticleGroup.toLowerCase().indexOf(this.leadFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // initialization
  ngOnInit() {
    this.getListCustomer();
  }
}
