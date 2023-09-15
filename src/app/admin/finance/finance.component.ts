import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit{
  constructor(private pipe: DatePipe,public spinner: NgxSpinnerService,public toastr:ToastrService,public adminService:AdminService, public dialog: MatDialog,private renderer: Renderer2) { }

  ngOnInit(): void {
    this.adminService.financeReport();
  }
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
        doc.text('Finance Report', 10, 30);
        doc.text('Report type: Confidential report', 10, 40); 

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
searchForm:FormGroup = new FormGroup({
  productName :new FormControl(),
  dateFrom : new FormControl(),
  dateTo :new FormControl()
})
search() {
  debugger;

  const date1: any = this.pipe.transform(this.searchForm.controls['dateFrom'].value, 'yyyy-MM-dd');
  const date2: any = this.pipe.transform(this.searchForm.controls['dateTo'].value, 'yyyy-MM-dd');

  try {
    if (this.searchForm.controls['productName'].value == null && 
        this.searchForm.controls['dateFrom'].value == null && 
        this.searchForm.controls['dateTo'].value == null) {
      this.adminService.financeReports = this.adminService.backUpDataFinance;
      this.toastr.warning("Enter your search information, please.");
    } else {
      this.adminService.financeReports = this.adminService.financeReports.filter((x: any) => {
        if (this.searchForm.controls['productName'].value != null) {
          return x.productName.includes(this.searchForm.controls['productName'].value);
        }
        if (this.searchForm.controls['dateFrom'].value != null && this.searchForm.controls['dateTo'].value != null) {
          return x.addedDateProduct >= date1 && date2 >= x.addedDateProduct;
        }
        if (this.searchForm.controls['dateFrom'].value != null) {
          return x.addedDateProduct >= date1;
        }
        if (this.searchForm.controls['dateTo'].value != null) {
          return x.addedDateProduct <= date2;
        }
        return false; // Default case if none of the conditions are met
      });

      if (this.adminService.financeReports.length === 0) {
        this.toastr.warning("Not found any data");
      }
    }
  } catch (error) {
    // Handle or log the error here
    console.error(error);
  }
}

}
