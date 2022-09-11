import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminActivatecompanyComponent } from './admin-activatecompany/admin-activatecompany.component';
import { AdminAddcompanyComponent } from './admin-addcompany/admin-addcompany.component';
import { AdminAddcustomerComponent } from './admin-addcustomer/admin-addcustomer.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegComponent } from './admin-reg/admin-reg.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CompanyAdditionalInfoComponent } from './company-additional-info/company-additional-info.component';
import { CompanyArticlesComponent } from './company-articles/company-articles.component';
import { CompanyBillsComponent } from './company-bills/company-bills.component';
import { CompanyGoodsComponent } from './company-goods/company-goods.component';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { CompanyOrderersComponent } from './company-orderers/company-orderers.component';
import { CompanyReportsComponent } from './company-reports/company-reports.component';
import { CompanyTablesComponent } from './company-tables/company-tables.component';
import { CustomerBillsComponent } from './customer-bills/customer-bills.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'company-home', component: CompanyHomeComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'admin-home', component: AdminHomeComponent},
  {path: 'customer-home', component: CustomerHomeComponent},
  {path: 'admin-activatecompany', component: AdminActivatecompanyComponent},
  {path: 'admin-addcompany', component: AdminAddcompanyComponent},
  {path: 'admin-addcustomer', component: AdminAddcustomerComponent},
  {path: 'admin-reg', component: AdminRegComponent},
  {path: 'company-additional-info', component: CompanyAdditionalInfoComponent},
  {path: 'company-orderers', component: CompanyOrderersComponent},
  {path: 'company-goods', component: CompanyGoodsComponent},
  {path: 'company-articles', component: CompanyArticlesComponent},
  {path: 'company-tables', component: CompanyTablesComponent},
  {path: 'company-bills', component: CompanyBillsComponent},
  {path: 'company-reports', component: CompanyReportsComponent},
  {path: 'customer-bills', component: CustomerBillsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
