import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  customerURI = 'http://localhost:4000/customer';

  loadCompanies() {
    return this.http.get(`${this.customerURI}/loadCompanies`);
  }

  loadArticles(data) {
    return this.http.post(`${this.customerURI}/loadArticles`, data);
  }

  loadBills(data) {
    return this.http.post(`${this.customerURI}/loadBills`, data);
  }

}
