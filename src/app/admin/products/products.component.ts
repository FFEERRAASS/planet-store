import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { DealerService } from 'src/app/services/dealer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild('callAddProductDialog') addProduct!: TemplateRef<any>;
  @ViewChild('callProductDeatilsDialog') callProductDeatilsDialog!: TemplateRef<any>;
  @ViewChild('callUpdateProductDialog') callUpdateDialog!:TemplateRef<any>;

  
  constructor(private datePipe: DatePipe,private spinner: NgxSpinnerService,public dealerService: DealerService, public dialog: MatDialog,public adminService:AdminService) { }
  ngOnInit(): void {
    debugger
    this.adminService.getAllProduct();
  }
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

  closeDialog() {
    this.dialog.closeAll()
  }

  showDetails(productId:number){
    
    this.dealerService.productDetails(productId);
    this.dialog.open(this.callProductDeatilsDialog);
  }
  oldProductData:any={};
 UpdateProduct(productId:number){
  
  this.dealerService.getAllCategory();

    this.dealerService.productDetails(productId);
    this.spinner.show()
    setTimeout(() => {
      
    debugger;
    this.oldProductData=this.dealerService.productDetailsVar;
    this.UpdateProductForm.controls['userFk'].setValue(this.oldProductData.userFk);
    this.UpdateProductForm.controls['productId'].setValue(this.oldProductData.productId);
    
    this.UpdateProductForm.controls['productAddedDate'].setValue(this.oldProductData.productAddedDate);

    this.dealerService.ImageProduct1=this.oldProductData.productImage1;
    this.dealerService.ImageProduct2=this.oldProductData.productImage2;
    this.dialog.open(this.callUpdateDialog);
      this.spinner.hide();
    }, 1000);
  debugger

    

  }
  saveUpdate(){
    debugger;
    var category = parseInt(this.UpdateProductForm.controls['categoryFk'].value, 10);
    this.UpdateProductForm.controls['categoryFk'].setValue(category);
    this.dealerService.updateProduct(this.UpdateProductForm.value)
  }
  Deleteproduct(productId:any){
    Swal.fire({
      title: 'Are you sure to delete the product?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDelete(productId); 
      } else if (result.isDenied) {
        Swal.fire('Product deletion was canceled', '', 'info');
      }
    });
  }
  confirmDelete(productId:any){
    debugger;
    this.dealerService.deleteProduct(productId);
  }
  activeProduct(productId:number){
    this.adminService.activeProduct(productId);
  }
  rejectProduct(productId:number){
    this.adminService.rejectProduct(productId);
  }
  frezzProduct(productId:number){
    this.adminService.frezzProduct(productId);
  }
  filterProduct(num:number){
    this.adminService.filterProduct(num);
  }
  
}
