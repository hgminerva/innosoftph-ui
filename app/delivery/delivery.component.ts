import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from './delivery.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'my-delivery',
  templateUrl: 'app/delivery/delivery.html'
})

export class DeliveryComponent implements OnInit {
  // global variables
  public deliveryStartDateValue: Date;
  public isDeliveryStartDateSelected = true;
  public deliveryEndDateValue: Date;
  public isDeliveryEndDateSelected = true;
  public deliveryDateValue: Date;
  public deliveryCollectionView: wijmo.collections.CollectionView;
  public deliveryFilter = '';
  public deliveryToFilter: any;

  // inject delivery service
  constructor(
    private deliveryService: DeliveryService,
    private router: Router,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  // delivery date ranged
  public setDeliveryDateRanged() {
    this.deliveryStartDateValue = new Date();
    this.deliveryEndDateValue = new Date();
    this.getListDelivery();
  }

  // event: quotation start date
  public deliveryStartDateOnValueChanged() {
    if (!this.isDeliveryStartDateSelected) {
      this.getDeliveryData();
    } else {
      this.isDeliveryStartDateSelected = false;
    }
  }

  // event: quotation end date
  public deliveryEndDateOnValueChanged() {
    if (!this.isDeliveryEndDateSelected) {
      this.getDeliveryData();
    } else {
      this.isDeliveryEndDateSelected = false;
    }
  }

  // list delivery
  public getListDelivery() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.getDeliveryData();
  }

  // delivery data
  public getDeliveryData() {
    this.deliveryCollectionView = new wijmo.collections.CollectionView(this.deliveryService.getListDeliveryData(this.deliveryStartDateValue, this.deliveryEndDateValue));
    this.deliveryCollectionView.filter = this.filterFunction.bind(this);
    this.deliveryCollectionView.pageSize = 15;
    this.deliveryCollectionView.trackChanges = true;
  }

  // filter
  get filter(): string {
    return this.deliveryFilter;
  }

  // filter
  set filter(value: string) {
    if (this.deliveryFilter != value) {
      this.deliveryFilter = value;

      if (this.deliveryToFilter) {
        clearTimeout(this.deliveryToFilter);
      }

      var self = this;
      this.deliveryToFilter = setTimeout(function () {
        self.deliveryCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.deliveryFilter) {
      return (item.DeliveryNumber.toLowerCase().indexOf(this.deliveryFilter.toLowerCase()) > -1) ||
        (item.Customer.toLowerCase().indexOf(this.deliveryFilter.toLowerCase()) > -1) ||
        (item.Product.toLowerCase().indexOf(this.deliveryFilter.toLowerCase()) > -1) ||
        (item.Remarks.toLowerCase().indexOf(this.deliveryFilter.toLowerCase()) > -1) ||
        (item.DeliveryStatus.toLowerCase().indexOf(this.deliveryFilter.toLowerCase()) > -1) ||
        (item.FunctionalUser.toLowerCase().indexOf(this.deliveryFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // initialization
  ngOnInit() {
    this.setDeliveryDateRanged();
  }
}
