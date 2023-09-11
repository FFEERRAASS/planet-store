import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DealerService } from 'src/app/services/dealer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  constructor(public dealerService: DealerService, public userService: UserService, public dialog: MatDialog, public toastr: ToastrService) { }
  @ViewChild('transfermoneydialog') callTransferMoneyDialog!: TemplateRef<any>;
  @ViewChild('callDrawMoneyDialog') DrawMoneyDialog!: TemplateRef<any>;

  ngOnInit(): void {
    this.dealerService.getWallet();
    this.userService.getuserProfile();

  }
  userId: any = localStorage.getItem('userId');

  transferMoneyForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    phonenumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    Amount: new FormControl('', [Validators.required]),
    userFk: new FormControl(this.userId)
  })
  cashWithDraw: FormGroup = new FormGroup({
    iban: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    userFk: new FormControl(this.userId)
  })
  closeDialog() {
    this.dialog.closeAll()
  }
  moneyTransfer() {
    this.dialog.open(this.callTransferMoneyDialog);
  }
  cashWithdraw() {
    this.dialog.open(this.DrawMoneyDialog);
  }
  drawMoney() {
    
    if(this.cashWithDraw.valid){
      this.dealerService.cashWithDraw(this.cashWithDraw.value)
    }
    else {
      this.toastr.info('Make sure to enter the information correctly');
    }
  }
  transfer() {
    debugger;
    if (this.transferMoneyForm.valid) {
      this.dealerService.transfeerMoney(this.transferMoneyForm.value);
    }
    else {
      this.toastr.info('Make sure to enter the information correctly');
    }
  }
}
