import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { planetAuth } from 'src/app/services/planetauth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
    '../../../ATemp/vendor/bootstrap/css/bootstrap.min.css',
    '../../../ATemp/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../../ATemp/vendor/animate/animate.css',
    '../../../ATemp/vendor/css-hamburgers/hamburgers.min.css',
    '../../../ATemp/vendor/select2/select2.min.css',
    '../../../ATemp/css/util.css',
    '../../../ATemp/css/main.css'
  ]
})
export class RegisterComponent {
  constructor(private router: Router, private spinner: NgxSpinnerService, public planetauth: planetAuth, public toastr: ToastrService) { }

  ngOnInit(): void {

  }
  RegisterForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phonenumber: new FormControl('', [Validators.minLength(10)]),
    status: new FormControl(),
    roleFk: new FormControl(),
    gender: new FormControl(''),
    imagePath: new FormControl(),
    passwordretype: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  uploadFile(files: any) {
    debugger;
    if (files.length == 0)
      return;
    let fileToUpload = <File>files[0];
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    debugger;
    this.planetauth.uploadImage(formdata);
  }

  Hidden: boolean = false;
  showRecaptcha() {
    this.Hidden = true;
  }

  siteKey: string = "6LegG_UjAAAAACurZEvMz6XPNO0LPsptsATlp3nf";
  validateRecaptcha: any = 0;

  resolved(captchaResponse: string = "6LegG_UjAAAAAFI_enWL0AIAHw7T0FzJyMb8NLvD") {
    if (captchaResponse != null) {
      this.validateRecaptcha = 1;
    }
  }

  register() {
    if (!this.RegisterForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields correctly.'
      });
    }
    else {
      if (this.validateRecaptcha == 0) {{this.showRecaptcha();}}
      else {
        if (this.RegisterForm.controls['password'].value != this.RegisterForm.controls['passwordretype'].value) {
          this.toastr.error("Password Not Match");
        }
        else {
          if (this.RegisterForm.controls['gender'].value == null) { this.RegisterForm.controls['gender'].setValue(3); }
          this.RegisterForm.controls['status'].setValue(1);
          this.RegisterForm.controls['roleFk'].setValue(3);
          debugger;
          if (this.RegisterForm.valid) {this.planetauth.registerUser(this.RegisterForm.value);}
        }

      }
    }

  }

}
