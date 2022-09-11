import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-orderers',
  templateUrl: './company-orderers.component.html',
  styleUrls: ['./company-orderers.component.css']
})
export class CompanyOrderersComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService) { }

  company: Company;
  activeTab: number = 1;
  errorMessage: string = '';
  successMessage: string = '';
  added: boolean;

  firstname: string = "";
  lastname: string = "";
  username: string = "";
  phone: string = "";
  email: string = "";
  companyName: string = "";
  address: string = "";
  pib: string = "";
  companyNumber: string = "";
  daysForPaying: number;
  percentageOfRebate: number;
  pibOrderer: string;

  foundCompanies: Company[] = [];

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'company') {
      this.router.navigate(['/']);
    }
    this.company = JSON.parse(localStorage.getItem('activeUser'));
    if(this.added) {
      this.successMessage = 'Orderer successfully added!';
    }
  }

  activateTab(tab: number) {
    this.errorMessage = '';
    this.successMessage = '';
    this.activeTab = tab;
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

  addNewOrderer() {
    this.errorMessage = "";
    if(this.firstname == "") {
      this.errorMessage = "First name required!";
    }
    else if(this.lastname == "") {
      this.errorMessage = "Last name required!";
    }
    else if(this.username == "") {
      this.errorMessage = "Username required!";
    }
    else if(this.phone == "") {
      this.errorMessage = "Phone number required!";
    }
    else if(this.email == "") {
      this.errorMessage = "Email required!";
    }
    else if(this.address == "") {
      this.errorMessage = "Address required!";
    }
    else if(this.pib == "") {
      this.errorMessage = "PIB required!";
    }
    else if(this.companyNumber == "") {
      this.errorMessage = "Company number required!";
    }
    else {
      if(this.pib.length != 9) {
        this.errorMessage = "PIB must have 9 digits!";
      }
      else if(this.pib.charAt(0) == '0') {
        this.errorMessage = "PIB must not start with 0!";
      }
      else {
        let addressTemp: string[] = this.address.split(',');
        if(addressTemp.length != 5) {
          this.errorMessage = "Address format must be: STATE, CITY, POSTALCODE, STREET, STREETNUMBER!";
        }
        else {
          let state = addressTemp[0];
          let city = addressTemp[1].trim();
          let postalCode = addressTemp[2].trim();
          let street = addressTemp[3].trim();
          let streetNumber = addressTemp[4].trim();

          const data = {
            myUsername: this.company.username,
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            phone: this.phone,
            email: this.email,
            companyName: this.companyName,
            state: state,
            city: city,
            postalCode: postalCode,
            street: street,
            streetNumber: streetNumber,
            pib: this.pib,
            companyNumber: this.companyNumber,
            daysForPaying: this.daysForPaying,
            percentageOfRebate: this.percentageOfRebate
          };
          
          this.companyService.addNewOrderer(data).subscribe((json) => {
            let confirmationMessage = json['message'];
            if(confirmationMessage == "OK") {
              window.location.reload();
              this.successMessage = "Orderer successfuly added!";
              this.added = true;
            }
            else {
              this.errorMessage = json['message'];
            }
          });

        }
      }
    }
  }

  searchForOrderer() {
    this.errorMessage = '';
    this.successMessage = '';
    if(this.pibOrderer == '' || this.daysForPaying == null || this.percentageOfRebate == null) {
      this.errorMessage = 'All fields required!';
    }
    else {
      this.companyService.findCompaniesWithPIB(this.pibOrderer).subscribe((json) => {
        if(json['message']=='OK') {
          this.foundCompanies = json['companies'];
          if(this.foundCompanies.length == 0) {
            this.errorMessage = 'No companies with this PIB found!';
          }
        }
      })
    }
  }

  addToOrderers(i: number) {
    console.log('af');
    let orderer: Company = this.foundCompanies[0];
    const data = {
      myUsername: this.company.username,
      firstname: orderer.firstname,
      lastname: orderer.lastname,
      username: orderer.username,
      phone: orderer.phone,
      email: orderer.email,
      companyName: orderer.company_name,
      state: orderer.state,
      city: orderer.city,
      postalCode: orderer.postal_code,
      street: orderer.street,
      streetNumber: orderer.street_number,
      pib: orderer.pib,
      companyNumber: orderer.company_number,
      daysForPaying: this.daysForPaying,
      percentageOfRebate: this.percentageOfRebate
    };
    this.companyService.addNewOrderer(data).subscribe((json) => {
      let confirmationMessage = json['message'];
      if(confirmationMessage == "OK") {
        window.location.reload();
        this.successMessage = "Orderer successfuly added!";
        this.added = true;
      }
      else {
        this.errorMessage = json['message'];
      }
    });
  }

}
