import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  username: string = "";
  password: string = "";
  errorMessage: string = "";

  ngOnInit(): void {
  }

  login() {
    if(this.username == "") {
      this.errorMessage = "Username required!";
    }
    else if(this.password == "") {
      this.errorMessage = "Password required!";
    }
    else {
      this.errorMessage = "";
      this.userService.login(this.username, this.password).subscribe((json) => {
        let message = json['message'];
        if(message != 'OK') {
          this.errorMessage = 'User does not exist!';
        }
        else {
          let user: User = json['user'];
          let type = user.type;
          if(type == 'admin') {
            localStorage.setItem('activeUser', JSON.stringify(user));
            localStorage.setItem('activeType', 'admin');
            this.router.navigate(['/admin-home']);
          }
          else {
            this.errorMessage = 'Only admin can log on this form!';
          }
        }
    });
    }
  }

}
