import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationRequest } from '../models/registration_request';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-reg',
  templateUrl: './admin-reg.component.html',
  styleUrls: ['./admin-reg.component.css']
})
export class AdminRegComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService) { }

  registrationRequests: RegistrationRequest[] = [];


  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'admin') {
      this.router.navigate(['/']);
    }
    this.getAllRegistrationRequests();
  }

  getAllRegistrationRequests() {
    this.adminService.getAllRegistrationRequests().subscribe((requests: RegistrationRequest[]) => {
      this.registrationRequests = requests;
    })
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

  acceptRegistrationRequest(username: string) {
    this.adminService.acceptRegistrationRequest(username).subscribe(res => {
      alert('Registration accepted for user ' + username);
      this.getAllRegistrationRequests();
    })
  }

  denyRegistrationRequest(username: string) {
    this.adminService.denyRegistrationRequest(username).subscribe(res => {
      alert('Registration denied for user ' + username);
      this.getAllRegistrationRequests();
    })
  }

}
