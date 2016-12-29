// angular modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from "@angular/http";

// import components
import { AppComponent }  from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
import { SupportComponent } from './support/support.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// services
import { LoginService } from './loginService/login.service';

// paths and Routes
const appRoutes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'support', component: SupportComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
];

// module
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ServicesComponent,
    SupportComponent,
    TeamComponent,
    ContactComponent,
    LoginComponent,
    DashboardComponent
  ],
  providers: [
    LoginService
  ],
  bootstrap: [ 
    AppComponent 
  ]
})

export class AppModule { }
