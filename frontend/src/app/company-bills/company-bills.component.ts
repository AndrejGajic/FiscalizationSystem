import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../models/article';
import { ArticleInfo } from '../models/articleInfo';
import { Bill } from '../models/bill';
import { Company } from '../models/company';
import { Table } from '../models/table';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-bills',
  templateUrl: './company-bills.component.html',
  styleUrls: ['./company-bills.component.css']
})
export class CompanyBillsComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService, private modalService: NgbModal) { }

  company: Company;
  bills: Bill[] = [];

  articleId: number;
  articleAmount: number;
  itemPrice: number = 0;

  errorMessage: string = '';
  successMessage: string = '';

  payingMethod: string = '';
  customerID: string = '';
  payed: number = 0;
  change: number = 0;
  firstname: number = 0;
  lastname: number = 0;
  slip: string = '';
  ordererUsername: string = '';

  newBillID: number = 0;
  newBillStorageID: number = 0;
  newBillTableID: number = 0;

  currTables: Table[] = [];
  articlesInfo: ArticleInfo[] = [];
  articleInfo: ArticleInfo;
  closeResult: string = '';

  updatingBillId: number;
  amount: number;

  activeModal: number = 0;

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'company') {
      this.router.navigate(['/']);
    }
    this.company = JSON.parse(localStorage.getItem('activeUser'));
    this.loadCompany();
    this.loadBills();
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
    })
  }

  loadBills() {
    const data = {
      companyUsername: this.company.username,
      active: true
    };
    this.companyService.loadBills(data).subscribe((json) => {
      if(json['status']=='OK') {
        this.bills = json['bills'];
      }
      else {
        this.bills = [];
      }
    });
  }

  open(billId, storageId, tableId, content, active) {
    this.updatingBillId = billId;
    this.activeModal = active;
    for(let i = 0; i < this.company.storages.length; i++) {
      if(this.company.storages[i].id == storageId) {
        this.articlesInfo = this.company.storages[i].articles;
        break;
      }
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  addItem() {
    this.itemPrice = this.amount * this.articleInfo.sellPrice;
    let tax = 0;
    if(this.company.isPDV) {
      tax = this.itemPrice * this.articleInfo.taxRate / 100;
    }
    let name;
    for(let i = 0; i < this.articlesInfo.length; i++) {
      if(this.articlesInfo[i].id == String(this.articleId)) {
        name = this.articlesInfo[i].name;
      }
    }
    const item = {
      'articleId': this.articleId,
      'articleName': name,
      'amount': this.amount,
      'price': this.itemPrice
    };
    const data = {
      companyUsername: this.company.username,
      id: this.updatingBillId,
      tax: tax,
      item: item
    };
    console.log(this.updatingBillId);
    this.companyService.addItem(data).subscribe((json) => {
      if(json['status']=='OK') {
        this.successMessage = 'Item successfully added to bill ' + this.updatingBillId + '!';
        this.modalService.dismissAll();
        window.location.reload();
      }
      else {
        this.errorMessage = 'Failed adding item to bill ' + this.updatingBillId + '!';
      }
    });
  }

  finishBill() {
    if(this.payingMethod == 'cash') {
      for(let i = 0; i < this.bills.length; i++) {
        if(this.bills[i].id == this.updatingBillId) {
          this.change = this.payed - this.bills[i].price;
          if(this.change < 0) {
            this.errorMessage = 'Customer gave less money! Price of the bill is ' + this.bills[i].price + '!';
            return;
          }
        }
      }
    }
    else {
      this.change = 0;
    }
    const data = {
      companyUsername: this.company.username,
      id: this.updatingBillId,
      payingMethod: this.payingMethod,
      customerID: this.customerID,
      payed: this.payed,
      change: this.change,
      firstname: this.firstname,
      lastname: this.lastname,
      slip: this.slip,
      ordererUsername: this.ordererUsername
    };
    console.log(data);
    this.companyService.finishBill(data).subscribe((json) => {
      if(json['status']=='OK') {
        this.successMessage = 'Bill ' + this.updatingBillId + ' finalized!';
        window.location.reload();
      }
      else {
        this.errorMessage = 'Failed to finalize bill ' + this.updatingBillId + '!';
      }
    });
  }

  loadStorage() {
    for(let i = 0; i < this.company.storages.length; i++) {
      if(this.company.storages[i].id == String(this.newBillStorageID)) {
        this.currTables = this.company.storages[this.newBillStorageID - 1].tables;
        break;
      }
    }
  }

  setArticleInfo() {
    for(let i = 0; i < this.articlesInfo.length; i++) {
      if(String(this.articleId) == this.articlesInfo[i].id) {
        this.articleInfo = this.articlesInfo[i];
      }
    }
  }

  addBill() {
    let storageName;
    for(let i = 0; i < this.company.storages.length; i++) {
      if(this.company.storages[i].id == String(this.newBillStorageID)) {
        storageName = this.company.storages[i].name;
        break;
      }
    }
    const data = {
      id: this.newBillID,
      companyUsername: this.company.username,
      companyName: this.company.company_name,
      storageId: this.newBillStorageID,
      storageName: storageName,
      tableId: this.newBillTableID,
      items: [],
      price: 0,
      active: true
    }
    this.companyService.checkIfBillExists(data).subscribe((json) => {
      if(json['status']=='OK') {
        this.companyService.addBill(data).subscribe((json) => {
          if(json['status']=='OK') {
            this.successMessage = 'Bill ' + this.newBillID + ' added!';
            window.location.reload();
          }
          else {
            this.errorMessage = 'Failed to add bill ' + this.newBillID + '!';
          }
        });
      }
      else {
        this.errorMessage = 'Bill in this object and on this table is already active!';
      }
    });
  }



}
