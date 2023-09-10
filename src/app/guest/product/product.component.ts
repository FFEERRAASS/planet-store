import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('showDetailsDialog') showDetails!: TemplateRef<any>
    userId:any = localStorage.getItem('userId');
  constructor(public userService: UserService, private dialog: MatDialog) { }
  ngOnInit(): void {

    this.userService.getAllProduct()
  }
  SearchForm: FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.email]),
    productDescription: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }) 
  showDetailsFun(productId: any) {
    this.userService.getProductById(productId);
    this.dialog.open(this.showDetails);
  }
  closeDialog() {
    this.dialog.closeAll()
  }
  addToCart(productId: any) {
    if(this.userId == null){
      this.dialog.closeAll()

 Swal.fire({
    icon: 'error',
    title: 'You must log in',
    text: 'In order to purchase products, please log in to your account',
    footer: '<a href="http://localhost:4200/planetAuth/">Going to log in?</a>',
    customClass: {
      container: 'my-swal'
    }
  })
    }
    else{
      this.userService.addToCart(productId);

    }
  }
  addToFavourite(productId: any) {
    if(this.userId == null){
      this.dialog.closeAll()
      Swal.fire({
         icon: 'error',
         title: 'You must log in',
         text: 'In order to purchase products, please log in to your account',
         footer: '<a href="http://localhost:4200/planetAuth/">Going to log in?</a>',
         customClass: {
           container: 'my-swal'
         }
       })
         }
         else{
    this.userService.addToFavourite(productId)
         }
  }
  search(){
    debugger;
    this.userService.searchItem(this.SearchForm.value);

  }}

 