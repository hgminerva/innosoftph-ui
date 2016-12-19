import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// import components
import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { TeamComponent } from './team/team.component';

// paths and Routes
const appRoutes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contact', component: ContactComponent }
];

// module
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    ProductsComponent,
    ServicesComponent,
    TeamComponent,
    ContactComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
