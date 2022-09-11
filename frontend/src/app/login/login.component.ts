import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Company } from '../models/company';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';
import { User } from '../models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bill } from '../models/bill';
import { CompanyService } from '../services/company.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  errorMessage: string = "";

  bills: Bill[] = [];
  currBill: Bill;

  currBillId: number;
  currItems: Item[] = [];
  closeResult: string = '';

  constructor(private userService: UserService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadBills();
  }

  login() {
    if(this.username == "") {
      this.errorMessage = "Username required!";
    }
    else if(this.password == "") {
      this.errorMessage = "Password required!";
    }
    else {
      this.errorMessage = "";
      this.userService.login(this.username, this.password).subscribe((json) => {
        let message = json['message'];
        if(message != 'OK') {
          this.errorMessage = 'User does not exist!';
        }
        else {
          let user: User = json['user'];
          let type = user.type;
          if(type == 'company') {
            this.userService.getCompany(this.username, this.password).subscribe((json) => {
              let company: Company = json['company'];
              if(company && company.active) {
                localStorage.setItem('activeUser', JSON.stringify(company));
                localStorage.setItem('activeType', 'company');
                this.userService.isCompanyVerified(this.username).subscribe((verified) => {
                  if(verified == 1) {
                    this.router.navigate(['/company-home']);
                  }
                  else {
                    this.router.navigate(['/company-additional-info']);
                  }
                });
              }
              else if(company && !company.active)  {
                this.errorMessage = 'This company is not active!';
              } 
              else {
                this.errorMessage = 'Unknown error occurred!';
              }
            });
          }
          else if(type == 'customer') {
            this.userService.getCustomer(this.username, this.password).subscribe((json) => {
              let customer: Customer = json['customer'];
              if(customer) {
                localStorage.setItem('activeUser', JSON.stringify(customer));
                localStorage.setItem('activeType', 'customer');
                this.router.navigate(['/customer-home']);
              }
              else {
                this.errorMessage = 'Unknown error occurred!';
              }
            });
          }
          else if(type == 'admin') {
            this.errorMessage = 'Admin cannot log here!';
          }
          else {
            this.errorMessage = 'Type not known!';
          }
        }
      });
    }
  }

  loadBills() {
    this.userService.getAllBills().subscribe((json) => {
      let allBills = json['bills'];
      console.log(allBills);
      for(let i = allBills.length - 1; i >= 0 && i > allBills.length - 6; i--) {
        this.bills.push(allBills[i]);
      }
    });
  }

  open(billId, content) {
    this.currBillId = billId;
    for(let i = 0; i < billId; i++) {
      if(this.bills[i].id == billId) {
        this.currBill = this.bills[i];
        this.currItems = this.bills[i].items;
        break;
      }
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

}
