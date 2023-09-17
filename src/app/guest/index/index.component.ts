import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(public guestService: GuestService) { }
  ngOnInit(): void {
    debugger;
    this.guestService.getAllCategory()
    this.guestService.getAllTestimonialAccepted();
    this.guestService.getContentForHome();
    this.guestService.getContentForHome2();
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
    this.guestService.getallProductCategory(categoryId);
  }
}
