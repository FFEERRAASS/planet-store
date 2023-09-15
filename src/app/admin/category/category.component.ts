import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @ViewChild('callCateogyDeatilsDialog') callCateogyDeatilsDialog!: TemplateRef<any>;
  @ViewChild('callAddCategoryDialog') addNewCategory!: TemplateRef<any>;
  @ViewChild('callUpdateCategoryDialog') updateCategory!: TemplateRef<any>;

  constructor(public adminService: AdminService, public dialog: MatDialog,public spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.adminService.Category();
  }

  oldCategoryData:any;
  editCategory(categoryId:number){
    this.adminService.getCategoryById(categoryId);

    setTimeout(() => {

      this.oldCategoryData=this.adminService.specificCategory;
      this.adminService.categoryImage=this.oldCategoryData.categoryImage;
      this.updateCategoryForm.controls['categoryId'].setValue(categoryId);

    }, 500);
    setTimeout(() => {

      this.dialog.open(this.updateCategory);
    }, 200);

  }
  uploadFile(file: any) {
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0];
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    debugger;
    this.adminService.uploadImageCategory(formdata);
    debugger

  }
  createCategoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('',[Validators.required]),
    categoryDescription: new FormControl('',[Validators.required]),
    categoryImage: new FormControl()
  })
  updateCategoryForm: FormGroup = new FormGroup({
    categoryId: new FormControl('',[Validators.required]),
    categoryName: new FormControl('',[Validators.required]),
    categoryDescription: new FormControl('',[Validators.required]),
    categoryImage: new FormControl()
  })
  addCategory() {
      this.dialog.open(this.addNewCategory);
  }
  saveCategory(){
    if(this.createCategoryForm.valid){
        this.adminService.createCategory(this.createCategoryForm.value);
    }
  }
  showDetails(categoryId: number) {
    this.adminService.getCategoryById(categoryId);
    this.dialog.open(this.callCateogyDeatilsDialog);
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  
  deleteCategory(categoryId: any) {
    Swal.fire({
      title: 'Are you sure to delete the category?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDelete(categoryId);
      } else if (result.isDenied) {
        Swal.fire('Category deletion was canceled', '', 'info');
      }
    });
  }
  confirmDelete(categoryId: number){
    this.adminService.deleteCategory(categoryId);
  }
  saveEditCategory(){
    debugger;
    this.adminService.updateCategory(this.updateCategoryForm.value);

  }
}
