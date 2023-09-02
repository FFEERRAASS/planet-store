import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  userId: any = localStorage.getItem('userId');
  CreatContact(information: any) {

  }
  CreatTestimonial(information: any) {
    this.spinner.show();
    information.userFk = this.userId;
    this.http.post('https://localhost:7100/api/Testimonial/CreateTestimonial', information)
      .subscribe(
        (response: any) => {
          this.spinner.hide();
          this.toastr.success('Testimonial send success ');
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Please try again , Error' + error);
        }
      );
  }
  allProducts: any = [];
  getAllProduct() {
    this.spinner.show()
    this.http.get('https://localhost:7100/api/Product/getAllProductAccepted').subscribe((resultProduct) => {
      debugger;
      this.allProducts = resultProduct;
      this.spinner.hide()
    }, err => {
      this.toastr.error('Error Get All Product' + "Error: " + err);
      this.spinner.hide()

    })
  }
  specifcProduct: any = {}
  getProductById(id: any) {
    this.spinner.show()
    this.http.get('https://localhost:7100/api/Product/getProductById/' + id).subscribe((resultProduct) => {
      this.specifcProduct = resultProduct;
      this.spinner.hide()
    }, err => {
      this.toastr.error('Error Get Specific Product' + "Error: " + err);
      this.spinner.hide()

    })
  }
  currentDate = new Date();
  //Add Product To Cart
  addToCart(productId: any) {
    this.spinner.show()

    var productInformation: any = {
      addedDateProduct: this.currentDate,
      productFk: productId,
      userFk: this.userId,
      quantity: 1
    }
    this.http.post('https://localhost:7100/api/Basket/insertBasket', productInformation).subscribe(
      (response: any) => {
        this.spinner.hide();
        Swal.fire({
          icon: 'success',
          title: 'Successfully completed',
          text: 'The product is in the basket',
          footer: '<a href="http://localhost:4200/user/Card">Go to basket?</a>'
        })
      },
      (error: any) => {
        this.spinner.hide();

        this.toastr.error('The product cannot be added to the cart. There is an error , Error' + error);
      }
    );
  }
  //Add Product To favourite
  addToFavourite(productId: any) {
    var productInformation: any = {addedDateProduct: this.currentDate,productFk: productId,userFk: this.userId,}
    
    this.http.post('https://localhost:7100/api/Favourite/InsertFavouriteProduct', productInformation).subscribe(
      (response: any) => {
        this.spinner.hide();
        this.toastr.success('The product is in the favourite');
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('The product cannot be added to the favourite. There is an error , Error' + error);
      }
    );
  }
  getAllItemInBasketForUser() {

  }
}

