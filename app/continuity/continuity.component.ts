import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ContinuityService } from './continuity.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-continuity',
  templateUrl: 'app/continuity/continuity.html'
})

export class ContinuityComponent {
  // global variables
  public continuityStartDateValue: Date;
  public isContinuityStartDateSelected = true;
  public continuityEndDateValue: Date;
  public isContinuityEndDateSelected = true;
  public continuityCollectionView: wijmo.collections.CollectionView;
  public continuityFilter = '';
  public continuityToFilter: any;
  public continuityDateValue: Date;
  public continuityExpiryDateValue: Date;
  public continuityDeliveryObservableArray: wijmo.collections.ObservableArray;
  public continuityDeliverySelectedIndex = -1;
  public continuityDeliverySelectedValue: String;
  public continuityCustomerObservableArray: wijmo.collections.ObservableArray;
  public continuityCustomerSelectedIndex = -1;
  public continuityCustomerSelectedValue: String;
  public continuityProductObservableArray: wijmo.collections.ObservableArray;
  public continuityProductSelectedIndex = -1;
  public continuityProductSelectedValue: String;
  public continuityStatusArray = ['OPEN', 'EXPIRED'];
  public continuityStatusSelectedValue: 'OPEN';
  public continuityDetailModalString: String;
  public continuityId: number;
  public continuityDeliveryId: number;
  public continuitCustomerId: number;
  public continuitProductId: number;
  public continuityStatus: String;
  public continuityStaffUser: String;
  public continuityNumber: String;

  // inject continuity service
  constructor(
    private continuityService: ContinuityService,
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

  // continuity date ranged
  public setContinuityDateRanged() {
    this.continuityStartDateValue = new Date();
    this.continuityEndDateValue = new Date();
    this.continuityDateValue = new Date();
    this.continuityExpiryDateValue = new Date();
    this.getContinuityData();
  }

  // continuity date on value changed
  public continuityDateOnValueChanged() {

  }

  // expired date on value changed
  public continuityExpiryDateOnValueChanged() {

  }

  // event: continuity start date
  public continuityStartDateOnValueChanged() {
    this.startLoading();
    if (!this.isContinuityStartDateSelected) {
      this.getContinuityData();
    } else {
      this.isContinuityStartDateSelected = false;
    }
  }

  // event: continuity end date
  public continuityEndDateOnValueChanged() {
    this.startLoading();
    if (!this.isContinuityEndDateSelected) {
      this.getContinuityData();
    } else {
      this.isContinuityEndDateSelected = false;
    }
  }

  // continuity data
  public getContinuityData() {
    this.continuityCollectionView = new wijmo.collections.CollectionView(this.continuityService.getListContinuityData(this.continuityStartDateValue, this.continuityEndDateValue));
    this.continuityCollectionView.filter = this.filterFunction.bind(this);
    this.continuityCollectionView.pageSize = 15;
    this.continuityCollectionView.trackChanges = true;
    this.getListDeliveryServiceData();
  }

  // filter
  get filter(): string {
    return this.continuityFilter;
  }

  // filter
  set filter(value: string) {
    if (this.continuityFilter != value) {
      this.continuityFilter = value;

      if (this.continuityToFilter) {
        clearTimeout(this.continuityToFilter);
      }

      var self = this;
      this.continuityToFilter = setTimeout(function () {
        self.continuityCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.continuityFilter) {
      return (item.ContinuityNumber.toLowerCase().indexOf(this.continuityFilter.toLowerCase()) > -1) ||
        (item.Customer.toLowerCase().indexOf(this.continuityFilter.toLowerCase()) > -1) ||
        (item.Product.toLowerCase().indexOf(this.continuityFilter.toLowerCase()) > -1) ||
        (item.ContinuityStatus.toLowerCase().indexOf(this.continuityFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // delivery data
  public getListDeliveryServiceData() {
    this.continuityDeliveryObservableArray = this.continuityService.getListDeliveryData();
    this.getListCustomer();
  }

  // delivery selected index changed
  public cboContinuityDeliverySelectedIndexChanged() {
    if (this.continuityDeliverySelectedIndex >= 0) {
      this.continuityDeliveryId = this.continuityDeliveryObservableArray[this.continuityDeliverySelectedIndex].Id;
    } else {
      this.continuityDeliveryId = 0;
    }
  }

  // list customer data
  public getListCustomer() {
    this.continuityCustomerObservableArray = this.continuityService.getListArticleData(2);
    this.getListProduct();
  }

  // customer selected index changed
  public cboContinuityCustomerSelectedIndexChanged() {
    if (this.continuityCustomerSelectedIndex >= 0) {
      this.continuitCustomerId = this.continuityCustomerObservableArray[this.continuityCustomerSelectedIndex].Id;
    } else {
      this.continuitCustomerId = 0;
    }
  }

  // list product data
  public getListProduct() {
    this.continuityProductObservableArray = this.continuityService.getListArticleData(1);
  }

  // product selected index changed
  public cboContinuityProductSelectedIndexChanged() {
    if (this.continuityProductSelectedIndex >= 0) {
      this.continuitProductId = this.continuityProductObservableArray[this.continuityProductSelectedIndex].Id;
    } else {
      this.continuitProductId = 0;
    }
  }

  // add continuity click
  public btnContinuityDetailClick(add: boolean) {
    if (add) {
      this.continuityDetailModalString = "Add";
      this.continuityId = 0;
      this.continuityNumber = "NA"
      this.continuityDateValue = new Date();
      this.continuityDeliverySelectedIndex = 0;
      this.continuityCustomerSelectedIndex = 0;
      this.continuityProductSelectedIndex = 0;
      this.continuityExpiryDateValue = new Date();
      this.continuityStatusSelectedValue = "OPEN";
      this.continuityStaffUser = "NA";
    } else {
      let currentSelectedContinuity = this.continuityCollectionView.currentItem;
      this.continuityDetailModalString = "Edit";
      this.continuityId = currentSelectedContinuity.Id;
      this.continuityNumber = currentSelectedContinuity.ContinuityNumber;
      this.continuityDateValue = new Date(currentSelectedContinuity.ContinuityDate);
      this.continuityDeliverySelectedValue = currentSelectedContinuity.DeliveryNumber;
      this.continuityCustomerSelectedValue = currentSelectedContinuity.Customer;
      this.continuityProductSelectedValue = currentSelectedContinuity.Product;
      this.continuityExpiryDateValue = new Date(currentSelectedContinuity.ExpiryDate);
      this.continuityStatusSelectedValue = currentSelectedContinuity.ContinuityStatus;
      this.continuityStaffUser = currentSelectedContinuity.StaffUser;
    }
  }

  // continuity data
  public getContinuityValue() {
    let dataObject = {
      ContinuityDate: this.continuityDateValue.toLocaleDateString(),
      DeliveryId: this.continuityDeliveryId,
      CustomerId: this.continuitCustomerId,
      ProductId: this.continuitProductId,
      ExpiryDate: this.continuityExpiryDateValue.toLocaleDateString(),
      ContinuityStatus: this.continuityStatusSelectedValue
    }

    return dataObject;
  }

  // save continuity
  public btnSaveContinuity() {
    
  }

  // delete continuity
  public btnDeleteContinuityClick () {

  }

  // delete confirm continuity
  public btnDeleteConfirmContinuityClick() {

  }

  // initialization
  ngOnInit() {
    this.setContinuityDateRanged();
  }
}
