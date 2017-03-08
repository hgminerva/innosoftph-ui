import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from './activity.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import * as wjGrid from 'wijmo/wijmo.grid';

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
  public documentArray = ['Lead', 'Quotation', 'Delivery', 'Support', 'Support - Technical', 'Support - Functional', 'Software Development'];
  public documentSelectedValue = 'Lead';
  public activityCollectionView: wijmo.collections.CollectionView;
  public activityFilter = '';
  public activityToFilter: any;
  public activityDetailModalString: String;
  public activityId: number;
  public activityDateValue: Date;
  public activityParticularCategories = [''];
  public activityParticularCategorySelectedIndex = 0;
  public activityParticularCategorySelectedValue: String;
  public activityNoOfHours = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];
  public activityNoOfHoursSelectedValue: String;
  public activityStatus = ['OPEN', 'CLOSE', 'DONE', 'WAITING FOR CLIENT', 'CANCELLED'];
  public activityStatusSelectedValue: String;
  public activityAmount: String;
  public hasNoActivity = false;
  public hasActivity = true;
  public activityStatusesArray = ['ALL', 'OPEN', 'CLOSE', 'DONE', 'WAITING FOR CLIENT', 'CANCELLED'];
  public activityStatusesSelectedValue = "OPEN";
  public isStartDateClicked = false;
  public isEndDateClicked = false;
  public isActivityDocumentClicked = false;
  public activityAssignedUserObservableArray: wijmo.collections.ObservableArray;
  public activityAssignedToSelectedValue: number;
  public isSupport = false;
  public isFinishLoading = false;
  public isLoading = true;
  public activityStatusClicked = false;
  public isActivityStatusSelected = false;
  public isAcitivtyDocumentSelected = false;

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

  public activityStatusesSelectedIndexChangedClick() {
    if (this.activityStatusClicked) {
      if (this.isActivityStatusSelected) {
        this.startLoading();
        this.getActivityData();
      }
      else {
        this.isActivityStatusSelected = true;
      }
    }
    else {
      this.activityStatusClicked = true;
    }
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
    this.startLoading();
    this.activityStartDateValue = new Date();
    this.activityEndDateValue = new Date();
    this.activityDateValue = new Date();
    this.getListActivity();
  }

  public getAssignedUser() {
    this.activityAssignedUserObservableArray = this.activityService.getListUserData();
  }

  public activityStartDateOnValueChanged() {
    if (!this.isActivtyStartDateSelected) {
      if (this.isStartDateClicked) {
        this.startLoading();
        this.getActivityData();
      }
      else {
        this.isStartDateClicked = true;
      }
    } else {
      this.isActivtyStartDateSelected = false;
    }
  }

  public activityEndDateOnValueChanged() {
    if (!this.isActivtyEndDateSelected) {
      if (this.isEndDateClicked) {
        this.startLoading();
        this.getActivityData();
      }
      else {
        this.isEndDateClicked = true;
      }
    } else {
      this.isActivtyEndDateSelected = false;
    }
  }

  public finishedLoad() {
    this.isFinishLoading = true;
    this.isLoading = false;
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
    (<HTMLButtonElement>document.getElementById("btnActivitySave")).disabled = false;
    (<HTMLButtonElement>document.getElementById("btnActivityClose")).disabled = false;
  }

  public cboDocumentSelectedIndexChangedClick() {
    if (this.isActivityDocumentClicked) {
      this.startLoading();
      this.getActivityData();
      // if (this.isAcitivtyDocumentSelected) {

      // }
      // else {
      //   this.isAcitivtyDocumentSelected = true;
      // }
    }
    else {
      this.isActivityDocumentClicked = true;
    }
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
    this.startLoading();
    this.activityCollectionView = new wijmo.collections.CollectionView(this.activityService.getListActivityData(this.documentSelectedValue, this.activityStartDateValue, this.activityEndDateValue, this.activityStatusesSelectedValue));
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
        (item.EncodedBy.toLowerCase().indexOf(this.activityFilter.toLowerCase()) > -1) ||
        (item.HeaderStatus.toLowerCase().indexOf(this.activityFilter.toLowerCase()) > -1) ||
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

    let currentSelectedActivity = this.activityCollectionView.currentItem;
    if (currentSelectedActivity.LeadId > 0) {
      this.isSupport = false;
      this.activityParticularCategories = ['Lead'];
      this.activityStatus = ['OPEN', 'CLOSE', 'CANCELLED'];
    } else {
      if (currentSelectedActivity.QuotationId > 0) {
        this.isSupport = false;
        this.activityParticularCategories = ['Quotation'];
        this.activityStatus = ['OPEN', 'CLOSE', 'CANCELLED'];
      } else {
        if (currentSelectedActivity.DeliveryId > 0) {
          this.isSupport = false;
          this.activityParticularCategories = ['Delivery'];
          this.activityStatus = ['OPEN', 'CLOSE', 'DONE', 'CANCELLED'];
        } else {
          if (currentSelectedActivity.SupportId > 0) {
            this.isSupport = true;
            this.activityParticularCategories = [
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
            this.activityStatus = ['OPEN', 'CLOSE', 'DONE', 'WAITING FOR CLIENT', 'CANCELLED'];
          } else {
            if (currentSelectedActivity.SoftwareDevelopmentId > 0) {
              this.isSupport = false;
              this.activityParticularCategories = [
                'Report',
                'Form',
                'Query',
                'Module',
                'Others'
              ];
              this.activityStatus = ['OPEN', 'CLOSE', 'DONE', 'CANCELLED'];
            } else {
              this.activityParticularCategories = [''];
              this.activityStatus = [''];
            }
          }
        }
      }
    }

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
          this.activityAssignedToSelectedValue = currentSelectedActivity.StaffUserId;
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

    let softwareDevelopmentId = "NULL";
    if (currentSelectedActivity.SoftwareDevelopmentId > 0) {
      softwareDevelopmentId = currentSelectedActivity.SoftwareDevelopmentId;
    }

    let activityDataObject = {
      ActivityDate: this.activityDateValue.toLocaleDateString(),
      StaffUserId: this.activityAssignedToSelectedValue,
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
      SoftwareDevelopmentId: softwareDevelopmentId,
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
            if (currentSelectedActivity.SoftwareDevelopmentId > 0) {
              this.startLoading()
              this.router.navigate(['/softwareDevelopmentDetail', currentSelectedActivity.SoftwareDevelopmentId]);
            } else {
              this.toastr.error('', 'No Document');
            }
          }
        }
      }
    }
  }

  // refresh grid
  public refreshGrid() {
    this.startLoading();
    (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
    this.getActivityData();
  }

  // show menu
  public showMenu() {
    document.getElementById("showTop").click();
  }

  public backClicked() {
    window.history.back();
  }

  // init(s: wjGrid.FlexGrid) {
  //   s.rows.defaultSize = 100;
  // }

  // initialization
  ngOnInit() {
    this.setActivityDateRanged();
  }
}
