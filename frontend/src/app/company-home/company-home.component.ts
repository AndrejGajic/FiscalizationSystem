import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService) { }

  activeTab: number = 1;

  allCodes: string[] = [];

  errorMessage: string = '';
  successMessage: string = '';

  changeFirstname: boolean = false;
  changeLastname: boolean = false;
  changeUsername: boolean = false;
  changeEmail: boolean = false;
  changePhone: boolean  = false;
  changeCategory: boolean = false;
  changeCodes: boolean = false;
  changePDV: boolean = false;
  newFirstname: string = "";
  newLastname: string = "";
  newUsername: string = "";
  newEmail: string = "";
  newPhone: string = "";
  newCategory: string = '';
  newCodes: string[] = [];
  newPDV: boolean = false;

  company: Company;

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'company') {
      this.router.navigate(['/']);
    }
    this.company = JSON.parse(localStorage.getItem('activeUser'));
    this.loadCompany();
    this.getCodes();
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

  loadCompany() {
    this.companyService.getCompany(this.company.username).subscribe((json) => {
      this.company = json['company'];
      localStorage.removeItem('activeUser');
      localStorage.setItem('activeUser', JSON.stringify(this.company));
    });
  }

  activateTab(tab: number) {
    this.errorMessage = '';
    this.successMessage = '';
    this.activeTab = tab;
  }

  getCodes() {
    this.companyService.getCodes().subscribe((json) => {
      let codes = json['codes'];
      for(let i = 0; i < codes.length; i++) {
        for(let j = 0; j < codes[i]['codes'].length; j++) {
          this.allCodes.push(codes[i]['codes'][j]['code']);
        }
      }
    });
  }

  changeFirstnameF() {
    this.changeFirstname = !this.changeFirstname;
  }

  changeLastnameF() {
    this.changeLastname = !this.changeLastname;
  }

  changeUsernameF() {
    this.changeUsername = !this.changeUsername;
  }

  changeEmailF() {
    this.changeEmail = !this.changeEmail;
  }

  changePhoneF() {
    this.changePhone = !this.changePhone;
  }

  changeCategoryF() {
    this.changeCategory = !this.changeCategory;
  }

  changeCodesF() {
    this.changeCodes = !this.changeCodes;
  }

  changePDVF() {
    this.changePDV = !this.changePDV;
  }
  

  changeGeneralInfo() {
    const data = {
      username: this.company.username,
      firstname: (this.changeFirstname ? this.newFirstname : this.company.firstname),
      lastname: (this.changeLastname ? this.newLastname : this.company.lastname),
      email: (this.changeEmail ? this.newEmail : this.company.email),
      phone: (this.changePhone ? this.newPhone : this.company.phone),
      category: (this.changeCategory ? this.newCategory : this.company.category),
      codes: (this.changeCodes ? this.newCodes : this.company.codes),
      isPDV: (this.changePDV ? this.newPDV : this.company.isPDV)
    };
    console.log(data);
    this.companyService.changeGeneralInfo(data).subscribe((res) => {
      if(res['status']=='OK') {
        this.successMessage = 'General information changed!';
        this.companyService.getCompany(this.company.username).subscribe((json) => {
          this.company = json['company'];
          localStorage.removeItem('activeUser');
          localStorage.setItem('activeUser', JSON.stringify(this.company));
          window.location.reload();
        });
      }
    });
  }


}
