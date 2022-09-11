import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bill } from '../models/bill';
import { Customer } from '../models/customer';
import { Item } from '../models/item';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-bills',
  templateUrl: './customer-bills.component.html',
  styleUrls: ['./customer-bills.component.css']
})
export class CustomerBillsComponent implements OnInit {

  constructor(private router: Router, private customerService: CustomerService, private modalService: NgbModal) { }

  customer: Customer;

  errorMessage: string = '';
  successMessage: string = '';
  closeResult: string = '';

  currBillId: number;
  bills: Bill[] = [];
  currBill: Bill;
  currItems: Item[] = [];

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'customer') {
      this.router.navigate(['/']);
    }
    this.customer = JSON.parse(localStorage.getItem('activeUser'));
    this.loadBills();
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

  loadBills() {
    const data = {
      customerID: this.customer.customerID
    };
    this.customerService.loadBills(data).subscribe((json) => {
      console.log(json);
      this.bills = json['bills'];
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

}
