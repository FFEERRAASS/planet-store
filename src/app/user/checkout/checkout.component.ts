import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  constructor(public userService: UserService, private datepipe: DatePipe, public toastr: ToastrService,public spinner:NgxSpinnerService) { }
  totalAmount:any;
  async ngOnInit() {
    this.spinner.show();

    await this.userService.getTotalPrices();
    debugger;
    setTimeout(() => {
      this.totalAmount=this.userService.totalPrices;
      setTimeout(() => {
       
        window.paypal.Buttons({
          createOrder: (data:any, actions:any) => {
            if (!this.totalAmount || this.totalAmount ==0) {
                this.toastr.warning("The amount is incorrect");
                return;
            }
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: this.totalAmount,
                        currency_code: 'USD'
                    }
                }]
            })
        },
          onApprove:(data:any,actions:any)=>{
            return actions.order.capture().then((details:any)=>{
              this.toastr.success("The payment was completed successfully");
              this.checkoutPaypal();
            })
          },
          onError:(error:any)=>{
            this.toastr.error("There was an error, try again later");
          }
        }).render(this.paymentRef.nativeElement)
      }, 1);
      this.spinner.hide();
    }, 500);
    

   
  }



  PaymentForm: FormGroup = new FormGroup({
    visaIban: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    visaExpiredDate: new FormControl('', [Validators.required]),
    visaCvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    visaFullname: new FormControl('', [Validators.required])
  })
  PaymentFormPaypal: FormGroup = new FormGroup({
    visaIban: new FormControl(''),
    visaExpiredDate: new FormControl(''),
    visaCvv: new FormControl(''),
    visaFullname: new FormControl('')
  })
  checkoutPaypal() {
    this.userService.paymentPaypal();
  }
  checkout() {
    debugger;
    // this.datepipe.transform((this.PaymentForm.controls['visaExpiredDate'].value), 'MM-dd-yyyy');
    if (this.PaymentForm.valid) {
      this.userService.payment(this.PaymentForm.value)
    } else {
      this.toastr.warning("Please enter the information correctly");
    }

  }
}
