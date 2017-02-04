import { Component, OnInit, Renderer, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SupportService } from './support.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-activity-support-detail',
  templateUrl: 'app/activity-support/supportDetail.html'
})

export class SupportDetailComponent implements OnInit {
  // global variables
  public supportId: number;
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

  // inject lead detail service
  constructor(
    private supportService: SupportService,
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

  // lead date ranged
  public setContinuityDateValue() {
    this.activityDateValue = new Date();
    this.getListActivity();
  }

  // get url Id parameter
  public getIdUrlParameter() {
    this.activatedRoute.params.subscribe(params => {
      this.supportId = params['id'];
    });

    return this.supportId;
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
    this.activityCollectionView = new wijmo.collections.CollectionView(this.supportService.getListActivityBySupportId(this.getIdUrlParameter()));
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
      this.activityStatusSelectedValue = "Open";
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
      CustomerId: "NULL",
      ProductId: "NULL",
      ParticularCategory: this.activityParticularCategorySelectedValue,
      Particulars: (<HTMLInputElement>document.getElementById("activityParticulars")).value,
      NumberOfHours: this.activityNoOfHoursSelectedValue,
      ActivityAmount: this.activityAmount,
      ActivityStatus: this.activityStatusSelectedValue,
      LeadId: "NULL",
      QuotationId: "NULL",
      DeliveryId: "NULL",
      SupportId: this.getIdUrlParameter(),
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
      this.supportService.postActivityData(this.getActivityData(), toastr);
    } else {
      this.supportService.putActivityData(this.activityId, this.getActivityData(), toastr);
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
    this.supportService.deleteActivityData(this.activityId, toastr);
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
    this.setContinuityDateValue();
  }
}
