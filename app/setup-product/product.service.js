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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ProductService = (function () {
    // constructor
    function ProductService(router, http, toastr) {
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        // global variables
        this.headers = new http_1.Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
        });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    // list product data
    ProductService.prototype.getListProductData = function (toastr) {
        var _this = this;
        var productObservableArray = new wijmo.collections.ObservableArray();
        var url = "http://api.innosoft.ph/api/article/list/byArticleTypeId/1";
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    productObservableArray.push({
                        Id: results[i].Id,
                        ArticleCode: results[i].ArticleCode,
                        ManualArticleCode: results[i].ManualArticleCode,
                        Article: results[i].Article,
                        Unit: results[i].Unit,
                        IsInventory: results[i].IsInventory,
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
            document.getElementById("btnRefresh").disabled = false;
            document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-refresh fa-fw'></i> Refresh";
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
        });
        return productObservableArray;
    };
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map