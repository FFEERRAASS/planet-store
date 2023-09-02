import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input'; // Add this line
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RegvendorsComponent } from './regvendors/regvendors.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegvendorsComponent,
    ForgetpasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    MatInputModule ,
    RecaptchaModule
  ] 

})
export class AuthenticationModule { }
