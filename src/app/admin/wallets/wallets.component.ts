import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit{
pipe: any;
constructor(public adminService:AdminService,public toastr:ToastrService){}
ngOnInit(): void {
  this.adminService.getWallet();
}
updateWalletStatus(walletId:number,action:number){
  this.adminService.updateWalletStatus(walletId,action);
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
  username :new FormControl()
})
search() {
debugger;


try {
  if (this.searchForm.controls['username'].value == null ) 
     {
    this.adminService.allWallets = this.adminService.allWallets;
    this.toastr.warning("Enter your search information, please.");
  } else {
    this.adminService.allWallets = this.adminService.allWallets.filter((x: any) => {
      if (this.searchForm.controls['username'].value != null) {
        return x.firstName.includes(this.searchForm.controls['username'].value) || x.username.includes(this.searchForm.controls['username'].value) || x.lastName.includes(this.searchForm.controls['username'].value)|| x.email.includes(this.searchForm.controls['username'].value);
      }
      return false; 
    });

    if (this.adminService.allWallets.length === 0) {
      this.toastr.warning("Not found any data");
    }
  }
} catch (error) {
  this.toastr.info("There is a problem searching, please try again later");

}
}
}