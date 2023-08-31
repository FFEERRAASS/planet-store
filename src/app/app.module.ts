import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAuthComponent } from './sec-auth/login-auth/login-auth.component';
import { RegisterUserComponent } from './sec-auth/register-user/register-user.component';

@NgModule({
  declarations: [
    AppComponent,

    LoginAuthComponent,
     RegisterUserComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
