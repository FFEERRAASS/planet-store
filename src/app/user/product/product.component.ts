import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('showDetailsDialog') showDetails!: TemplateRef<any>

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
    this.userService.addToCart(productId);
  }
  addToFavourite(productId: any) {
    this.userService.addToFavourite(productId)
  }
  search(){
    debugger;
    this.userService.searchItem(this.SearchForm.value);

  }
}
