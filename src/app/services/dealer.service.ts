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
  productCount: any;
  async getAllProductForDealer() {
    this.spinner.show()
    await this.http.get('https://localhost:7100/api/Product/getProductByuserId/' + this.userId).subscribe((result: any) => {
      this.dealerProduct = result;
      this.productCount = result.length;  // Get count here
      this.spinner.hide()
    }, err => {
      this.toastr.error("There was an error, try again later")
      this.spinner.hide()

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
    debugger;

    this.http.post('https://localhost:7100/api/Product/UploadImages1', file)
      .subscribe((data: any) => {
        debugger;
        this.ImageProduct1 = data.productImage1;
      }, err => {
        return this.toastr.error("There was an error, try again later");
      })
  }
  ImageProduct2: any;
  uploadImage2(file: FormData) {

    this.http.post('https://localhost:7100/api/Product/UploadImages2', file)
      .subscribe((data: any) => {
        debugger;
        this.ImageProduct2 = data.productImage2;
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
        setTimeout(() => {
          window.location.reload();
        }, 1200);
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
  vendorPurchases: any = [];
  backUpDate: any = [];
  numberOfOrder: any;
  totalAmount: any;
  totalQuantity: any;
  profitChart:any=[];
  async vendorPurchase() {
    this.spinner.show()

    await this.http.get('https://localhost:7100/api/Basket/GetBasketItemsForVendorOrAdmin/' + this.userId).subscribe((result: any) => {
      this.vendorPurchases = result;
      this.backUpDate = result;
      this.numberOfOrder = result.length;

      this.totalAmount = 0; 
      this.totalQuantity = 0; 

      for (let i = 0; i < result.length; i++) {
        this.totalAmount += result[i].productCost * result[i].quantity;
        this.totalQuantity += result[i].quantity;  
        this.profitChart.push(Number(result[i].productCost * result[i].quantity))
      }
      this.spinner.hide()


    }, err => {
      this.spinner.hide()

      this.toastr.error("There was an error, try again later");
    });
  }


  contact: any = [];
  async getAllContact() {
    this.spinner.show()

    await this.http.get('https://localhost:7100/api/users/GetAllUser').subscribe((result) => {
      this.contact = result;
      this.contact = this.contact.filter((x: any) => x.roleFk != 3).filter((y: any) => y.userId != this.userId);
      this.spinner.hide()

    }, err => {
      this.spinner.hide()
      this.toastr.error("There was an error, try again later");

    })
  }
  totalReceiveMsg: any;
  numberOfReceiveMessage() {
    this.spinner.show();
    this.http.get('https://localhost:7100/api/chat/GetChatsByReceiver/' + this.userId).subscribe((result: any) => {
      this.totalReceiveMsg = 0;
      for (let i = 0; i < result.length; i++) {
        this.totalReceiveMsg += 1;  // Incrementing the total quantity
      }
      this.spinner.hide()
    }, err => {
      this.toastr.error("There was an error, try again later");
      this.spinner.hide()

    })
  }

  messages: any = [];
  async GetChatsBySenderReceiver() {
    this.spinner.show()

    var sender = localStorage.getItem("userId");
    var receiver = localStorage.getItem('receiverId')
    var body: any = {
      senderFk: sender,
      receiverFk: receiver
    }
    await this.http.post('https://localhost:7100/api/Chat/GetChatsBySenderReceiver', body).subscribe((result) => {
      this.messages = result;
      this.spinner.hide()

    }, err => {
      this.spinner.hide()

      this.toastr.error("There was an error, try again later")
    })
  }
  userInormation: any = {};
  getUserInformation() {
    this.spinner.show()
    this.http.get('https://localhost:7100/api/users/GetUser/' + this.userId).subscribe((result) => {
      this.userInormation = result;
      this.spinner.hide()
    }, err => {
      this.toastr.error("There was an error, try again later")
    })
  }


  charData: any = [];
  charData1: any = [];
  async chartReport() {
    await this.http.get('https://localhost:7100/api/Basket/GetBasketItemsForVendorOrAdmin/' + this.userId).subscribe((result: any) => {
      this.vendorPurchases = result;
      this.backUpDate = result;
      this.numberOfOrder = result.length;
      for (let i = 0; i < result.length; i++) {
        this.charData.push(result[i].productCost * result[i].quantity);
        this.charData1.push(result[i].productPrice * result[i].quantity);
      }
    }, err => {
      this.toastr.error("There was an error, try again later");
    });
  }
  userWallet: any = {};
  async getWallet() {
    this.spinner.show();
    await this.http.get('https://localhost:7100/api/Wallet/SelectWalletsByUser/' + this.userId).subscribe((result) => {
      this.userWallet = result;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("There was an error, try again later");
    })
  }
  transfeerMoney(information: any) {
    this.http.put('https://localhost:7100/api/Wallet/transfeerMoney', information).subscribe((result) => {
      if (result == 1) {
        this.toastr.success("The money transfer has been completed successfully");
      }
      else if (result == 0) {
        this.toastr.info("The balance is insufficient to complete the transaction");
      }
      else {
        this.toastr.error("The information is incorrect, there is no wallet with this information");
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
  }
  cashWithDraw(information: any) {
    this.http.put('https://localhost:7100/api/Wallet/cashWithDraw', information).subscribe((result) => {
      if (result == 1) {
        this.toastr.success("Money has been successfully withdrawn from the wallet");
      }
      else if (result == 0) {
        this.toastr.info("The amount you are trying to withdraw is greater than the amount in the wallet");
      }
      else {
        this.toastr.error("Withdrawal information is not available, verify the information and try again");
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
  }
}
