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
var delivery_service_1 = require('./delivery.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var DeliveryDetailComponent = (function () {
    // inject quotation detail service
    function DeliveryDetailComponent(deliveryService, router, activatedRoute, renderer, elementRef, toastr, vRef, slimLoadingBarService) {
        this.deliveryService = deliveryService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.deliveryQuotaionSelectedIndex = -1;
        this.deliveryStatusArray = ['OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING'];
        this.activityParticularCategories = [
            'Delivery'
        ];
        this.activityParticularCategorySelectedIndex = 0;
        this.activityNoOfHours = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
        ];
        this.activityNoOfHoursSelectedIndex = 0;
        this.activityStatus = ['OPEN', 'CLOSE', 'DONE', 'CANCELLED', 'FOR CLOSING'];
        this.activityStatusSelectedIndex = 0;
        this.isFinishLoading = false;
        this.isLoading = true;
        this.productCollectionArray = new wijmo.collections.ObservableArray();
        this.productId = 0;
        this.checkListCollectionArray = new wijmo.collections.ObservableArray();
        this.checkListId = 0;
        this.deliveryPrintPreparedByUserObservableArray = new wijmo.collections.ObservableArray();
        this.deliveryPrintSalesUserObservableArray = new wijmo.collections.ObservableArray();
        this.toastr.setRootViewContainerRef(vRef);
    }
    // start loading
    DeliveryDetailComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    DeliveryDetailComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    DeliveryDetailComponent.prototype.finishedLoad = function () {
        this.isFinishLoading = true;
        this.isLoading = false;
        document.getElementById("btnSaveDeliveryDetail").disabled = false;
        document.getElementById("btnPrintDeliveryDetail").disabled = false;
        document.getElementById("btnCloseDeliveryDetail").disabled = false;
    };
    // get url Id parameter
    DeliveryDetailComponent.prototype.getIdUrlParameter = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.deliveryId = params['id'];
        });
        return this.deliveryId;
    };
    // set delivery date
    DeliveryDetailComponent.prototype.setDeliveryDate = function () {
        this.deliveryDateValue = new Date();
        this.deliveryMeetingDateValue = new Date();
        this.activityDateValue = new Date();
        this.getListActivity(false);
        document.getElementById("btnSaveDeliveryDetail").disabled = true;
        document.getElementById("btnPrintDeliveryDetail").disabled = true;
        document.getElementById("btnCloseDeliveryDetail").disabled = true;
        var checkListArray = [
            "Hardware and Infrastructure (c/o customer)",
            "List of Items in XLS",
            "List of Customer in XLS",
            "List of Supplier in XLS",
            "List of Users that needed to be trained"
        ];
        for (var i = 0; i < checkListArray.length; i++) {
            this.checkListCollectionArray.push({
                checkListDescription: checkListArray[i]
            });
        }
    };
    // list article
    DeliveryDetailComponent.prototype.getQuotationData = function () {
        this.deliveryQuotaionObservableArray = this.deliveryService.getListQuotationData("deliveryDetail");
    };
    // list sales user
    DeliveryDetailComponent.prototype.getSalesUserServiceData = function () {
        this.deliverySalesUserObservableArray = this.deliveryService.getListUserData("deliveryDetail", "sales");
    };
    // list technical user
    DeliveryDetailComponent.prototype.getTechnicalUserServiceData = function () {
        this.deliveryTechnicalUserObservableArray = this.deliveryService.getListUserData("deliveryDetail", "technical");
    };
    // list functional user
    DeliveryDetailComponent.prototype.getFunctionalUserServiceData = function () {
        this.deliveryFunctionalUserObservableArray = this.deliveryService.getListUserData("deliveryDetail", "functional");
    };
    // set selected value
    DeliveryDetailComponent.prototype.setDropdownSelectedValueData = function () {
        this.deliveryDateValue = new Date(document.getElementById("deliveryDateValue").value.toString());
        this.deliveryQuotaionSelectedValue = parseInt(document.getElementById("deliveryQuotaionSelectedValue").value.toString());
        this.deliveryMeetingDateValue = new Date(document.getElementById("deliveryMeetingDateValue").value.toString());
        // this.deliverySalesUserSelectedValue =  parseInt((<HTMLInputElement>document.getElementById("deliverySalesUserSelectedValue")).value.toString());
        this.deliveryTechnicalUserSelectedValue = parseInt(document.getElementById("deliveryTechnicalUserSelectedValue").value.toString());
        this.deliveryFunctionalUserSelectedValue = parseInt(document.getElementById("deliveryFunctionalUserSelectedValue").value.toString());
        this.deliveryStatusSelectedValue = document.getElementById("deliveryStatusSelectedValue").value.toString();
    };
    // delivery data
    DeliveryDetailComponent.prototype.getDeliveryServiceData = function () {
        this.deliveryService.getDeliveryById(this.getIdUrlParameter());
    };
    // on key press decimal key
    DeliveryDetailComponent.prototype.onKeyPressOnlyDecimalNumberKey = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        else {
            return true;
        }
    };
    // on blur 
    DeliveryDetailComponent.prototype.onBlurOnlyDecimalNumberKey = function () {
        var _this = this;
        document.getElementById("activityAmount").value = "";
        setTimeout(function () {
            document.getElementById("activityAmount").value = _this.activityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }, 100);
    };
    // delivery data
    DeliveryDetailComponent.prototype.getDeliveryValue = function () {
        var dataObject = {
            DeliveryDate: this.deliveryDateValue.toLocaleDateString(),
            QuotationId: this.deliveryQuotaionSelectedValue,
            MeetingDate: this.deliveryMeetingDateValue.toLocaleDateString(),
            Remarks: document.getElementById("deliveryRemarks").value,
            TechnicalUserId: this.deliveryTechnicalUserSelectedValue,
            FunctionalUserId: this.deliveryFunctionalUserSelectedValue,
            DeliveryStatus: this.deliveryStatusSelectedValue
        };
        return dataObject;
    };
    // save delivery
    DeliveryDetailComponent.prototype.btnSaveDeliveryDetailClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnSaveDeliveryDetail").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnSaveDeliveryDetail").disabled = true;
        document.getElementById("btnPrintDeliveryDetail").disabled = true;
        document.getElementById("btnCloseDeliveryDetail").disabled = true;
        this.deliveryService.putDeliveryData(this.getIdUrlParameter(), this.getDeliveryValue(), toastr);
    };
    // activity line list
    DeliveryDetailComponent.prototype.getListActivity = function (isLoadActivityOnly) {
        this.activityCollectionView = new wijmo.collections.CollectionView(this.deliveryService.getListActivityByQuotationId(this.getIdUrlParameter(), isLoadActivityOnly));
        this.activityCollectionView.pageSize = 15;
        this.activityCollectionView.trackChanges = true;
    };
    // activity line detail modal  
    DeliveryDetailComponent.prototype.btnActivityDetailModal = function (add) {
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
    DeliveryDetailComponent.prototype.getActivityData = function () {
        var activityDataObject = {
            ActivityDate: this.activityDateValue.toLocaleDateString(),
            ParticularCategory: this.activityParticularCategorySelectedValue,
            Particulars: document.getElementById("activityParticulars").value,
            NumberOfHours: this.activityNoOfHoursSelectedValue,
            ActivityAmount: this.activityAmount,
            ActivityStatus: this.activityStatusSelectedValue,
            DeliveryId: this.getIdUrlParameter(),
        };
        return activityDataObject;
    };
    // save activity
    DeliveryDetailComponent.prototype.btnActivitySaveClick = function () {
        var toastr;
        document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnActivitySave").disabled = true;
        document.getElementById("btnActivityClose").disabled = true;
        if (this.activityId == 0) {
            this.deliveryService.postActivityData(this.getActivityData(), toastr);
        }
        else {
            this.deliveryService.putActivityData(this.activityId, this.getActivityData(), toastr);
        }
    };
    // activity delete confirmation modal
    DeliveryDetailComponent.prototype.btnActivityDeleteConfirmationModal = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        this.activityId = currentSelectedActivity.Id;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnActivityDeleteConfirmation").disabled = false;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = false;
    };
    // activity delete confirmation click
    DeliveryDetailComponent.prototype.btnActivityDeleteConfirmationClick = function () {
        var toastr;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnActivityDeleteConfirmation").disabled = true;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = true;
        this.deliveryService.deleteActivityData(this.activityId, toastr);
    };
    // print
    DeliveryDetailComponent.prototype.btnActivityPrintClick = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        window.open('http://api.innosoft.ph/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
    };
    // show menu
    DeliveryDetailComponent.prototype.showMenu = function () {
        document.getElementById("showTop").click();
    };
    DeliveryDetailComponent.prototype.backClicked = function () {
        window.history.back();
    };
    DeliveryDetailComponent.prototype.productOnclick = function () {
        this.printProductDeliveryString = "Add";
        this.isAddProduct = true;
    };
    DeliveryDetailComponent.prototype.btnAddProductDataClick = function () {
        this.printDeliveryProductDescription = document.getElementById("printDeliveryProductDescription").value;
        if (this.isAddProduct) {
            this.productId += 1;
            this.productCollectionArray.push({
                Id: this.productId,
                ProductDescription: this.printDeliveryProductDescription
            });
        }
        else {
            var currentSelectedProduct = this.productCollectionView.currentItem;
            currentSelectedProduct.ProductDescription = this.printDeliveryProductDescription;
        }
        this.productProductData();
        document.getElementById("btnProductCloseModal").click();
    };
    DeliveryDetailComponent.prototype.productEdit = function () {
        this.printProductDeliveryString = "Edit";
        this.isAddProduct = false;
        var currentSelectedProduct = this.productCollectionView.currentItem;
        document.getElementById("printDeliveryProductDescription").value = currentSelectedProduct.ProductDescription;
    };
    DeliveryDetailComponent.prototype.btnProductDeleteConfirmationClick = function () {
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
    DeliveryDetailComponent.prototype.productTabClick = function () {
        var _this = this;
        setTimeout(function () {
            _this.productProductData();
        }, 500);
    };
    DeliveryDetailComponent.prototype.productProductData = function () {
        this.productCollectionView = new wijmo.collections.CollectionView(this.productCollectionArray);
        this.productCollectionView.pageSize = 7;
        this.productCollectionView.trackChanges = true;
    };
    // =====================================
    DeliveryDetailComponent.prototype.checkListOnclick = function () {
        this.printCheckListString = "Add";
        this.isAddCheckList = true;
        document.getElementById("printdeliveryCheckListDescription").value = "";
    };
    DeliveryDetailComponent.prototype.btnAddCheckListDataClick = function () {
        this.checkListDescription = document.getElementById("printdeliveryCheckListDescription").value;
        if (this.isAddCheckList) {
            this.checkListId += 1;
            this.checkListCollectionArray.push({
                Id: this.checkListId,
                checkListDescription: this.checkListDescription
            });
        }
        else {
            var currentSelectedCheckList = this.checkListCollectionView.currentItem;
            currentSelectedCheckList.checkListDescription = this.checkListDescription;
        }
        this.checkListData();
        document.getElementById("btnCheckListCloseModal").click();
    };
    DeliveryDetailComponent.prototype.checkListEdit = function () {
        this.printCheckListString = "Edit";
        this.isAddCheckList = false;
        var currentSelectedCheckList = this.checkListCollectionView.currentItem;
        document.getElementById("printdeliveryCheckListDescription").value = currentSelectedCheckList.checkListDescription;
    };
    DeliveryDetailComponent.prototype.btnCheckListDeleteConfirmationClick = function () {
        var currentSelectedCheckList = this.checkListCollectionView.currentItem;
        var searchTerm = currentSelectedCheckList.Id;
        var index = -1;
        for (var i = 0, len = this.checkListCollectionArray.length; i < len; i++) {
            if (this.checkListCollectionArray[i].Id === searchTerm) {
                index = i;
                break;
            }
        }
        this.checkListCollectionArray.splice(index, 1);
        this.checkListData();
        document.getElementById("btnCheckListCloseDeleteConfirmation").click();
    };
    DeliveryDetailComponent.prototype.checkListTabClick = function () {
        var _this = this;
        setTimeout(function () {
            _this.checkListData();
        }, 500);
    };
    DeliveryDetailComponent.prototype.checkListData = function () {
        this.checkListCollectionView = new wijmo.collections.CollectionView(this.checkListCollectionArray);
        this.checkListCollectionView.pageSize = 7;
        this.checkListCollectionView.trackChanges = true;
    };
    // print delivery detail
    DeliveryDetailComponent.prototype.btnPrintDeliveryDetailClick = function () {
        this.deliveryPrintPreparedByUserObservableArray = this.deliveryService.getListUserData("quotationDetail", "");
        this.deliveryPrintSalesUserObservableArray = this.deliveryService.getListUserData("quotationDetail", "");
        var searchTerm = this.deliveryFunctionalUserSelectedValue;
        var index = -1;
        for (var i = 0, len = this.deliveryFunctionalUserObservableArray.length; i < len; i++) {
            if (this.deliveryFunctionalUserObservableArray[i].Id === searchTerm) {
                index = i;
                break;
            }
        }
        document.getElementById("deliveryPrintUserFunctional").value = this.deliveryFunctionalUserObservableArray[index].FullName;
        var searchTermTechnical = this.deliveryTechnicalUserSelectedValue;
        var indexTechnical = -1;
        for (var i = 0, len = this.deliveryTechnicalUserObservableArray.length; i < len; i++) {
            if (this.deliveryTechnicalUserObservableArray[i].Id === searchTermTechnical) {
                indexTechnical = i;
                break;
            }
        }
        document.getElementById("deliveryPrintUserTechnical").value = this.deliveryTechnicalUserObservableArray[indexTechnical].FullName;
    };
    DeliveryDetailComponent.prototype.btnPrintDeliveryClick = function () {
        var ISFormNumber = document.getElementById("printDeliveryInnosoftFormNo").value;
        var Customer = document.getElementById("printDeliveryCustomer").value;
        var CustomerPhoneNumber = document.getElementById("printDeliveryPhoneNumber").value;
        var CustomerAddress = document.getElementById("printDeliveryAddress").value;
        var DocumentNumber = document.getElementById("printDeliveryDocumentNo").value;
        var ContactPerson = document.getElementById("pprintDeliveryContactPerson").value;
        var ContactPersonPhoneNumber = document.getElementById("printDeliveryContactPersonPhoneNumber").value;
        // var ContactPersonAddress = (<HTMLInputElement>document.getElementById("printDeliveryContactPersonAddress")).value;
        var Particulars = document.getElementById("printDeliveryParticulars").value;
        var PreparedByUser = this.deliveryPrintPreparedBySelectedValue;
        var SalesUser = this.deliveryPrintSalesUserSelectedValue;
        var TechnicalUser = document.getElementById("deliveryPrintUserTechnical").value;
        var FunctionalUser = document.getElementById("deliveryPrintUserFunctional").value;
        var CustomerUser = document.getElementById("deliveryPrintUserCustomer").value;
        var KickOffDeliveryDate = document.getElementById("printDeliveryDate").value;
        var productArray = this.productCollectionArray;
        var emptyProductArray = [];
        for (var i = 0; i < productArray.length; i++) {
            emptyProductArray.push({
                Id: productArray[i].Id,
                ProductDescription: productArray[i].ProductDescription
            });
        }
        var checkListArray = this.checkListCollectionArray;
        var emptyCheckListArray = [];
        for (var i = 0; i < checkListArray.length; i++) {
            emptyCheckListArray.push({
                Id: checkListArray[i].Id,
                CheckListDescription: checkListArray[i].checkListDescription
            });
        }
        var printDeliveryArray = [];
        printDeliveryArray.push({
            ISFormNumber: ISFormNumber,
            Customer: Customer,
            CustomerPhoneNumber: CustomerPhoneNumber,
            CustomerAddress: CustomerAddress,
            DocumentNumber: DocumentNumber,
            ContactPerson: ContactPerson,
            ContactPersonPhoneNumber: ContactPersonPhoneNumber,
            ProductLists: emptyProductArray,
            Particulars: Particulars,
            CheckLists: emptyCheckListArray,
            PreparedByUser: PreparedByUser,
            SalesUser: SalesUser,
            TechnicalUser: TechnicalUser,
            FunctionalUser: FunctionalUser,
            CustomerUser: CustomerUser,
            KickOffDeliveryDate: KickOffDeliveryDate
        });
        this.deliveryService.printDeliveryPaper(this.getIdUrlParameter(), printDeliveryArray);
    };
    // initialization
    DeliveryDetailComponent.prototype.ngOnInit = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.setDeliveryDate();
    };
    DeliveryDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-delivery-detail',
            templateUrl: 'app/activity-delivery/deliveryDetail.html'
        }), 
        __metadata('design:paramtypes', [delivery_service_1.DeliveryService, router_1.Router, router_1.ActivatedRoute, core_1.Renderer, core_1.ElementRef, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], DeliveryDetailComponent);
    return DeliveryDetailComponent;
}());
exports.DeliveryDetailComponent = DeliveryDetailComponent;
//# sourceMappingURL=deliveryDetail.component.js.map