import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from './activity.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-activity',
  templateUrl: 'app/activity/activity.html'
})

export class ActivityComponent implements OnInit {
  // global variables
  public activityStartDateValue: Date;
  public isActivtyStartDateSelected = true;
  public activityEndDateValue: Date;
  public isActivtyEndDateSelected = true;
  public documentArray = ['Lead', 'Quotation', 'Delivery', 'Support'];
  public documentSelectedValue = 'Lead';
  public activityCollectionView: wijmo.collections.CollectionView;
  public activityFilter = '';
  public activityToFilter: any;
  public activityDetailModalString: String;
  public activityId: number;
  public activityDateValue: Date;
  public activityParticularCategories = [
    'Lead',
    'Quotation',
    'Delivery',
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
  public activityNoOfHoursSelectedValue: String;
  public activityStatus = ['OPEN', 'CLOSE', 'CANCELLED'];
  public activityStatusSelectedValue: String;
  public activityAmount: String;
  public hasNoActivity = false;
  public hasActivity = true;

  // inject lead service
  constructor(
    private activityService: ActivityService,
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

  public setActivityDateRanged() {
    this.activityStartDateValue = new Date();
    this.activityEndDateValue = new Date();
    this.activityDateValue = new Date();
    this.getListActivity();
  }

  public activityStartDateOnValueChanged() {
    if (!this.isActivtyStartDateSelected) {
      this.getActivityData();
    } else {
      this.isActivtyStartDateSelected = false;
    }
  }

  public activityEndDateOnValueChanged() {
    if (!this.isActivtyEndDateSelected) {
      this.getActivityData();
    } else {
      this.isActivtyEndDateSelected = false;
    }
  }

  public cboDocumentSelectedIndexChangedClick() {
    this.getActivityData();
  }

  // list activity
  public getListActivity() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.getActivityData();
  }

  // activity service data
  public getActivityData() {
    document.getElementById("btn-hidden-start-loading").click();
    this.activityCollectionView = new wijmo.collections.CollectionView(this.activityService.getListActivityData(this.documentSelectedValue, this.activityStartDateValue, this.activityEndDateValue));
    this.activityCollectionView.filter = this.filterFunction.bind(this);
    this.activityCollectionView.pageSize = 15;
    this.activityCollectionView.trackChanges = true;
  }

  // filter
  get filter(): string {
    return this.activityFilter;
  }

  // filter
  set filter(value: string) {
    if (this.activityFilter != value) {
      this.activityFilter = value;

      if (this.activityToFilter) {
        clearTimeout(this.activityToFilter);
      }

      var self = this;
      this.activityToFilter = setTimeout(function () {
        self.activityCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.activityFilter) {
      return (item.Document.toLowerCase().indexOf(this.activityFilter.toLowerCase()) > -1) ||
        (item.Particulars.toLowerCase().indexOf(this.activityFilter.toLowerCase()) > -1) ||
        (item.Activity.toLowerCase().indexOf(this.activityFilter.toLowerCase()) > -1) ||
        (item.StaffUser.toLowerCase().indexOf(this.activityFilter.toLowerCase()) > -1);
    }

    return true;
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

  // activity line detail modal  
  public btnActivityDetailModal(add: boolean) {
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = false;

    if (add) {
      this.hasNoActivity = false;
      this.hasActivity = true;
      setTimeout(() => {
        this.activityDetailModalString = "Add";
        this.activityId = 0;
        this.activityDateValue = new Date();
        this.activityParticularCategorySelectedValue = "New Installation";
        (<HTMLInputElement>document.getElementById("activityParticulars")).value = "";
        this.activityNoOfHoursSelectedValue = "0";
        (<HTMLInputElement>document.getElementById("activityAmount")).value = "0";
        this.activityAmount = "0";
        this.activityStatusSelectedValue = "OPEN";
      }, 200);
    } else {
      let currentSelectedActivity = this.activityCollectionView.currentItem;
      if (currentSelectedActivity.Id > 0) {
        this.hasNoActivity = false;
        this.hasActivity = true;
        setTimeout(() => {
          this.activityDetailModalString = "Edit";
          this.activityId = currentSelectedActivity.Id;
          this.activityDateValue = new Date(currentSelectedActivity.ActivityDate);
          this.activityParticularCategorySelectedValue = currentSelectedActivity.ParticularCategory;
          (<HTMLInputElement>document.getElementById("activityParticulars")).value = currentSelectedActivity.Activity;
          this.activityNoOfHoursSelectedValue = currentSelectedActivity.NumberOfHours;
          (<HTMLInputElement>document.getElementById("activityAmount")).value = currentSelectedActivity.ActivityAmount.toLocaleString();
          this.activityAmount = currentSelectedActivity.ActivityAmount.toLocaleString();
          this.activityStatusSelectedValue = currentSelectedActivity.ActivityStatus;
        }, 200);
      } else {
        this.hasNoActivity = true;
        this.hasActivity = false;
        (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = true;
      }
    }
  }

  // get activity data
  public getActivityDataValue() {
    let currentSelectedActivity = this.activityCollectionView.currentItem;

    let customerId = "NULL";
    if (currentSelectedActivity.CustomerId > 0) {
      customerId = currentSelectedActivity.CustomerId;
    }

    let productId = "NULL";
    if (currentSelectedActivity.ProductId > 0) {
      productId = currentSelectedActivity.ProductId;
    }

    let leadId = "NULL";
    if (currentSelectedActivity.LeadId > 0) {
      leadId = currentSelectedActivity.LeadId;
    }

    let quotationId = "NULL";
    if (currentSelectedActivity.QuotationId > 0) {
      quotationId = currentSelectedActivity.QuotationId;
    }

    let deliveryId = "NULL";
    if (currentSelectedActivity.DeliveryId > 0) {
      deliveryId = currentSelectedActivity.DeliveryId;
    }

    let supportId = "NULL";
    if (currentSelectedActivity.SupportId > 0) {
      supportId = currentSelectedActivity.SupportId;
    }

    let activityDataObject = {
      ActivityDate: this.activityDateValue.toLocaleDateString(),
      CustomerId: customerId,
      ProductId: productId,
      ParticularCategory: this.activityParticularCategorySelectedValue,
      Particulars: (<HTMLInputElement>document.getElementById("activityParticulars")).value,
      NumberOfHours: this.activityNoOfHoursSelectedValue,
      ActivityAmount: this.activityAmount,
      ActivityStatus: this.activityStatusSelectedValue,
      LeadId: leadId,
      QuotationId: quotationId,
      DeliveryId: deliveryId,
      SupportId: supportId,
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
      this.activityService.postActivityData(this.getActivityDataValue(), toastr);
    } else {
      this.activityService.putActivityData(this.activityId, this.getActivityDataValue(), toastr);
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
    this.activityService.deleteActivityData(this.activityId, toastr);
  }

  // print
  public btnActivityPrintClick() {
    let toastr: ToastsManager;
    let currentSelectedActivity = this.activityCollectionView.currentItem;
    if (currentSelectedActivity.Id > 0) {
      window.open('http://api.innosoft.ph/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
    } else {
      this.toastr.error('', 'No activity to print');
    }
  }

  // document
  public btnDocumentClick() {
    let currentSelectedActivity = this.activityCollectionView.currentItem;
    if (currentSelectedActivity.LeadId > 0) {
      this.startLoading()
      this.router.navigate(['/leadDetail', currentSelectedActivity.LeadId]);
    } else {
      if (currentSelectedActivity.QuotationId > 0) {
        this.startLoading()
        this.router.navigate(['/quotationDetail', currentSelectedActivity.QuotationId]);
      } else {
        if (currentSelectedActivity.DeliveryId > 0) {
          this.startLoading()
          this.router.navigate(['/deliveryDetail', currentSelectedActivity.DeliveryId]);
        } else {
          if (currentSelectedActivity.SupportId > 0) {
            this.startLoading()
            this.router.navigate(['/supportDetail', currentSelectedActivity.SupportId]);
          } else {
            this.toastr.error('', 'No Document');
          }
        }
      }
    }
  }

  // initialization
  ngOnInit() {
    this.setActivityDateRanged();
  }
}
