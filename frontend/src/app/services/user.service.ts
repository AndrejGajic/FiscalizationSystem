import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  userURI = 'http://localhost:4000/user';

  login(username, password) {
    const data = {
      username: username,
      password: password
    };
    return this.http.post(`${this.userURI}/login`, data);
  }

  getCompany(username, password) {
    const data = {
      username: username,
      password: password
    };
    return this.http.post(`${this.userURI}/getCompany`, data);
  }

  getCustomer(username, password) {
    const data = {
      username: username,
      password: password
    };
    return this.http.post(`${this.userURI}/getCustomer`, data);
  }


  register(firstname, lastname, username, password, phone, email, companyName, state, city, postalCode, street, streetNumber, pib, companyNumber, image) {

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
    };

    return this.http.post(`${this.userURI}/register`, data);

  }

  changePassword(username, oldPassword, newPassword, type) {
    const data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword,
      type: type
    };

    return this.http.post(`${this.userURI}/changePassword`, data);
  }

  isCompanyVerified(username) {
    const data = {
      username: username
    };
    return this.http.post(`${this.userURI}/isCompanyVerified`, data);
  }

  getAllBills() {
    return this.http.get(`${this.userURI}/getAllBills`);
  }

}
