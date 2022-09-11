import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankAccount } from '../models/bank_account';
import { CashRegister } from '../models/cash_register';
import { Company } from '../models/company';
import { Storage } from '../models/storage';
import { CompanyService } from '../services/company.service';



@Component({
  selector: 'app-company-additional-info',
  templateUrl: './company-additional-info.component.html',
  styleUrls: ['./company-additional-info.component.css']
})
export class CompanyAdditionalInfoComponent implements OnInit {


  category: string = "";
  codes: string[] = [];
  pdv: boolean = false;
  account1: string = "";
  bank1: string = "";
  account2: string = "";
  bank2: string = "";
  account3: string = "";
  bank3: string = "";
  account4: string = "";
  bank4: string = "";
  account5: string = "";
  bank5: string = "";
  numOfStorages: number = 1;
  numOfCashRegisters: number = 1;

  errorMessage: string = "";
  successMessage: string = "";

  allCodes: string[] = [];

  addedInfo: boolean = false;
  addedStorages: boolean = false;
  addedRegisters: boolean = false;

  bankAccounts: BankAccount[] = [];
  storages: Storage[] = [];
  cashRegisters: CashRegister[] = [];

  storagesTemp: number[] = [];
  registersTemp: number[] = [];

  storageIds: string[] = [];
  storageNames: string[] = [];

  registerLocations: string[] = [];
  registerTypes: string[] = [];

  constructor(private router: Router, private companyService: CompanyService) { }

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'company') {
      this.router.navigate(['/']);
    }
    this.company = JSON.parse(localStorage.getItem('activeUser')); 
    this.getCodes();
  }

  company: Company;

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

  getCodes() {
    this.companyService.getCodes().subscribe((json) => {
      let codes = json['codes'];
      for(let i = 0; i < codes.length; i++) {
        for(let j = 0; j < codes[i]['codes'].length; j++) {
          this.allCodes.push(codes[i]['codes'][j]['code']);
        }
        console.log(this.allCodes);
      }
    });
  }

  returnToFirstStep() {
    this.errorMessage = '';
    this.successMessage = '';
    this.addedInfo = false;
    this.storageNames = [];
    this.storageIds = [];
    this.storagesTemp = [];
  }

  returnToSecondStep() {
    this.errorMessage = '';
    this.successMessage = '';
    this.addedStorages = false;
    this.registerLocations = [];
    this.registerTypes = [];
    this.registersTemp = [];
  }

  validateAccount(account: string): boolean {
    var regex = new RegExp("\\d\\d\\d-\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d-\\d\\d");
    if(!regex.test(account)) {
      return false;
    }
    let accountTemp: string[] = account.split('-');
    if(accountTemp.length != 3) return false;
    if(accountTemp[0].length != 3 || accountTemp[1].length != 12 || accountTemp[2].length != 2) return false;
    return true;
  }

  makeBankAccounts(): boolean {
    if(!this.validateAccount(this.account1)) {
      return false;
    }
    let bankAccount1 = new BankAccount();
    bankAccount1.account = this.account1;
    bankAccount1.bank = this.bank1;
    this.bankAccounts.push(bankAccount1);
    if(this.account2 != "" && this.bank2 != "") {
      if(!this.validateAccount(this.account2)) return false;
      let bankAccount2 = new BankAccount();
      bankAccount2.account = this.account2;
      bankAccount2.bank = this.bank2;
      this.bankAccounts.push(bankAccount2);
    }
    if(this.account3 != "" && this.bank3 != "") {
      if(!this.validateAccount(this.account3)) return false;
      let bankAccount3 = new BankAccount();
      bankAccount3.account = this.account3;
      bankAccount3.bank = this.bank3;
      this.bankAccounts.push(bankAccount3);
    }
    if(this.account4 != "" && this.bank4 != "") {
      if(!this.validateAccount(this.account4)) return false;
      let bankAccount4 = new BankAccount();
      bankAccount4.account = this.account4;
      bankAccount4.bank = this.bank4;
      this.bankAccounts.push(bankAccount4);
    }
    if(this.account5 != "" && this.bank5 != "") {
      if(!this.validateAccount(this.account5)) return false;
      let bankAccount5 = new BankAccount();
      bankAccount5.account = this.account5;
      bankAccount5.bank = this.bank5;
      this.bankAccounts.push(bankAccount5);
    }
    return true;
  }

  updateInfo() {
    this.errorMessage = "";
    this.successMessage = "";
    this.bankAccounts = [];
    if(this.category == "" || this.codes.length == 0 || this.account1 == "" || this.bank1 == "") {
      this.errorMessage = 'All fields are required!';
    }
    else if(this.numOfStorages < 1) {
      this.errorMessage = 'Number of storages must be at least 1!';
    }
    else if(this.numOfCashRegisters < 1) {
      this.errorMessage = 'Number of cash registers must be at least 1!';
    }
    else {
      if(!this.makeBankAccounts()) {
        this.errorMessage = 'Account number must be in format 3DIGITS-12DIGITS-2DIGITS!';
      }
      else {
        for(let i = 0; i < this.numOfStorages; i++) {
          this.storagesTemp.push(i);
          this.storageIds.push('');
          this.storageNames.push('');
        }
        this.addedInfo = true;
      }
    }
  }

  addStorages() {
    this.errorMessage = '';
    this.successMessage = '';
    this.storages = [];
    let valid = true;
    for(let i = 0; i < this.numOfStorages; i++) {
      if(this.storageIds[i] == '' || this.storageNames[i] == '') {
        valid = false;
        break;
      }
    }
    if(!valid) {
      this.errorMessage = 'You must insert information for all storages!';
    }
    else {
      let unique = new Set(this.storageIds);
      if(unique.size != this.storageIds.length) {
        this.errorMessage = 'Storage IDs must be unique!';
      }
      else {
        for(let i = 0; i < this.numOfStorages; i++) {
          let storage: Storage = new Storage();
          storage.id = this.storageIds[i];
          storage.name = this.storageNames[i];
          storage.articles = [];
          storage.tables = [
            {
              id: 1,
              shape: 'square',
              busy: false
            },
            {
              id: 2,
              shape: 'square',
              busy: false
            },
            {
              id: 3,
              shape: 'square',
              busy: false
            },
            {
              id: 4,
              shape: 'square',
              busy: false
            },
            {
              id: 5,
              shape: 'circle',
              busy: false
            }
          ]
          this.storages.push(storage);
        }
        for(let i = 0; i < this.numOfCashRegisters; i++) {
          this.registerLocations.push('');
          this.registerTypes.push('');
          this.registersTemp.push(i);
        }
        this.addedStorages = true;
      }
    }
  }

  addCashRegisters() {
    this.errorMessage = '';
    this.successMessage = '';
    this.cashRegisters = [];
    let valid = true;
    for(let i = 0; i < this.numOfCashRegisters; i++) {
      if(this.registerLocations[i] == '' || this.registerTypes[i] == '') {
        valid = false;
        break;
      }
    }
    if(!valid) {
      this.errorMessage = 'You must insert information for all cash registers!';
    }
    else {
      for(let i = 0; i < this.numOfCashRegisters; i++) {
        let register: CashRegister = new CashRegister();
        register.location = this.registerLocations[i];
        register.type = this.registerTypes[i];
        this.cashRegisters.push(register);
      }
      this.sendRequest();
    }
  }

  sendRequest() {
    const data = {
      username: this.company.username,
      category: this.category,
      codes: this.codes,
      isPDV: this.pdv,
      bankAccounts: this.bankAccounts,
      numOfStorages: this.numOfStorages,
      storages: this.storages,
      numOfCashRegisters: this.numOfCashRegisters,
      cashRegisters: this.cashRegisters
    };
    this.companyService.updateCompanyInfo(data).subscribe((json) => {
      this.router.navigate(['/company-home']);
    })
  }
}
