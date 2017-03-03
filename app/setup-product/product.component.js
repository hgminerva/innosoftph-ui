"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var product_service_1 = require('./product.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var ProductComponent = (function () {
    // constructor
    function ProductComponent(productService, router, toastr, vRef, slimLoadingBarService) {
        this.productService = productService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.productFilter = '';
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    ProductComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    ProductComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    // list product
    ProductComponent.prototype.getProductList = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        var toastr;
        this.productCollectionView = new wijmo.collections.CollectionView(this.productService.getListProductData(toastr));
        this.productCollectionView.filter = this.filterFunction.bind(this);
        this.productCollectionView.pageSize = 15;
        this.productCollectionView.trackChanges = true;
    };
    Object.defineProperty(ProductComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.productFilter;
        },
        // filter
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    ProductComponent.prototype.filterFunction = function (item) {
        if (this.productFilter) {
            return (item.ArticleCode.toLowerCase().indexOf(this.productFilter.toLowerCase()) > -1) ||
                (item.ManualArticleCode.toLowerCase().indexOf(this.productFilter.toLowerCase()) > -1) ||
                (item.Article.toLowerCase().indexOf(this.productFilter.toLowerCase()) > -1) ||
                (item.Unit.toLowerCase().indexOf(this.productFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // show menu
    ProductComponent.prototype.showMenu = function () {
        document.getElementById("showTop").click();
    };
    ProductComponent.prototype.backClicked = function () {
        window.history.back();
    };
    // initialization
    ProductComponent.prototype.ngOnInit = function () {
        this.getProductList();
    };
    ProductComponent = __decorate([
        core_1.Component({
            selector: 'my-product',
            templateUrl: 'app/setup-product/product.html'
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map