import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }
  category: any = [];
  productFromCategory:any=[];

  getallProductCategory(categoryId:any){
    localStorage.setItem('categoryFk',categoryId);
    debugger;
    this.http.get('https://localhost:7100/api/Product/getAllProductAcceptedbycategory/'+categoryId).subscribe((result)=>{
      this.productFromCategory=result;
      this.router.navigate(['/specificproduct'])
    },err=>{
      this.toastr.error("There was an error, try again later")
    })
  }
  getAllCategory() {
    this.spinner.show()
    this.http.get('https://localhost:7100/api/Category/GetCategory').subscribe((result) => {
        this.category = result;
      
      this.spinner.hide()


    }, err => {
      this.toastr.error('There was an error, try again later')
      this.spinner.hide()

    })
  }
  testimonialAccepted: any = [];
  getAllTestimonialAccepted() {
    this.spinner.show()
    this.http.get('https://localhost:7100/api/testimonial/testimonialInformation').subscribe((result) => {
      this.testimonialAccepted = result; 
      this.testimonialAccepted=this.testimonialAccepted.filter((x:any)=>x.status==1);
      this.spinner.hide()
    },err=>{
      this.toastr.error('There was an error, try again later')
      this.spinner.hide()
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

  async subscription(information:any){
    this.spinner.show();
    await this.http.post('https://localhost:7100/api/Subscriptions/InsertSubscription',information).subscribe((result)=>{
      this.spinner.hide();
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully completed',
          text: 'You will receive the latest offers',
        })
      }, 1000); 
    },err=>{
      this.spinner.hide();
      this.toastr.error("There was an error, try again later");
    })
  }
}
