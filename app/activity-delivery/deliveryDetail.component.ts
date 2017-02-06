import { Component, OnInit, Renderer, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeliveryService } from './delivery.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-delivery-detail',
  templateUrl: 'app/activity-delivery/deliveryDetail.html'
})

export class DeliveryDetailComponent implements OnInit {
  // global variables
  public deliveryId: number;
  public deliveryDateValue: Date;
  public deliveryQuotaionObservableArray: wijmo.collections.ObservableArray;
  public deliveryQuotaionSelectedIndex = -1;
  public deliveryCustomerObservableArray: wijmo.collections.ObservableArray;
  public deliveryCustomerSelectedIndex = -1;
  public deliveryProductObservableArray: wijmo.collections.ObservableArray;
  public deliveryProductSelectedIndex = -1;
  public deliveryMeetingDateValue: Date;
  public deliverySalesUserObservableArray: wijmo.collections.ObservableArray;
  public deliveryTechnicalUserObservableArray: wijmo.collections.ObservableArray;
  public deliveryTechnicalUserSelectedIndex = -1;
  public deliveryFunctionalUserObservableArray: wijmo.collections.ObservableArray;
  public deliveryFunctionalUserSelectedIndex = -1;
  public deliveryStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
  public deliveryStatusSelectedIndex = 0;
  public deliveryQuotaionSelectedValue: String;
  public deliveryCustomerSelectedValue: String;
  public deliveryProductSelectedValue: String;
  public deliverySalesUserSelectedValue: String;
  public deliveryTechnicalUserSelectedValue: String;
  public deliveryFunctionalUserSelectedValue: String;
  public deliveryStatusSelectedValue: String;
  public deliveryQuotationId: number;
  public deliveryCustomerId: number;
  public deliveryProductId: number;
  public deliveryRemarks: String;
  public deliveryTechnicalUserId: number;
  public deliveryFunctionalUserId: number;
  public deliveryStatus: String;
  public activityCollectionView: wijmo.collections.CollectionView;
  public activityDetailModalString: String;
  public activityId: number;
  public activityDateValue: Date;
  public activityParticularCategories = [
    'Delivery'
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
    private deliveryService: DeliveryService,
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

  // get url Id parameter
  public getIdUrlParameter() {
    this.activatedRoute.params.subscribe(params => {
      this.deliveryId = params['id'];
    });

    return this.deliveryId;
  }

  // set delivery date
  public setDeliveryDate() {
    this.deliveryDateValue = new Date();
    this.deliveryMeetingDateValue = new Date();
    this.activityDateValue = new Date();
    this.getQuotationData();
    this.getListActivity();
  }

  // list article
  public getQuotationData() {
    this.deliveryQuotaionObservableArray = this.deliveryService.getListQuotationData("deliveryDetail");
  }

  // list customer article
  public getCustomerArticleData() {
    this.deliveryCustomerObservableArray = this.deliveryService.getListArticleData("deliveryDetail", 2);
  }

  // list product article
  public getProductArticleData() {
    this.deliveryProductObservableArray = this.deliveryService.getListArticleData("deliveryDetail", 1);
  }

  // list sales user
  public getSalesUserServiceData() {
    this.deliverySalesUserObservableArray = this.deliveryService.getListUserData("deliveryDetail", "sales");
  }

  // list technical user
  public getTechnicalUserServiceData() {
    this.deliveryTechnicalUserObservableArray = this.deliveryService.getListUserData("deliveryDetail", "technical");
  }

  // list functional user
  public getFunctionalUserServiceData() {
    this.deliveryFunctionalUserObservableArray = this.deliveryService.getListUserData("deliveryDetail", "functional");
  }

  // set selected value
  public setDropdownSelectedValueData() {
    this.deliveryDateValue = new Date((<HTMLInputElement>document.getElementById("deliveryDateValue")).value.toString());
    this.deliveryQuotaionSelectedValue = (<HTMLInputElement>document.getElementById("deliveryQuotaionSelectedValue")).value.toString();
    this.deliveryCustomerSelectedValue = (<HTMLInputElement>document.getElementById("deliveryCustomerSelectedValue")).value.toString();
    this.deliveryProductSelectedValue = (<HTMLInputElement>document.getElementById("deliveryProductSelectedValue")).value.toString();
    this.deliveryMeetingDateValue = new Date((<HTMLInputElement>document.getElementById("deliveryMeetingDateValue")).value.toString());
    this.deliverySalesUserSelectedValue = (<HTMLInputElement>document.getElementById("deliverySalesUserSelectedValue")).value.toString();
    this.deliveryTechnicalUserSelectedValue = (<HTMLInputElement>document.getElementById("deliveryTechnicalUserSelectedValue")).value.toString();
    this.deliveryFunctionalUserSelectedValue = (<HTMLInputElement>document.getElementById("deliveryFunctionalUserSelectedValue")).value.toString();
    this.deliveryStatusSelectedValue = (<HTMLInputElement>document.getElementById("deliveryStatusSelectedValue")).value.toString();
    this.deliveryStatus = (<HTMLInputElement>document.getElementById("deliveryStatusSelectedValue")).value.toString();
  }

  // delivery date on value changed
  public deliveryDateOnValueChanged() {

  }

  // meeting date on value changed
  public deliveryMeetingDateOnValueChanged() {

  }

  // quotation number selected index changed
  public cboDeliveryQuotaionSelectedIndexChanged() {
    if (this.deliveryQuotaionSelectedIndex >= 0) {
      this.deliveryQuotationId = this.deliveryQuotaionObservableArray[this.deliveryQuotaionSelectedIndex].Id;
      this.deliveryCustomerSelectedValue = this.deliveryQuotaionObservableArray[this.deliveryQuotaionSelectedIndex].Customer;
      this.deliveryProductSelectedValue = this.deliveryQuotaionObservableArray[this.deliveryQuotaionSelectedIndex].Product;
    } else {
      this.deliveryQuotationId = 0;
    }
  }

  // customer selected index changed
  public cboDeliveryCustomerSelectedIndexChanged() {
    if (this.deliveryCustomerSelectedIndex >= 0) {
      this.deliveryCustomerId = this.deliveryCustomerObservableArray[this.deliveryCustomerSelectedIndex].Id;
    } else {
      this.deliveryCustomerId = 0;
    }
  }

  // product selected index changed
  public cboDeliveryProductSelectedIndexChanged() {
    if (this.deliveryProductSelectedIndex >= 0) {
      this.deliveryProductId = this.deliveryProductObservableArray[this.deliveryProductSelectedIndex].Id;
    } else {
      this.deliveryProductId = 0;
    }
  }

  // technical user selected index changed
  public cboDeliveryTechnicalUserSelectedIndexChanged() {
    if (this.deliveryTechnicalUserSelectedIndex >= 0) {
      this.deliveryTechnicalUserId = this.deliveryTechnicalUserObservableArray[this.deliveryTechnicalUserSelectedIndex].Id;
    } else {
      this.deliveryTechnicalUserId = 0;
    }
  }

  // functionl user selected index changed
  public cboDeliveryFunctionalUserSelectedIndexChanged() {
    if (this.deliveryFunctionalUserSelectedIndex >= 0) {
      this.deliveryFunctionalUserId = this.deliveryFunctionalUserObservableArray[this.deliveryFunctionalUserSelectedIndex].Id;
    } else {
      this.deliveryFunctionalUserId = 0;
    }
  }

  // status selected index changed
  public cboStatusSelectedIndexChangedClick() {
    this.deliveryStatus = this.deliveryStatusArray[this.deliveryStatusSelectedIndex];
  }

  // delivery data
  public getDeliveryServiceData() {
    this.deliveryService.getDeliveryById(this.getIdUrlParameter());
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

  // delivery data
  public getDeliveryValue() {
    let dataObject = {
      DeliveryDate: this.deliveryDateValue.toLocaleDateString(),
      QuotationId: this.deliveryQuotationId,
      CustomerId: this.deliveryCustomerId,
      ProductId: this.deliveryProductId,
      MeetingDate: this.deliveryMeetingDateValue.toLocaleDateString(),
      Remarks: (<HTMLInputElement>document.getElementById("deliveryRemarks")).value,
      TechnicalUserId: this.deliveryTechnicalUserId,
      FunctionalUserId: this.deliveryFunctionalUserId,
      DeliveryStatus: this.deliveryStatus
    }

    return dataObject;
  }

  // save delivery
  public btnSaveDeliveryDetailClick() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveDeliveryDetail")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveDeliveryDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseDeliveryDetail")).disabled = true;
    this.deliveryService.putDeliveryData(this.getIdUrlParameter(), this.getDeliveryValue(), toastr);
  }

  // activity line list
  public getListActivity() {
    this.activityCollectionView = new wijmo.collections.CollectionView(this.deliveryService.getListActivityByQuotationId(this.getIdUrlParameter()));
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
      CustomerId: this.deliveryCustomerId,
      ProductId: this.deliveryProductId,
      ParticularCategory: this.activityParticularCategorySelectedValue,
      Particulars: (<HTMLInputElement>document.getElementById("activityParticulars")).value,
      NumberOfHours: this.activityNoOfHoursSelectedValue,
      ActivityAmount: this.activityAmount,
      ActivityStatus: this.activityStatusSelectedValue,
      LeadId: "NULL",
      QuotationId: "NULL",
      DeliveryId: this.getIdUrlParameter(),
      SupportId: "NULL",
      LeadStatus: this.activityStatusSelectedValue
    }

    return activityDataObject;
  }

  // save activity
  public btnActivitySaveClick() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = true;
    if (this.activityId == 0) {
      this.deliveryService.postActivityData(this.getActivityData(), toastr);
    } else {
      this.deliveryService.putActivityData(this.activityId, this.getActivityData(), toastr);
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
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnActivityCloseDeleteConfirmation")).disabled = true;
    this.deliveryService.deleteActivityData(this.activityId, toastr);
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
    this.setDeliveryDate();
  }
}
