import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-previouspurchases',
  templateUrl: './previouspurchases.component.html',
  styleUrls: ['./previouspurchases.component.css']
})
export class PreviouspurchasesComponent implements OnInit {
  constructor(public userService: UserService) { }
  ngOnInit(): void {
    debugger;

    this.userService.getPreviousPurchase();
  }
  removePreviousPurchase(ppurchaseId: any) {
    debugger;
    this.userService.removePreviousPurchase(ppurchaseId);
  }
}
