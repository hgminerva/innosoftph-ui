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
// angular modules and other libraries
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var http_1 = require("@angular/http");
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var wjFlexGrid = require('wijmo/wijmo.angular2.grid');
var wjInput = require('wijmo/wijmo.angular2.input');
// components
var app_component_1 = require('./app.component');
var header_component_1 = require('./shared-header/header.component');
var footer_component_1 = require('./shared-footer/footer.component');
var home_component_1 = require('./home-landing-page/home.component');
var about_component_1 = require('./home-about/about.component');
var support_component_1 = require('./home-support/support.component');
var contact_component_1 = require('./home-contact/contact.component');
var login_component_1 = require('./security-login/login.component');
var dashboard_component_1 = require('./dashboard/dashboard.component');
var customer_component_1 = require('./setup-customer/customer.component');
var product_component_1 = require('./setup-product/product.component');
var user_component_1 = require('./setup-user/user.component');
var lead_component_1 = require('./activity-lead/lead.component');
var leadDetail_component_1 = require('./activity-lead/leadDetail.component');
var quotation_component_1 = require('./activity-quotation/quotation.component');
var quotationDetail_component_1 = require('./activity-quotation/quotationDetail.component');
var delivery_component_1 = require('./activity-delivery/delivery.component');
var deliveryDetail_component_1 = require('./activity-delivery/deliveryDetail.component');
var continuity_component_1 = require('./activity-continuity/continuity.component');
var support_component_2 = require('./activity-support/support.component');
var supportDetail_component_1 = require('./activity-support/supportDetail.component');
// services
var login_service_1 = require('./security-login/login.service');
var customer_service_1 = require('./setup-customer/customer.service');
var product_service_1 = require('./setup-product/product.service');
var user_service_1 = require('./setup-user/user.service');
var lead_service_1 = require('./activity-lead/lead.service');
var quotation_service_1 = require('./activity-quotation/quotation.service');
var delivery_service_1 = require('./activity-delivery/delivery.service');
var continuity_service_1 = require('./activity-continuity/continuity.service');
var support_service_1 = require('./activity-support/support.service');
// paths and Routes
var appRoutes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'app', component: app_component_1.AppComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'support', component: support_component_1.SupportComponent },
    { path: 'contact', component: contact_component_1.ContactComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'customer', component: customer_component_1.CustomerComponent },
    { path: 'product', component: product_component_1.ProductComponent },
    { path: 'user', component: user_component_1.UserComponent },
    { path: 'lead', component: lead_component_1.LeadComponent },
    { path: 'leadDetail/:id', component: leadDetail_component_1.LeadDetailComponent },
    { path: 'quotation', component: quotation_component_1.QuotationComponent },
    { path: 'quotationDetail/:id', component: quotationDetail_component_1.QuotationDetailComponent },
    { path: 'delivery', component: delivery_component_1.DeliveryComponent },
    { path: 'deliveryDetail/:id', component: deliveryDetail_component_1.DeliveryDetailComponent },
    { path: 'continuity', component: continuity_component_1.ContinuityComponent },
    { path: 'supportActivity', component: support_component_2.SupportActivityComponent },
    { path: 'supportDetail/:id', component: supportDetail_component_1.SupportDetailComponent }
];
// module
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(appRoutes),
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_toastr_1.ToastModule,
                ng2_slim_loading_bar_1.SlimLoadingBarModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent,
                wjFlexGrid.WjFlexGrid,
                wjFlexGrid.WjFlexGridColumn,
                wjFlexGrid.WjFlexGridCellTemplate,
                wjInput.WjComboBox,
                wjInput.WjInputDate,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                home_component_1.HomeComponent,
                about_component_1.AboutComponent,
                support_component_1.SupportComponent,
                contact_component_1.ContactComponent,
                login_component_1.LoginComponent,
                dashboard_component_1.DashboardComponent,
                customer_component_1.CustomerComponent,
                product_component_1.ProductComponent,
                user_component_1.UserComponent,
                lead_component_1.LeadComponent,
                leadDetail_component_1.LeadDetailComponent,
                quotation_component_1.QuotationComponent,
                quotationDetail_component_1.QuotationDetailComponent,
                delivery_component_1.DeliveryComponent,
                deliveryDetail_component_1.DeliveryDetailComponent,
                continuity_component_1.ContinuityComponent,
                support_component_2.SupportActivityComponent,
                supportDetail_component_1.SupportDetailComponent
            ],
            providers: [
                login_service_1.LoginService,
                customer_service_1.CustomerService,
                product_service_1.ProductService,
                user_service_1.UserService,
                lead_service_1.LeadService,
                quotation_service_1.QuotationService,
                delivery_service_1.DeliveryService,
                continuity_service_1.ContinuityService,
                support_service_1.SupportService,
                ng2_toastr_1.ToastModule
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
// Bootstrap application with hash style navigation and global services.
core_1.enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.module.js.map