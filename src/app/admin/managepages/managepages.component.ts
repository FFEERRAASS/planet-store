import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-managepages',
  templateUrl: './managepages.component.html',
  styleUrls: ['./managepages.component.css']
})
export class ManagepagesComponent implements OnInit {
  constructor(public adminService: AdminService, public spinner: NgxSpinnerService) { }
  oldDataContent: any = {}
  oldDataContent2: any = {}

  ngOnInit(): void {
    this.spinner.show();
    this.adminService.getContentForHome();
    this.adminService.getContentForHome2();
    
    setTimeout(() => {
      this.oldDataContent = this.adminService.HomeContent;
      this.oldDataContent2=this.adminService.HomeContent2;
      this.adminService.ImageHome=this.oldDataContent.paragraph8;
      debugger;
      this.adminService.AboutImage1=this.oldDataContent2.paragraph6;
      this.adminService.AboutImage2=this.oldDataContent2.paragraph7;
      this.adminService.AboutImage3=this.oldDataContent2.paragraph8;


    }, 1000);
  }
  uploadFile(file: any) {
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0];
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    debugger;
    this.adminService.uploadImageForHome(formdata);
    debugger
  }
  homeContentForm: FormGroup = new FormGroup({
    contentId: new FormControl(1),
    paragraph1: new FormControl(),
    paragraph2: new FormControl(),
    paragraph3: new FormControl(),
    paragraph4: new FormControl(),
    paragraph5: new FormControl(),
    paragraph6: new FormControl(),
    paragraph7: new FormControl(),
    paragraph8: new FormControl(),
  })
  homeContentForm2: FormGroup = new FormGroup({
    contentId: new FormControl(2),
    paragraph1: new FormControl(),
    paragraph2: new FormControl(),
    paragraph3: new FormControl(),
    paragraph4: new FormControl(),
    paragraph5: new FormControl(),
    paragraph6: new FormControl(),
    paragraph7: new FormControl(),
    paragraph8: new FormControl(),
  })
  uploadFile1(files: FileList | null) {
    debugger;
    if (!files || files.length === 0) {
      return; // No files selected or files is null, do nothing
    }
  
    const fileToUpload = files[0]; // Get the first file from the FileList
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
  
    // Assuming you have an adminService method for uploading Image 1
    this.adminService.uploadImageForAbout1(formdata);
  }
  
  uploadFile2(files: FileList | null) {
    debugger;

    if (!files || files.length === 0) {
      return; // No files selected or files is null, do nothing
    }
  
    const fileToUpload = files[0]; // Get the first file from the FileList
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
  
    // Assuming you have an adminService method for uploading Image 2
    this.adminService.uploadImageForAbout2(formdata);
  }
  
  uploadFile3(files: FileList | null) {
    debugger;

    if (!files || files.length === 0) {
      return; // No files selected or files is null, do nothing
    }
  
    const fileToUpload = files[0]; // Get the first file from the FileList
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
  
    // Assuming you have an adminService method for uploading Image 3
    this.adminService.uploadImageForAbout3(formdata);
  }
  
  updateHomeContent(){
    debugger;
    this.adminService.updateHomeContent(this.homeContentForm.value);
  }
  updateAboutContent(){
    debugger;
    this.adminService.updateAboutContent(this.homeContentForm2.value);
  }
}
