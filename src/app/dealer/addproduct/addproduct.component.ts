import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DealerService } from 'src/app/services/dealer.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  @ViewChild('callAddProductDialog') addProduct!: TemplateRef<any>;
  @ViewChild('callProductDeatilsDialog') callProductDeatilsDialog!: TemplateRef<any>;
  @ViewChild('callUpdateProductDialog') callUpdateDialog!:TemplateRef<any>;

  
  constructor(private datePipe: DatePipe,public dealerService: DealerService, public dialog: MatDialog) { }
  ngOnInit(): void {
    debugger
    this.dealerService.getAllProductForDealer();
  }
  ProductForm: FormGroup = new FormGroup({
    productName: new FormControl(),
    productDescription: new FormControl(),
    productCost: new FormControl(),
    productPrice: new FormControl(),
    productImage1: new FormControl(''),
    productImage2: new FormControl(''),
    productAddedDate: new FormControl(),
    productStatus: new FormControl(0),
    userFk: new FormControl(''),
    productQuantity: new FormControl(),
    productPlan: new FormControl(1),
    categoryFk: new FormControl(),
  })
  UpdateProductForm: FormGroup = new FormGroup({
    productId:new FormControl(),
    productName: new FormControl(),
    productDescription: new FormControl(),
    productCost: new FormControl(),
    productPrice: new FormControl(),
    productImage1: new FormControl(''),
    productImage2: new FormControl(''),
    productAddedDate: new FormControl(),
    productStatus: new FormControl(0),
    userFk: new FormControl(''),
    productQuantity: new FormControl(),
    productPlan: new FormControl(1),
    categoryFk: new FormControl(),
  })
  uploadFile1(files: any) {
    debugger;
    if (files.length == 0)
      return;
    let fileToUpload = <File>files[0];
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    debugger;
    this.dealerService.uploadImage1(formdata)
  }
  uploadFile2(files: any) {
    debugger;
    if (files.length == 0)
      return;
    let fileToUpload = <File>files[0];
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    debugger;
    this.dealerService.uploadImage2(formdata)
  }
  addproduct() {
    this.dealerService.getAllCategory();
    this.dialog.open(this.addProduct);
  }
  closeDialog() {
    this.dialog.closeAll()
  }
  saveProduct() {
    debugger;
    var userId: any = localStorage.getItem('userId');
    var cost = this.ProductForm.controls['productCost'].value;
    var price = cost + (cost / 10);
    this.ProductForm.controls['productPrice'].setValue(price);
    var currentDate = new Date();
    this.ProductForm.controls['productAddedDate'].setValue(currentDate.toISOString());
    this.ProductForm.controls['productStatus'].setValue(0);
    this.ProductForm.controls['productPlan'].setValue(0);
    this.ProductForm.controls['userFk'].setValue(parseInt(userId, 10));
    var category = parseInt(this.ProductForm.controls['categoryFk'].value, 10);
    this.ProductForm.controls['categoryFk'].setValue(category);
    this.dealerService.saveProduct(this.ProductForm.value);

  }
  showDetails(productId:number){
    this.dealerService.productDetails(productId);
    this.dialog.open(this.callProductDeatilsDialog);
  }
  oldProductData:any={};
 UpdateProduct(productId:number){
  debugger
  this.dealerService.getAllCategory();

    this.dealerService.productDetails(productId);
    debugger;
    this.oldProductData=this.dealerService.productDetailsVar;
    this.UpdateProductForm.controls['userFk'].setValue(this.oldProductData.userFk);
    this.UpdateProductForm.controls['productId'].setValue(this.oldProductData.productId);
    this.UpdateProductForm.controls['productStatus'].setValue(0);
    this.dealerService.ImageProduct1=this.oldProductData.productImage1;
    this.dealerService.ImageProduct2=this.oldProductData.productImage2;
    this.dialog.open(this.callUpdateDialog);
  }
  saveUpdate(){
    var cost = this.ProductForm.controls['productCost'].value;
    var price = cost + (cost / 10);
    this.ProductForm.controls['productPrice'].setValue(price);
    this.dealerService.updateProduct(this.UpdateProductForm.value)
  }
}
