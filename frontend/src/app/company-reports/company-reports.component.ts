import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bill } from '../models/bill';
import { Company } from '../models/company';
import { Item } from '../models/item';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-reports',
  templateUrl: './company-reports.component.html',
  styleUrls: ['./company-reports.component.css']
})
export class CompanyReportsComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService, private modalService: NgbModal) { }

  company: Company;
  currDate: string = '';
  totalPrice: number = 0;
  totalTax: number = 0;
  currBillId: number = 0;
  currItems: Item[] = [];

  bills: Bill[];
  currBill: Bill;

  errorMessage: string = '';
  successMessage: string = '';
  closeResult: string = '';

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'company') {
      this.router.navigate(['/']);
    }
    this.company = JSON.parse(localStorage.getItem('activeUser'));
    this.initialize();
  }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  calculateDate() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate())
    ].join('-');
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

  initialize() {
    this.currDate = this.calculateDate();
    const data = {
      companyUsername: this.company.username,
      active: false
    };
    this.companyService.loadBills(data).subscribe((json) => {
      if(json['status']=='OK') {
        this.bills = json['bills'];
        for(let i = 0; i < this.bills.length; i++) {
          if(this.bills[i].date = this.currDate) {
            this.totalPrice += this.bills[i].price;
            if(this.company.isPDV) this.totalTax += this.bills[i].tax;
          }
        }
      }
      else {
        this.bills = [];
      }
    })
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

  exportDailyReport() {
    const data = {
      companyUsername: this.company.username,
      companyName: this.company.company_name,
      pib: this.company.pib,
      date: this.currDate,
      price: this.totalPrice,
      tax: this.totalTax
    }
    this.companyService.exportDailyReport(data).subscribe((json) => {
      if(json['status']=='OK') {
        this.successMessage = 'Daily report exported successfully!';
      }
      else {
        this.errorMessage = 'Failed to export daily report!';
      }
    })
  }

}
