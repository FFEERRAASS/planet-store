import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
import { DealerService } from 'src/app/services/dealer.service';

import 'datatables.net'; // Import DataTables
import 'datatables.net-bs4'; 
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css']
})

export class SalesreportComponent implements OnInit{
  constructor(private pipe: DatePipe,public spinner: NgxSpinnerService,public toastr:ToastrService,public dealerService: DealerService, public dialog: MatDialog,private renderer: Renderer2) { }

  @ViewChild('myTable', { static: false }) myTable!: ElementRef;
  DownloadData() {
    const doc = new jsPDF();
    const logoImg = new Image();

    logoImg.src = '../../assets/images/logoPlanet.png';

    logoImg.onload = () => {
        const pageWidth = doc.internal.pageSize.getWidth();
        const imgWidth = 30; 
        const imgHeight = (logoImg.height * imgWidth) / logoImg.width; 
        const x = (pageWidth - imgWidth) / 2;

        doc.addImage(logoImg, 'PNG', x, 10, imgWidth, imgHeight);

        doc.setFontSize(10); 


        const currentDate = new Date().toLocaleDateString(); 
        doc.text(currentDate, 10, 20); 
        doc.text('Sales Report', 10, 30);
        doc.text('Report type: Vendor report', 10, 40); 

        autoTable(doc, {
            html: '#myTable',
            theme: 'grid',
            startY: imgHeight + 20, 
            margin: { horizontal: 3 }, 
            pageBreak: 'auto',
            rowPageBreak: 'avoid',
            columnStyles: {
                0: { cellWidth: 'auto', minCellHeight: 25 },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 'auto' },
                3: { cellWidth: 'auto' },
                4: { cellWidth: 'auto' }
            }
        });
        doc.save('table.pdf');
    };
}



  ngOnInit(): void {
    debugger

    this.dealerService.vendorPurchase();
  }
  printPage() {
    window.print();
  }
  searchForm:FormGroup = new FormGroup({
    productName :new FormControl(),
    dateFrom : new FormControl(),
    dateTo :new FormControl()
  })
  search() {
    this.spinner.show();
  
    const date1: any = this.pipe.transform(this.searchForm.controls['dateFrom'].value, 'yyyy-MM-dd');
    const date2: any = this.pipe.transform(this.searchForm.controls['dateTo'].value, 'yyyy-MM-dd');
  
    try {
      if (this.searchForm.controls['productName'].value == null && this.searchForm.controls['dateFrom'].value == null && this.searchForm.controls['dateTo'].value == null) {
        this.dealerService.vendorPurchases = this.dealerService.backUpDate;
        this.toastr.warning("Enter your search information, please.");
      }
      else if (this.searchForm.controls['productName'].value != null && this.searchForm.controls['dateFrom'].value == null && this.searchForm.controls['dateTo'].value == null) {
        this.dealerService.vendorPurchases = this.dealerService.vendorPurchases.filter((x: any) => x.productName.includes(this.searchForm.controls['productName'].value));
        if (this.dealerService.vendorPurchases.length === 0) {
          this.toastr.warning("Not found any data");
        }
      }
      else if (this.searchForm.controls['productName'].value == null && this.searchForm.controls['dateFrom'].value != null && this.searchForm.controls['dateTo'].value == null) {
        this.dealerService.vendorPurchases = this.dealerService.vendorPurchases.filter((x: any) => x.addedDateProduct >= date1);
        if (this.dealerService.vendorPurchases.length === 0) {
          this.toastr.warning("Not found any data");
        }
      }
      else if (this.searchForm.controls['productName'].value == null && this.searchForm.controls['dateFrom'].value == null && this.searchForm.controls['dateTo'].value != null) {
        this.dealerService.vendorPurchases = this.dealerService.vendorPurchases.filter((x: any) => x.addedDateProduct <= date2);
        if (this.dealerService.vendorPurchases.length === 0) {
          this.toastr.warning("Not found any data");
        }
      }
      else if (this.searchForm.controls['productName'].value == null && this.searchForm.controls['dateFrom'].value != null && this.searchForm.controls['dateTo'].value != null) {
        this.dealerService.vendorPurchases = this.dealerService.vendorPurchases.filter((x: any) => x.addedDateProduct >= date1 && date2 >= x.addedDateProduct);
        if (this.dealerService.vendorPurchases.length === 0) {
          this.toastr.warning("Not found any data");
        }
      }
      else {
        // Handle any other conditions or requirements
      }
    } catch (error) {
      // Handle errors that might occur during filtering or other operations
      console.error(error);
    }
  
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  


  
}
