import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }
  allProducts: any = [];
  async getAllProduct() {
    this.spinner.show();
    await this.http.get('https://localhost:7100/api/Product/getAllProduct').subscribe((result) => {
      this.allProducts = result;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      return this.toastr.error("There was an error, try again later")
    })
  }
  oldData: any;
  x: number = 0;
  filterProduct(num: number) {
    if (this.x > 0) {
      window.location.reload()
    }
    if (num == 1) {
      this.allProducts = this.allProducts.filter((x: any) => x.productStatus == 1);
      if (this.allProducts.length == 0) {
        this.toastr.info("No Data Found")
      }
    }
    else if (num == 2) {
      this.allProducts = this.allProducts.filter((x: any) => x.productStatus == 2);
      if (this.allProducts.length == 0) {
        this.toastr.info("No Data Found")
      }
    }
    else if (num == 0) {
      this.allProducts = this.allProducts.filter((x: any) => x.productStatus == 0);
      if (this.allProducts.length == 0) {
        this.toastr.info("No Data Found")
      }
    }
    this.x++;
  }
  userId: any = localStorage.getItem('userId');

  activeProduct(productId: number) {
    this.spinner.show()
    var body = {
      productId: productId,
      productStatus: 1
    }
    this.http.put('https://localhost:7100/api/Product/UpdateProductStatus', body).subscribe((result) => {
      this.spinner.hide()
      this.toastr.success("The product has been activated successfully")
    }, err => {
      return this.toastr.error("There was an error, try again later");
    })
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  rejectProduct(productId: number) {
    this.spinner.show()
    var body = {
      productId: productId,
      productStatus: 2
    }
    this.http.put('https://localhost:7100/api/Product/UpdateProductStatus', body).subscribe((result) => {
      this.spinner.hide()
      this.toastr.success("The product has been rejected successfully");
    }, err => {
      return this.toastr.error("There was an error, try again later");
    })
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  frezzProduct(productId: number) {
    this.spinner.show()
    var body = {
      productId: productId,
      productStatus: 0
    }
    this.http.put('https://localhost:7100/api/Product/UpdateProductStatus', body).subscribe((result) => {
      this.spinner.hide()
      this.toastr.success("The product has been freezed successfully");
    }, err => {
      return this.toastr.error("There was an error, try again later");
    })
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  allUsers: any = [];
  backUpData: any = [];

  getAllUsers() {
    debugger
    this.spinner.show();
    this.http.get('https://localhost:7100/api/users/getAllUserWithRole').subscribe((result) => {
      this.allUsers = result;
      this.allUsers = this.allUsers.filter((x: any) => x.roleId === 3);
      this.backUpData = this.allUsers.filter((x: any) => x.roleId === 3);
      this.spinner.hide();

    }, err => {
      this.spinner.hide();
      this.toastr.error("There was an error, try again later");
    })
  }
  getAllVendor() {
    debugger
    this.spinner.show();
    this.http.get('https://localhost:7100/api/users/getAllUserWithRole').subscribe((result) => {
      this.allUsers = result;
      this.allUsers = this.allUsers.filter((x: any) => x.roleId === 2);
      this.backUpData = this.allUsers.filter((x: any) => x.roleId === 2);
      this.spinner.hide();

    }, err => {
      this.spinner.hide();
      this.toastr.error("There was an error, try again later");
    })
  }
  getAllVendorRequest() {
    debugger
    this.spinner.show();
    this.http.get('https://localhost:7100/api/users/getAllUserWithRole').subscribe((result) => {
      this.allUsers = result;
      this.allUsers = this.allUsers.filter((x: any) => x.roleId === 2 && x.status === 2);
      this.backUpData = this.allUsers.filter((x: any) => x.roleId === 2 && x.status === 2);
      this.spinner.hide();

    }, err => {
      this.spinner.hide();
      this.toastr.error("There was an error, try again later");
    })
  }
  userAction(userId: number, Action: number) {
    this.spinner.show();
    var body = {
      userId: userId,
      Status: Action
    }
    this.http.put('https://localhost:7100/api/users/updatestatus', body).subscribe((result) => {
      if (Action == 7) {
        this.toastr.success("The user has been successfully blocked");
      }
      else {
        this.toastr.success("The user has been successfully freezed");
      }
      setTimeout(() => {
        this.spinner.hide();
        window.location.reload();
      }, 1500);
    }, err => {
      this.toastr.error("There was an error, try again later");
      setTimeout(() => {
        this.spinner.hide();
        window.location.reload();
      }, 1500);
    })
  }
  financeReports: any = [];
  backUpDataFinance:any=[];
  financeReport() {
    this.spinner.show()
    this.http.get('https://localhost:7100/api/Basket/FinanceReports').subscribe((result) => {
      this.financeReports = result;
      this.backUpDataFinance=result;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("There was an error, try again later");
    })
  }
}
