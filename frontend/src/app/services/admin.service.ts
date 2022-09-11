import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  adminURI = 'http://localhost:4000/admin';

  getAllRegistrationRequests() {
    return this.http.get(`${this.adminURI}/getAllRegistrationRequests`);
  }

  acceptRegistrationRequest(username: string) {
    const data = {
      username: username
    };
    return this.http.post(`${this.adminURI}/acceptRegistrationRequest`, data);
  }

  denyRegistrationRequest(username: string) {
    const data = {
      username: username
    };
    return this.http.post(`${this.adminURI}/denyRegistrationRequest`, data);
  }

  addCompany(firstname, lastname, username, password, phone, email, companyName, state, city, postalCode, street, streetNumber, pib, companyNumber, image) {

    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      phone: phone,
      email: email,
      company_name: companyName,
      state: state,
      city: city,
      postal_code: postalCode,
      street: street,
      street_number: streetNumber,
      pib: pib,
      company_number: companyNumber,
      image: image,
      verified: 0,
      category: 0
    };

    return this.http.post(`${this.adminURI}/addCompany`, data);

  }

  addCustomer(data) {
    return this.http.post(`${this.adminURI}/addCustomer`, data);
  }

  getCompanies() {
    return this.http.get(`${this.adminURI}/getCompanies`);
  }

  activateDeactivateCompany(data) {
    return this.http.post(`${this.adminURI}/activateDeactivateCompany`, data);
  }

  loadDailyReports(data) {
    return this.http.post(`${this.adminURI}/loadDailyReports`, data);
  }

  searchReports(data) {
    return this.http.post(`${this.adminURI}/searchReports`, data);
  }

  

}
