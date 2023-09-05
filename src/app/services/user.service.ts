import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  userInformation: any = {}
  getuserProfile() {
    debugger
    this.http.get('https://localhost:7100/api/users/GetUser/' + this.userId).subscribe((result) => {
      this.userInformation = result;
    }, err => {
      this.toastr.error("There was an error, try again later")
    })
  }
  updateProfile(information: any) {
    information.imagePath=this.ImageUser;
    debugger;
    this.http.put('https://localhost:7100/api/users/UpdateUser', information).subscribe((result) => {
      this.dialog.closeAll();
      this.toastr.success("Your information has been successfully updated")
    }, err => {
      this.dialog.closeAll();
      this.toastr.error("There was an error, try again later")
    })
  }
  deleteAccount(userId:any){
    this.http.delete('https://localhost:7100/api/users/DeleteUser/'+userId).subscribe((result)=>{
      Swal.fire({
        icon: 'success',
        title: 'Successfully completed',
        text: 'We are sorry for your loss. If there is any problem with the store or store policy, do not hesitate to contact us  😞',
        footer: 'We hope that you will return soon to the <strong> Planet</strong> <small> Store</small> family' 
      })
      this.router.navigate(['PlanetAuth/login']);

    },err=>{
      this.toastr.error("There was an error, try again later")
    })
  }
  ImageUser: any;
  uploadImage(file: FormData) {

    this.http.post('https://localhost:7100/api/users/UploadImages', file)
      .subscribe((data: any) => {
        debugger;
        this.ImageUser = data.imagePath;
      }, err => {
        this.toastr.error('operation image didnt work');
      })
  }
  userId: any = localStorage.getItem('userId');
  CreatContact(information: any) {
    debugger;

    this.http.post('https://localhost:7100/api/Contact/InsertContact', information).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Successfully completed',
        text: 'Your message has been sent',
        footer: 'We will contact you as soon as possible'
      })
    }, error => {
      this.toastr.error("There was an error, try again later")

    })
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
    var productInformation: any = { addedDateProduct: this.currentDate, productFk: productId, userFk: this.userId, }

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
  searchItem(obj: any) {
    this.http.post('https://localhost:7100/api/Product/SearchItem', obj)
      .subscribe(
        (response: any) => {
          this.allProducts = response;

        },
        (error: any) => {
          this.toastr.error("There was an error, try again later")
        }
      );
  }
  dataLoaded = false;

  informationInCard: any = [];
  GetBasketItems() {
    debugger
    // this.spinner.show()
    this.http.get('https://localhost:7100/api/Basket/GetBasketItems/' + this.userId).subscribe((responses: any) => {
      this.informationInCard = responses
      this.dataLoaded = true; // Set the flag to true after data is loaded

      console.log(this.informationInCard)
    },
      (error: any) => {
        this.toastr.error("There was an error, try again later")

      })
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
  UpdateBasketItemQuantity(basketID: any, choice: number) {
    if (choice == 1) {
      var obj: any = {
        sbasketId: basketID,
        quantity: 1
      }
    }
    else {
      var obj: any = {
        sbasketId: basketID,
        quantity: 0
      }
    }
    this.http.put('https://localhost:7100/api/basket/UpdateBasketItemQuantity', obj).subscribe((resp) => {
      this.toastr.success('Update quantity success');
      setTimeout(() => {
        window.location.reload();

      }, 1500);
    }, err => {
      this.toastr.error('There was an error, try again later');

      setTimeout(() => {
        window.location.reload();

      }, 1500);
    }
    )

  }


  removeItemFromBasket(basketID: any) {
    this.http.delete('https://localhost:7100/api/basket/DeleteFromBasket/' + basketID).subscribe(
      (response) => {
        this.toastr.success("The item has been removed from the cart" + response);
      }, (error) => {
        this.toastr.error("There was an error, try again later");
      }
    );
  }
  totalPrice?: any;
  getTotalPrice() {
    this.http.get('https://localhost:7100/api/basket/GetTotalPriceItems/' + this.userId).subscribe((result) => {
      this.totalPrice = result
      if (!result) {
        this.totalPrice = 0;
      }

    }, err => {
      this.totalPrice = 0;
    })
  }
  applyCoupon(couponCode: string) {
    var infoForCoupon: any = {
      UserFk: this.userId,
      CouponCode: couponCode
    }
    console.log(infoForCoupon);
    this.http.post('https://localhost:7100/api/basket/ApplyCouponToBasket', infoForCoupon).subscribe((result) => {
      this.toastr.success("Apply Coupon Successufly");
    }, err => {
      this.toastr.error("There was an error, try again later")
    })
  }

  //visa balance = userID 
  payment(obj: any) {
    const paymentInformation = {
      visaIban: obj.visaIban,
      visaFullname: obj.visaFullname,
      visaExpiredDate: obj.visaExpiredDate,
      visaCvv: obj.visaCvv,
      visaBalance: this.userId,
    };

    this.http.put('https://localhost:7100/api/virtualbank/WithdrawMoney', paymentInformation)
      .subscribe(
        (result) => {
          if (result === 2) {
            this.toastr.error('The information is incorrect, please try again');
          } else if (result === 0) {
            this.toastr.warning('The balance is insufficient, try when there is sufficient balance');
          } else if (result === 1) {
            this.toastr.success('The payment process was completed successfully. You will receive an email containing the details. Thank you for your trust in Planet Store.');
          } else {
            // Handle unexpected outcome here
          }
        },
        (err) => {
          this.toastr.error("There was an error, try again later")
        }
      );
  }
  favouriteProducts: any = [];
  getProductFavourite() {
    this.http.get('https://localhost:7100/api/Favourite/GetFavouriteItems/' + this.userId).subscribe((result) => {
      this.favouriteProducts = result;
    }, err => {
      this.toastr.error('There was an error, try again later')
    })
  }

  removeFromFavourite(favouriteId: any) {
    this.http.delete('https://localhost:7100/api/Favourite/DeleteFavourite/' + favouriteId).subscribe((result) => {
      this.toastr.success('The product has been removed from favorites');
    }, err => {
      this.toastr.error('There was an error, try again later')
    })
  }
  allPreviousPurchaseByUser: any = [];
  getPreviousPurchase() {
    this.http.get('https://localhost:7100/api/PreviousProduct/GetPreviousPurchases/' + this.userId).subscribe((result) => {
      this.allPreviousPurchaseByUser = result;
    }, err => {
      this.toastr.error('There was an error, try again later')
    })
  }
  removePreviousPurchase(ppurchase: any) {
    this.http.delete('https://localhost:7100/api/PreviousProduct/DeletePreviousPurchase/' + ppurchase).subscribe((result) => {
      this.toastr.success('The specified record has been deleted');
    }, error => {
      this.toastr.error('There was an error, try again later')
    })
  }
}

