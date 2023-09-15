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
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{
  constructor(private pipe: DatePipe,public spinner: NgxSpinnerService,public toastr:ToastrService,public adminService:AdminService, public dialog: MatDialog,private renderer: Renderer2) { }

  ngOnInit(): void {
    this.adminService.vendorProductReport();
    this.adminService.userFinanceReport();
  }
  DownloadData1(){
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
        doc.text('Users Finance Report', 10, 30);
        doc.text('Report type: Confidential report', 10, 40); 

        autoTable(doc, {
            html: '#myTables',
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
              0: { cellWidth: 20, minCellHeight: 25 },
              1: { cellWidth: 22 },
              2: { cellWidth: 22 },
              3: { cellWidth: 20 },
              4: { cellWidth: 17 },
              5:{cellWidth:18},

               
            },
            styles: { fontSize:9 },
        });
        doc.save('table.pdf');
    };
}
searchForm:FormGroup = new FormGroup({
  productName :new FormControl(),
 
})
search() {
  

  try {
    if (this.searchForm.controls['productName'].value == null ) 
       {
      this.adminService.vendorReport = this.adminService.vendorReport;
      this.toastr.warning("Enter your search information, please.");
    } else {
      this.adminService.vendorReport = this.adminService.vendorReport.filter((x: any) => {
        if (this.searchForm.controls['productName'].value != null) {
          return x.productName.includes(this.searchForm.controls['productName'].value) || x.username.includes(this.searchForm.controls['productName'].value);
        }
        return false; 
      });

      if (this.adminService.vendorReport.length === 0) {
        this.toastr.warning("Not found any data");
      }
    }
  } catch (error) {
    this.toastr.info("There is a problem searching, please try again later");

  }
}

}
