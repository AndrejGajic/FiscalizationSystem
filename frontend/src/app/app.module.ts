import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { AdminRegComponent } from './admin-reg/admin-reg.component';
import { AdminAddcompanyComponent } from './admin-addcompany/admin-addcompany.component';
import { AdminAddcustomerComponent } from './admin-addcustomer/admin-addcustomer.component';
import { AdminActivatecompanyComponent } from './admin-activatecompany/admin-activatecompany.component';
import { CompanyAdditionalInfoComponent } from './company-additional-info/company-additional-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyOrderersComponent } from './company-orderers/company-orderers.component';
import { CompanyGoodsComponent } from './company-goods/company-goods.component';
import { CompanyArticlesComponent } from './company-articles/company-articles.component';
import { CompanyTablesComponent } from './company-tables/company-tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyBillsComponent } from './company-bills/company-bills.component';
import { CompanyReportsComponent } from './company-reports/company-reports.component';
import { CustomerBillsComponent } from './customer-bills/customer-bills.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompanyHomeComponent,
    AdminHomeComponent,
    RegisterComponent,
    ChangePasswordComponent,
    CustomerHomeComponent,
    AdminRegComponent,
    AdminAddcompanyComponent,
    AdminAddcustomerComponent,
    AdminActivatecompanyComponent,
    CompanyAdditionalInfoComponent,
    CompanyOrderersComponent,
    CompanyGoodsComponent,
    CompanyArticlesComponent,
    CompanyTablesComponent,
    CompanyBillsComponent,
    CompanyReportsComponent,
    CustomerBillsComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
