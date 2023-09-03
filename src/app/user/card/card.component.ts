import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  constructor(public userService: UserService, private dialog: MatDialog, public toastr: ToastrService) { }


  ngOnInit(): void {
    this.userService.GetBasketItems();
    this.userService. getTotalPrice();
  }
  CouponForm:FormGroup= new FormGroup({
    couponCode:new FormControl('',[Validators.required]),
  })
  decreaseQuantity(product: any, quantity: any) {
    debugger
    if (quantity > 1) {
      this.userService.UpdateBasketItemQuantity(product, 0)
    }
    else {
      this.toastr.warning("You have the minimum quantity, if you do not want the product, delete it from the cart");
    }
  }

  increaseQuantity(product: any, quantity: any) {
    this.userService.UpdateBasketItemQuantity(product, 1);
  }
  removeFromCart(basketID: any) {
    this.userService.removeItemFromBasket(basketID)
  }
  applyCoupon(){
    debugger
    this.userService.applyCoupon(this.CouponForm.controls['couponCode'].value)
  }
}
