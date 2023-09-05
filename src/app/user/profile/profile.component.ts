import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(public userService: UserService, public dialog: MatDialog, public toastr: ToastrService) { }
  @ViewChild('callUpdateDialog') callUpdate!: TemplateRef<any>;
  @ViewChild('callChangeDialog') ChangePasswords!: TemplateRef<any>;

  obj: any = [];
  updateForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    username: new FormControl(),
    gender: new FormControl(),
    phoneNumber: new FormControl(),
    imagePath: new FormControl(),
    userId: new FormControl(),
    roleFk: new FormControl(),
    password: new FormControl('', [Validators.minLength(8)]),
    email: new FormControl(),
    rePassword: new FormControl('', [Validators.minLength(8)]),
    oldPassword: new FormControl('', [Validators.minLength(8)]),

    status: new FormControl()
  })
  ngOnInit(): void {
    this.userService.getuserProfile();
    this.oldData = this.userService.userInformation;

  }
  oldData: any = {}
  uploadFile(file: any) {
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0];
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    debugger;
    this.userService.uploadImage(formdata);
    debugger

  }
  updateuser() {
    this.userService.updateProfile(this.updateForm.value)
  }
  updateprofile() {
    this.dialog.open(this.callUpdate);
    this.oldData = this.userService.userInformation;
    this.updateForm.controls['userId'].setValue(this.oldData.userId);
    this.updateForm.controls['roleFk'].setValue(this.oldData.roleFk);
    this.updateForm.controls['status'].setValue(this.oldData.status);
    this.updateForm.controls['password'].setValue(this.oldData.password);
    this.userService.ImageUser = this.oldData.imagePath;
  }
  closeDialog() {
    this.dialog.closeAll()
  }
  ChangePassword() {
    debugger;
    this.dialog.open(this.ChangePasswords);
    this.oldData = this.userService.userInformation;
    this.userService.ImageUser = this.oldData.imagePath;
  }
  updatePassword() {
    debugger;
    if (this.updateForm.controls['oldPassword'].value == this.oldData.password) {
      if (this.updateForm.controls['password'].value == this.updateForm.controls['rePassword'].value) {
        this.oldData.password = this.updateForm.controls['password'].value;
        this.userService.updateProfile(this.oldData)
      }
      else {
        this.toastr.warning('The passwords do not match');
      }

    }
    else {
      this.toastr.error('The old password is incorrect')
    }
  }

  deleteAccount(userId: any) {
    Swal.fire({
      title: 'Are you sure you want to delete your account?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDelete(userId); // Call another function when user confirms
      } else if (result.isDenied) {
        Swal.fire('Account deletion was canceled', '', 'info');
      }
    });
  }
  confirmDelete(userId:any){
    this.userService.deleteAccount(userId)
  }
}
