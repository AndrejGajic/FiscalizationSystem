import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-addcompany',
  templateUrl: './admin-addcompany.component.html',
  styleUrls: ['./admin-addcompany.component.css']
})
export class AdminAddcompanyComponent implements OnInit {

  min: number = 100;
  max: number = 300;

  image: string = "";
  firstname: string = "";
  lastname: string = "";
  username: string = "";
  password: string = "";
  passwordConfirmation: string = "";
  phone: string = "";
  email: string = "";
  company: string = "";
  address: string = "";
  pib: string = "";
  companyNumber: string = "";
  errorMessage: string = "";
  successMessage: string = "";


  constructor(private router: Router, private adminService: AdminService) { }

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

  addCompany() {
    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})");
    this.errorMessage = "";
    this.successMessage = "";
    if(this.firstname == "") {
      this.errorMessage = "First name required!";
    }
    else if(this.lastname == "") {
      this.errorMessage = "Last name required!";
    }
    else if(this.username == "") {
      this.errorMessage = "Username required!";
    }
    else if(this.password == "") {
      this.errorMessage = "Password required!";
    }
    else if(this.passwordConfirmation == "") {
      this.errorMessage = "Password confirmation required!";
    }
    else if(this.phone == "") {
      this.errorMessage = "Phone number required!";
    }
    else if(this.email == "") {
      this.errorMessage = "Email required!";
    }
    else if(this.address == "") {
      this.errorMessage = "Address required!";
    }
    else if(this.pib == "") {
      this.errorMessage = "PIB required!";
    }
    else if(this.companyNumber == "") {
      this.errorMessage = "Company number required!";
    }
    else if(this.password != this.passwordConfirmation) {
      this.errorMessage = "Password do not match!";
    }
    else if(!regex.test(this.password)) {
      this.errorMessage = "Password is too weak!";
    }
    else if (this.image == "") {
      this.errorMessage = "Image required!";
    }
    else {
      if(this.pib.length != 9) {
        this.errorMessage = "PIB must have 9 digits!";
      }
      else if(this.pib.charAt(0) == '0') {
        this.errorMessage = "PIB must not start with 0!";
      }
      else {
        let addressTemp: string[] = this.address.split(',');
        if(addressTemp.length != 5) {
          this.errorMessage = "Address format must be: STATE, CITY, POSTALCODE, STREET, STREETNUMBER!";
        }
        else {
          let state = addressTemp[0];
          let city = addressTemp[1].trim();
          let postalCode = addressTemp[2].trim();
          let street = addressTemp[3].trim();
          let streetNumber = addressTemp[4].trim();
          
          this.adminService.addCompany(this.firstname, this.lastname, this.username, this.password, this.phone, this.email, this.company, state, city, postalCode, street, streetNumber, this.pib, this.companyNumber, this.image).subscribe((json) => {
            let confirmationMessage = json['message'];
            if(confirmationMessage == "OK") {
              this.successMessage = "Company successfully added!";
            }
            else {
              this.errorMessage = json['message'];
            }
          });

        }
      }
    }
  }

  loadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const allowed_file_types = ['image/png', 'image/jpg', 'image/jpeg'];
    if (allowed_file_types.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        var image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          if (image.width <= this.max && image.width >= this.min && image.height <= this.max && image.height >= this.min) {
            this.image = image.src;
            this.errorMessage = '';
          }
          else {
            this.errorMessage = "Image dimensions not good! Image must be minimum 100x100px and maximum 300x300px!";
            return;
          }
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.errorMessage = "Image extension not supported! Supported extensions: JPG, PNG";
      return;
    }
  }

}
