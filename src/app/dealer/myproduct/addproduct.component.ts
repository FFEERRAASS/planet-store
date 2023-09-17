import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DealerService } from 'src/app/services/dealer.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  @ViewChild('callAddProductDialog') addProduct!: TemplateRef<any>;
  @ViewChild('callProductDeatilsDialog') callProductDeatilsDialog!: TemplateRef<any>;
  @ViewChild('callUpdateProductDialog') callUpdateDialog!:TemplateRef<any>;

  
  constructor(private datePipe: DatePipe,private spinner: NgxSpinnerService,public dealerService: DealerService, public dialog: MatDialog,public toastr:ToastrService) { }
  ngOnInit(): void {
    debugger
    this.dealerService.getAllProductForDealer();
  }
  ProductForm: FormGroup = new FormGroup({
    productName: new FormControl('',[Validators.required]),
    productDescription: new FormControl('',[Validators.required]),
    productCost: new FormControl('',[Validators.required]),
    productPrice: new FormControl('',[Validators.required]),
    productImage1: new FormControl(''),
    productImage2: new FormControl(''),
    productAddedDate: new FormControl('',[Validators.required]),
    productStatus: new FormControl(0),
    userFk: new FormControl(''),
    productQuantity: new FormControl('',[Validators.required]),
    productPlan: new FormControl(1),
    categoryFk: new FormControl('',[Validators.required]),
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
  uploadFile1(files: FileList | null) {
    debugger;
    if (!files || files.length === 0) {
      return; // No files selected or files is null, do nothing
    }
  
    const fileToUpload = files[0]; // Get the first file from the FileList
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
  
    // Assuming you have an adminService method for uploading Image 1
    this.dealerService.uploadImage1(formdata);
  }
  
  uploadFile2(files: FileList | null) {
    debugger;

    if (!files || files.length === 0) {
      return; // No files selected or files is null, do nothing
    }
  
    const fileToUpload = files[0]; // Get the first file from the FileList
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
  
    // Assuming you have an adminService method for uploading Image 2
    this.dealerService.uploadImage2(formdata);
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
    if(this.ProductForm.valid &&this.ProductForm.controls['categoryFk'].value>0 ){
      this.dealerService.saveProduct(this.ProductForm.value);
    }
    else{
      this.toastr.warning("Please enter all information, all of them are required");
    }

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
    
    this.UpdateProductForm.controls['productStatus'].setValue(0);
    this.UpdateProductForm.controls['productAddedDate'].setValue(this.oldProductData.productAddedDate);

    this.dealerService.ImageProduct1=this.oldProductData.productImage1;
    this.dealerService.ImageProduct2=this.oldProductData.productImage2;
    this.dialog.open(this.callUpdateDialog);
      this.spinner.hide();
    }, 10000);
  debugger

    

  }
  saveUpdate(){
    debugger;
    var category = parseInt(this.UpdateProductForm.controls['categoryFk'].value, 10);
    this.UpdateProductForm.controls['categoryFk'].setValue(category);
    var cost = this.UpdateProductForm.controls['productCost'].value;
    var price = cost + (cost / 10);
    this.UpdateProductForm.controls['productPrice'].setValue(price);
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
}
