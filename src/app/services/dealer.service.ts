import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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

  dealerProduct:any=[]
  getAllProductForDealer(){
    this.http.get('https://localhost:7100/api/Product/getProductById/'+this.userId).subscribe((result)=>{
      this.dealerProduct=result;
    },err=>{
      this.toastr.error("There was an error, try again later")
    })
  }
}
