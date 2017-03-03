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
var quotation_service_1 = require('./quotation.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var QuotationComponent = (function () {
    // inject quotation service
    function QuotationComponent(quotationService, router, toastr, vRef, slimLoadingBarService) {
        this.quotationService = quotationService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isQuotationStartDateSelected = true;
        this.isQuotationEndDateSelected = true;
        this.quotationFilter = '';
        this.quotationStatusArray = ['OPEN', 'CLOSE', 'CANCELLED'];
        this.quotationStatusSelectedValue = "OPEN";
        this.isFinishLoading = false;
        this.isLoading = true;
        this.isStartDateClicked = false;
        this.isEndDateClicked = false;
        this.fliterQuotationStatusArray = ['ALL', 'OPEN', 'CLOSE', 'CANCELLED'];
        this.filterQuotationStatusSelectedValue = "OPEN";
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    QuotationComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    QuotationComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    QuotationComponent.prototype.finishedLoad = function () {
        this.isFinishLoading = true;
        this.isLoading = false;
        document.getElementById("btnSaveQuotation").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnSaveQuotation").disabled = false;
        document.getElementById("btnCloseQuotation").disabled = false;
    };
    // quotation dates
    QuotationComponent.prototype.setQuotationDateRanged = function () {
        this.startLoading();
        this.quotationStartDateValue = new Date();
        this.quotationEndDateValue = new Date();
        this.quotationDateValue = new Date();
        this.getListQuotation();
    };
    // event: quotation start date
    QuotationComponent.prototype.quotationStartDateOnValueChanged = function () {
        if (!this.isQuotationStartDateSelected) {
            if (this.isStartDateClicked) {
                this.startLoading();
                this.getQuotationData();
            }
            else {
                this.isStartDateClicked = true;
            }
        }
        else {
            this.isQuotationStartDateSelected = false;
        }
    };
    // event: quotation end date
    QuotationComponent.prototype.quotationEndDateOnValueChanged = function () {
        if (!this.isQuotationEndDateSelected) {
            if (this.isEndDateClicked) {
                this.startLoading();
                this.getQuotationData();
            }
            else {
                this.isEndDateClicked = true;
            }
        }
        else {
            this.isQuotationEndDateSelected = false;
        }
    };
    // get quotation data
    QuotationComponent.prototype.getQuotationData = function () {
        this.quotationCollectionView = new wijmo.collections.CollectionView(this.quotationService.getListQuotationData(this.quotationStartDateValue, this.quotationEndDateValue));
        this.quotationCollectionView.filter = this.filterFunction.bind(this);
        this.quotationCollectionView.pageSize = 15;
        this.quotationCollectionView.trackChanges = true;
    };
    // list quotation
    QuotationComponent.prototype.getListQuotation = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.getQuotationData();
    };
    // btn add quotation
    QuotationComponent.prototype.btnAddQotationClick = function () {
        this.isFinishLoading = false;
        this.isLoading = true;
        document.getElementById("btnSaveQuotation").disabled = true;
        document.getElementById("btnCloseQuotation").disabled = true;
        this.quotationDateValue = new Date();
        this.getListLead();
        this.quotationRemarks = "";
        this.quotationStatusSelectedValue = "OPEN";
    };
    // list lead
    QuotationComponent.prototype.getListLead = function () {
        this.quotationLeadObservableArray = this.quotationService.getListLeadData("quotation");
    };
    // list customer
    QuotationComponent.prototype.getListCustomer = function () {
        this.quotationCustomerObservableArray = this.quotationService.getListArticleData("quotation", 2);
    };
    // list Product
    QuotationComponent.prototype.getListProduct = function () {
        this.quotationProductObservableArray = this.quotationService.getListArticleData("quotation", 1);
    };
    // btn edit quotation
    QuotationComponent.prototype.btnEditQuotation = function () {
        this.startLoading();
        var currentSelectedQuotation = this.quotationCollectionView.currentItem;
        this.router.navigate(['/quotationDetail', currentSelectedQuotation.Id]);
    };
    // delete confirm modal
    QuotationComponent.prototype.btnDeleteQuotationClick = function () {
        document.getElementById("btnDeleteQuotation").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnDeleteQuotation").disabled = false;
        document.getElementById("btnDeleteCloseQuotation").disabled = false;
    };
    // delete confirm
    QuotationComponent.prototype.btnDeleteConfirmQuotationClick = function () {
        var toastr;
        document.getElementById("btnDeleteQuotation").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnDeleteQuotation").disabled = true;
        document.getElementById("btnDeleteCloseQuotation").disabled = true;
        var currentSelectedQuotation = this.quotationCollectionView.currentItem;
        this.quotationService.deleteQuotationData(currentSelectedQuotation.Id, toastr);
    };
    // quotation data
    QuotationComponent.prototype.getQuotationValue = function () {
        var dataObject = {
            QuotationDate: this.quotationDateValue.toLocaleDateString(),
            LeadId: this.quotationLeadSelectedValue,
            CustomerId: this.quotationCustomerSelectedValue,
            ProductId: this.quotationProductSelectedValue,
            Remarks: this.quotationRemarks,
            QuotationStatus: this.quotationStatusSelectedValue
        };
        return dataObject;
    };
    QuotationComponent.prototype.backClicked = function () {
        window.history.back();
    };
    // save quotation
    QuotationComponent.prototype.btnSaveQuotation = function () {
        var toastr;
        document.getElementById("btnSaveQuotation").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveQuotation").disabled = true;
        document.getElementById("btnCloseQuotation").disabled = true;
        this.quotationService.postQuotationData(this.getQuotationValue(), toastr);
    };
    Object.defineProperty(QuotationComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.quotationFilter;
        },
        // filter
        set: function (value) {
            if (this.quotationFilter != value) {
                this.quotationFilter = value;
                if (this.quotationToFilter) {
                    clearTimeout(this.quotationToFilter);
                }
                var self = this;
                this.quotationToFilter = setTimeout(function () {
                    self.quotationCollectionView.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    QuotationComponent.prototype.filterFunction = function (item) {
        if (this.quotationFilter) {
            return (item.QuotationNumber.toLowerCase().indexOf(this.quotationFilter.toLowerCase()) > -1) ||
                (item.Customer.toLowerCase().indexOf(this.quotationFilter.toLowerCase()) > -1) ||
                (item.Remarks.toLowerCase().indexOf(this.quotationFilter.toLowerCase()) > -1) ||
                (item.QuotationStatus.toLowerCase().indexOf(this.quotationFilter.toLowerCase()) > -1) ||
                (item.EncodedByUser.toLowerCase().indexOf(this.quotationFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // refresh grid
    QuotationComponent.prototype.refreshGrid = function () {
        this.startLoading();
        document.getElementById("btnRefresh").disabled = true;
        document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
        this.getQuotationData();
    };
    // show menu
    QuotationComponent.prototype.showMenu = function () {
        document.getElementById("showTop").click();
    };
    // initialization
    QuotationComponent.prototype.ngOnInit = function () {
        this.setQuotationDateRanged();
    };
    QuotationComponent = __decorate([
        core_1.Component({
            selector: 'my-quotation',
            templateUrl: 'app/activity-quotation/quotation.html'
        }), 
        __metadata('design:paramtypes', [quotation_service_1.QuotationService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], QuotationComponent);
    return QuotationComponent;
}());
exports.QuotationComponent = QuotationComponent;
//# sourceMappingURL=quotation.component.js.map