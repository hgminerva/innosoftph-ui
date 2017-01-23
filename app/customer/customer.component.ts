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
    this.customerCollectionView.pageSize = 15;
    this.customerCollectionView.trackChanges = true;
  }

  // initialization
  ngOnInit() {
    this.getListCustomer();
  }
}
