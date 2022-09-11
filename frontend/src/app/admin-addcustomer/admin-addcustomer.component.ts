import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-addcustomer',
  templateUrl: './admin-addcustomer.component.html',
  styleUrls: ['./admin-addcustomer.component.css']
})
export class AdminAddcustomerComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService) { }

  username: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  phone: string = '';
  customerID: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'admin') {
      this.router.navigate(['/']);
    }
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

  addCustomer() {
    if(this.username == '' || this.password == '' || this.firstname == '' || this.lastname == '' || this.phone == '' || this.customerID == '') {
      this.errorMessage = 'All fields are required!';
    }
    else {
      var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})");
      if(!regex.test(this.password)) {
        this.errorMessage = "Password is too weak!";
      }
      else {
        const data = {
          username: this.username,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          phone: this.phone,
          customerID: this.customerID
        };
        this.adminService.addCustomer(data).subscribe((json) => {
          if(json['message']=='OK') {
            this.successMessage = 'Customer ' + this.username + ' added successfully!';
          }
          else {
            this.errorMessage = json['message'];
          }
        })
      }
    }
  }

}
