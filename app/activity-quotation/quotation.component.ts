import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { QuotationService } from './quotation.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-quotation',
  templateUrl: 'app/activity-quotation/quotation.html'
})

export class QuotationComponent implements OnInit {
  // global variables
  public quotationStartDateValue: Date;
  public isQuotationStartDateSelected = true;
  public quotationEndDateValue: Date;
  public isQuotationEndDateSelected = true;
  public quotationDateValue: Date;
  public quotationCollectionView: wijmo.collections.CollectionView;
  public quotationFilter = '';
  public quotationToFilter: any;
  public quotationLeadObservableArray: wijmo.collections.ObservableArray;
  public quotationLeadSelectedValue: number;
  public quotationCustomerObservableArray: wijmo.collections.ObservableArray;
  public quotationCustomerSelectedValue:  number;
  public quotationProductObservableArray: wijmo.collections.ObservableArray;
  public quotationProductSelectedValue:  number;
  public quotationStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
  public quotationStatusSelectedValue = "OPEN";
  public quotationRemarks: String;
  public isFinishLoading = false;
  public isLoading = true;

  // inject quotation service
  constructor(
    private quotationService: QuotationService,
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
    (<HTMLButtonElement>document.getElementById("btnSaveQuotation")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnSaveQuotation")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseQuotation")).disabled = false;
  }

  // quotation dates
  public setQuotationDateRanged() {
    this.quotationStartDateValue = new Date();
    this.quotationEndDateValue = new Date();
    this.quotationDateValue = new Date();
    this.getListQuotation();
  }

  // event: quotation start date
  public quotationStartDateOnValueChanged() {
    if (!this.isQuotationStartDateSelected) {
      this.startLoading();
      this.getQuotationData();
    } else {
      this.isQuotationStartDateSelected = false;
    }
  }

  // event: quotation end date
  public quotationEndDateOnValueChanged() {
    if (!this.isQuotationEndDateSelected) {
      this.startLoading();
      this.getQuotationData();
    } else {
      this.isQuotationEndDateSelected = false;
    }
  }

  // get quotation data
  public getQuotationData() {
    this.quotationCollectionView = new wijmo.collections.CollectionView(this.quotationService.getListQuotationData(this.quotationStartDateValue, this.quotationEndDateValue));
    this.quotationCollectionView.filter = this.filterFunction.bind(this);
    this.quotationCollectionView.pageSize = 15;
    this.quotationCollectionView.trackChanges = true;
  }

  // list quotation
  public getListQuotation() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.getQuotationData();
  }

  // btn add quotation
  public btnAddQotationClick() {
    this.isFinishLoading = false;
    this.isLoading = true;
    (<HTMLButtonElement>document.getElementById("btnSaveQuotation")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseQuotation")).disabled = true;
    this.quotationDateValue = new Date();
    this.getListLead();
    this.quotationRemarks = "";
    this.quotationStatusSelectedValue = "OPEN";
  }

  // list lead
  public getListLead() {
    this.quotationLeadObservableArray = this.quotationService.getListLeadData("quotation");
  }

  // list customer
  public getListCustomer() {
    this.quotationCustomerObservableArray = this.quotationService.getListArticleData("quotation", 2);
  }

  // list Product
  public getListProduct() {
    this.quotationProductObservableArray = this.quotationService.getListArticleData("quotation", 1);
  }

  // btn edit quotation
  public btnEditQuotation() {
    this.startLoading();
    let currentSelectedQuotation = this.quotationCollectionView.currentItem;
    this.router.navigate(['/quotationDetail', currentSelectedQuotation.Id]);
  }

  // delete confirm modal
  public btnDeleteQuotationClick() {
    (<HTMLButtonElement>document.getElementById("btnDeleteQuotation")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
    (<HTMLButtonElement>document.getElementById("btnDeleteQuotation")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseQuotation")).disabled = false;
  }

  // delete confirm
  public btnDeleteConfirmQuotationClick() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnDeleteQuotation")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnDeleteQuotation")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnDeleteCloseQuotation")).disabled = true;
    let currentSelectedQuotation = this.quotationCollectionView.currentItem;
    this.quotationService.deleteQuotationData(currentSelectedQuotation.Id, toastr);
  }

  // quotation data
  public getQuotationValue() {
    let dataObject = {
      QuotationDate: this.quotationDateValue.toLocaleDateString(),
      LeadId: this.quotationLeadSelectedValue,
      CustomerId: this.quotationCustomerSelectedValue,
      ProductId: this.quotationProductSelectedValue,
      Remarks: this.quotationRemarks,
      QuotationStatus: this.quotationStatusSelectedValue
    }

    return dataObject;
  }

  // save quotation
  public btnSaveQuotation() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveQuotation")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveQuotation")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseQuotation")).disabled = true;
    this.quotationService.postQuotationData(this.getQuotationValue(), toastr);
  }

  // filter
  get filter(): string {
    return this.quotationFilter;
  }

  // filter
  set filter(value: string) {
    if (this.quotationFilter != value) {
      this.quotationFilter = value;

      if (this.quotationToFilter) {
        clearTimeout(this.quotationToFilter);
      }

      var self = this;
      this.quotationToFilter = setTimeout(function () {
        self.quotationCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.quotationFilter) {
      return (item.QuotationNumber.toLowerCase().indexOf(this.quotationFilter.toLowerCase()) > -1) ||
        (item.Customer.toLowerCase().indexOf(this.quotationFilter.toLowerCase()) > -1) ||
        (item.Remarks.toLowerCase().indexOf(this.quotationFilter.toLowerCase()) > -1) ||
        (item.QuotationStatus.toLowerCase().indexOf(this.quotationFilter.toLowerCase()) > -1) ||
        (item.EncodedByUser.toLowerCase().indexOf(this.quotationFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // show menu
  public showMenu() {
      document.getElementById("showTop").click();
  }
  
  // initialization
  ngOnInit() {
    this.setQuotationDateRanged();
  }
}
