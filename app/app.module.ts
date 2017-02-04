// angular modules and other libraries
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import * as wjFlexGrid from 'wijmo/wijmo.angular2.grid';
import * as wjInput from 'wijmo/wijmo.angular2.input';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared-header/header.component';
import { FooterComponent } from './shared-footer/footer.component';
import { HomeComponent } from './home-landing-page/home.component';
import { AboutComponent } from './home-about/about.component';
import { SupportComponent } from './home-support/support.component';
import { ContactComponent } from './home-contact/contact.component';
import { LoginComponent } from './security-login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './setup-customer/customer.component';
import { ProductComponent } from './setup-product/product.component';
import { UserComponent } from './setup-user/user.component';
import { LeadComponent } from './activity-lead/lead.component';
import { LeadDetailComponent } from './activity-lead/leadDetail.component';
import { QuotationComponent } from './activity-quotation/quotation.component';
import { QuotationDetailComponent } from './activity-quotation/quotationDetail.component';
import { DeliveryComponent } from './activity-delivery/delivery.component';
import { DeliveryDetailComponent } from './activity-delivery/deliveryDetail.component';
import { ContinuityComponent } from './activity-continuity/continuity.component';
import { SupportActivityComponent } from './activity-support/support.component';
import { SupportDetailComponent } from './activity-support/supportDetail.component';

// services
import { LoginService } from './security-login/login.service';
import { CustomerService } from './setup-customer/customer.service';
import { ProductService } from './setup-product/product.service';
import { UserService } from './setup-user/user.service';
import { LeadService } from './activity-lead/lead.service';
import { QuotationService } from './activity-quotation/quotation.service';
import { DeliveryService } from './activity-delivery/delivery.service';
import { ContinuityService } from './activity-continuity/continuity.service';
import { SupportService } from './activity-support/support.service';

// paths and Routes
const appRoutes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'support', component: SupportComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'product', component: ProductComponent },
  { path: 'user', component: UserComponent },
  { path: 'lead', component: LeadComponent },
  { path: 'leadDetail/:id', component: LeadDetailComponent },
  { path: 'quotation', component: QuotationComponent },
  { path: 'quotationDetail/:id', component: QuotationDetailComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'deliveryDetail/:id', component: DeliveryDetailComponent },
  { path: 'continuity', component: ContinuityComponent },
  { path: 'supportActivity', component: SupportActivityComponent },
  { path: 'supportDetail/:id', component: SupportDetailComponent }
];

// module
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    ToastModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [
    AppComponent,
    wjFlexGrid.WjFlexGrid,
    wjFlexGrid.WjFlexGridColumn,
    wjFlexGrid.WjFlexGridCellTemplate,
    wjInput.WjComboBox,
    wjInput.WjInputDate,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    SupportComponent,
    ContactComponent,
    LoginComponent,
    DashboardComponent,
    CustomerComponent,
    ProductComponent,
    UserComponent,
    LeadComponent,
    LeadDetailComponent,
    QuotationComponent,
    QuotationDetailComponent,
    DeliveryComponent,
    DeliveryDetailComponent,
    ContinuityComponent,
    SupportActivityComponent,
    SupportDetailComponent
  ],
  providers: [
    LoginService,
    CustomerService,
    ProductService,
    UserService,
    LeadService,
    QuotationService,
    DeliveryService,
    ContinuityService,
    SupportService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }

// Bootstrap application with hash style navigation and global services.
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);