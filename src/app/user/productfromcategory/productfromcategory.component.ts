import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productfromcategory',
  templateUrl: './productfromcategory.component.html',
  styleUrls: ['./productfromcategory.component.css']
})
export class ProductfromcategoryComponent implements OnInit{
  @ViewChild('showDetailsDialog') showDetails!: TemplateRef<any>
    userId:any = localStorage.getItem('userId');
  constructor(public userService: UserService, private dialog: MatDialog) { }
  ngOnInit(): void {
    var categoryId=localStorage.getItem("categoryFk");
    if(categoryId !=null){
      this.userService.getallProductCategory(categoryId)
    }
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
 }

