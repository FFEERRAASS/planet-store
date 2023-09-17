import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit{
  @ViewChild('callTestimonialDeatilsDialog') callTestimonialDeatilsDialog!: TemplateRef<any>;

  constructor(public adminService:AdminService,public dialog:MatDialog){}
  ngOnInit(): void {
    this.adminService.getAllTestimonial();
  }
  modifyTestimonial(testimonialId:number,action:number){
    this.adminService.modifyTestimonial(testimonialId,action);
  }
  closeDialog() {
    this.dialog.closeAll()
  }
  readMore(testimonialId:number){
    this.adminService.getTestimonialbyId(testimonialId);
    this.dialog.open(this.callTestimonialDeatilsDialog);
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
}
