import { Component, OnInit, Renderer, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuotationService } from './quotation.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-quotation-detail',
  templateUrl: 'app/activity-quotation/quotationDetail.html'
})

export class QuotationDetailComponent implements OnInit {
  // global variable
  public quotationId: number;
  public quotationDateValue: Date;
  public isQuotationDateSelected = true;
  public quotationLeadObservableArray: wijmo.collections.ObservableArray;
  public quotationLeadSelectedValue: number;
  public quotationCustomerObservableArray: wijmo.collections.ObservableArray;
  public quotationCustomerSelectedValue: number;
  public quotationProductObservableArray: wijmo.collections.ObservableArray;
  public quotationProductSelectedValue: number;
  public quotationEncodedUserObservableArray: wijmo.collections.ObservableArray;
  // public quotationEncodedBySelectedValue: number;
  public quotationEncodedBySelectedValue: String;
  public quotationStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
  public quotationStatusSelectedValue: String;
  public activityCollectionView: wijmo.collections.CollectionView;
  public activityDetailModalString: String;
  public activityId: number;
  public activityDateValue: Date;
  public activityParticularCategories = [
    'Quotation'
  ];
  public activityParticularCategorySelectedIndex = 0;
  public activityParticularCategorySelectedValue: String;
  public activityNoOfHours = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];
  public activityNoOfHoursSelectedValue: String;
  public activityStatus = ['OPEN', 'CLOSE', 'CANCELLED'];
  public activityStatusSelectedValue: String;
  public activityAmount: String;
  public isFinishLoading = false;
  public isLoading = true;
  public paymentScheduleCollectionView: wijmo.collections.CollectionView;
  public quotationPaymentScheduleArray = new wijmo.collections.ObservableArray();
  public paymentId: number = 0;
  public quotationPrintDescription: String;
  public quotationPrintAmount: String;
  public quotationPrintRemarks: String;
  public printQuotationString: String;
  public isAddPayment: Boolean;
  public printQuotationCustomer: String;
  public printQuotationAddress: String;
  public printQuotatioContactPerson: String;
  public printQuotatioContactNumber: String;
  public printQuotatioContactEmail: String;
  public quotationCustomerSelectedIndex = 0;
  public isCustomerSelected = false;
  public isCustomerClicked = false;
  public productCollectionView: wijmo.collections.CollectionView;
  public productCollectionArray = new wijmo.collections.ObservableArray();
  public productId: number = 0;
  public printProductQuotationString: String;
  public isAddProduct: Boolean;
  public printQuotationProductCode: String;
  public printQuotationProductDescription: String;
  public printQuotationProductPrice: String;
  public printQuotationProductQuantity: String;
  public printQuotationProductAmount: String;
  public timelineCollectionView: wijmo.collections.CollectionView;
  public quotationTimeLineArray = new wijmo.collections.ObservableArray();
  public timelineId: number = 0;
  public printQuotationTimeLineProduct: String;
  public printQuotationTimeLine: String;
  public printQuotationTimeLineRemarks: String;
  public printTimelineQuotationString: String;
  public isAddtTimeline: Boolean;
  public quotationPrintPreparedByUserObservableArray = new wijmo.collections.ObservableArray();
  public quotationPrintPreparedByUserSelectedValue: String;
  public quotationPrintApprovedByUserObservableArray = new wijmo.collections.ObservableArray();
  public quotationPrintApprovedByUserSelectedValue: String;
  public printQuotationIsDiscount: Boolean;

  // inject quotation detail service
  constructor(
    private quotationService: QuotationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer,
    private elementRef: ElementRef,
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
    (<HTMLButtonElement>document.getElementById("btnSaveQuotationDetail")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnPrintQuotationDetail")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseQuotationDetail")).disabled = false;
  }

  // set selected value for drop down
  public setDropdownSelectedValueData() {
    this.quotationDateValue = new Date((<HTMLInputElement>document.getElementById("quotationDateValue")).value.toString());
    this.quotationLeadSelectedValue = parseInt((<HTMLInputElement>document.getElementById("quotationLeadSelectedValue")).value.toString());
    this.quotationCustomerSelectedValue = parseInt((<HTMLInputElement>document.getElementById("quotationCustomerSelectedValue")).value.toString());
    this.quotationProductSelectedValue = parseInt((<HTMLInputElement>document.getElementById("quotationProductSelectedValue")).value.toString());
    // this.quotationEncodedBySelectedValue = parseInt((<HTMLInputElement>document.getElementById("quotationEncodedBySelectedValue")).value.toString());
    this.quotationStatusSelectedValue = (<HTMLInputElement>document.getElementById("quotationStatusSelectedValue")).value.toString();

    let searchTerm = this.quotationCustomerSelectedValue;
    let index = -1;
    let len = this.quotationCustomerObservableArray.length;
    for (var i = 0; i < len; i++) {
      if (this.quotationCustomerObservableArray[i].Id === searchTerm) {
        index = i;
        break;
      }
    }

    (<HTMLInputElement>document.getElementById("printQuotationCustomer")).value = this.quotationCustomerObservableArray[i].Article;
    (<HTMLInputElement>document.getElementById("printQuotationAddress")).value = this.quotationCustomerObservableArray[i].Address;
    (<HTMLInputElement>document.getElementById("printQuotationContactPerson")).value = this.quotationCustomerObservableArray[i].ContactPerson;
    (<HTMLInputElement>document.getElementById("printQuotationContactNumber")).value = this.quotationCustomerObservableArray[i].ContactNumber;
    (<HTMLInputElement>document.getElementById("printQuotationContactEmail")).value = this.quotationCustomerObservableArray[i].EmailAddress;
  }

  // quotation date value
  public setQuotationDateValue() {
    this.quotationDateValue = new Date();
    this.activityDateValue = new Date();
    this.getListActivity(false);
    (<HTMLButtonElement>document.getElementById("btnSaveQuotationDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnPrintQuotationDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseQuotationDetail")).disabled = true;
  }

  // list lead
  public getLeadServiceData() {
    this.quotationLeadObservableArray = this.quotationService.getListLeadData("quotationDetail");
  }

  // list customer article
  public getCustomerArticleData() {
    this.quotationCustomerObservableArray = this.quotationService.getListArticleData("quotationDetail", 2);
  }

  // list product article
  public getProductArticleData() {
    this.quotationProductObservableArray = this.quotationService.getListArticleData("quotationDetail", 1);
  }

  // list product
  public getUserServiceData() {
    this.quotationEncodedUserObservableArray = this.quotationService.getListUserData("quotationDetail");
  }

  // quotation data
  public getQuotationServiceData() {
    this.quotationService.getQuotationById(this.getIdUrlParameter());
  }

  // get url Id parameter
  public getIdUrlParameter() {
    this.activatedRoute.params.subscribe(params => {
      this.quotationId = params['id'];
    });

    return this.quotationId;
  }

  // quotataion data value changed
  public quotationDateOnValueChanged() {
    if (this.isQuotationDateSelected) {
      this.isQuotationDateSelected = false;
    }
  }

  // quotation data
  public getQuotationValue() {
    let dataObject = {
      QuotationDate: this.quotationDateValue.toLocaleDateString(),
      LeadId: this.quotationLeadSelectedValue,
      CustomerId: this.quotationCustomerSelectedValue,
      ProductId: this.quotationProductSelectedValue,
      Remarks: (<HTMLInputElement>document.getElementById("quotationRemarks")).value,
      QuotationStatus: this.quotationStatusSelectedValue
    }

    return dataObject;
  }

  // save quotation detail
  public btnSaveQuotationDetailClick() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveQuotationDetail")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveQuotationDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnPrintQuotationDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseQuotationDetail")).disabled = true;
    this.quotationService.putQuotationData(this.getIdUrlParameter(), this.getQuotationValue(), toastr);
  }

  public backClicked() {
    window.history.back();
  }

  // on key press decimal key
  public onKeyPressOnlyDecimalNumberKey(event: any, inputComputeName: String) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  public priceOnKeyEvent(event: any) {
    var price = parseFloat(event.target.value.split(',').join(''));
    var quantity = parseFloat((<HTMLInputElement>document.getElementById("printQuotationProductQuantity")).value.split(',').join(''));
    (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value = (price * quantity).toLocaleString();
  }

  public quantityOnKeyEvent(event: any) {
    var quantity = parseFloat(event.target.value.split(',').join(''));
    var price = parseFloat((<HTMLInputElement>document.getElementById("printQuotationProductPrice")).value.split(',').join(''));
    (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value = (price * quantity).toLocaleString();
  }

  // on blur 
  public onBlurOnlyDecimalNumberKey() {
    (<HTMLInputElement>document.getElementById("activityAmount")).value = "";
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("activityAmount")).value = this.activityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }, 100);
  }

  // activity line list
  public getListActivity(isLoadActivityOnly: Boolean) {
    this.activityCollectionView = new wijmo.collections.CollectionView(this.quotationService.getListActivityByQuotationId(this.getIdUrlParameter(), isLoadActivityOnly));
    this.activityCollectionView.pageSize = 15;
    this.activityCollectionView.trackChanges = true;
  }

  // activity line detail modal  
  public btnActivityDetailModal(add: boolean) {
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = false;
    if (add) {
      this.activityDetailModalString = "Add";
      this.activityId = 0;
      this.activityDateValue = new Date();
      this.activityParticularCategorySelectedValue = "New Installation";
      (<HTMLInputElement>document.getElementById("activityParticulars")).value = "";
      this.activityNoOfHoursSelectedValue = "0";
      (<HTMLInputElement>document.getElementById("activityAmount")).value = "0";
      this.activityAmount = "0";
      this.activityStatusSelectedValue = "OPEN";
    } else {
      this.activityDetailModalString = "Edit";
      let currentSelectedActivity = this.activityCollectionView.currentItem;
      this.activityId = currentSelectedActivity.Id;
      this.activityDateValue = new Date(currentSelectedActivity.ActivityDate);
      this.activityParticularCategorySelectedValue = currentSelectedActivity.ParticularCategory;
      (<HTMLInputElement>document.getElementById("activityParticulars")).value = currentSelectedActivity.Particulars;
      this.activityNoOfHoursSelectedValue = currentSelectedActivity.NumberOfHours;
      (<HTMLInputElement>document.getElementById("activityAmount")).value = currentSelectedActivity.ActivityAmount.toLocaleString();
      this.activityAmount = currentSelectedActivity.ActivityAmount.toLocaleString();
      this.activityStatusSelectedValue = currentSelectedActivity.ActivityStatus;
    }
  }

  // get activity data
  public getActivityData() {
    let activityDataObject = {
      ActivityDate: this.activityDateValue.toLocaleDateString(),
      ParticularCategory: this.activityParticularCategorySelectedValue,
      Particulars: (<HTMLInputElement>document.getElementById("activityParticulars")).value,
      NumberOfHours: this.activityNoOfHoursSelectedValue,
      ActivityAmount: this.activityAmount,
      ActivityStatus: this.activityStatusSelectedValue,
      QuotationId: this.getIdUrlParameter(),
    }

    return activityDataObject;
  }

  // save activity
  public btnActivitySaveClick() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = true;
    if (this.activityId == 0) {
      this.quotationService.postActivityData(this.getActivityData(), toastr);
    } else {
      this.quotationService.putActivityData(this.activityId, this.getActivityData(), toastr);
    }
  }

  // activity delete confirmation modal
  public btnActivityDeleteConfirmationModal() {
    let currentSelectedActivity = this.activityCollectionView.currentItem;
    this.activityId = currentSelectedActivity.Id;
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnActivityCloseDeleteConfirmation")).disabled = false;
  }

  // activity delete confirmation click
  public btnActivityDeleteConfirmationClick() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnActivityCloseDeleteConfirmation")).disabled = true;
    this.quotationService.deleteActivityData(this.activityId, toastr);
  }

  // print
  public btnActivityPrintClick() {
    let currentSelectedActivity = this.activityCollectionView.currentItem;
    window.open('http://api.innosoft.ph/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
  }

  // show menu
  public showMenu() {
    document.getElementById("showTop").click();
  }

  public btnPrintQuotationDetailClick() {
    let searchTerm = this.quotationCustomerSelectedValue;
    let index = -1;
    let len = this.quotationCustomerObservableArray.length;
    for (var i = 0; i < len; i++) {
      if (this.quotationCustomerObservableArray[i].Id === searchTerm) {
        index = i;
        break;
      }
    }

    (<HTMLInputElement>document.getElementById("printQuotationCustomer")).value = this.quotationCustomerObservableArray[index].Article;
    (<HTMLInputElement>document.getElementById("printQuotationAddress")).value = this.quotationCustomerObservableArray[index].Address;
    (<HTMLInputElement>document.getElementById("printQuotationContactPerson")).value = this.quotationCustomerObservableArray[index].ContactPerson;
    (<HTMLInputElement>document.getElementById("printQuotationContactNumber")).value = this.quotationCustomerObservableArray[index].ContactNumber;
    (<HTMLInputElement>document.getElementById("printQuotationContactEmail")).value = this.quotationCustomerObservableArray[index].EmailAddress;

    var qRefNumber = (<HTMLInputElement>document.getElementById("quotationNumber")).value;
    var qDate = (<HTMLInputElement>document.getElementById("quotationDateValue")).value;
    (<HTMLInputElement>document.getElementById("QRefNo")).value = "QN-" + qRefNumber;
    (<HTMLInputElement>document.getElementById("QDate")).value = qDate;

    let searchLeadTerm = this.quotationLeadSelectedValue;
    let leadIndex = -1;
    let leadLen = this.quotationLeadObservableArray.length;
    for (var i = 0; i < leadLen; i++) {
      if (this.quotationLeadObservableArray[i].Id === searchLeadTerm) {
        leadIndex = i;
        break;
      }
    }

    (<HTMLInputElement>document.getElementById("LeadsRefNo")).value = "LN-" + this.quotationLeadObservableArray[leadIndex].LeadNumber;
    this.quotationPrintPreparedByUserObservableArray = this.quotationService.getListUserData("quotationDetail");
    this.quotationPrintApprovedByUserObservableArray = this.quotationService.getListUserData("quotationDetail");
    this.printQuotationIsDiscount = false;
    (<HTMLInputElement>document.getElementById("printQuotationIsDiscount")).checked = false;
  }

  public paymentTabClick() {
    setTimeout(() => {
      this.paymentScheduleData();
    }, 500);
  }

  public productTabClick() {
    setTimeout(() => {
      this.productProductData();
    }, 500);
  }

  public paymentScheduleData() {
    this.paymentScheduleCollectionView = new wijmo.collections.CollectionView(this.quotationPaymentScheduleArray);
    this.paymentScheduleCollectionView.pageSize = 7;
    this.paymentScheduleCollectionView.trackChanges = true;
  }

  public paymentOnclick() {
    this.printQuotationString = "Add";
    this.isAddPayment = true;
    (<HTMLInputElement>document.getElementById("quotationPrintDescription")).value = "";
    (<HTMLInputElement>document.getElementById("quotationPrintAmount")).value = "0";
    (<HTMLInputElement>document.getElementById("quotationPrintRemarks")).value = "";

    this.quotationPrintDescription = "";
    this.quotationPrintAmount = "0";
    this.quotationPrintRemarks = "";
  }

  public btnAddPaymentDataClick() {
    this.quotationPrintDescription = (<HTMLInputElement>document.getElementById("quotationPrintDescription")).value;
    this.quotationPrintAmount = (<HTMLInputElement>document.getElementById("quotationPrintAmount")).value;
    this.quotationPrintRemarks = (<HTMLInputElement>document.getElementById("quotationPrintRemarks")).value;

    if (this.isAddPayment) {
      this.paymentId += 1;
      this.quotationPaymentScheduleArray.push({
        Id: this.paymentId,
        Description: this.quotationPrintDescription,
        Amount: this.quotationPrintAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        Remarks: this.quotationPrintRemarks
      });
    } else {
      let currentSelectedPayment = this.paymentScheduleCollectionView.currentItem;
      currentSelectedPayment.Description = this.quotationPrintDescription;
      currentSelectedPayment.Amount = this.quotationPrintAmount;
      currentSelectedPayment.Remarks = this.quotationPrintRemarks;
    }

    this.paymentScheduleData();
    (<HTMLInputElement>document.getElementById("btnPaymentCloseModal")).click();
  }

  public btnPaymentDeleteConfirmationClick() {
    let currentSelectedPayment = this.paymentScheduleCollectionView.currentItem;
    let searchTerm = currentSelectedPayment.Id;
    let index = -1;

    for (var i = 0, len = this.quotationPaymentScheduleArray.length; i < len; i++) {
      if (this.quotationPaymentScheduleArray[i].Id === searchTerm) {
        index = i;
        break;
      }
    }

    this.quotationPaymentScheduleArray.splice(index, 1);
    this.paymentScheduleData();
    (<HTMLInputElement>document.getElementById("btnPaymentCloseDeleteConfirmation")).click();
  }

  public paymentEdit() {
    this.printQuotationString = "Edit";
    this.isAddPayment = false;
    let currentSelectedPayment = this.paymentScheduleCollectionView.currentItem;
    (<HTMLInputElement>document.getElementById("quotationPrintDescription")).value = currentSelectedPayment.Description;
    (<HTMLInputElement>document.getElementById("quotationPrintAmount")).value = currentSelectedPayment.Amount;
    (<HTMLInputElement>document.getElementById("quotationPrintRemarks")).value = currentSelectedPayment.Remarks;
  }

  public productProductData() {
    this.productCollectionView = new wijmo.collections.CollectionView(this.productCollectionArray);
    this.productCollectionView.pageSize = 7;
    this.productCollectionView.trackChanges = true;
  }

  public productOnclick() {
    this.printProductQuotationString = "Add";
    this.isAddProduct = true;
    (<HTMLInputElement>document.getElementById("printQuotationProductCode")).value = "";
    (<HTMLInputElement>document.getElementById("printQuotationProductDescription")).value = "";
    (<HTMLInputElement>document.getElementById("printQuotationProductPrice")).value = "0";
    (<HTMLInputElement>document.getElementById("printQuotationProductQuantity")).value = "0";
    (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value = "0";

    this.printQuotationProductCode = "";
    this.printQuotationProductDescription = "";
    this.printQuotationProductPrice = "0";
    this.printQuotationProductQuantity = "0";
    this.printQuotationProductAmount = "0";

    let searchTerm = this.quotationProductSelectedValue;
    let index = -1;
    let len = this.quotationProductObservableArray.length;
    for (var i = 0; i < len; i++) {
      if (this.quotationProductObservableArray[i].Id === searchTerm) {
        index = i;
        break;
      }
    }

    (<HTMLInputElement>document.getElementById("printQuotationProductCode")).value = this.quotationProductObservableArray[index].ArticleCode;
    (<HTMLInputElement>document.getElementById("printQuotationProductDescription")).value = this.quotationProductObservableArray[index].Article;
    this.printQuotationIsDiscount = false;
    (<HTMLInputElement>document.getElementById("printQuotationIsDiscount")).checked = false;
  }

  public btnAddProductDataClick() {
    this.printQuotationProductCode = (<HTMLInputElement>document.getElementById("printQuotationProductCode")).value;
    this.printQuotationProductDescription = (<HTMLInputElement>document.getElementById("printQuotationProductDescription")).value;
    this.printQuotationProductPrice = (<HTMLInputElement>document.getElementById("printQuotationProductPrice")).value;
    this.printQuotationProductQuantity = (<HTMLInputElement>document.getElementById("printQuotationProductQuantity")).value;
    this.printQuotationProductAmount = (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value;
    this.printQuotationIsDiscount = (<HTMLInputElement>document.getElementById("printQuotationIsDiscount")).checked;

    if (this.isAddProduct) {
      this.productId += 1;
      this.productCollectionArray.push({
        Id: this.productId,
        ProductCode: this.printQuotationProductCode,
        ProductDescription: this.printQuotationProductDescription,
        IsDiscount: this.printQuotationIsDiscount,
        Price: this.printQuotationProductPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        Quantity: this.printQuotationProductQuantity.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        Amount: this.printQuotationProductAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      });
    } else {
      let currentSelectedProduct = this.productCollectionView.currentItem;
      currentSelectedProduct.ProductCode = this.printQuotationProductCode;
      currentSelectedProduct.ProductDescription = this.printQuotationProductDescription;
      currentSelectedProduct.IsDiscount = this.printQuotationIsDiscount;
      currentSelectedProduct.Price = this.printQuotationProductPrice;
      currentSelectedProduct.Quantity = this.printQuotationProductQuantity;
      currentSelectedProduct.Amount = this.printQuotationProductAmount;
    }

    this.productProductData();
    (<HTMLInputElement>document.getElementById("btnProductCloseModal")).click();
  }

  public productEdit() {
    this.printProductQuotationString = "Edit";
    this.isAddProduct = false;
    let currentSelectedProduct = this.productCollectionView.currentItem;
    (<HTMLInputElement>document.getElementById("printQuotationProductCode")).value = currentSelectedProduct.ProductCode;
    (<HTMLInputElement>document.getElementById("printQuotationProductDescription")).value = currentSelectedProduct.ProductDescription;
    (<HTMLInputElement>document.getElementById("printQuotationIsDiscount")).checked = currentSelectedProduct.IsDiscount;
    (<HTMLInputElement>document.getElementById("printQuotationProductPrice")).value = currentSelectedProduct.Price;
    (<HTMLInputElement>document.getElementById("printQuotationProductQuantity")).value = currentSelectedProduct.Quantity;
    (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value = currentSelectedProduct.Amount;
  }

  public btnProductDeleteConfirmationClick() {
    let currentSelectedProduct = this.productCollectionView.currentItem;
    let searchTerm = currentSelectedProduct.Id;
    let index = -1;

    for (var i = 0, len = this.productCollectionArray.length; i < len; i++) {
      if (this.productCollectionArray[i].Id === searchTerm) {
        index = i;
        break;
      }
    }

    this.productCollectionArray.splice(index, 1);
    this.productProductData();
    (<HTMLInputElement>document.getElementById("btProductCloseDeleteConfirmation")).click();
  }

  public onBlurOnlyDecimalNumberKeyForPrintQuotation() {
    (<HTMLInputElement>document.getElementById("quotationPrintAmount")).value = "";
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("quotationPrintAmount")).value = this.quotationPrintAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }, 100);
  }

  public onBlurOnlyDecimalNumberKeyForProductPricePrintQuotation() {
    (<HTMLInputElement>document.getElementById("printQuotationProductPrice")).value = "";
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("printQuotationProductPrice")).value = this.printQuotationProductPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }, 100);
  }

  public onBlurOnlyDecimalNumberKeyForProductQuantityPrintQuotation() {
    (<HTMLInputElement>document.getElementById("printQuotationProductQuantity")).value = "";
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("printQuotationProductQuantity")).value = this.printQuotationProductQuantity.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }, 100);
  }

  public onBlurOnlyDecimalNumberKeyForProductAmountPrintQuotation() {
    (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value = "";
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value = this.printQuotationProductAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }, 100);
  }

  public btnPrintQuotationDetailPrintButtonClick() {
    var printQuotationCustomer = (<HTMLInputElement>document.getElementById("printQuotationCustomer")).value;
    var printQuotationAddress = (<HTMLInputElement>document.getElementById("printQuotationAddress")).value;
    var printQuotationContactPerson = (<HTMLInputElement>document.getElementById("printQuotationContactPerson")).value;
    var printQuotationContactNumber = (<HTMLInputElement>document.getElementById("printQuotationContactNumber")).value;
    var printQuotationContactEmail = (<HTMLInputElement>document.getElementById("printQuotationContactEmail")).value;
    var QRefNo = (<HTMLInputElement>document.getElementById("QRefNo")).value;
    var QDate = (<HTMLInputElement>document.getElementById("QDate")).value;
    var ClientPONo = (<HTMLInputElement>document.getElementById("ClientPONo")).value;
    var ClientPODate = (<HTMLInputElement>document.getElementById("ClientPODate")).value;
    var LeadsRefNo = (<HTMLInputElement>document.getElementById("LeadsRefNo")).value;

    var customerDetailArray = [];
    customerDetailArray.push({
      CustomerName: printQuotationCustomer,
      CustomerAddress: printQuotationAddress,
      CustomerContactPerson: printQuotationContactPerson,
      CustomerContactNumber: printQuotationContactNumber,
      CustomerContactEmail: printQuotationContactEmail,
      QRefNumber: QRefNo,
      QDate: QDate,
      ClientPONo: ClientPONo,
      LeadsRefNo: LeadsRefNo
    });

    var productArray = this.productCollectionArray;
    var emptyProductArray = [];
    for (var i = 0; i < productArray.length; i++) {
      emptyProductArray.push({
        Id: productArray[i].Id,
        ProductCode: productArray[i].ProductCode,
        ProductDescription: productArray[i].ProductDescription,
        IsDiscount: productArray[i].IsDiscount,
        Price: parseFloat(productArray[i].Price.split(',').join('')),
        Quantity: parseFloat(productArray[i].Quantity.split(',').join('')),
        Amount: parseFloat(productArray[i].Amount.split(',').join(''))
      });
    }

    var paymentArray = this.quotationPaymentScheduleArray;
    var emptyPaymentArray = [];
    for (var i = 0; i < paymentArray.length; i++) {
      emptyPaymentArray.push({
        Id: paymentArray[i].Id,
        Description: paymentArray[i].Description,
        Amount: parseFloat(paymentArray[i].Amount.split(',').join('')),
        Remarks: paymentArray[i].Remarks
      });
    }

    var timelineArray = this.quotationTimeLineArray;
    var emptyTimelineArray = [];
    for (var i = 0; i < timelineArray.length; i++) {
      emptyTimelineArray.push({
        Id: timelineArray[i].Id,
        Product: timelineArray[i].Product,
        Timeline: timelineArray[i].Timeline,
        Remarks: timelineArray[i].Remarks
      });
    }

    var printQuotationArray = [];
    printQuotationArray.push({
      CustomerName: printQuotationCustomer,
      CustomerAddress: printQuotationAddress,
      CustomerContactPerson: printQuotationContactPerson,
      CustomerContactNumber: printQuotationContactNumber,
      CustomerContactEmail: printQuotationContactEmail,
      QRefNumber: QRefNo,
      QDate: QDate,
      ClientPONo: ClientPONo,
      LeadsRefNo: LeadsRefNo,
      ProdcutLists: emptyProductArray,
      PaymentLists: emptyPaymentArray,
      TimelineLists: emptyTimelineArray,
      PreparedByUser: this.quotationPrintPreparedByUserSelectedValue,
      ApprovedByUser: this.quotationPrintApprovedByUserSelectedValue
    });

    this.quotationService.printQuotationPaper(this.getIdUrlParameter(), printQuotationArray);
  }

  public timeLineTabClick() {
    setTimeout(() => {
      this.timelinecheduleData();
    }, 500);
  }

  public timelinecheduleData() {
    this.timelineCollectionView = new wijmo.collections.CollectionView(this.quotationTimeLineArray);
    this.timelineCollectionView.pageSize = 7;
    this.timelineCollectionView.trackChanges = true;
  }

  public timelineOnclick() {
    this.printTimelineQuotationString = "Add";
    this.isAddtTimeline = true;
    (<HTMLInputElement>document.getElementById("printQuotationTimeLineProduct")).value = "";
    (<HTMLInputElement>document.getElementById("printQuotationTimeLine")).value = "";
    (<HTMLInputElement>document.getElementById("printQuotationTimeLineRemarks")).value = "";

    this.printQuotationTimeLineProduct = "";
    this.printQuotationTimeLine = "";
    this.printQuotationTimeLineRemarks = "";

    let searchTerm = this.quotationProductSelectedValue;
    let index = -1;
    let len = this.quotationProductObservableArray.length;
    for (var i = 0; i < len; i++) {
      if (this.quotationProductObservableArray[i].Id === searchTerm) {
        index = i;
        break;
      }
    }

    (<HTMLInputElement>document.getElementById("printQuotationTimeLineProduct")).value = this.quotationProductObservableArray[index].Article;
  }

  public btnAddtimelineDataClick() {
    this.printQuotationTimeLineProduct = (<HTMLInputElement>document.getElementById("printQuotationTimeLineProduct")).value;
    this.printQuotationTimeLine = (<HTMLInputElement>document.getElementById("printQuotationTimeLine")).value;
    this.printQuotationTimeLineRemarks = (<HTMLInputElement>document.getElementById("printQuotationTimeLineRemarks")).value;

    if (this.isAddtTimeline) {
      this.timelineId += 1;
      this.quotationTimeLineArray.push({
        Id: this.timelineId,
        Product: this.printQuotationTimeLineProduct,
        Timeline: this.printQuotationTimeLine,
        Remarks: this.printQuotationTimeLineRemarks
      });
    } else {
      let currentSelectedPayment = this.timelineCollectionView.currentItem;
      currentSelectedPayment.Product = this.printQuotationTimeLineProduct;
      currentSelectedPayment.Timeline = this.printQuotationTimeLine;
      currentSelectedPayment.Remarks = this.printQuotationTimeLineRemarks;
    }

    this.timelinecheduleData();
    (<HTMLInputElement>document.getElementById("btntimelineCloseModal")).click();
  }

  public btnTimelineDeleteConfirmationClick() {
    let currentSelectedTimeLine = this.timelineCollectionView.currentItem;
    let searchTerm = currentSelectedTimeLine.Id;
    let index = -1;

    for (var i = 0, len = this.quotationTimeLineArray.length; i < len; i++) {
      if (this.quotationTimeLineArray[i].Id === searchTerm) {
        index = i;
        break;
      }
    }

    this.quotationTimeLineArray.splice(index, 1);
    this.timelinecheduleData();
    (<HTMLInputElement>document.getElementById("btnTimelineCloseDeleteConfirmation")).click();
  }

  public timelineEdit() {
    this.printTimelineQuotationString = "Edit";
    this.isAddtTimeline = false;
    let currentSelectedPayment = this.timelineCollectionView.currentItem;
    (<HTMLInputElement>document.getElementById("printQuotationTimeLineProduct")).value = currentSelectedPayment.Product;
    (<HTMLInputElement>document.getElementById("printQuotationTimeLine")).value = currentSelectedPayment.Timeline;
    (<HTMLInputElement>document.getElementById("printQuotationTimeLineRemarks")).value = currentSelectedPayment.Remarks;
  }

  // initialization
  public ngOnInit(): any {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.quotationPaymentScheduleArray.push({
        Id: 0,
        Description: "50% Downpayment",
        Amount: "0",
        Remarks: "Upon signing of Quote"
      });

    this.quotationPaymentScheduleArray.push({
        Id: 0,
        Description: "50% Upon Installation",
        Amount: "0",
        Remarks: " "
      });

    this.setQuotationDateValue();
  }
}
