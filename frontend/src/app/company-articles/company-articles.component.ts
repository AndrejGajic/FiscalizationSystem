import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../models/article';


@Component({
  selector: 'app-company-articles',
  templateUrl: './company-articles.component.html',
  styleUrls: ['./company-articles.component.css']
})
export class CompanyArticlesComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService, private modalService: NgbModal) { }

  company: Company;
  errorMessage: string = '';
  successMessage: string = '';
  subcategoriesNames: string[] = [];
  subcategoriesCategory: string[] = [];

  newCategory: string = '';
  newSubcategoryName: string = '';
  newSubcategoryCategory: string = '';

  closeResult: string = '';

  myArticles: Article[] = [];

  category: string = '';
  subcategory: string = '';
  addingToCategory: boolean = false;
  addingToSubcategory: boolean = false;

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'company') {
      this.router.navigate(['/']);
    }
    this.errorMessage = '';
    this.company = JSON.parse(localStorage.getItem('activeUser'));
    if(this.company.subcategories != null) this.fillSubcategories();
    this.loadArticles();
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

  fillSubcategories() {
    for(let i = 0; i < this.company.subcategories.length; i++) {
      let subcategory = this.company.subcategories[i].split('#');
      this.subcategoriesNames[i] = subcategory[0];
      this.subcategoriesCategory[i] = subcategory[1];
    }
  }

  loadArticles() {
    this.companyService.loadArticles(this.company.username).subscribe((json) => {
      this.myArticles = json['articles'];
    });
  }

  addToCategory(category, content) {
    this.errorMessage = '';
    this.successMessage = '';
    this.category = category;
    this.addingToCategory = true;
    this.addingToSubcategory = false;
    this.open(content);
  }

  addToSubcategory(subcategory, content) {
    this.errorMessage = '';
    this.successMessage = '';
    this.subcategory = subcategory;
    this.addingToCategory = false;
    this.addingToSubcategory = true;
    this.open(content);
  }

  addCategory() {
    this.errorMessage = '';
    this.successMessage = '';
    if(this.newCategory == '') {
      this.errorMessage = 'You must insert category name!';
    }
    else {
      const data = {
        username: this.company.username,
        category: this.newCategory
      };
      this.companyService.addCategory(data).subscribe((json) => {
        if(json['status']=='OK') {
          this.successMessage = 'Category ' + this.newCategory + ' added successfully!';
          this.setToLocalStorage();
          window.location.reload();
        }
        else {
          this.errorMessage = 'Failed to add category ' + this.newCategory + '!';
        }
      });
    }
  }

  addSubcategory() {
    this.errorMessage = '';
    this.successMessage = '';
    if(this.newSubcategoryName == '' || this.newSubcategoryCategory == '') {
      this.errorMessage = 'All fields are required!';
    }
    else {
      if(!this.company.categories.includes(this.newSubcategoryCategory)) {
        this.errorMessage = 'Category unknown!';
      }
      else {
        let subcategory = this.newSubcategoryCategory + '#' + this.newSubcategoryName;
        const data = {
          username: this.company.username,
          subcategory: subcategory
        }
        this.companyService.addSubcategory(data).subscribe((json) => {
          if(json['status']=='OK') {
            this.successMessage = 'Subcategory ' + this.newSubcategoryName + ' added successfully!';
            this.setToLocalStorage();
            window.location.reload();
          }
          else {
            this.errorMessage = 'Failed to add subcategory ' + this.newSubcategoryName + '!';
          }
        })
      }
    }
  }

  setToLocalStorage() {
    this.companyService.getCompany(this.company.username).subscribe((json) => {
      let company = json['company'];
      console.log(company);
      localStorage.removeItem('activeUser');
      localStorage.setItem('activeUser', JSON.stringify(company));
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  addArticleToCategory(name) {
    const data = {
      name: name,
      companyUsername: this.company.username,
      category: this.category
    };
    this.companyService.addArticleToCategory(data).subscribe((json) => {
      let article = json['article'];
      if(json['status'] == 'OK') {
        this.successMessage = 'Article ' + name + ' successfully added to category ' + this.category + '!';
      }
      else {
        this.errorMessage = 'Article ' + name + ' already belongs to category ' + article.category + '!';
      }
      this.modalService.dismissAll();
    });
  }

  addArticleToSubcategory(name) {
    const data = {
      name: name,
      companyUsername: this.company.username,
      subcategory: this.subcategory
    };
    this.companyService.addArticleToSubcategory(data).subscribe((json) => {
      let article = json['article'];
      if(json['status'] == 'OK') {
        this.successMessage = 'Article ' + name + ' successfully added to subcategory ' + this.subcategory + '!';
      }
      else if(json['status'] == 'EXISTS') {
        this.errorMessage = 'Article ' + name + ' already belongs to subcategory ' + article.subcategory + '!';
      }
      else {
        this.errorMessage = 'Article ' + name + ' belongs to category ' + article.category + '!';
      }
      this.modalService.dismissAll();
    });
  }

}


