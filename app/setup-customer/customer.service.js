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
var CustomerService = (function () {
    // constructor
    function CustomerService(router, http, toastr) {
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
    // list customer data
    CustomerService.prototype.getListCustomerData = function (toastr) {
        var _this = this;
        var customerObservableArray = new wijmo.collections.ObservableArray();
        var url = "http://api.innosoft.ph/api/article/list/byArticleTypeId/2";
        this.http.get(url, this.options).subscribe(function (response) {
            var results = new wijmo.collections.ObservableArray(response.json());
            if (results.length > 0) {
                for (var i = 0; i <= results.length - 1; i++) {
                    customerObservableArray.push({
                        Id: results[i].Id,
                        ArticleCode: results[i].ArticleCode,
                        Article: results[i].Article,
                        ContactNumber: results[i].ContactNumber,
                        ArticleGroup: results[i].ArticleGroup
                    });
                }
            }
            document.getElementById("btn-hidden-complete-loading").click();
        }, function (error) {
            _this.toastr.error('', 'Something`s went wrong!');
        });
        return customerObservableArray;
    };
    CustomerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, ng2_toastr_1.ToastsManager])
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map