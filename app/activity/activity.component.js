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
var activity_service_1 = require('./activity.service');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var ActivityComponent = (function () {
    // public isAcitivtyDocumentSelected = false;
    // inject lead service
    function ActivityComponent(activityService, router, toastr, vRef, slimLoadingBarService) {
        this.activityService = activityService;
        this.router = router;
        this.toastr = toastr;
        this.vRef = vRef;
        this.slimLoadingBarService = slimLoadingBarService;
        this.isActivtyStartDateSelected = true;
        this.isActivtyEndDateSelected = true;
        this.documentArray = ['Lead', 'Quotation', 'Delivery', 'Support', 'Support - Technical', 'Support - Functional', 'Support - Customize', 'Software Development'];
        this.documentSelectedValue = 'Lead';
        this.activityFilter = '';
        this.activityParticularCategories = [''];
        this.activityParticularCategorySelectedIndex = 0;
        this.activityNoOfHours = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
        ];
        this.activityStatus = ['OPEN', 'CLOSE', 'DONE', 'WAITING FOR CLIENT', 'CANCELLED', 'FOR CLOSING'];
        this.hasNoActivity = false;
        this.hasActivity = true;
        this.activityStatusesArray = ['ALL', 'OPEN', 'CLOSE', 'DONE', 'WAITING FOR CLIENT', 'CANCELLED', 'FOR CLOSING'];
        this.activityStatusesSelectedValue = "OPEN";
        this.isStartDateClicked = false;
        this.isEndDateClicked = false;
        this.isActivityDocumentClicked = false;
        this.isSupport = false;
        this.isFinishLoading = false;
        this.isLoading = true;
        this.activityStatusClicked = false;
        this.isActivityStatusSelected = false;
        this.toastr.setRootViewContainerRef(vRef);
    }
    ActivityComponent.prototype.activityStatusesSelectedIndexChangedClick = function () {
        if (this.activityStatusClicked) {
            if (this.isActivityStatusSelected) {
                this.startLoading();
                this.getActivityData();
            }
            else {
                this.isActivityStatusSelected = true;
            }
        }
        else {
            this.activityStatusClicked = true;
        }
    };
    // start loading
    ActivityComponent.prototype.startLoading = function () {
        this.slimLoadingBarService.progress = 30;
        this.slimLoadingBarService.start();
    };
    // complete loading
    ActivityComponent.prototype.completeLoading = function () {
        this.slimLoadingBarService.complete();
    };
    ActivityComponent.prototype.setActivityDateRanged = function () {
        this.startLoading();
        this.activityStartDateValue = new Date();
        this.activityEndDateValue = new Date();
        this.activityDateValue = new Date();
        this.getListActivity();
    };
    ActivityComponent.prototype.getAssignedUser = function () {
        this.activityAssignedUserObservableArray = this.activityService.getListUserData();
    };
    ActivityComponent.prototype.activityStartDateOnValueChanged = function () {
        if (!this.isActivtyStartDateSelected) {
            if (this.isStartDateClicked) {
                this.startLoading();
                this.getActivityData();
            }
            else {
                this.isStartDateClicked = true;
            }
        }
        else {
            this.isActivtyStartDateSelected = false;
        }
    };
    ActivityComponent.prototype.activityEndDateOnValueChanged = function () {
        if (!this.isActivtyEndDateSelected) {
            if (this.isEndDateClicked) {
                this.startLoading();
                this.getActivityData();
            }
            else {
                this.isEndDateClicked = true;
            }
        }
        else {
            this.isActivtyEndDateSelected = false;
        }
    };
    ActivityComponent.prototype.finishedLoad = function () {
        this.isFinishLoading = true;
        this.isLoading = false;
        document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnActivitySave").disabled = false;
        document.getElementById("btnActivityClose").disabled = false;
    };
    ActivityComponent.prototype.cboDocumentSelectedIndexChangedClick = function () {
        if (this.isActivityDocumentClicked) {
            this.startLoading();
            this.getActivityData();
        }
        else {
            this.isActivityDocumentClicked = true;
        }
    };
    // list activity
    ActivityComponent.prototype.getListActivity = function () {
        if (!localStorage.getItem('access_token')) {
            this.router.navigate(['login']);
        }
        this.getActivityData();
    };
    // activity service data
    ActivityComponent.prototype.getActivityData = function () {
        this.startLoading();
        this.activityCollectionView = new wijmo.collections.CollectionView(this.activityService.getListActivityData(this.documentSelectedValue, this.activityStartDateValue, this.activityEndDateValue, this.activityStatusesSelectedValue));
        this.activityCollectionView.filter = this.filterFunction.bind(this);
        this.activityCollectionView.pageSize = 15;
        this.activityCollectionView.trackChanges = true;
    };
    Object.defineProperty(ActivityComponent.prototype, "filter", {
        // filter
        get: function () {
            return this.activityFilter;
        },
        // filter
        set: function (value) {
            if (this.activityFilter != value) {
                this.activityFilter = value;
                if (this.activityToFilter) {
                    clearTimeout(this.activityToFilter);
                }
                var self = this;
                this.activityToFilter = setTimeout(function () {
                    self.activityCollectionView.refresh();
                }, 500);
            }
        },
        enumerable: true,
        configurable: true
    });
    // filter function
    ActivityComponent.prototype.filterFunction = function (item) {
        if (this.activityFilter) {
            return (item.Document.toLowerCase().indexOf(this.activityFilter.toLowerCase()) > -1) ||
                (item.Particulars.toLowerCase().indexOf(this.activityFilter.toLowerCase()) > -1) ||
                (item.Activity.toLowerCase().indexOf(this.activityFilter.toLowerCase()) > -1) ||
                (item.EncodedBy.toLowerCase().indexOf(this.activityFilter.toLowerCase()) > -1) ||
                (item.HeaderStatus.toLowerCase().indexOf(this.activityFilter.toLowerCase()) > -1) ||
                (item.StaffUser.toLowerCase().indexOf(this.activityFilter.toLowerCase()) > -1);
        }
        return true;
    };
    // on key press decimal key
    ActivityComponent.prototype.onKeyPressOnlyDecimalNumberKey = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        else {
            return true;
        }
    };
    // on blur 
    ActivityComponent.prototype.onBlurOnlyDecimalNumberKey = function () {
        var _this = this;
        document.getElementById("activityAmount").value = "";
        setTimeout(function () {
            document.getElementById("activityAmount").value = _this.activityAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }, 100);
    };
    // activity line detail modal  
    ActivityComponent.prototype.btnActivityDetailModal = function (add) {
        var _this = this;
        document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-save fa-fw'></i> Save";
        document.getElementById("btnActivitySave").disabled = false;
        document.getElementById("btnActivityClose").disabled = false;
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        if (currentSelectedActivity.LeadId > 0) {
            this.isSupport = false;
            this.activityParticularCategories = ['Lead'];
            this.activityStatus = ['OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING'];
        }
        else {
            if (currentSelectedActivity.QuotationId > 0) {
                this.isSupport = false;
                this.activityParticularCategories = ['Quotation'];
                this.activityStatus = ['OPEN', 'CLOSE', 'CANCELLED', 'FOR CLOSING'];
            }
            else {
                if (currentSelectedActivity.DeliveryId > 0) {
                    this.isSupport = false;
                    this.activityParticularCategories = ['Delivery'];
                    this.activityStatus = ['OPEN', 'CLOSE', 'DONE', 'CANCELLED', 'FOR CLOSING'];
                }
                else {
                    if (currentSelectedActivity.SupportId > 0) {
                        this.isSupport = true;
                        this.activityParticularCategories = [
                            'New Installation',
                            'Software Bug',
                            'Data Tracing',
                            'New Feature',
                            'Data Tracing',
                            'Hardware or Infrastructure Problem',
                            'Retraining',
                            'Reinstallation',
                            'Progam Update',
                            'Data Archive'
                        ];
                        this.activityStatus = ['OPEN', 'CLOSE', 'DONE', 'WAITING FOR CLIENT', 'CANCELLED', 'FOR CLOSING'];
                    }
                    else {
                        if (currentSelectedActivity.SoftwareDevelopmentId > 0) {
                            this.isSupport = false;
                            this.activityParticularCategories = [
                                'Report',
                                'Form',
                                'Query',
                                'Module',
                                'Others'
                            ];
                            this.activityStatus = ['OPEN', 'CLOSE', 'DONE', 'CANCELLED', 'FOR CLOSING'];
                        }
                        else {
                            this.activityParticularCategories = [''];
                            this.activityStatus = [''];
                        }
                    }
                }
            }
        }
        if (add) {
            this.hasNoActivity = false;
            this.hasActivity = true;
            setTimeout(function () {
                _this.activityDetailModalString = "Add";
                _this.activityId = 0;
                _this.activityDateValue = new Date();
                _this.activityParticularCategorySelectedValue = "New Installation";
                document.getElementById("activityParticulars").value = "";
                _this.activityNoOfHoursSelectedValue = "0";
                document.getElementById("activityAmount").value = "0";
                _this.activityAmount = "0";
                _this.activityStatusSelectedValue = "OPEN";
            }, 200);
        }
        else {
            if (currentSelectedActivity.Id > 0) {
                this.hasNoActivity = false;
                this.hasActivity = true;
                setTimeout(function () {
                    _this.activityDetailModalString = "Edit";
                    _this.activityId = currentSelectedActivity.Id;
                    _this.activityDateValue = new Date(currentSelectedActivity.ActivityDate);
                    _this.activityParticularCategorySelectedValue = currentSelectedActivity.ParticularCategory;
                    document.getElementById("activityParticulars").value = currentSelectedActivity.Activity;
                    _this.activityNoOfHoursSelectedValue = currentSelectedActivity.NumberOfHours;
                    document.getElementById("activityAmount").value = currentSelectedActivity.ActivityAmount.toLocaleString();
                    _this.activityAmount = currentSelectedActivity.ActivityAmount.toLocaleString();
                    _this.activityStatusSelectedValue = currentSelectedActivity.ActivityStatus;
                    _this.activityAssignedToSelectedValue = currentSelectedActivity.StaffUserId;
                }, 200);
            }
            else {
                this.hasNoActivity = true;
                this.hasActivity = false;
                document.getElementById("btnActivitySave").disabled = true;
            }
        }
    };
    // get activity data
    ActivityComponent.prototype.getActivityDataValue = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        var customerId = "NULL";
        if (currentSelectedActivity.CustomerId > 0) {
            customerId = currentSelectedActivity.CustomerId;
        }
        var productId = "NULL";
        if (currentSelectedActivity.ProductId > 0) {
            productId = currentSelectedActivity.ProductId;
        }
        var leadId = "NULL";
        if (currentSelectedActivity.LeadId > 0) {
            leadId = currentSelectedActivity.LeadId;
        }
        var quotationId = "NULL";
        if (currentSelectedActivity.QuotationId > 0) {
            quotationId = currentSelectedActivity.QuotationId;
        }
        var deliveryId = "NULL";
        if (currentSelectedActivity.DeliveryId > 0) {
            deliveryId = currentSelectedActivity.DeliveryId;
        }
        var supportId = "NULL";
        if (currentSelectedActivity.SupportId > 0) {
            supportId = currentSelectedActivity.SupportId;
        }
        var softwareDevelopmentId = "NULL";
        if (currentSelectedActivity.SoftwareDevelopmentId > 0) {
            softwareDevelopmentId = currentSelectedActivity.SoftwareDevelopmentId;
        }
        var activityDataObject = {
            ActivityDate: this.activityDateValue.toLocaleDateString(),
            StaffUserId: this.activityAssignedToSelectedValue,
            CustomerId: customerId,
            ProductId: productId,
            ParticularCategory: this.activityParticularCategorySelectedValue,
            Particulars: document.getElementById("activityParticulars").value,
            NumberOfHours: this.activityNoOfHoursSelectedValue,
            ActivityAmount: this.activityAmount,
            ActivityStatus: this.activityStatusSelectedValue,
            LeadId: leadId,
            QuotationId: quotationId,
            DeliveryId: deliveryId,
            SupportId: supportId,
            SoftwareDevelopmentId: softwareDevelopmentId,
            LeadStatus: this.activityStatusSelectedValue
        };
        return activityDataObject;
    };
    // save activity
    ActivityComponent.prototype.btnActivitySaveClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnActivitySave").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Saving";
        document.getElementById("btnActivitySave").disabled = true;
        document.getElementById("btnActivityClose").disabled = true;
        if (this.activityId == 0) {
            this.activityService.postActivityData(this.getActivityDataValue(), toastr);
        }
        else {
            this.activityService.putActivityData(this.activityId, this.getActivityDataValue(), toastr);
        }
    };
    // activity delete confirmation modal
    ActivityComponent.prototype.btnActivityDeleteConfirmationModal = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        this.activityId = currentSelectedActivity.Id;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-trash fa-fw'></i> Delete";
        document.getElementById("btnActivityDeleteConfirmation").disabled = false;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = false;
    };
    // activity delete confirmation click
    ActivityComponent.prototype.btnActivityDeleteConfirmationClick = function () {
        this.startLoading();
        var toastr;
        document.getElementById("btnActivityDeleteConfirmation").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Deleting";
        document.getElementById("btnActivityDeleteConfirmation").disabled = true;
        document.getElementById("btnActivityCloseDeleteConfirmation").disabled = true;
        this.activityService.deleteActivityData(this.activityId, toastr);
    };
    // print
    ActivityComponent.prototype.btnActivityPrintClick = function () {
        var toastr;
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        if (currentSelectedActivity.Id > 0) {
            window.open('http://api.innosoft.ph/RepActivityTicket/activityTicket?activityId=' + currentSelectedActivity.Id, "_target");
        }
        else {
            this.toastr.error('', 'No activity to print');
        }
    };
    // document
    ActivityComponent.prototype.btnDocumentClick = function () {
        var currentSelectedActivity = this.activityCollectionView.currentItem;
        if (currentSelectedActivity.LeadId > 0) {
            this.startLoading();
            this.router.navigate(['/leadDetail', currentSelectedActivity.LeadId]);
        }
        else {
            if (currentSelectedActivity.QuotationId > 0) {
                this.startLoading();
                this.router.navigate(['/quotationDetail', currentSelectedActivity.QuotationId]);
            }
            else {
                if (currentSelectedActivity.DeliveryId > 0) {
                    this.startLoading();
                    this.router.navigate(['/deliveryDetail', currentSelectedActivity.DeliveryId]);
                }
                else {
                    if (currentSelectedActivity.SupportId > 0) {
                        this.startLoading();
                        this.router.navigate(['/supportDetail', currentSelectedActivity.SupportId]);
                    }
                    else {
                        if (currentSelectedActivity.SoftwareDevelopmentId > 0) {
                            this.startLoading();
                            this.router.navigate(['/softwareDevelopmentDetail', currentSelectedActivity.SoftwareDevelopmentId]);
                        }
                        else {
                            this.toastr.error('', 'No Document');
                        }
                    }
                }
            }
        }
    };
    // refresh grid
    ActivityComponent.prototype.refreshGrid = function () {
        this.startLoading();
        document.getElementById("btnRefresh").disabled = true;
        document.getElementById("btnRefresh").innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Refreshing";
        this.getActivityData();
    };
    // show menu
    ActivityComponent.prototype.showMenu = function () {
        document.getElementById("showTop").click();
    };
    ActivityComponent.prototype.backClicked = function () {
        window.history.back();
    };
    // init(s: wjGrid.FlexGrid) {
    //   s.rows.defaultSize = 100;
    // }
    // initialization
    ActivityComponent.prototype.ngOnInit = function () {
        this.setActivityDateRanged();
    };
    ActivityComponent = __decorate([
        core_1.Component({
            selector: 'my-activity',
            templateUrl: 'app/activity/activity.html'
        }), 
        __metadata('design:paramtypes', [activity_service_1.ActivityService, router_1.Router, ng2_toastr_1.ToastsManager, core_1.ViewContainerRef, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], ActivityComponent);
    return ActivityComponent;
}());
exports.ActivityComponent = ActivityComponent;
//# sourceMappingURL=activity.component.js.map