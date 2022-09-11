import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../models/article';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-goods',
  templateUrl: './company-goods.component.html',
  styleUrls: ['./company-goods.component.css']
})
export class CompanyGoodsComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService) { }

  company: Company;
  articles: Article[] = [];
  activeTab: number = 1;

  inserting: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  totalRows: number = 0;

  id: string = '';
  name: string = '';
  unitOfMeasure: string = '';
  taxRate: number = 0;
  type: string = '';
  origin: string = '';
  originalName: string = '';
  barcode: string = '';
  manufacturer: string = '';
  customsRate: number = 0;
  ecoTax: boolean = false;
  exciseTax: boolean = false;
  desiredStockMin: number = 0;
  desiredStockMax: number = 0;
  about: string = '';
  declaration: string = '';
  image: string = '';

  purchasePrices: number[] = [];
  sellPrices: number[] = [];
  currentStock: number[] = [];
  minDesiredStockStorage: number[] = [];
  maxDesiredStockStorage: number[] = [];

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'company') {
      this.router.navigate(['/']);
    }
    this.company = JSON.parse(localStorage.getItem('activeUser'));
    this.getArticles();
    this.purchasePrices = [];
    this.sellPrices = [];
    this.currentStock = [];
    this.minDesiredStockStorage = [];
    this.maxDesiredStockStorage = [];
    this.errorMessage = '';
    // this.successMessage = '';
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  getArticles() {
    this.companyService.getArticles(this.company.username).subscribe((json) => {
      if(json['message']=='OK') {
        this.articles = json['articles'];
        this.totalRows = this.articles.length;
      }
      else {
        this.errorMessage = 'Failed to load articles!';
      }
    })
  }

  startInserting() {
    this.errorMessage = '';
    this.successMessage = '';
    this.inserting = true;
    for(let i = 0; i < this.company.storages.length; i++) {
      this.purchasePrices.push(null);
      this.sellPrices.push(null);
      this.currentStock.push(null);
      this.minDesiredStockStorage.push(null);
      this.maxDesiredStockStorage.push(null);
    }
  }

  activateTab(tab: number) {
    this.activeTab = tab;
  }

  insertArticle() {
    if(this.id == '' || this.name == '' || this.unitOfMeasure == '' || this.type == '') {
      this.errorMessage = 'You must insert general data of a new article!';
      this.inserting = false;
    }
    else {
      this.companyService.checkArticleId(this.id, this.company.username).subscribe((res) => {
        if(res == 1) {
          this.errorMessage = 'Article ID must be unique!';
          this.inserting = false;
        }
        else {
          const data = {
            id: this.id,
            companyUsername: this.company.username,
            name: this.name,
            unitOfMeasure: this.unitOfMeasure,
            taxRate: this.taxRate,
            type: this.type,
            origin: this.origin,
            originalName: this.originalName,
            barcode: this.barcode,
            manufacturer: this.manufacturer,
            customsRate: this.customsRate,
            ecoTax: this.ecoTax,
            exciseTax: this.exciseTax,
            desiredStockMin: this.desiredStockMin,
            desiredStockMax: this.desiredStockMax,
            about: this.about,
            declaration: this.declaration,
            image: '',
            category: '',
            subcategory: ''
          }
          this.companyService.insertArticle(data).subscribe((json1) => {
            if(json1['status']=='OK') {
              this.errorMessage = '';
              for(let i = 0; i < this.company.storages.length; i++) {
                if(this.purchasePrices[i] != null && this.sellPrices[i] != null && this.currentStock[i] != null && this.minDesiredStockStorage[i] != null && this.maxDesiredStockStorage[i] != null) {
                  const articleData = {
                    id: this.id,
                    name: this.name,
                    purchasePrice: this.purchasePrices[i],
                    sellPrice: this.sellPrices[i],
                    currentStock: this.currentStock[i],
                    minDesiredStockStorage: this.minDesiredStockStorage[i],
                    maxDesiredStockStorage: this.maxDesiredStockStorage[i],
                    taxRate: this.taxRate
                  };
                  const dataS = {
                    storageId: this.company.storages[i].id,
                    username: this.company.username,
                    article: articleData
                  };
                  this.companyService.updateStorage(dataS).subscribe((json2) => {
                    
                  });
                }
              }
              this.successMessage = 'Article inserted successfuly!';
              this.companyService.getCompany(this.company.username).subscribe((json) => {
                this.company = json['company'];
                localStorage.removeItem('activeUser');
                localStorage.setItem('activeUser', JSON.stringify(this.company));
              })
              window.location.reload();
            }
            else {
              this.errorMessage = 'Error occured while inserting new article!';
              this.inserting = false;
            }
          })
        }
      })
    }
  }

  deleteArticle(articleId) {
    this.companyService.deleteArticle(articleId, this.company.username).subscribe((json) => {
      if(json['status']=='OK') {
        this.successMessage = 'Article ' + articleId + ' successfuly deleted!';
        window.location.reload();
      }
      else {
        this.errorMessage = 'Article deletion failed!';
      }
    })
  }

  updateArticle() {

  }


}
