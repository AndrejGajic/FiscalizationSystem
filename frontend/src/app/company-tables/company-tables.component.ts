import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Table } from '../models/table';

@Component({
  selector: 'app-company-tables',
  templateUrl: './company-tables.component.html',
  styleUrls: ['./company-tables.component.css']
})
export class CompanyTablesComponent implements OnInit {


  constructor(private router: Router, private companyService: CompanyService, private modalService: NgbModal) { }

  company: Company;
  activeTab: number = 0;

  errorMessage: string = '';
  successMessage: string = '';
  storageId: number = 0;
  storageName: string = '';
  closeResult: string = '';

  tables: Table[] = [];

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'company') {
      this.router.navigate(['/']);
    }
    this.company = JSON.parse(localStorage.getItem('activeUser'));
    this.loadCompany();
    this.activateTab(0);
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    this.router.navigate(['/']);
  }

  loadCompany() {
    this.companyService.getCompany(this.company.username).subscribe((json) => {
      this.company = json['company'];
      localStorage.removeItem('activeUser');
      localStorage.setItem('activeUser', JSON.stringify(this.company));
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  activateTab(i) {
    let storage = this.company.storages[i];
    this.tables = [];
    for(let j = 0; j < storage.tables.length; j++) {
      this.tables.push(storage.tables[j]);
    }

  }

  addStorage() {
    if(this.storageId < 1 || this.storageName == '') {
      this.errorMessage = 'All fields required!';
    } 
    else {
      let tables = [
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
      ];
      
      const data = {
        companyUsername: this.company.username,
        id: this.storageId,
        name: this.storageName,
        articles: [],
        tables: tables
      };
      
      this.companyService.addStorage(data).subscribe((json) => {
        if(json['status']=='OK') {
          this.successMessage = 'Storage added successfully!';
          this.companyService.getCompany(this.company.username).subscribe((json) => {
            this.company = json['company'];
            console.log(this.company);
            localStorage.removeItem('activeUser');
            localStorage.setItem('activeUser', JSON.stringify(this.company));
            window.location.reload();
          });
        }
      });
    }
  }
}
