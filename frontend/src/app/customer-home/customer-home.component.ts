import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../models/article';
import { Company } from '../models/company';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  constructor(private router: Router, private customerService: CustomerService) { }

  customer: Customer;

  errorMessage: string = '';
  successMessage: string = '';

  companies: Company[] = [];
  articles: Article[] = [];

  articleName: string = '';
  articleManufacturer: string = '';

  companyNames: string[] = [];
  minPrices: number[] = [];
  locations: string[][] = [];

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'customer') {
      this.router.navigate(['/']);
    }
    this.customer = JSON.parse(localStorage.getItem('activeUser'));
    this.loadCompanies();
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

  loadCompanies() {
    this.customerService.loadCompanies().subscribe((json) => {
      this.companies = json['companies'];
    });
  }

  loadArticles() {
    const data = {
      name: this.articleName,
      manufacturer: this.articleManufacturer
    };
    this.customerService.loadArticles(data).subscribe((json) => {
      this.articles = json['articles'];
      this.initializeArticles();
    })
  }

  initializeArticles() {
    this.companyNames = [];
    this.minPrices = [];
    this.locations = [];
    for(let i = 0; i < this.articles.length; i++) {
      let company: Company;
      for(let j = 0; j < this.companies.length; j++) {
        if(this.companies[j].username == this.articles[i].companyUsername) {
          company = this.companies[j];
          break;
        }
      }
      this.companyNames.push(company.company_name);
      let minPrice = 10000000;
      let locations: string[] = [];
      for(let j = 0; j < company.storages.length; j++) {
        let storage = company.storages[j];;
        for(let k = 0; k < storage.articles.length; k++) {
          if(storage.articles[k].id != this.articles[i].id) continue;
          if(storage.articles[k].sellPrice < minPrice) {
            minPrice = storage.articles[k].sellPrice;
          }
          locations.push(storage.name)
          break;
        }
      }
      this.minPrices.push(minPrice);
      this.locations.push(locations);
    }
  }

}
