import { Component, OnInit, Renderer, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuotationService } from './quotation.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'my-quotation-detail',
  templateUrl: 'app/quotation/quotationDetail.html'
})

export class QuotationDetailComponent implements OnInit {
  // global variable
  public quotationId: number;
  public quotationDateValue: Date;
  public isQuotationDateSelected = true;
  public quotationLeadObservableArray: wijmo.collections.ObservableArray;
  public quotationLeadSelectedIndex = -1;
  public quotationLeadSelectedValue: String;
  public quotationLeadId: number;
  public quotationCustomerObservableArray: wijmo.collections.ObservableArray;
  public quotationCustomerSelectedIndex = -1;
  public quotationCustomerSelectedValue: String;
  public quotationCustomerId: number;
  public quotationProductObservableArray: wijmo.collections.ObservableArray;
  public quotationProductSelectedIndex = -1;
  public quotationProductSelectedValue: String;
  public quotationProductId: number;
  public quotationEncodedUserObservableArray: wijmo.collections.ObservableArray;
  public quotationEncodedBySelectedIndex = -1;
  public quotationEncodedBySelectedValue: String;
  public quotationEncodedByUserId: number;
  public quotationStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
  public quotationStatusSelectedIndex = -1;
  public quotationStatusSelectedValue: String;
  public quotationStatus: String;
  public activityCollectionView: wijmo.collections.CollectionView;
  public activityDetailModalString: String;
  public activityId: number;
  public activityDateValue: Date;
  public activityParticularCategories = [
    'New Installation',
    'Software Bug',
    'Data Tracing',
    'New Feature',
    'Data Tracing',
    'Hardware or Infrastructure Problem',
    'Retraining',
    'Reinstallation',
    'Progam Update',
    'Data Archive'
  ];
  public activityParticularCategorySelectedIndex = 0;
  public activityParticularCategorySelectedValue: String;
  public activityNoOfHours = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];
  public activityNoOfHoursSelectedIndex = 0;
  public activityNoOfHoursSelectedValue: String;
  public activityStatus = ['Open', 'Close', 'Cancelled'];
  public activityStatusSelectedIndex = 0;
  public activityStatusSelectedValue: String;
  public activityAmount: String;

  // inject quotation detail service
  constructor(
    private quotationService: QuotationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer,
    private elementRef: ElementRef,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef,
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  // set selected value for drop down
  public setDropdownSelectedValueData() {
    this.quotationDateValue = new Date((<HTMLInputElement>document.getElementById("quotationDateValue")).value.toString());
    this.quotationLeadSelectedValue = (<HTMLInputElement>document.getElementById("quotationLeadSelectedValue")).value.toString();
    this.quotationCustomerSelectedValue = (<HTMLInputElement>document.getElementById("quotationCustomerSelectedValue")).value.toString();
    this.quotationProductSelectedValue = (<HTMLInputElement>document.getElementById("quotationProductSelectedValue")).value.toString();
    this.quotationEncodedBySelectedValue = (<HTMLInputElement>document.getElementById("quotationEncodedBySelectedValue")).value.toString();
    this.quotationStatusSelectedValue = (<HTMLInputElement>document.getElementById("quotationStatusSelectedValue")).value.toString();
    this.quotationStatus = this.quotationStatusSelectedValue;
  }

  // quotation date value
  public setQuotationDateValue() {
    this.quotationDateValue = new Date();
    this.activityDateValue = new Date();
    this.getLeadServiceData();
    this.getListActivity();
  }

  // list lead
  public getLeadServiceData() {
    this.quotationLeadObservableArray = this.quotationService.getListLeadData("quotationDetail");
  }

  // list article
  public getArticleData() {
    this.quotationCustomerObservableArray = this.quotationService.getListArticleData("quotationDetail", 2);
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

  // quotation lead selected index changed
  public cboQuotationLeadSelectedIndexChanged() {
    if (this.quotationLeadSelectedIndex >= 0) {
      this.quotationLeadId = this.quotationLeadObservableArray[this.quotationLeadSelectedIndex].Id;
    } else {
      this.quotationLeadId = 0;
    }
  }

  // quotation customer selected index changed
  public cboQuotationCustomerSelectedIndexChangedClick() {
    if (this.quotationCustomerSelectedIndex >= 0) {
      this.quotationCustomerId = this.quotationCustomerObservableArray[this.quotationCustomerSelectedIndex].Id;
    } else {
      this.quotationCustomerId = 0;
    }
  }

  // quotation product selected index changed
  public cboQuotationProductSelectedIndexChangedClick() {
    if (this.quotationProductSelectedIndex >= 0) {
      this.quotationProductId = this.quotationProductObservableArray[this.quotationProductSelectedIndex].Id;
    } else {
      this.quotationProductId = 0;
    }
  }

  // quotation user selected index changed
  public cboquotationEncodedBySelectedIndexChangedClick() {
    if (this.quotationEncodedBySelectedIndex >= 0) {
      this.quotationEncodedByUserId = this.quotationEncodedUserObservableArray[this.quotationEncodedBySelectedIndex].Id;
    } else {
      this.quotationEncodedByUserId = 0;
    }
  }

  // quotation status selected index changed
  public cboQuotationStatusSelectedIndexChangedClick() {
    this.quotationStatus = this.quotationStatusArray[this.quotationStatusSelectedIndex];
  }

  // quotation data
  public getQuotationValue() {
    let dataObject = {
      QuotationDate: this.quotationDateValue.toLocaleDateString(),
      LeadId: this.quotationLeadId,
      CustomerId: this.quotationCustomerId,
      ProductId: this.quotationProductId,
      Remarks: (<HTMLInputElement>document.getElementById("quotationRemarks")).value,
      QuotationStatus: this.quotationStatus
    }

    return dataObject;
  }

  // save quotation detail
  public btnSaveQuotationDetailClick() {
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveQuotationDetail")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveQuotationDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseQuotationDetail")).disabled = true;
    this.quotationService.putQuotationData(this.getIdUrlParameter(), this.getQuotationValue(), toastr);
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

  // activity line list
  public getListActivity() {
    this.activityCollectionView = new wijmo.collections.CollectionView(this.quotationService.getListActivityByQuotationId(this.getIdUrlParameter()));
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
      CustomerId: this.quotationCustomerId,
      ProductId: this.quotationProductId,
      ParticularCategory: this.activityParticularCategorySelectedValue,
      Particulars: (<HTMLInputElement>document.getElementById("activityParticulars")).value,
      NumberOfHours: this.activityNoOfHoursSelectedValue,
      ActivityAmount: this.activityAmount,
      ActivityStatus: this.activityStatusSelectedValue,
      LeadId: "NULL",
      QuotationId: this.getIdUrlParameter(),
      DeliveryId: "NULL",
      SupportId: "NULL",
      LeadStatus: this.activityStatusSelectedValue
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
    window.open('http://localhost:22626/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
  }

  // initialization
  public ngOnInit(): any {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }
    this.setQuotationDateValue();
  }
}
