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
  public deliveryQuotaionSelectedValue: number;
  public deliveryMeetingDateValue: Date;
  public deliverySalesUserObservableArray: wijmo.collections.ObservableArray;
  // public deliverySalesUserSelectedValue: number;
  public deliverySalesUserSelectedValue: String;
  public deliveryTechnicalUserObservableArray: wijmo.collections.ObservableArray;
  public deliveryTechnicalUserSelectedValue: number;
  public deliveryFunctionalUserObservableArray: wijmo.collections.ObservableArray;
  public deliveryFunctionalUserSelectedValue: number;
  public deliveryStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
  public deliveryStatusSelectedValue: String;
  public deliveryRemarks: String;
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
  public activityStatus = ['OPEN', 'CLOSE', 'DONE', 'CANCELLED'];
  public activityStatusSelectedIndex = 0;
  public activityStatusSelectedValue: String;
  public activityAmount: String;
  public isFinishLoading = false;
  public isLoading = true;
  public productCollectionView: wijmo.collections.CollectionView;
  public productCollectionArray = new wijmo.collections.ObservableArray();
  public printDeliveryProductDescription: String;
  public productId: number = 0;
  public printProductDeliveryString: String;
  public isAddProduct: Boolean;
  public checkListCollectionView: wijmo.collections.CollectionView;
  public checkListCollectionArray = new wijmo.collections.ObservableArray();
  public checkListDescription: String;
  public checkListId: number = 0;
  public printCheckListString: String;
  public isAddCheckList: Boolean;
  public deliveryPrintPreparedByUserObservableArray = new wijmo.collections.ObservableArray();
  public deliveryPrintPreparedBySelectedValue: String;
  public deliveryPrintSalesUserObservableArray = new wijmo.collections.ObservableArray();
  public deliveryPrintSalesUserSelectedValue: String;
  public deliveryPrintTechnicalUserSelectedValue: String;
  public deliveryPrintFunctionalUserSelectedValue: String;

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

  public finishedLoad() {
    this.isFinishLoading = true;
    this.isLoading = false;
    (<HTMLButtonElement>document.getElementById("btnSaveDeliveryDetail")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnPrintDeliveryDetail")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnCloseDeliveryDetail")).disabled = false;
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
    this.getListActivity(false);
    (<HTMLButtonElement>document.getElementById("btnSaveDeliveryDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnPrintDeliveryDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseDeliveryDetail")).disabled = true;

    var checkListArray = [
      "Hardware and Infrastructure (c/o customer)",
      "List of Items in XLS",
      "List of Customer in XLS",
      "List of Supplier in XLS",
      "List of Users that needed to be trained"
    ];

    for (var i = 0; i < checkListArray.length; i++) {
      this.checkListCollectionArray.push({
        checkListDescription: checkListArray[i]
      })
    }
  }

  // list article
  public getQuotationData() {
    this.deliveryQuotaionObservableArray = this.deliveryService.getListQuotationData("deliveryDetail");
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
    this.deliveryQuotaionSelectedValue = parseInt((<HTMLInputElement>document.getElementById("deliveryQuotaionSelectedValue")).value.toString());
    this.deliveryMeetingDateValue = new Date((<HTMLInputElement>document.getElementById("deliveryMeetingDateValue")).value.toString());
    // this.deliverySalesUserSelectedValue =  parseInt((<HTMLInputElement>document.getElementById("deliverySalesUserSelectedValue")).value.toString());
    this.deliveryTechnicalUserSelectedValue = parseInt((<HTMLInputElement>document.getElementById("deliveryTechnicalUserSelectedValue")).value.toString());
    this.deliveryFunctionalUserSelectedValue = parseInt((<HTMLInputElement>document.getElementById("deliveryFunctionalUserSelectedValue")).value.toString());
    this.deliveryStatusSelectedValue = (<HTMLInputElement>document.getElementById("deliveryStatusSelectedValue")).value.toString();
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
      QuotationId: this.deliveryQuotaionSelectedValue,
      MeetingDate: this.deliveryMeetingDateValue.toLocaleDateString(),
      Remarks: (<HTMLInputElement>document.getElementById("deliveryRemarks")).value,
      TechnicalUserId: this.deliveryTechnicalUserSelectedValue,
      FunctionalUserId: this.deliveryFunctionalUserSelectedValue,
      DeliveryStatus: this.deliveryStatusSelectedValue
    }

    return dataObject;
  }

  // save delivery
  public btnSaveDeliveryDetailClick() {
    this.startLoading();
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnSaveDeliveryDetail")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
    (<HTMLButtonElement>document.getElementById("btnSaveDeliveryDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnPrintDeliveryDetail")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnCloseDeliveryDetail")).disabled = true;
    this.deliveryService.putDeliveryData(this.getIdUrlParameter(), this.getDeliveryValue(), toastr);
  }

  // activity line list
  public getListActivity(isLoadActivityOnly: Boolean) {
    this.activityCollectionView = new wijmo.collections.CollectionView(this.deliveryService.getListActivityByQuotationId(this.getIdUrlParameter(), isLoadActivityOnly));
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
      DeliveryId: this.getIdUrlParameter(),
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
    let toastr: ToastsManager;
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
    (<HTMLButtonElement>document.getElementById("btnActivityDeleteConfirmation")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnActivityCloseDeleteConfirmation")).disabled = true;
    this.deliveryService.deleteActivityData(this.activityId, toastr);
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

  public backClicked() {
    window.history.back();
  }

  public productOnclick() {
    this.printProductDeliveryString = "Add";
    this.isAddProduct = true;
  }

  public btnAddProductDataClick() {
    this.printDeliveryProductDescription = (<HTMLInputElement>document.getElementById("printDeliveryProductDescription")).value;

    if (this.isAddProduct) {
      this.productId += 1;
      this.productCollectionArray.push({
        Id: this.productId,
        ProductDescription: this.printDeliveryProductDescription
      });
    } else {
      let currentSelectedProduct = this.productCollectionView.currentItem;
      currentSelectedProduct.ProductDescription = this.printDeliveryProductDescription;
    }

    this.productProductData();
    (<HTMLInputElement>document.getElementById("btnProductCloseModal")).click();
  }

  public productEdit() {
    this.printProductDeliveryString = "Edit";
    this.isAddProduct = false;
    let currentSelectedProduct = this.productCollectionView.currentItem;
    (<HTMLInputElement>document.getElementById("printDeliveryProductDescription")).value = currentSelectedProduct.ProductDescription;
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

  public productTabClick() {
    setTimeout(() => {
      this.productProductData();
    }, 500);
  }

  public productProductData() {
    this.productCollectionView = new wijmo.collections.CollectionView(this.productCollectionArray);
    this.productCollectionView.pageSize = 7;
    this.productCollectionView.trackChanges = true;
  }

  // =====================================

  public checkListOnclick() {
    this.printCheckListString = "Add";
    this.isAddCheckList = true;
    (<HTMLInputElement>document.getElementById("printdeliveryCheckListDescription")).value = "";
  }

  public btnAddCheckListDataClick() {
    this.checkListDescription = (<HTMLInputElement>document.getElementById("printdeliveryCheckListDescription")).value;

    if (this.isAddCheckList) {
      this.checkListId += 1;
      this.checkListCollectionArray.push({
        Id: this.checkListId,
        checkListDescription: this.checkListDescription
      });
    } else {
      let currentSelectedCheckList = this.checkListCollectionView.currentItem;
      currentSelectedCheckList.checkListDescription = this.checkListDescription;
    }

    this.checkListData();
    (<HTMLInputElement>document.getElementById("btnCheckListCloseModal")).click();
  }

  public checkListEdit() {
    this.printCheckListString = "Edit";
    this.isAddCheckList = false;
    let currentSelectedCheckList = this.checkListCollectionView.currentItem;
    (<HTMLInputElement>document.getElementById("printdeliveryCheckListDescription")).value = currentSelectedCheckList.checkListDescription;
  }

  public btnCheckListDeleteConfirmationClick() {
    let currentSelectedCheckList = this.checkListCollectionView.currentItem;
    let searchTerm = currentSelectedCheckList.Id;
    let index = -1;

    for (var i = 0, len = this.checkListCollectionArray.length; i < len; i++) {
      if (this.checkListCollectionArray[i].Id === searchTerm) {
        index = i;
        break;
      }
    }

    this.checkListCollectionArray.splice(index, 1);
    this.checkListData();
    (<HTMLInputElement>document.getElementById("btnCheckListCloseDeleteConfirmation")).click();
  }

  public checkListTabClick() {
    setTimeout(() => {
      this.checkListData();
    }, 500);
  }

  public checkListData() {
    this.checkListCollectionView = new wijmo.collections.CollectionView(this.checkListCollectionArray);
    this.checkListCollectionView.pageSize = 7;
    this.checkListCollectionView.trackChanges = true;
  }

  // print delivery detail
  public btnPrintDeliveryDetailClick() {
    this.deliveryPrintPreparedByUserObservableArray = this.deliveryService.getListUserData("quotationDetail", "");
    this.deliveryPrintSalesUserObservableArray = this.deliveryService.getListUserData("quotationDetail", "");

    let searchTerm = this.deliveryFunctionalUserSelectedValue;
    let index = -1;
    for (var i = 0, len = this.deliveryFunctionalUserObservableArray.length; i < len; i++) {
      if (this.deliveryFunctionalUserObservableArray[i].Id === searchTerm) {
        index = i;
        break;
      }
    }

    (<HTMLInputElement>document.getElementById("deliveryPrintUserFunctional")).value = this.deliveryFunctionalUserObservableArray[index].FullName;

    let searchTermTechnical = this.deliveryTechnicalUserSelectedValue;
    let indexTechnical = -1;
    for (var i = 0, len = this.deliveryTechnicalUserObservableArray.length; i < len; i++) {
      if (this.deliveryTechnicalUserObservableArray[i].Id === searchTermTechnical) {
        indexTechnical = i;
        break;
      }
    }

    (<HTMLInputElement>document.getElementById("deliveryPrintUserTechnical")).value = this.deliveryTechnicalUserObservableArray[indexTechnical].FullName;
  }

  public btnPrintDeliveryClick() {
    var ISFormNumber = (<HTMLInputElement>document.getElementById("printDeliveryInnosoftFormNo")).value;
    var Customer = (<HTMLInputElement>document.getElementById("printDeliveryCustomer")).value;
    var CustomerPhoneNumber = (<HTMLInputElement>document.getElementById("printDeliveryPhoneNumber")).value;
    var CustomerAddress = (<HTMLInputElement>document.getElementById("printDeliveryAddress")).value;
    var DocumentNumber = (<HTMLInputElement>document.getElementById("printDeliveryDocumentNo")).value;
    var ContactPerson = (<HTMLInputElement>document.getElementById("pprintDeliveryContactPerson")).value;
    var ContactPersonPhoneNumber = (<HTMLInputElement>document.getElementById("printDeliveryContactPersonPhoneNumber")).value;
    // var ContactPersonAddress = (<HTMLInputElement>document.getElementById("printDeliveryContactPersonAddress")).value;
    var Particulars = (<HTMLInputElement>document.getElementById("printDeliveryParticulars")).value;
    var PreparedByUser = this.deliveryPrintPreparedBySelectedValue;
    var SalesUser = this.deliveryPrintSalesUserSelectedValue;
    var TechnicalUser = (<HTMLInputElement>document.getElementById("deliveryPrintUserTechnical")).value;
    var FunctionalUser = (<HTMLInputElement>document.getElementById("deliveryPrintUserFunctional")).value;
    var CustomerUser = (<HTMLInputElement>document.getElementById("deliveryPrintUserCustomer")).value;
    var KickOffDeliveryDate = (<HTMLInputElement>document.getElementById("printDeliveryDate")).value;

    var productArray = this.productCollectionArray;
    var emptyProductArray = [];
    for (var i = 0; i < productArray.length; i++) {
      emptyProductArray.push({
        Id: productArray[i].Id,
        ProductDescription: productArray[i].ProductDescription
      });
    }

    var checkListArray = this.checkListCollectionArray;
    var emptyCheckListArray = [];
    for (var i = 0; i < checkListArray.length; i++) {
      emptyCheckListArray.push({
        Id: checkListArray[i].Id,
        CheckListDescription: checkListArray[i].checkListDescription
      });
    }

    var printDeliveryArray = [];
    printDeliveryArray.push({
      ISFormNumber: ISFormNumber,
      Customer: Customer,
      CustomerPhoneNumber: CustomerPhoneNumber,
      CustomerAddress: CustomerAddress,
      DocumentNumber: DocumentNumber,
      ContactPerson: ContactPerson,
      ContactPersonPhoneNumber: ContactPersonPhoneNumber,
      ProductLists: emptyProductArray,
      Particulars: Particulars,
      CheckLists: emptyCheckListArray,
      PreparedByUser: PreparedByUser,
      SalesUser: SalesUser,
      TechnicalUser: TechnicalUser,
      FunctionalUser: FunctionalUser,
      CustomerUser: CustomerUser,
      KickOffDeliveryDate: KickOffDeliveryDate
    });

    this.deliveryService.printDeliveryPaper(this.getIdUrlParameter(), printDeliveryArray);
  }

  // initialization
  public ngOnInit(): any {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }
    this.setDeliveryDate();
  }
}
