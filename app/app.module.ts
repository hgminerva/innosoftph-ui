// angular modules
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// wijmo
import * as wjFlexGrid from 'wijmo/wijmo.angular2.grid';
import * as wjInput from 'wijmo/wijmo.angular2.input';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SupportComponent } from './support/support.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { LeadComponent } from './lead/lead.component';
import { LeadDetailComponent } from './lead/leadDetail.component';

// services
import { LoginService } from './login/login.service';
import { CustomerService } from './customer/customer.service';
import { ProductService } from './product/product.service';
import { UserService } from './user/user.service';
import { LeadService } from './lead/lead.service';
import { LeadDetailService } from './lead/leadDetail.service';

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
  { path: 'leadDetail/:id', component: LeadDetailComponent }
];

// module
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    ToastModule
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
    LeadDetailComponent
  ],
  providers: [
    LoginService,
    CustomerService,
    ProductService,
    UserService,
    LeadService,
    LeadDetailService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }

// Bootstrap application with hash style navigation and global services.
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);