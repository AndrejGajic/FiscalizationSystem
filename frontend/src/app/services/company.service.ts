import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  companyURI = 'http://localhost:4000/company';

  getCodes() {
    return this.http.get(`${this.companyURI}/getCodes`);
  }

  updateCompanyInfo(data) {
    return this.http.post(`${this.companyURI}/updateCompanyInfo`, data);
  }

  changeGeneralInfo(data) {
    return this.http.post(`${this.companyURI}/changeGeneralInfo`, data);
  }

  addNewOrderer(data) {
    return this.http.post(`${this.companyURI}/addNewOrderer`, data);
  }

  findCompaniesWithPIB(pib) {
    const data = {
      pib: pib
    };
    return this.http.post(`${this.companyURI}/findCompaniesWithPIB`, data);
  }

  getArticles(username) {
    const data = {
      username: username
    };
    return this.http.post(`${this.companyURI}/getArticles`, data);
  }

  checkArticleId(id, username) {
    const data = {
      id: id,
      username: username
    };
    return this.http.post(`${this.companyURI}/checkArticleId`, data);
  }

  insertArticle(data) {
    return this.http.post(`${this.companyURI}/insertArticle`, data);
  }

  updateStorage(data) {
    return this.http.post(`${this.companyURI}/updateStorage`, data);
  }

  deleteArticle(articleId, username) {
    const data = {
      articleId: articleId,
      username: username
    };
    return this.http.post(`${this.companyURI}/deleteArticle`, data);
  }

  updateArticle(data) {
    return this.http.post(`${this.companyURI}/updateArticle`, data);
  }

  addCategory(data) {
    return this.http.post(`${this.companyURI}/addCategory`, data);
  }

  addSubcategory(data) {
    return this.http.post(`${this.companyURI}/addSubcategory`, data);
  }

  getCompany(username) {
    const data = {
      username: username
    };
    return this.http.post(`${this.companyURI}/getCompany`, data);
  }

  loadArticles(username) {
    const data = {
      username: username
    };
    return this.http.post(`${this.companyURI}/loadArticles`, data);
  }

  addArticleToCategory(data) {
    return this.http.post(`${this.companyURI}/addArticleToCategory`, data);
  }

  addArticleToSubcategory(data) {
    return this.http.post(`${this.companyURI}/addArticleToSubcategory`, data);
  }

  loadBills(data) {
    return this.http.post(`${this.companyURI}/loadBills`, data);
  }

  addItem(data) {
    return this.http.post(`${this.companyURI}/addItem`, data);
  }

  finishBill(data) {
    return this.http.post(`${this.companyURI}/finishBill`, data);
  }

  checkIfBillExists(data) {
    return this.http.post(`${this.companyURI}/checkIfBillExists`, data);
  }

  addBill(data) {
    return this.http.post(`${this.companyURI}/addBill`, data);
  }

  exportDailyReport(data) {
    return this.http.post(`${this.companyURI}/exportDailyReport`, data);
  }

  addStorage(data) {
    return this.http.post(`${this.companyURI}/addStorage`, data);
  }

}
