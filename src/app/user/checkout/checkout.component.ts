import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent  {
constructor(public userService:UserService,private datepipe:DatePipe){}
  PaymentForm:FormGroup = new FormGroup({
    visaIban:new FormControl('',[Validators.required,Validators.minLength(5)]),
    visaExpiredDate:new FormControl('',[Validators.required]),
    visaCvv:new FormControl('',[Validators.required]),
    visaFullname:new FormControl('',[Validators.required])
  }) 

  checkout(){
    debugger
    this.datepipe.transform((this.PaymentForm.controls['visaExpiredDate'].value), 'MM-dd-yyyy');
    this.userService.payment(this.PaymentForm.value)
  }
}
