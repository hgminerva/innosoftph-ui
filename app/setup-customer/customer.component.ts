import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from './customer.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { CsvService } from "angular2-json2csv";

@Component({
  selector: 'my-customer',
  templateUrl: 'app/setup-customer/customer.html'
})

export class CustomerComponent implements OnInit {
  // global variables
  public customerCollectionView: wijmo.collections.CollectionView;
  public customerFilter = '';
  public customerToFilter: any;

  // constructor
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef,
    private slimLoadingBarService: SlimLoadingBarService,
    private csvService: CsvService
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

  // list customer
  public getListCustomer() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.getCustomerData();
  }

  public getCustomerData() {
    let toastr: ToastsManager;
    this.customerCollectionView = new wijmo.collections.CollectionView(this.customerService.getListCustomerData(toastr));
    this.customerCollectionView.filter = this.filterFunction.bind(this);
    this.customerCollectionView.pageSize = 15;
    this.customerCollectionView.trackChanges = true;
  }

  // filter
  get filter(): string {
    return this.customerFilter;
  }

  // filter
  set filter(value: string) {
    if (this.customerFilter != value) {
      this.customerFilter = value;

      if (this.customerToFilter) {
        clearTimeout(this.customerToFilter);
      }

      var self = this;
      this.customerToFilter = setTimeout(function () {
        self.customerCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.customerFilter) {
      return (item.ArticleCode.toLowerCase().indexOf(this.customerFilter.toLowerCase()) > -1) ||
        (item.Article.toLowerCase().indexOf(this.customerFilter.toLowerCase()) > -1) ||
        (item.ContactNumber.toLowerCase().indexOf(this.customerFilter.toLowerCase()) > -1) ||
        (item.ArticleGroup.toLowerCase().indexOf(this.customerFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // show menu
  public showMenu() {
    document.getElementById("showTop").click();
  }

  public backClicked() {
    window.history.back();
  }

  // refresh grid
  public refreshGrid() {
    this.startLoading();
    (<HTMLButtonElement>document.getElementById("btnRefresh")).disabled = true;
    (<HTMLButtonElement>document.getElementById("btnRefresh")).innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
    this.getCustomerData();
  }

  // Export CSV
  public btnExportCSV() {
    let customers = new wijmo.collections.ObservableArray();

    this.customerCollectionView.moveToFirstPage();

    for (var p = 1; p <= this.customerCollectionView.pageCount; p++) {
      for (var i = 0; i < this.customerCollectionView.items.length; i++) {
        customers.push({
          Customer: this.customerCollectionView.items[i].Article,
          ContactNumber: this.customerCollectionView.items[i].ContactNumber,
          ContactPerson: this.customerCollectionView.items[i].ContactPerson,
          EmailAddress: this.customerCollectionView.items[i].EmailAddress,
          Address: this.customerCollectionView.items[i].Address,
          Particulars: this.customerCollectionView.items[i].Particulars
        });
      }

      this.customerCollectionView.moveToNextPage();
      if (p == this.customerCollectionView.pageCount) {
        this.customerCollectionView.moveToFirstPage();
      }
    }

    this.csvService.download(customers, 'customers');
  }

  // initialization
  ngOnInit() {
    this.startLoading();
    this.getListCustomer();
  }
}
