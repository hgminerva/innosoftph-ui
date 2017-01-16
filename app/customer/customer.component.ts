import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from './customer.service';

@Component({
  selector: 'my-customer',
  templateUrl: 'app/customer/customer.html'
})

export class CustomerComponent implements OnInit {
  // inject career service
  constructor(private customerService: CustomerService, private router: Router) { }

  // global variables
  public customerDetailModalString: String;
  public customerCollectionView: wijmo.collections.CollectionView;

  // customer detail modal  
  customerDetailModal(add: boolean) {
    if (add) {
      this.customerDetailModalString = "Add";
    } else {
      this.customerDetailModalString = "Edit";
    }
  }

  // customer delete modal
  customerDeleteConfirmationModal() {

  }

  // initialization
  ngOnInit() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    } else {
      this.customerCollectionView = new wijmo.collections.CollectionView(this.customerService.getListCustomerData(100));
      this.customerCollectionView.pageSize = 15;
      this.customerCollectionView.trackChanges = true;
    }
  }
}
