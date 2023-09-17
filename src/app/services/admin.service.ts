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
  allUsersBlocked: any = [];
  backUpDataBlocked: any = [];
  getAllUsersBlocked() {
    debugger
    this.spinner.show();
    this.http.get('https://localhost:7100/api/users/getAllUserWithRole').subscribe((result) => {
      this.allUsersBlocked = result;
      this.allUsersBlocked = this.allUsersBlocked.filter((x: any) => x.roleId === 3 && x.status == 7);
      this.backUpDataBlocked = this.allUsersBlocked.filter((x: any) => x.roleId === 3 && x.status == 7);

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
  backUpDataFinance: any = [];
  financeReport() {
    this.spinner.show()
    this.http.get('https://localhost:7100/api/Basket/FinanceReports').subscribe((result) => {
      this.financeReports = result;
      this.backUpDataFinance = result;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("There was an error, try again later");
    })
  }
  vendorReport: any = [];

  vendorProductReport() {
    this.spinner.show();
    this.http.get('https://localhost:7100/api/Product/getAllProduct').subscribe((result) => {
      this.vendorReport = result;
      this.spinner.hide();
    }, err => {
      this.toastr.error("There was an error, try again later");
      this.spinner.hide();
    })
  }
  userReport: any = [];
  userFinanceReport() {
    this.spinner.show();
    this.http.get('https://localhost:7100/api/users/getUserFinanceInformation').subscribe((result) => {
      this.userReport = result;
      this.spinner.hide();
    }, err => {
      this.toastr.error("There was an error, try again later");
      this.spinner.hide();
    })
  }

  reportData1Q: any = [];
  reportData2Total: any = [];

  async reportFinance() {
    await this.http.get('https://localhost:7100/api/basket/AllItemInBasket').subscribe((result: any) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].status == 0) {
          this.reportData1Q.push(result[i].quantity);
          this.reportData2Total.push(result[i].productPrice * result[i].quantity);
        }

      }
      console.log('xxx')
    }, err => {
      this.toastr.error("There was an error, try again later");
    })
  }
  maleVendor: any = 0;
  femaleVendor: any = 0;
  maleCustomer: any = 0;
  femaleCustomer: any = 0;

  async statistcsGender() {
    await this.http.get('https://localhost:7100/api/users/GetAllUser').subscribe((result: any) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].gender == 1 && result[i].roleFk == 2) {
          this.maleVendor++;
        }
        else if (result[i].gender == 0 && result[i].roleFk == 2) {
          this.femaleVendor++;
        }
        else if (result[i].gender == 0 && result[i].roleFk == 3) {
          this.femaleCustomer++;
        } else if (result[i].gender == 1 && result[i].roleFk == 3) {
          this.maleCustomer++;
        }
      }
    }, err => {
      this.toastr.error("There was an error, try again later");
    })
  }
  allWallets: any = [];
  async getWallet() {
    this.spinner.show();
    await this.http.get('https://localhost:7100/api/wallet/SelectAllWallets').subscribe((result) => {
      this.allWallets = result;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("There was an error, try again later");
    })
  }

  async updateWalletStatus(walletId: number, Action: number) {
    this.spinner.show();
    if (Action == 0) {
      var body = {
        walletId: walletId,
        walletStatus: 0
      }
    }
    else {
      var body = {
        walletId: walletId,
        walletStatus: 1
      }
    }
    await this.http.put('https://localhost:7100/api/wallet/UpdateWalletStatus', body).subscribe((result) => {
      if (Action == 0) {
        this.toastr.success('The wallet has been successfully frozen');
      }
      else {
        this.toastr.success('The wallet has been activated successfully');
      }
      this.spinner.hide();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, err => {
      this.spinner.hide();
      this.toastr.error("There was an error, try again later");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
  }
  HomeContent: any = {};
  async getContentForHome() {
    var contentId = 1;
    await this.http.get('https://localhost:7100/api/home/getHomeContent/' + contentId).subscribe((result) => {
      this.HomeContent = result;
    }, err => {
      this.toastr.error("There was an error, try again later");

    })
  }
  HomeContent2: any = {};
  async getContentForHome2() {
    var contentId = 2;
    await this.http.get('https://localhost:7100/api/home/getHomeContent/' + contentId).subscribe((result) => {
      this.HomeContent2 = result;
    }, err => {
      this.toastr.error("There was an error, try again later");

    })
  }
  ImageHome: any;
  async uploadImageForHome(file: FormData) {

    await this.http.post('https://localhost:7100/api/home/UploadImages', file)
      .subscribe((data: any) => {
        debugger;
        this.ImageHome = data.paragraph8;
      }, err => {
        this.toastr.error("There was an error, try again later");
      })
  }
  AboutImage1: any;
  async uploadImageForAbout1(file: FormData) {
debugger;
    await this.http.post('https://localhost:7100/api/home/UploadImages1', file)
      .subscribe((data: any) => {
        debugger;
        this.AboutImage1 = data.paragraph8;
      }, err => {
        this.toastr.error("There was an error, try again later");
      })
  }
  AboutImage2: any;
  async uploadImageForAbout2(file: FormData) {

    await this.http.post('https://localhost:7100/api/home/UploadImages2', file)
      .subscribe((data: any) => {
        debugger;
        this.AboutImage2 = data.paragraph7;
      }, err => {
        this.toastr.error("There was an error, try again later");
      })
  }
  AboutImage3: any;
  async uploadImageForAbout3(file: FormData) {

    await this.http.post('https://localhost:7100/api/home/UploadImages3', file)
      .subscribe((data: any) => {
        debugger;
        this.AboutImage3 = data.paragraph6;
      }, err => {
        this.toastr.error("There was an error, try again later");
      })
  }


  updateHomeContent(information: any) {
    this.spinner.show();
    information.paragraph8 = this.ImageHome;
    this.http.put('https://localhost:7100/api/home/updateHome', information).subscribe((result) => {
      this.spinner.hide()
      this.toastr.success("Your information has been successfully updated")
    }, err => {
      this.toastr.error("There was an error, try again later")
      this.spinner.hide()

    })
  }
  updateAboutContent(information: any) {
    this.spinner.show();
    information.paragraph8 = this.AboutImage3;
    information.paragraph7 = this.AboutImage2;
    information.paragraph6 = this.AboutImage1;

    this.http.put('https://localhost:7100/api/home/updateHome', information).subscribe((result) => {
      this.spinner.hide()
      this.toastr.success("Your information has been successfully updated")
    }, err => {
      this.toastr.error("There was an error, try again later")
      this.spinner.hide()

    })
  }
  allCategory: any = [];
  async Category() {
    this.spinner.show();
    await this.http.get('https://localhost:7100/api/category/GetCategory').subscribe((result) => {
      this.allCategory = result;
      this.spinner.hide();
    }, err => {
      this.toastr.error("There was an error, try again later")
      this.spinner.hide()
    })
  }

  specificCategory: any = {};
  async getCategoryById(id: number) {
    this.spinner.show();
    this.http.get('https://localhost:7100/api/category/GetCategoryById/' + id).subscribe((result) => {
      this.specificCategory = result;
      this.spinner.hide();
    }, err => {
      this.toastr.error("There was an error, try again later")
      this.spinner.hide()
    })
  }
  categoryImage: any;
  async uploadImageCategory(file: FormData) {
    await this.http.post('https://localhost:7100/api/Category/UploadImages', file)
      .subscribe((data: any) => {
        debugger;
        this.categoryImage = data.categoryImage;
      }, err => {
        this.toastr.error("There was an error, try again later");
      })
  }
  async createCategory(information: any) {
    this.spinner.show();
    information.categoryImage = this.categoryImage;
    await this.http.post('https://localhost:7100/api/Category/InsertCategory', information).subscribe((result) => {
      this.spinner.hide();
      this.toastr.success("A new category has been added");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, err => {
      this.toastr.error("There was an error, try again later");
      this.spinner.hide();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
  }

  async deleteCategory(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:7100/api/Category/DeleteCategory/' + id).subscribe((result) => {
      this.spinner.hide();
      Swal.fire({
        title: 'The category has been successfully deleted',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          this.reload();
        } else if (result.isDenied) {
          Swal.fire('Category deletion was canceled', '', 'info');
        }
      });

    }, err => {
      this.spinner.hide();
      this.toastr.error("There was an error, try again later");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })

  }

  reload() {
    window.location.reload();
  }

  async updateCategory(information:any){
    information.categoryImage=this.categoryImage;
    this.spinner.show();
    await this.http.put('https://localhost:7100/api/Category/UpdateCategory',information).subscribe((result)=>{
      this.spinner.hide();

      Swal.fire({
        title: 'The category has been updated successfully',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          this.reload();
        }
      });
    },err=>{
      this.spinner.hide();
      this.toastr.error("There was an error, try again later");
    })
  }
  testimonial: any = [];
  getAllTestimonial() {
    this.spinner.show()
    this.http.get('https://localhost:7100/api/testimonial/testimonialInformation').subscribe((result) => {
      this.testimonial = result;
      this.testimonial=this.testimonial.filter((x:any)=>x.status ==0 || x.status ==1||x.status==2); 
      this.spinner.hide()
    },err=>{
      this.toastr.error('There was an error, try again later')
      this.spinner.hide()
    })
  }
  async modifyTestimonial(testimonialId:number,action :number){
    this.spinner.show()
    var body={
      status:action,
      testimonialId:testimonialId
    }
    await this.http.put('https://localhost:7100/api/testimonial/UpdateTestimonialStatus',body).subscribe((result)=>{
    this.toastr.success('The status has been modified successfully');
    this.spinner.hide();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    },err=>{
      this.toastr.error('There was an error, try again later')
      this.spinner.hide()
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
  }
  specifcTestimonial:any={};
  async getTestimonialbyId(testimonialId:number){
    this.spinner.show();
    await this.http.get('https://localhost:7100/api/testimonial/GetTestimonialByID/'+testimonialId).subscribe((result)=>{
      this.specifcTestimonial=result;
      this.spinner.hide();
    },err=>{
      this.toastr.error('There was an error, try again later')
      this.spinner.hide()
    })
  }

  totalAmount:number=0;
  totalAmountForVendor:number=0;
  totalProfit:number=0;
  totalSaledQuantity:number=0;
  sales:any=[];
  adminStatistics() {
    this.spinner.show()
    this.http.get('https://localhost:7100/api/Basket/FinanceReports').subscribe((result:any) => {

          for(let item of result){
            this.totalAmount += Number(item.productPrice);
            this.totalAmountForVendor += Number(item.productCost);
            this.totalProfit += Number(item.productPrice - item.productCost);
            this.totalSaledQuantity += Number(item.quantity); 
            this.sales.push(Number((item.productPrice - item.productCost) * item.quantity));
        }
        
        
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("There was an error, try again later");
    })
  }
}

