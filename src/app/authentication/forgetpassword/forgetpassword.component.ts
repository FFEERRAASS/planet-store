import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { planetAuth } from 'src/app/services/planetauth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: [
    './forgetpassword.component.css',
    '../../../ATemp/vendor/bootstrap/css/bootstrap.min.css',
    '../../../ATemp/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../../ATemp/vendor/animate/animate.css',
    '../../../ATemp/vendor/css-hamburgers/hamburgers.min.css',
    '../../../ATemp/vendor/select2/select2.min.css',
    '../../../ATemp/css/util.css',
    '../../../ATemp/css/main.css'
  ]})
export class ForgetpasswordComponent {
  constructor(private router:Router,private spinner:NgxSpinnerService,public planetauth:planetAuth){}
  ngOnInit(): void {
    debugger;
  }
  LoginForm:FormGroup= new FormGroup({
    email:new FormControl('',[Validators.required]),
  })
  submit(){this.planetauth.login(this.LoginForm.value)}


}
