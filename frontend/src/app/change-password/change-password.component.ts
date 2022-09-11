import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { Customer } from '../models/customer';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  oldPassword: string = "";
  newPassword: string = "";
  newPasswordConfirmation: string = "";
  errorMessage: string = "";

  type: string = "";

  company: Company;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.type = localStorage.getItem('activeType');
    if(this.type == 'company') {
      this.company = JSON.parse(localStorage.getItem('activeUser'));
    }
  }

  changePassword() {
    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})");
    if(this.oldPassword == "" || this.newPassword == "" || this.newPasswordConfirmation == "") {
      this.errorMessage = "All fields are required!";
    }
    else if(this.newPassword != this.newPasswordConfirmation) {
      this.errorMessage = "Passwords do not match!";
    }
    else if(!regex.test(this.newPassword)) {
      this.errorMessage = "Password is too weak! Your password must be between 8 and 12 characters, must contain at least one lowercase letter, one uppercase letter, one digit and one special character.";
    }
    else {
      if(this.type == 'company') {
        let company: Company = JSON.parse(localStorage.getItem('activeUser'));
        this.userService.changePassword(company.username, this.oldPassword, this.newPassword, this.type).subscribe((json) => {
          let message = json['message'];
          if(message == 'OK') {
            this.router.navigate(['/']);
          }
          else {
            this.errorMessage = 'Incorrect old password!';
          }
        });
      }
      else if(this.type == 'customer') {
        let customer: Customer = JSON.parse(localStorage.getItem('activeUser'));
        this.userService.changePassword(customer.username, this.oldPassword, this.newPassword, this.type).subscribe((json) => {
          let message = json['message'];
          if(message == 'OK') {
            this.router.navigate(['/']);
          }
          else {
            this.errorMessage = 'Incorrect old password!';
          }
        });
      }
      else {
        let admin: User = JSON.parse(localStorage.getItem('activeUser'));
        this.userService.changePassword(admin.username, this.oldPassword, this.newPassword, this.type).subscribe((json) => {
          let message = json['message'];
          if(message == 'OK') {
            this.router.navigate(['/']);
          }
          else {
            this.errorMessage = 'Incorrect old password!';
          }
        });
      }
    }
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

}
