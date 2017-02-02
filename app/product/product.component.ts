import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'my-product',
  templateUrl: 'app/product/product.html'
})

export class ProductComponent {
  // global variables
  public productCollectionView: wijmo.collections.CollectionView;
  public productFilter = '';
  public productToFilter: any;

  // constructor
  constructor(
    private productService: ProductService,
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

  // list product
  public getProductList() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    let toastr: ToastsManager;
    this.productCollectionView = new wijmo.collections.CollectionView(this.productService.getListProductData(toastr));
    this.productCollectionView.filter = this.filterFunction.bind(this);
    this.productCollectionView.pageSize = 15;
    this.productCollectionView.trackChanges = true;
  }

  // filter
  get filter(): string {
    return this.productFilter;
  }

  // filter
  set filter(value: string) {
    if (this.productFilter != value) {
      this.productFilter = value;

      if (this.productToFilter) {
        clearTimeout(this.productToFilter);
      }

      var self = this;
      this.productToFilter = setTimeout(function () {
        self.productCollectionView.refresh();
      }, 500);
    }
  }

  // filter function
  public filterFunction(item: any) {
    if (this.productFilter) {
      return (item.ArticleCode.toLowerCase().indexOf(this.productFilter.toLowerCase()) > -1) ||
        (item.ManualArticleCode.toLowerCase().indexOf(this.productFilter.toLowerCase()) > -1) ||
        (item.Article.toLowerCase().indexOf(this.productFilter.toLowerCase()) > -1) ||
        (item.Unit.toLowerCase().indexOf(this.productFilter.toLowerCase()) > -1);
    }

    return true;
  }

  // initialization
  ngOnInit() {
    this.getProductList();
  }
}
