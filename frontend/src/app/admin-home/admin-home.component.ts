import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from '../models/report';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  reports: Report[] = [];
  foundReports: Report[] = [];
  currDate: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  companyName: string = '';
  PIB: string = '';
  startDate: Date;
  endDate: Date;

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    if(localStorage.getItem('activeType') != 'admin') {
      this.router.navigate(['/']);
    }
    this.loadDailyReports();
  }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  calculateDate() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate())
    ].join('-');
  }

  logout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('activeUser');
    localStorage.removeItem('activeType');
    this.router.navigate(['/']);
  }

  loadDailyReports() {
    this.currDate = this.calculateDate();
    const data = {
      date: this.currDate
    };
    this.adminService.loadDailyReports(data).subscribe((json) => {
      if(json['reports']) {
        this.reports = json['reports'];
      }
      else {
        this.reports = [];
      }
    })
  }

  searchReports() {
    if(!this.startDate || !this.endDate) {
      this.errorMessage = 'You must specify start and end dates!';
    }
    else {
      const data = {
        'companyName': this.companyName,
        'pib': this.PIB,
        'startDate': this.startDate,
        'endDate': this.endDate
      };
      this.adminService.searchReports(data).subscribe((json) => {
        console.log(json);
        if(json['reports']) {
          this.foundReports = json['reports'];
          console.log(this.foundReports);
        }
        else {
          this.foundReports = [];
          this.errorMessage = 'No reports found!';
        }
      })
    }
  }

}
