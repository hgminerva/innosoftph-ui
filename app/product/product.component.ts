import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'my-product',
  templateUrl: 'app/product/product.html'
})

export class ProductComponent {
  // global variables
  public productCollectionView: wijmo.collections.CollectionView;

  // constructor
  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  // list product
  public getProductList() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    let toastr: ToastsManager;
    this.productCollectionView = new wijmo.collections.CollectionView(this.productService.getListProductData(toastr));
    this.productCollectionView.pageSize = 15;
    this.productCollectionView.trackChanges = true;
  }

  // initialization
  ngOnInit() {
    this.getProductList();
  }
}
