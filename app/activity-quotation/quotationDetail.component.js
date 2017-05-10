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
var QuotationDetailComponent = (function () {
    // public printQuotationIsDiscount: Boolean;
    // inject quotation detail service
    function QuotationDetailComponent(quotationService, router, activatedRoute, renderer, elementRef, toastr, vRef, slimLoadingBarService) {
        this.quotationService = quotationService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isQuotationDateSelected = true;
        this.quotationStatusArray = ['OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING', 'DUPLICATE'];
        this.activityParticularCategories = [
            'Quotation'
        ];
        this.activityParticularCategorySelectedIndex = 0;
        this.activityNoOfHours = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
        ];
        this.activityStatus = ['OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING'];
        this.isFinishLoading = false;
        this.isLoading = true;
        this.quotationPaymentScheduleArray = new wijmo.collections.ObservableArray();
        this.paymentId = 0;
        this.quotationCustomerSelectedIndex = 0;
        this.isCustomerSelected = false;
        this.isCustomerClicked = false;
        this.productCollectionArray = new wijmo.collections.ObservableArray();
        this.productId = 0;
        this.quotationTimeLineArray = new wijmo.collections.ObservableArray();
        this.timelineId = 0;
        this.quotationPrintPreparedByUserObservableArray = new wijmo.collections.ObservableArray();
        this.quotationPrintApprovedByUserObservableArray = new wijmo.collections.ObservableArray();
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    QuotationDetailComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    QuotationDetailComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    QuotationDetailComponent.prototype.finishedLoad = function () {
        this.isFinishLoading = true;
        this.isLoading = false;
        document.getElementById("btnSaveQuotationDetail").disabled = false;
        document.getElementById("btnPrintQuotationDetail").disabled = false;
        document.getElementById("btnCloseQuotationDetail").disabled = false;
    };
    // set selected value for drop down
    QuotationDetailComponent.prototype.setDropdownSelectedValueData = function () {
        this.quotationDateValue = new Date(document.getElementById("quotationDateValue").value.toString());
        this.quotationLeadSelectedValue = parseInt(document.getElementById("quotationLeadSelectedValue").value.toString());
        this.quotationCustomerSelectedValue = parseInt(document.getElementById("quotationCustomerSelectedValue").value.toString());
        this.quotationProductSelectedValue = parseInt(document.getElementById("quotationProductSelectedValue").value.toString());
        // this.quotationEncodedBySelectedValue = parseInt((<HTMLInputElement>document.getElementById("quotationEncodedBySelectedValue")).value.toString());
        this.quotationStatusSelectedValue = document.getElementById("quotationStatusSelectedValue").value.toString();
        var searchTerm = this.quotationCustomerSelectedValue;
        var index = -1;
        var len = this.quotationCustomerObservableArray.length;
        for (var i = 0; i < len; i++) {
            if (this.quotationCustomerObservableArray[i].Id === searchTerm) {
                index = i;
                break;
            }
        }
        document.getElementById("printQuotationCustomer").value = this.quotationCustomerObservableArray[i].Article;
        document.getElementById("printQuotationAddress").value = this.quotationCustomerObservableArray[i].Address;
        document.getElementById("printQuotationContactPerson").value = this.quotationCustomerObservableArray[i].ContactPerson;
        document.getElementById("printQuotationContactNumber").value = this.quotationCustomerObservableArray[i].ContactNumber;
        document.getElementById("printQuotationContactEmail").value = this.quotationCustomerObservableArray[i].EmailAddress;
    };
    // quotation date value
    QuotationDetailComponent.prototype.setQuotationDateValue = function () {
        this.quotationDateValue = new Date();
        this.activityDateValue = new Date();
        this.getListActivity(false);
        document.getElementById("btnSaveQuotationDetail").disabled = true;
        document.getElementById("btnPrintQuotationDetail").disabled = true;
        document.getElementById("btnCloseQuotationDetail").disabled = true;
    };
    // list lead
    QuotationDetailComponent.prototype.getLeadServiceData = function () {
        this.quotationLeadObservableArray = this.quotationService.getListLeadData("quotationDetail");
    };
    // list customer article
    QuotationDetailComponent.prototype.getCustomerArticleData = function () {
        this.quotationCustomerObservableArray = this.quotationService.getListArticleData("quotationDetail", 2);
    };
    // list product article
    QuotationDetailComponent.prototype.getProductArticleData = function () {
        this.quotationProductObservableArray = this.quotationService.getListArticleData("quotationDetail", 1);
    };
    // list product
    QuotationDetailComponent.prototype.getUserServiceData = function () {
        this.quotationEncodedUserObservableArray = this.quotationService.getListUserData("quotationDetail");
    };
    // quotation data
    QuotationDetailComponent.prototype.getQuotationServiceData = function () {
        this.quotationService.getQuotationById(this.getIdUrlParameter());
    };
    // get url Id parameter
    QuotationDetailComponent.prototype.getIdUrlParameter = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.quotationId = params['id'];
        });
        return this.quotationId;
    };
    // quotataion data value changed
    QuotationDetailComponent.prototype.quotationDateOnValueChanged = function () {
        if (this.isQuotationDateSelected) {
            this.isQuotationDateSelected = false;
        }
    };
    // quotation data
    QuotationDetailComponent.prototype.getQuotationValue = function () {
        var dataObject = {
            QuotationDate: this.quotationDateValue.toLocaleDateString(),
            LeadId: this.quotationLeadSelectedValue,
            CustomerId: this.quotationCustomerSelectedValue,
            ProductId: this.quotationProductSelectedValue,
            Remarks: document.getElementById("quotationRemarks").value,
            QuotationStatus: this.quotationStatusSelectedValue
        };
        return dataObject;
    };
    // save quotation detail
    QuotationDetailComponent.prototype.btnSaveQuotationDetailClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnSaveQuotationDetail").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveQuotationDetail").disabled = true;
        document.getElementById("btnPrintQuotationDetail").disabled = true;
        document.getElementById("btnCloseQuotationDetail").disabled = true;
        this.quotationService.putQuotationData(this.getIdUrlParameter(), this.getQuotationValue(), toastr);
    };
    QuotationDetailComponent.prototype.backClicked = function () {
        window.history.back();
    };
    // on key press decimal key
    QuotationDetailComponent.prototype.onKeyPressOnlyDecimalNumberKey = function (event, inputComputeName) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        else {
            return true;
        }
    };
    QuotationDetailComponent.prototype.priceOnKeyEvent = function (event) {
        var price = parseFloat(event.target.value.split(',').join(''));
        var quantity = parseFloat(document.getElementById("printQuotationProductQuantity").value.split(',').join(''));
        // (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value = (price * quantity).toLocaleString();
    };
    QuotationDetailComponent.prototype.quantityOnKeyEvent = function (event) {
        var quantity = parseFloat(event.target.value.split(',').join(''));
        var price = parseFloat(document.getElementById("printQuotationProductPrice").value.split(',').join(''));
        // (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value = (price * quantity).toLocaleString();
    };
    // on blur 
    QuotationDetailComponent.prototype.onBlurOnlyDecimalNumberKey = function () {
        var _this = this;
        document.getElementById("activityAmount").value = "";
        setTimeout(function () {
            document.getElementById("activityAmount").value = _this.activityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }, 100);
    };
    // activity line list
    QuotationDetailComponent.prototype.getListActivity = function (isLoadActivityOnly) {
        this.activityCollectionView = new wijmo.collections.CollectionView(this.quotationService.getListActivityByQuotationId(this.getIdUrlParameter(), isLoadActivityOnly));
        this.activityCollectionView.pageSize = 15;
        this.activityCollectionView.trackChanges = true;
    };
    // activity line detail modal  
    QuotationDetailComponent.prototype.btnActivityDetailModal = function (add) {
        document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnActivitySave").disabled = false;
        document.getElementById("btnActivityClose").disabled = false;
        if (add) {
            this.activityDetailModalString = "Add";
            this.activityId = 0;
            this.activityDateValue = new Date();
            this.activityParticularCategorySelectedValue = "New Installation";
            document.getElementById("activityParticulars").value = "";
            this.activityNoOfHoursSelectedValue = "0";
            document.getElementById("activityAmount").value = "0";
            this.activityAmount = "0";
            this.activityStatusSelectedValue = "OPEN";
        }
        else {
            this.activityDetailModalString = "Edit";
            var currentSelectedActivity = this.activityCollectionView.currentItem;
            this.activityId = currentSelectedActivity.Id;
            this.activityDateValue = new Date(currentSelectedActivity.ActivityDate);
            this.activityParticularCategorySelectedValue = currentSelectedActivity.ParticularCategory;
            document.getElementById("activityParticulars").value = currentSelectedActivity.Particulars;
            this.activityNoOfHoursSelectedValue = currentSelectedActivity.NumberOfHours;
            document.getElementById("activityAmount").value = currentSelectedActivity.ActivityAmount.toLocaleString();
            this.activityAmount = currentSelectedActivity.ActivityAmount.toLocaleString();
            this.activityStatusSelectedValue = currentSelectedActivity.ActivityStatus;
        }
    };
    // get activity data
    QuotationDetailComponent.prototype.getActivityData = function () {
        var activityDataObject = {
            ActivityDate: this.activityDateValue.toLocaleDateString(),
            ParticularCategory: this.activityParticularCategorySelectedValue,
            Particulars: document.getElementById("activityParticulars").value,
            NumberOfHours: this.activityNoOfHoursSelectedValue,
            ActivityAmount: this.activityAmount,
            ActivityStatus: this.activityStatusSelectedValue,
            QuotationId: this.getIdUrlParameter(),
        };
        return activityDataObject;
    };
    // save activity
    QuotationDetailComponent.prototype.btnActivitySaveClick = function () {
        var toastr;
        document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnActivitySave").disabled = true;
        document.getElementById("btnActivityClose").disabled = true;
        if (this.activityId == 0) {
            this.quotationService.postActivityData(this.getActivityData(), toastr);
        }
        else {
            this.quotationService.putActivityData(this.activityId, this.getActivityData(), toastr);
        }
    };
    // activity delete confirmation modal
    QuotationDetailComponent.prototype.btnActivityDeleteConfirmationModal = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        this.activityId = currentSelectedActivity.Id;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnActivityDeleteConfirmation").disabled = false;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = false;
    };
    // activity delete confirmation click
    QuotationDetailComponent.prototype.btnActivityDeleteConfirmationClick = function () {
        var toastr;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnActivityDeleteConfirmation").disabled = true;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = true;
        this.quotationService.deleteActivityData(this.activityId, toastr);
    };
    // print
    QuotationDetailComponent.prototype.btnActivityPrintClick = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        window.open('http://api.innosoft.ph/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
    };
    // show menu
    QuotationDetailComponent.prototype.showMenu = function () {
        document.getElementById("showTop").click();
    };
    QuotationDetailComponent.prototype.btnPrintQuotationDetailClick = function () {
        var searchTerm = this.quotationCustomerSelectedValue;
        var index = -1;
        var len = this.quotationCustomerObservableArray.length;
        for (var i = 0; i < len; i++) {
            if (this.quotationCustomerObservableArray[i].Id === searchTerm) {
                index = i;
                break;
            }
        }
        document.getElementById("printQuotationCustomer").value = this.quotationCustomerObservableArray[index].Article;
        document.getElementById("printQuotationAddress").value = this.quotationCustomerObservableArray[index].Address;
        document.getElementById("printQuotationContactPerson").value = this.quotationCustomerObservableArray[index].ContactPerson;
        document.getElementById("printQuotationContactNumber").value = this.quotationCustomerObservableArray[index].ContactNumber;
        document.getElementById("printQuotationContactEmail").value = this.quotationCustomerObservableArray[index].EmailAddress;
        var qRefNumber = document.getElementById("quotationNumber").value;
        var qDate = document.getElementById("quotationDateValue").value;
        document.getElementById("QRefNo").value = "QN-" + qRefNumber;
        document.getElementById("QDate").value = qDate;
        var searchLeadTerm = this.quotationLeadSelectedValue;
        var leadIndex = -1;
        var leadLen = this.quotationLeadObservableArray.length;
        for (var i = 0; i < leadLen; i++) {
            if (this.quotationLeadObservableArray[i].Id === searchLeadTerm) {
                leadIndex = i;
                break;
            }
        }
        var quotationsearchTerm = this.quotationProductSelectedValue;
        var quotationindex = -1;
        var quotationlen = this.quotationProductObservableArray.length;
        for (var i = 0; i < quotationlen; i++) {
            if (this.quotationProductObservableArray[i].Id === quotationsearchTerm) {
                quotationindex = i;
                break;
            }
        }
        document.getElementById("LeadsRefNo").value = "LN-" + this.quotationLeadObservableArray[leadIndex].LeadNumber;
        this.quotationPrintPreparedByUserObservableArray = this.quotationService.getListUserData("quotationDetail");
        this.quotationPrintApprovedByUserObservableArray = this.quotationService.getListUserData("quotationDetail");
        // this.printQuotationIsDiscount = false;
        // (<HTMLInputElement>document.getElementById("printQuotationIsDiscount")).checked = false;
        document.getElementById("printQuotationProductCode").value = this.quotationProductObservableArray[quotationindex].ArticleCode;
        document.getElementById("printQuotationProductDescription").value = this.quotationProductObservableArray[quotationindex].Article;
        this.printQuotationProductPrice = "0";
        this.printQuotationProductQuantity = "0";
    };
    QuotationDetailComponent.prototype.paymentTabClick = function () {
        var _this = this;
        setTimeout(function () {
            _this.paymentScheduleData();
        }, 500);
    };
    QuotationDetailComponent.prototype.productTabClick = function () {
        var _this = this;
        setTimeout(function () {
            _this.productProductData();
        }, 500);
    };
    QuotationDetailComponent.prototype.paymentScheduleData = function () {
        this.paymentScheduleCollectionView = new wijmo.collections.CollectionView(this.quotationPaymentScheduleArray);
        this.paymentScheduleCollectionView.pageSize = 7;
        this.paymentScheduleCollectionView.trackChanges = true;
    };
    QuotationDetailComponent.prototype.paymentOnclick = function () {
        this.printQuotationString = "Add";
        this.isAddPayment = true;
        document.getElementById("quotationPrintDescription").value = "";
        document.getElementById("quotationPrintAmount").value = "0";
        document.getElementById("quotationPrintRemarks").value = "";
        this.quotationPrintDescription = "";
        this.quotationPrintAmount = "0";
        this.quotationPrintRemarks = "";
    };
    QuotationDetailComponent.prototype.btnAddPaymentDataClick = function () {
        this.quotationPrintDescription = document.getElementById("quotationPrintDescription").value;
        this.quotationPrintAmount = document.getElementById("quotationPrintAmount").value;
        this.quotationPrintRemarks = document.getElementById("quotationPrintRemarks").value;
        if (this.isAddPayment) {
            this.paymentId += 1;
            this.quotationPaymentScheduleArray.push({
                Id: this.paymentId,
                Description: this.quotationPrintDescription,
                Amount: this.quotationPrintAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                Remarks: this.quotationPrintRemarks
            });
        }
        else {
            var currentSelectedPayment = this.paymentScheduleCollectionView.currentItem;
            currentSelectedPayment.Description = this.quotationPrintDescription;
            currentSelectedPayment.Amount = this.quotationPrintAmount;
            currentSelectedPayment.Remarks = this.quotationPrintRemarks;
        }
        this.paymentScheduleData();
        document.getElementById("btnPaymentCloseModal").click();
    };
    QuotationDetailComponent.prototype.btnPaymentDeleteConfirmationClick = function () {
        var currentSelectedPayment = this.paymentScheduleCollectionView.currentItem;
        var searchTerm = currentSelectedPayment.Id;
        var index = -1;
        for (var i = 0, len = this.quotationPaymentScheduleArray.length; i < len; i++) {
            if (this.quotationPaymentScheduleArray[i].Id === searchTerm) {
                index = i;
                break;
            }
        }
        this.quotationPaymentScheduleArray.splice(index, 1);
        this.paymentScheduleData();
        document.getElementById("btnPaymentCloseDeleteConfirmation").click();
    };
    QuotationDetailComponent.prototype.paymentEdit = function () {
        this.printQuotationString = "Edit";
        this.isAddPayment = false;
        var currentSelectedPayment = this.paymentScheduleCollectionView.currentItem;
        document.getElementById("quotationPrintDescription").value = currentSelectedPayment.Description;
        document.getElementById("quotationPrintAmount").value = currentSelectedPayment.Amount;
        document.getElementById("quotationPrintRemarks").value = currentSelectedPayment.Remarks;
    };
    QuotationDetailComponent.prototype.productProductData = function () {
        this.productCollectionView = new wijmo.collections.CollectionView(this.productCollectionArray);
        this.productCollectionView.pageSize = 7;
        this.productCollectionView.trackChanges = true;
    };
    QuotationDetailComponent.prototype.productOnclick = function () {
        this.printProductQuotationString = "Add";
        this.isAddProduct = true;
        document.getElementById("printQuotationProductCode").value = "";
        document.getElementById("printQuotationProductDescription").value = "";
        document.getElementById("printQuotationProductPrice").value = "0";
        document.getElementById("printQuotationProductQuantity").value = "0";
        // (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value = "0";
        this.printQuotationProductCode = "";
        this.printQuotationProductDescription = "";
        this.printQuotationProductPrice = "0";
        this.printQuotationProductQuantity = "0";
        // this.printQuotationProductAmount = "0";
        var searchTerm = this.quotationProductSelectedValue;
        var index = -1;
        var len = this.quotationProductObservableArray.length;
        for (var i = 0; i < len; i++) {
            if (this.quotationProductObservableArray[i].Id === searchTerm) {
                index = i;
                break;
            }
        }
        document.getElementById("printQuotationProductCode").value = this.quotationProductObservableArray[index].ArticleCode;
        document.getElementById("printQuotationProductDescription").value = this.quotationProductObservableArray[index].Article;
        // this.printQuotationIsDiscount = false;
        // (<HTMLInputElement>document.getElementById("printQuotationIsDiscount")).checked = false;
    };
    QuotationDetailComponent.prototype.btnAddProductDataClick = function () {
        this.printQuotationProductCode = document.getElementById("printQuotationProductCode").value;
        this.printQuotationProductDescription = document.getElementById("printQuotationProductDescription").value;
        this.printQuotationProductPrice = document.getElementById("printQuotationProductPrice").value;
        this.printQuotationProductQuantity = document.getElementById("printQuotationProductQuantity").value;
        // this.printQuotationProductAmount = (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value;
        // this.printQuotationIsDiscount = (<HTMLInputElement>document.getElementById("printQuotationIsDiscount")).checked;
        if (this.isAddProduct) {
            this.productId += 1;
            this.productCollectionArray.push({
                Id: this.productId,
                ProductCode: this.printQuotationProductCode,
                ProductDescription: this.printQuotationProductDescription,
                // IsDiscount: this.printQuotationIsDiscount,
                Price: this.printQuotationProductPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                Quantity: this.printQuotationProductQuantity.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            });
        }
        else {
            var currentSelectedProduct = this.productCollectionView.currentItem;
            currentSelectedProduct.ProductCode = this.printQuotationProductCode;
            currentSelectedProduct.ProductDescription = this.printQuotationProductDescription;
            // currentSelectedProduct.IsDiscount = this.printQuotationIsDiscount;
            currentSelectedProduct.Price = this.printQuotationProductPrice;
            currentSelectedProduct.Quantity = this.printQuotationProductQuantity;
        }
        this.productProductData();
        document.getElementById("btnProductCloseModal").click();
    };
    QuotationDetailComponent.prototype.productEdit = function () {
        this.printProductQuotationString = "Edit";
        this.isAddProduct = false;
        var currentSelectedProduct = this.productCollectionView.currentItem;
        document.getElementById("printQuotationProductCode").value = currentSelectedProduct.ProductCode;
        document.getElementById("printQuotationProductDescription").value = currentSelectedProduct.ProductDescription;
        // (<HTMLInputElement>document.getElementById("printQuotationIsDiscount")).checked = currentSelectedProduct.IsDiscount;
        document.getElementById("printQuotationProductPrice").value = currentSelectedProduct.Price;
        document.getElementById("printQuotationProductQuantity").value = currentSelectedProduct.Quantity;
        document.getElementById("printQuotationProductAmount").value = currentSelectedProduct.Amount;
    };
    QuotationDetailComponent.prototype.btnProductDeleteConfirmationClick = function () {
        var currentSelectedProduct = this.productCollectionView.currentItem;
        var searchTerm = currentSelectedProduct.Id;
        var index = -1;
        for (var i = 0, len = this.productCollectionArray.length; i < len; i++) {
            if (this.productCollectionArray[i].Id === searchTerm) {
                index = i;
                break;
            }
        }
        this.productCollectionArray.splice(index, 1);
        this.productProductData();
        document.getElementById("btProductCloseDeleteConfirmation").click();
    };
    QuotationDetailComponent.prototype.onBlurOnlyDecimalNumberKeyForPrintQuotation = function () {
        var _this = this;
        document.getElementById("quotationPrintAmount").value = "";
        setTimeout(function () {
            document.getElementById("quotationPrintAmount").value = _this.quotationPrintAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }, 100);
    };
    QuotationDetailComponent.prototype.onBlurOnlyDecimalNumberKeyForProductPricePrintQuotation = function () {
        var _this = this;
        document.getElementById("printQuotationProductPrice").value = "";
        setTimeout(function () {
            document.getElementById("printQuotationProductPrice").value = _this.printQuotationProductPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }, 100);
    };
    QuotationDetailComponent.prototype.onBlurOnlyDecimalNumberKeyForProductQuantityPrintQuotation = function () {
        var _this = this;
        document.getElementById("printQuotationProductQuantity").value = "";
        setTimeout(function () {
            document.getElementById("printQuotationProductQuantity").value = _this.printQuotationProductQuantity.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }, 100);
    };
    QuotationDetailComponent.prototype.onBlurOnlyDecimalNumberKeyForProductAmountPrintQuotation = function () {
        // (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value = "";
        // setTimeout(() => {
        //   (<HTMLInputElement>document.getElementById("printQuotationProductAmount")).value = this.printQuotationProductAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        // }, 100);
    };
    QuotationDetailComponent.prototype.btnPrintQuotationDetailPrintButtonClick = function () {
        var printQuotationCustomer = document.getElementById("printQuotationCustomer").value;
        var printQuotationAddress = document.getElementById("printQuotationAddress").value;
        var printQuotationContactPerson = document.getElementById("printQuotationContactPerson").value;
        var printQuotationContactNumber = document.getElementById("printQuotationContactNumber").value;
        var printQuotationContactEmail = document.getElementById("printQuotationContactEmail").value;
        var QRefNo = document.getElementById("QRefNo").value;
        var QDate = document.getElementById("QDate").value;
        var ClientPONo = document.getElementById("ClientPONo").value;
        var ClientPODate = document.getElementById("ClientPODate").value;
        var LeadsRefNo = document.getElementById("LeadsRefNo").value;
        var productCode = document.getElementById("printQuotationProductCode").value;
        var productDescription = document.getElementById("printQuotationProductDescription").value;
        var productPrice = document.getElementById("printQuotationProductPrice").value;
        var productQuantity = document.getElementById("printQuotationProductQuantity").value;
        var productRemarks = document.getElementById("printQuotationProductRemarks").value;
        var paymentArray = this.quotationPaymentScheduleArray;
        var emptyPaymentArray = [];
        for (var i = 0; i < paymentArray.length; i++) {
            emptyPaymentArray.push({
                Id: paymentArray[i].Id,
                Description: paymentArray[i].Description,
                Amount: parseFloat(paymentArray[i].Amount.split(',').join('')),
                Remarks: paymentArray[i].Remarks
            });
        }
        var timelineArray = this.quotationTimeLineArray;
        var emptyTimelineArray = [];
        for (var i = 0; i < timelineArray.length; i++) {
            emptyTimelineArray.push({
                Id: timelineArray[i].Id,
                Product: timelineArray[i].Product,
                Timeline: timelineArray[i].Timeline,
                Remarks: timelineArray[i].Remarks
            });
        }
        var printQuotationArray = [];
        printQuotationArray.push({
            CustomerName: printQuotationCustomer,
            CustomerAddress: printQuotationAddress,
            CustomerContactPerson: printQuotationContactPerson,
            CustomerContactNumber: printQuotationContactNumber,
            CustomerContactEmail: printQuotationContactEmail,
            QRefNumber: QRefNo,
            QDate: QDate,
            ClientPONo: ClientPONo,
            LeadsRefNo: LeadsRefNo,
            ProductCode: productCode,
            ProductDescription: productDescription,
            Price: parseFloat(productPrice.split(',').join('')),
            Quantity: parseFloat(productQuantity.split(',').join('')),
            Remarks: productRemarks,
            PaymentLists: emptyPaymentArray,
            TimelineLists: emptyTimelineArray,
            PreparedByUser: this.quotationPrintPreparedByUserSelectedValue,
            ApprovedByUser: this.quotationPrintApprovedByUserSelectedValue
        });
        this.quotationService.printQuotationPaper(this.getIdUrlParameter(), printQuotationArray);
    };
    QuotationDetailComponent.prototype.timeLineTabClick = function () {
        var _this = this;
        setTimeout(function () {
            _this.timelinecheduleData();
        }, 500);
    };
    QuotationDetailComponent.prototype.timelinecheduleData = function () {
        this.timelineCollectionView = new wijmo.collections.CollectionView(this.quotationTimeLineArray);
        this.timelineCollectionView.pageSize = 7;
        this.timelineCollectionView.trackChanges = true;
    };
    QuotationDetailComponent.prototype.timelineOnclick = function () {
        this.printTimelineQuotationString = "Add";
        this.isAddtTimeline = true;
        document.getElementById("printQuotationTimeLineProduct").value = "";
        document.getElementById("printQuotationTimeLine").value = "";
        document.getElementById("printQuotationTimeLineRemarks").value = "";
        this.printQuotationTimeLineProduct = "";
        this.printQuotationTimeLine = "";
        this.printQuotationTimeLineRemarks = "";
        var searchTerm = this.quotationProductSelectedValue;
        var index = -1;
        var len = this.quotationProductObservableArray.length;
        for (var i = 0; i < len; i++) {
            if (this.quotationProductObservableArray[i].Id === searchTerm) {
                index = i;
                break;
            }
        }
        document.getElementById("printQuotationTimeLineProduct").value = this.quotationProductObservableArray[index].Article;
    };
    QuotationDetailComponent.prototype.btnAddtimelineDataClick = function () {
        this.printQuotationTimeLineProduct = document.getElementById("printQuotationTimeLineProduct").value;
        this.printQuotationTimeLine = document.getElementById("printQuotationTimeLine").value;
        this.printQuotationTimeLineRemarks = document.getElementById("printQuotationTimeLineRemarks").value;
        if (this.isAddtTimeline) {
            this.timelineId += 1;
            this.quotationTimeLineArray.push({
                Id: this.timelineId,
                Product: this.printQuotationTimeLineProduct,
                Timeline: this.printQuotationTimeLine,
                Remarks: this.printQuotationTimeLineRemarks
            });
        }
        else {
            var currentSelectedPayment = this.timelineCollectionView.currentItem;
            currentSelectedPayment.Product = this.printQuotationTimeLineProduct;
            currentSelectedPayment.Timeline = this.printQuotationTimeLine;
            currentSelectedPayment.Remarks = this.printQuotationTimeLineRemarks;
        }
        this.timelinecheduleData();
        document.getElementById("btntimelineCloseModal").click();
    };
    QuotationDetailComponent.prototype.btnTimelineDeleteConfirmationClick = function () {
        var currentSelectedTimeLine = this.timelineCollectionView.currentItem;
        var searchTerm = currentSelectedTimeLine.Id;
        var index = -1;
        for (var i = 0, len = this.quotationTimeLineArray.length; i < len; i++) {
            if (this.quotationTimeLineArray[i].Id === searchTerm) {
                index = i;
                break;
            }
        }
        this.quotationTimeLineArray.splice(index, 1);
        this.timelinecheduleData();
        document.getElementById("btnTimelineCloseDeleteConfirmation").click();
    };
    QuotationDetailComponent.prototype.timelineEdit = function () {
        this.printTimelineQuotationString = "Edit";
        this.isAddtTimeline = false;
        var currentSelectedPayment = this.timelineCollectionView.currentItem;
        document.getElementById("printQuotationTimeLineProduct").value = currentSelectedPayment.Product;
        document.getElementById("printQuotationTimeLine").value = currentSelectedPayment.Timeline;
        document.getElementById("printQuotationTimeLineRemarks").value = currentSelectedPayment.Remarks;
    };
    // initialization
    QuotationDetailComponent.prototype.ngOnInit = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.quotationPaymentScheduleArray.push({
            Id: 0,
            Description: "50% Downpayment",
            Amount: "0",
            Remarks: "Upon signing of Quote"
        });
        this.quotationPaymentScheduleArray.push({
            Id: 0,
            Description: "50% Upon Installation",
            Amount: "0",
            Remarks: " "
        });
        this.setQuotationDateValue();
    };
    QuotationDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-quotation-detail',
            templateUrl: 'app/activity-quotation/quotationDetail.html'
        }), 
        __metadata('design:paramtypes', [quotation_service_1.QuotationService, router_1.Router, router_1.ActivatedRoute, core_1.Renderer, core_1.ElementRef, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], QuotationDetailComponent);
    return QuotationDetailComponent;
}());
exports.QuotationDetailComponent = QuotationDetailComponent;
//# sourceMappingURL=quotationDetail.component.js.map