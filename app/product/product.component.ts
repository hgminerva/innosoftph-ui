import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'my-product',
  templateUrl: 'app/product/product.html'
})

export class ProductComponent  {
    // inject career service
  constructor(private productService: ProductService, private router: Router) { }

  // global variables
  public productDetailModalString: String;
  public productCollectionView: wijmo.collections.CollectionView;

  // product detail modal  
  productDetailModal(add: boolean) {
    if (add) {
      this.productDetailModalString = "Add";
    } else {
      this.productDetailModalString = "Edit";
    }
  }

  // product delete modal
  productDeleteConfirmationModal() {

  }

  // initialization
  ngOnInit() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    } else {
      this.productCollectionView = new wijmo.collections.CollectionView(this.productService.getListProductData(100));
      this.productCollectionView.pageSize = 15;
      this.productCollectionView.trackChanges = true;
    }
  }
 }
