import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DealerService } from 'src/app/services/dealer.service';

@Component({
  selector: 'app-saleschart',
  templateUrl: './saleschart.component.html',
  styleUrls: ['./saleschart.component.css']
})
export class SaleschartComponent  implements OnInit{
  constructor(private pipe: DatePipe,public spinner: NgxSpinnerService,public toastr:ToastrService,public dealerService: DealerService, public dialog: MatDialog,private renderer: Renderer2) { }
  data1:number=0;
  ngOnInit(): void {

    setTimeout(() => {
      this.spinner.show();

      this.dealerService.chartReport();
    
      setTimeout(() => {
        this.barChartData = [
          { data: this.dealerService.charData, label: 'Total amounts' },
          { data: this.dealerService.charData1, label: 'Prices at which it was sold' }

        ];
        this.barChartLabels = this.numberToWords(this.dealerService.charData.length);
    
        // After your code execution, hide the spinner
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
      return [];
    }
  
    return numberWords.slice(0, num);
  }
    public barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    
    public barChartLabels :any= [];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData :any;
  
    searchForm:FormGroup = new FormGroup({
      productName :new FormControl(),
      dateFrom : new FormControl(),
      dateTo :new FormControl()
    })
    
  }