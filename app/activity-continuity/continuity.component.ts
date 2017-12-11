import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ContinuityService } from './continuity.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-continuity',
  templateUrl: 'app/activity-continuity/continuity.html'
})

export class ContinuityComponent implements OnInit {
  // global variables
  // public continuityStartDateValue: Date;
  // public isContinuityStartDateSelected = true;
  // public continuityEndDateValue: Date;
  // public isContinuityEndDateSelected = true;
  public continuityCollectionView: wijmo.collections.CollectionView;
  public continuityFilter = '';
  public continuityToFilter: any;
  public continuityDateValue: Date;
  public continuityExpiryDateValue: Date;
  public continuityDeliveryObservableArray: wijmo.collections.ObservableArray;
  public continuityDeliverySelectedValue: number;
  // public continuityCustomerObservableArray: wijmo.collections.ObservableArray;
  // public continuityCustomerSelectedIndex = -1;
  // public continuityCustomerSelectedValue: String;
  // public continuityProductObservableArray: wijmo.collections.ObservableArray;
  // public continuityProductSelectedIndex = -1;
  // public continuityProductSelectedValue: String;
  public continuityStatusArray = ['OPEN', 'EXPIRED'];
  public continuityStatusSelectedValue = "OPEN";
  public continuityDetailModalString: String;
  public continuityId: number;
  public continuityDeliveryId: number;
  public continuitCustomerId: number;
  public continuitProductId: number;
  public continuityStatus: String;
  public continuityStaffUser: String;
  public continuityNumber: String;
  public isFinishLoading = false;
  public isLoading = true;
  public isAdd: Boolean;
  public fliterContinuityStatusArray = ['ALL', 'OPEN', 'EXPIRED'];
  public filterContinuityStatusSelectedValue = "ALL";
  public continuityStatusClicked = false;
  // public isStartDateClicked = false;
  // public isEndDateClicked = false;
  public continuityRemarks: String;
  public dateTypeArray = ['Continuity Date', 'Expiry Date']
  public dateTypeSelectedValue = "Continuity Date";
  public isDateTypeSelected = false;
  public continuityAmount: String;
  public fliterMonthArray = [
    'JANUARY', 
    'FEBRUARY', 
    'MARCH', 
    'APRIL', 
    'MAY',
    'JUNE', 
    'JULY', 
    'AUGUST', 
    'SEPTEMBER', 
    'OCTOBER', 
    'NOVEMBER', 
    'DECEMBER'
  ];
  public newDate = new Date();
  public filterMonthSelectedValue = this.fliterMonthArray[this.newDate.getMonth()];
  public monthStatusClicked = false;
  public isMonthStatusSelected = false;

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

  public finishedLoad() {
    this.isFinishLoading = true;
    this.isLoading = false;
    (<HTMLButtonElement>document.getElementById("btnSaveContinuity")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnSaveContinuity")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseContinuity")).disabled = false;
  }

  // continuity date ranged
  public setContinuityDateRanged() {
    this.startLoading();
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

  public filterMonthSelectedIndexChangedClick() {
    if (this.monthStatusClicked) {
      if (this.isMonthStatusSelected) {
        this.startLoading();
        this.getContinuityData();
      }
      else {
        this.isMonthStatusSelected = true;
      }
    }
    else {
      this.monthStatusClicked = true;
    }
  }

  public cboDateTypeSelectedIndexChangedClick() {
    if (this.isDateTypeSelected) {
      this.startLoading();
      this.getContinuityData();
    }
    else {
      this.isDateTypeSelected = true;
    }
  }

  public filterContinuityStatusSelectedIndexChangedClick() {
    if (this.continuityStatusClicked) {
      this.startLoading();
      this.getContinuityData();
    }
    else {
      this.continuityStatusClicked = true;
    }
  }

  // continuity data
  public getContinuityData() {
    this.continuityCollectionView = new wijmo.collections.CollectionView(this.continuityService.getListContinuityData(this.filterMonthSelectedValue, this.dateTypeSelectedValue, this.filterContinuityStatusSelectedValue));
    this.continuityCollectionView.filter = this.filterFunction.bind(this);
    this.continuityCollectionView.pageSize = 15;
    this.continuityCollectionView.trackChanges = true;
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
    // this.getListCustomer();
  }

  // delivery selected index changed
  public cboContinuityDeliverySelectedIndexChanged() {
    this.continuityDeliveryId = this.continuityDeliverySelectedValue;
  }

  // // list customer data
  // public getListCustomer() {
  //   this.continuityCustomerObservableArray = this.continuityService.getListArticleData(2);
  //   this.getListProduct();
  // }

  // // customer selected index changed
  // public cboContinuityCustomerSelectedIndexChanged() {
  //   if (this.continuityCustomerSelectedIndex >= 0) {
  //     this.continuitCustomerId = this.continuityCustomerObservableArray[this.continuityCustomerSelectedIndex].Id;
  //   } else {
  //     this.continuitCustomerId = 0;
  //   }
  // }

  // // list product data
  // public getListProduct() {
  //   this.continuityProductObservableArray = this.continuityService.getListArticleData(1);
  // }

  // // product selected index changed
  // public cboContinuityProductSelectedIndexChanged() {
  //   if (this.continuityProductSelectedIndex >= 0) {
  //     this.continuitProductId = this.continuityProductObservableArray[this.continuityProductSelectedIndex].Id;
  //   } else {
  //     this.continuitProductId = 0;
  //   }
  // }

  // add continuity click
  public btnContinuityDetailClick(add: boolean) {
    this.isFinishLoading = false;
    this.isLoading = true;
    (<HTMLButtonElement>document.getElementById("btnSaveContinuity")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseContinuity")).disabled = true;
    this.getListDeliveryServiceData();
    if (add) {
      this.isAdd = false;
      this.continuityDetailModalString = "Add";
      this.continuityId = 0;
      this.continuityNumber = "--"
      this.continuityDateValue = new Date();
      this.continuityExpiryDateValue = new Date();
      this.continuityStatusSelectedValue = "OPEN";
      this.continuityStatus = "OPEN";
      this.continuityStaffUser = "--";
      this.continuityRemarks = "";
      this.continuityAmount = "0";
    } else {
      this.isAdd = true;
      let currentSelectedContinuity = this.continuityCollectionView.currentItem;
      this.continuityDetailModalString = "Edit";
      this.continuityId = currentSelectedContinuity.Id;
      this.continuityNumber = currentSelectedContinuity.ContinuityNumber;
      this.continuityDateValue = new Date(currentSelectedContinuity.ContinuityDate);
      this.continuityDeliverySelectedValue = currentSelectedContinuity.DeliveryId;
      this.continuityExpiryDateValue = new Date(currentSelectedContinuity.ExpiryDate);
      this.continuityStatusSelectedValue = currentSelectedContinuity.ContinuityStatus;
      this.continuityStatus = currentSelectedContinuity.ContinuityStatus;
      this.continuityStaffUser = currentSelectedContinuity.StaffUser;
      this.continuityRemarks = currentSelectedContinuity.Remarks;
      this.continuityAmount = currentSelectedContinuity.ContinuityAmount;
    }
  }

  // on key press decimal key
  public onKeyPressOnlyDecimalNumberKey(event: any) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  // on blur 
  public onBlurOnlyDecimalNumberKey() {
    (<HTMLInputElement>document.getElementById("continuityAmount")).value = "";
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("continuityAmount")).value = this.continuityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }, 100);
  }

  // continuity status selected index changed
  public cboContinuityStatusSelectedIndexChanged() {
    this.continuityStatus = this.continuityStatusSelectedValue;
  }

  // continuity data
  public getContinuityValue() {
    let dataObject = {
      ContinuityDate: this.continuityDateValue.toLocaleDateString(),
      DeliveryId: this.continuityDeliverySelectedValue,
      ExpiryDate: this.continuityExpiryDateValue.toLocaleDateString(),
      Remarks: this.continuityRemarks,
      ContinuityAmount: this.continuityAmount,
      ContinuityStatus: this.continuityStatus
    }

    return dataObject;
  }

  // save continuity
  public btnSaveContinuity() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveContinuity")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveContinuity")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseContinuity")).disabled = true;
    if (this.continuityId == 0) {
      this.continuityService.postContinuityData(this.getContinuityValue(), toastr);
    } else {
      this.continuityService.putContinuityData(this.continuityId, this.getContinuityValue(), toastr);
    }
  }

  // delete continuity
  public btnDeleteContinuityClick() {
    (<HTMLButtonElement>document.getElementById("btnDeleteContinuity")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
    (<HTMLButtonElement>document.getElementById("btnDeleteContinuity")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseContinuity")).disabled = false;
  }

  // delete confirm continuity
  public btnDeleteConfirmContinuityClick() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnDeleteContinuity")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnDeleteContinuity")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseContinuity")).disabled = true;
    let currentSelectedContinuity = this.continuityCollectionView.currentItem;
    this.continuityService.deleteContinuityData(currentSelectedContinuity.Id, toastr);
  }

  // refresh grid
  public refreshGrid() {
    this.startLoading();
    (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
    this.getContinuityData();
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
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.setContinuityDateRanged();
  }
}
