import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class planetAuth {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  login(body: any): void {
  
    debugger;

    const information = {
      username: body.email.toString(),
      password: body.password.toString()
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    debugger;
    this.http.post('https://localhost:7100/api/users/login', information, { headers })
      .subscribe(
        (response: any) => {
          this.spinner.hide();
          const token = response.toString();
          localStorage.setItem('token', token);
          let userInformation: any = jwt_decode(token);
          debugger;
          localStorage.setItem('userId',userInformation.userId);
          if (userInformation.status == 1) {
            this.toastr.success('Logged in successfully');
            if (userInformation.roleFk == 1) {
              this.router.navigate(['/admin']);
            }
            else if (userInformation.roleFk == 2) {
              this.router.navigate(['/dealer']);
            }
            else if (userInformation.roleFk == 3) {
              this.router.navigate(['/user']);
            }

          }
          else if (userInformation.status == 2) {
            this.toastr.warning('Your account is not activated, contact technical support');

          }
          else if (userInformation.status == 3) {
            this.toastr.warning('Your account blocked');
          }

        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Login failed!');
        }
      );
  }
  ImageUser: any;
  uploadImage(file: FormData) {

    this.http.post('https://localhost:7100/api/users/UploadImages', file)
      .subscribe((data: any) => {
        debugger;
        this.ImageUser = data.imagePath;
      }, err => {
        this.toastr.error('operation image didnt work');
      })
  }
  resultCheck: number = 0;

  Avaliable(body: any) {
    this.http.post('https://localhost:7100/api/users/CheckAvailable', body)
      .subscribe(
        (response: any) => {
          if (response !== null) {
            this.resultCheck = 1;
          } else {
            this.resultCheck = 0;
          }
        },
        (error: any) => {
          console.error('An error occurred:', error);
        }
      );
  }
  informationForCheck: any = {};
  informationForLogin: any = {};
  registerUser(information: any): void {
    information.imagePath = this.ImageUser;
    if (information.imagePath == null) {
      information.imagePath = "userDefault.png";
    }
    this.informationForCheck = {
      email: information.email,
      username: information.username,
      phonenumber: information.phonenumber
    }
    this.http.post('https://localhost:7100/api/users/CheckAvailable', this.informationForCheck).subscribe((response: any) => {
      var roleFk: any = information.roleFk;
      if (response) {
        this.toastr.error('Email, phone number, or username is already in use. We apologize')
      } else {
        this.informationForLogin = {
          email: information.email,
          password: information.password
        };

        this.http.post('https://localhost:7100/api/users/RegisterUser', information)
          .subscribe(
            (resp: any) => {
              if (roleFk == 2) {
                this.toastr.success('Your account has been registered , Please wait to activate your account - Planet Store');
                setTimeout(() => {
                  this.router.navigate(['/']);

                }, 1000);
              }
              else {
                this.login(this.informationForLogin);
              }
            },
            (err: any) => {
              this.toastr.error('An error occurred during registration. Please try again.');
            }
          );
      }
    })
  }
}

