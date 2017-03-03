import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from './delivery.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-delivery',
  templateUrl: 'app/activity-delivery/delivery.html'
})

export class DeliveryComponent implements OnInit {
  // global variables
  public deliveryStartDateValue: Date;
  public isDeliveryStartDateSelected = true;
  public deliveryEndDateValue: Date;
  public isDeliveryEndDateSelected = true;
  public deliveryCollectionView: wijmo.collections.CollectionView;
  public deliveryFilter = '';
  public deliveryToFilter: any;
  public deliveryDateValue: Date;
  public deliveryQuotaionObservableArray: wijmo.collections.ObservableArray;
  public deliveryQuotaionSelectedValue: number;
  public deliveryMeetingDateValue: Date;
  public deliveryTechnicalUserObservableArray: wijmo.collections.ObservableArray;
  public deliveryTechnicalUserSelectedValue: number;
  public deliveryFunctionalUserObservableArray: wijmo.collections.ObservableArray;
  public deliveryFunctionalUserSelectedValue: number;
  public deliveryStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
  public deliveryStatusSelectedValue = "OPEN";
  public deliveryQuotationId: number;
  public deliveryRemarks: String;
  public deliveryTechnicalUserId: number;
  public deliveryFunctionalUserId: number;
  public deliveryStatus: String;
  public isFinishLoading = false;
  public isLoading = true;
  public fliterDeliveryStatusArray = ['ALL', 'OPEN', 'CLOSE', 'CANCELLED'];
  public filterDeliveryStatusSelectedValue = "OPEN";
  public isStartDateClicked = false;
  public isEndDateClicked = false;
  public deliveryStatusClicked = false;

  // inject delivery service
  constructor(
    private deliveryService: DeliveryService,
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

  public finishedLoad() {
    this.isFinishLoading = true;
    this.isLoading = false;
    (<HTMLButtonElement>document.getElementById("btnSaveDelivery")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnSaveDelivery")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseDelivery")).disabled = false;
  }

  // delivery date ranged
  public setDeliveryDateRanged() {
    this.startLoading();
    this.deliveryStartDateValue = new Date();
    this.deliveryEndDateValue = new Date();
    this.getListDelivery();
  }

  // event: delivery start date
  public deliveryStartDateOnValueChanged() {
    if (!this.isDeliveryStartDateSelected) {
      if (this.isStartDateClicked) {
        this.startLoading();
        this.getDeliveryData();
      }
      else {
        this.isStartDateClicked = true;
      }
    } else {
      this.isDeliveryStartDateSelected = false;
    }
  }

  // event: delivery end date
  public deliveryEndDateOnValueChanged() {
    if (!this.isDeliveryEndDateSelected) {
      if (this.isEndDateClicked) {
        this.startLoading();
        this.getDeliveryData();
      }
      else {
        this.isEndDateClicked = true;
      }
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

  public filterDeliveryStatusSelectedIndexChangedClick() {
    if (this.deliveryStatusClicked) {
      this.startLoading();
      this.getDeliveryData();
    }
    else {
      this.deliveryStatusClicked = true;
    }
  }

  // delivery data
  public getDeliveryData() {
    this.deliveryCollectionView = new wijmo.collections.CollectionView(this.deliveryService.getListDeliveryData(this.deliveryStartDateValue, this.deliveryEndDateValue, this.filterDeliveryStatusSelectedValue));
    this.deliveryCollectionView.filter = this.filterFunction.bind(this);
    this.deliveryCollectionView.pageSize = 15;
    this.deliveryCollectionView.trackChanges = true;
    this.deliveryDateValue = new Date();
    this.deliveryMeetingDateValue = new Date();
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

  // add delivery
  public btnAddDeliveryClick() {
    this.isFinishLoading = false;
    this.isLoading = true;
    (<HTMLButtonElement>document.getElementById("btnSaveDelivery")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseDelivery")).disabled = true;
    this.deliveryDateValue = new Date();
    this.getListQuotation();
  }

  // delivery date on value changed
  public deliveryDateOnValueChanged() {

  }

  // list quotation data
  public getListQuotation() {
    this.deliveryQuotaionObservableArray = this.deliveryService.getListQuotationData("delivery");
    // this.getListCustomer();
  }

  // quotation number selected index changed
  public cboDeliveryQuotaionSelectedIndexChanged() {
    this.deliveryQuotationId = this.deliveryQuotaionSelectedValue;
  }

  // meeting date on value changed
  public deliveryMeetingDateOnValueChanged() {

  }

  // list technical and functional users
  public getTechnicalListUsers() {
    this.deliveryTechnicalUserObservableArray = this.deliveryService.getListUserData("delivery", "technical");
  }

  public getFunctionalListUsers() {
    this.deliveryFunctionalUserObservableArray = this.deliveryService.getListUserData("delivery", "functional");
  }

  // technical user selected index changed
  public cboDeliveryTechnicalUserSelectedIndexChanged() {
    this.deliveryTechnicalUserId = this.deliveryTechnicalUserSelectedValue;
  }

  // functionl user selected index changed
  public cboDeliveryFunctionalUserSelectedIndexChanged() {
    this.deliveryFunctionalUserId = this.deliveryFunctionalUserSelectedValue;
  }

  // status selected index changed
  public cboStatusSelectedIndexChangedClick() {
    this.deliveryStatus = this.deliveryStatusSelectedValue;
  }

  // delete delivery click
  public btnDeleteDeliveryClick() {
    (<HTMLButtonElement>document.getElementById("btnDeleteDelivery")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
    (<HTMLButtonElement>document.getElementById("btnDeleteDelivery")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseDelivery")).disabled = false;
  }

  // delete delivery confirm click
  public btnDeleteConfirmDeliveryClick() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnDeleteDelivery")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnDeleteDelivery")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseDelivery")).disabled = true;
    let currentSelectedDelivery = this.deliveryCollectionView.currentItem;
    this.deliveryService.deleteDeliveryData(currentSelectedDelivery.Id, toastr);
  }

  // edit delivery
  public btnEditDelivery() {
    this.startLoading();
    let currentSelectedDelivery = this.deliveryCollectionView.currentItem;
    this.router.navigate(['/deliveryDetail', currentSelectedDelivery.Id]);
  }

  // delivery data
  public getDeliveryValue() {
    let dataObject = {
      DeliveryDate: this.deliveryDateValue.toLocaleDateString(),
      QuotationId: this.deliveryQuotaionSelectedValue,
      MeetingDate: this.deliveryMeetingDateValue.toLocaleDateString(),
      Remarks: this.deliveryRemarks,
      TechnicalUserId: this.deliveryTechnicalUserSelectedValue,
      FunctionalUserId: this.deliveryFunctionalUserSelectedValue,
      DeliveryStatus: this.deliveryStatusSelectedValue
    }

    return dataObject;
  }

  // show menu
  public showMenu() {
    document.getElementById("showTop").click();
  }

  // save delivery
  public btnSaveDelivery() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveDelivery")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveDelivery")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseDelivery")).disabled = true;
    this.deliveryService.postDeliveryData(this.getDeliveryValue(), toastr);
  }

  // refresh grid
  public refreshGrid() {
    this.startLoading();
    (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
    this.getDeliveryData();
  }

  public backClicked() {
    window.history.back();
  }

  // initialization
  ngOnInit() {
    this.setDeliveryDateRanged();
  }
}
