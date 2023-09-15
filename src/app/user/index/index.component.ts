import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
declare function slider() :any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(public userService :UserService){}
ngOnInit(): void {
  this.userService.getAllCategory()
  this.userService.getAllTestimonialAccepted();
  this.userService.getContentForHome();

  slider();
}
}
