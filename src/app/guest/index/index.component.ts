import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';
import { UserService } from 'src/app/services/user.service';
declare function slider(): any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(public userService: UserService, public guestService: GuestService) { }
  ngOnInit(): void {
    debugger;
    this.guestService.getAllCategory()
    this.guestService.getAllTestimonialAccepted();
    this.guestService.getContentForHome();
    this.guestService.getContentForHome2();

    slider();
  }
  getallProductCategory(categoryId: any) {
    debugger;
    this.guestService.getallProductCategory(categoryId);
  }
}
