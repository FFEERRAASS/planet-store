import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-vendorrequest',
  templateUrl: './vendorrequest.component.html',
  styleUrls: ['./vendorrequest.component.css']
})
export class VendorrequestComponent implements OnInit{
  constructor(public adminService:AdminService,public spinner:NgxSpinnerService,public toastr:ToastrService){}
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
        doc.text('Users Report', 10, 30);
        doc.text('Report type: Admin report', 10, 40); 

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
  
  this.adminService.getAllVendorRequest();
}
searchForm:FormGroup = new FormGroup({
  word :new FormControl()
 
})
userAction(userId:number,Action:number){
this.adminService.userAction(userId,Action);
}

search() {
  this.spinner.show();
 
  

  try {
    if(this.searchForm.controls['word'].value == null){
      this.adminService.allUsers=this.adminService.backUpData;
    }
    if(this.searchForm.controls['word'].value != null){
      this.adminService.allUsers= this.adminService.allUsers.filter((x:any)=>x.firstName.includes(this.searchForm.controls['word'].value) || x.lastName.includes(this.searchForm.controls['word'].value)||
      x.username.includes(this.searchForm.controls['word'].value) || x.email.includes(this.searchForm.controls['word'].value));
    }
   
  } catch (error) {
    console.error(error);
  }

  setTimeout(() => {
    this.spinner.hide();
  }, 1000);
}

}
