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
    (<HTMLInputElement>document.getElementById("activityAmount")).value = "";
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("activityAmount")).value = this.activityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }, 100);
  }

  public onBlurOnlyDecimalNumberKeyForPrintQuotation() {
    (<HTMLInputElement>document.getElementById("quotationPrintAmount")).value = "";
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("quotationPrintAmount")).value = this.quotationPrintAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
    (<HTMLInputElement>document.getElementById("printQuotationCustomer")).value = this.quotationCustomerObservableArray[i].Article;
    (<HTMLInputElement>document.getElementById("printQuotationAddress")).value = this.quotationCustomerObservableArray[i].Address;
    (<HTMLInputElement>document.getElementById("printQuotationContactPerson")).value = this.quotationCustomerObservableArray[i].ContactPerson;
    (<HTMLInputElement>document.getElementById("printQuotationContactNumber")).value = this.quotationCustomerObservableArray[i].ContactNumber;
    (<HTMLInputElement>document.getElementById("printQuotationContactEmail")).value = this.quotationCustomerObservableArray[i].EmailAddress;
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

  // initialization
  public ngOnInit(): any {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.setQuotationDateValue();
  }
}
