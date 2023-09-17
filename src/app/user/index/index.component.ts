import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
declare function slider() :any;
declare var $: any;

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
  this.userService.getContentForHome2();
  setTimeout(() => {
    this.fun();
  }, 1000);
}

fun(){
  $(document).ready(() => {
    $('#testimonial-carousel').carousel();

    // Handle previous button click
    $('.prev').click(() => {
      $('#testimonial-carousel').carousel('prev');
    });

    // Handle next button click
    $('.next').click(() => {
      $('#testimonial-carousel').carousel('next');
    });
  });
}
getallProductCategory(categoryId: any) {
  debugger;
  this.userService.getallProductCategory(categoryId);
}
}
