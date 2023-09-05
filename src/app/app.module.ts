import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToastrModule, ToastNoAnimation,ToastNoAnimationModule}from 'ngx-toastr'
import{HttpClientModule}from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add this line
import { MatButtonModule } from '@angular/material/button'; // For example, import any other components you need
import { RecaptchaModule } from 'ng-recaptcha';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import * as SimplePeer from 'simple-peer';
import { TruncatePipe } from './truncate.pipe';


@NgModule({
  declarations: [
    AppComponent

    ],
  imports: [
    BrowserModule,ToastrModule.forRoot(),ToastNoAnimationModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    RecaptchaModule,
    ToastrModule,
    FormsModule

    
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
