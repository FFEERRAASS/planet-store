import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { DealerService } from 'src/app/services/dealer.service';

@Component({
  selector: 'app-chartreports',
  templateUrl: './chartreports.component.html',
  styleUrls: ['./chartreports.component.css']
})
export class ChartreportsComponent implements OnInit{
  constructor(private pipe: DatePipe,public spinner: NgxSpinnerService,public toastr:ToastrService,public adminService: AdminService, public dialog: MatDialog,private renderer: Renderer2) { }
  data1:number=0;
  ngOnInit(): void {

    setTimeout(() => {
      debugger;
      this.spinner.show();

      this.adminService.reportFinance();
      this.adminService.statistcsGender();
    
      setTimeout(() => {
        debugger;

        this.barChartData1 = [
          { data: this.adminService.reportData1Q, label: 'Number of pieces sold' },
          { data: this.adminService.reportData2Total, label: 'Total price' }

        ];
        this.barChartData2 = [
          { data: [this.adminService.maleCustomer,this.adminService.femaleCustomer,this.adminService.maleVendor,this.adminService.femaleVendor], label: 'User Information' }
       

        ];
        this.barChartLabels1 = this.numberToWords(this.adminService.reportData1Q.length);
        this.barChartLabels2 = ['Male Customer','Female Customer','Male Vendor','Female Vendor'];

        this.spinner.hide();

      }, 1000);
    
    }, 1000);
    

   
  }
  printPage() {
    window.print();

  }
  numberToWords(num: number): string[] {
    const numberWords = [
      'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN',
      'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN', 'TWENTY'
    ];
  
    if (num < 1 || num > 20) {
      return numberWords.slice(0, 20);

    }
  
    return numberWords.slice(0, num);
  }
    public barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    
    public barChartLabels1 :any= [];
    public barChartType1 = 'bar';
    public barChartLegend1 = true;
    public barChartData1 :any;
  
    public barChartOptionss = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    
    public barChartLabels2 :any= [];
    public barChartType2 = 'bar';
    public barChartLegend2 = true;
    public barChartData2 :any;
    searchForm:FormGroup = new FormGroup({
      productName :new FormControl(),
      dateFrom : new FormControl(),
      dateTo :new FormControl()
    })
    
  }