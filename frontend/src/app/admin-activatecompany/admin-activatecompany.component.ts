import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-activatecompany',
  templateUrl: './admin-activatecompany.component.html',
  styleUrls: ['./admin-activatecompany.component.css']
})
export class AdminActivatecompanyComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService) { }

  companies: Company[] = [];
  activeCompanies: Company[] = [];
  inactiveCompanies: Company[] = [];

  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'admin') {
      this.router.navigate(['/']);
    }
    this.getCompanies();
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

  getCompanies() {
    this.adminService.getCompanies().subscribe((json) => {
      this.companies = json['companies'];
      for(let i = 0; i < this.companies.length; i++) {
        if(this.companies[i].active) {
          this.activeCompanies.push(this.companies[i]);
        }
        else {
          this.inactiveCompanies.push(this.companies[i]);
        }
      }
    });
  }
  
  activateCompany(username) {
    const data = {
      username: username,
      active: true
    }
    this.adminService.activateDeactivateCompany(data).subscribe((json) => {
      if(json['status']=='OK') {
        this.successMessage = 'Company ' + username + ' activated successfully!';
        window.location.reload();
      }
      else {
        this.errorMessage = 'Failed to activate company ' + username + '!';
      }
    });
  }

  deactivateCompany(username) {
    const data = {
      username: username,
      active: false
    }
    this.adminService.activateDeactivateCompany(data).subscribe((json) => {
      if(json['status']=='OK') {
        this.successMessage = 'Company ' + username + ' deactivated successfully!';
        window.location.reload();
      }
      else {
        this.errorMessage = 'Failed to deactivate company ' + username + '!';
      }
    });
  }

  

}
