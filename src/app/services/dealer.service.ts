import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  userId: any = localStorage.getItem('userId');

  dealerProduct: any = []
  getAllProductForDealer() {
debugger
    this.http.get('https://localhost:7100/api/Product/getProductByuserId/' + this.userId).subscribe((result) => {
      this.dealerProduct = result;
    }, err => {
      this.toastr.error("There was an error, try again later")

    })
  }
  category: any = [];
  getAllCategory() {
    this.http.get('https://localhost:7100/api/Category/GetCategory').subscribe((result) => {
      return this.category = result;
    }, err => {
      return this.toastr.error("There was an error, try again later")
    })
  }

  ImageProduct1: any;
  uploadImage1(file: FormData) {

    this.http.post('https://localhost:7100/api/Product/UploadImages', file)
      .subscribe((data: any) => {
        debugger;
        this.ImageProduct1 = data.imagePath;
      }, err => {
        return this.toastr.error("There was an error, try again later");
      })
  }
  ImageProduct2: any;
  uploadImage2(file: FormData) {

    this.http.post('https://localhost:7100/api/Product/UploadImages', file)
      .subscribe((data: any) => {
        debugger;
        this.ImageProduct2 = data.imagePath;
      }, err => {
        return this.toastr.error("There was an error, try again later")
      })
  }
  saveProduct(information: any) {
    information.productImage1 = this.ImageProduct1;
    information.productImage2 = this.ImageProduct2;

    // Check and provide default image filenames if they are null
    if (!information.productImage1) {
      information.productImage1 = 'defaultproductimg.jpg';
    }
    if (!information.productImage2) {
      information.productImage2 = 'defaultproductimg.jpg';
    }
    information.productCost = information.productCost.toString();
    information.productPrice = information.productPrice.toString();

    this.http.post('https://localhost:7100/api/Product/insertProduct', information).subscribe(
      (result) => {
        this.toastr.success('The product has been added, it will be reviewed, and if accepted, it will be shown to customers. Thank you for your waiting. An email will be sent to you if the product is approved.');
        this.dialog.closeAll();
      },
      (err) => {
        if (err.status === 400) {
          this.toastr.error('Validation error. Please check the entered data.');
        } else {
          this.toastr.error('An error occurred. Please try again later.');
        }
      }
    );
  }
  productDetailsVar: any = {};
  productDetails(productId: number) {

    this.http.get('https://localhost:7100/api/Product/GetProductForDialog/' + productId).subscribe((result) => {
      this.productDetailsVar = result;
    }, err => {
      return this.toastr.error("There was an error, try again later")
    })
    this.spinner.hide();
  }
  updateProduct(information: any) {
    information.productImage1 = this.ImageProduct1;
    information.productImage2 = this.ImageProduct2;
    information.productCost = information.productCost.toString();
    information.productPrice = information.productPrice.toString();
    this.http.put('https://localhost:7100/api/Product/updateProduct', information).subscribe((result) => {
      this.toastr.success('The product has been modified, it will be reviewed and re-published, we appreciate your waiting')
    }, err => {
      return this.toastr.error("There was an error, try again later")
    })

  }
  async deleteProduct(productId: any) {
    this.spinner.show();
    await this.http.delete('https://localhost:7100/api/Product/deleteProductById/' + productId).subscribe((result) => {
      setTimeout(() => {
        this.spinner.hide()
      }, 1000);
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully completed',
          text: 'The product has been removed',
        })
      }, 1000);
setTimeout(() => {
  window.location.reload();

}, 3000);
    }, err => {
      this.spinner.hide()
      this.toastr.error("There was an error, try again later")

    })
  }
  vendorPurchases:any=[];
  backUpDate:any=[];
  vendorPurchase(){
    this.http.get('https://localhost:7100/api/Basket/GetBasketItemsForVendorOrAdmin/'+this.userId).subscribe((result)=>{
    this.vendorPurchases=result;
    this.backUpDate=result;
    },err=>{
      this.toastr.error("There was an error, try again later")
    })
  }

}
