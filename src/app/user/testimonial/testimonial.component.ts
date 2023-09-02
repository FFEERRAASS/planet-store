import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  constructor(public userService:UserService){}
  ngOnInit(): void {
    
  }
  TestimonialForm:FormGroup = new FormGroup({
    testimonialDate:new FormControl(),
    testimonialMessage:new FormControl('',[Validators.required,Validators.minLength(30),Validators.maxLength(499)]),
    userFk:new FormControl(),
    status:new FormControl()
  })
  sendTestimonial(){
    debugger;
    const currentDate = new Date();
    this.TestimonialForm.controls['status'].setValue(0);
    this.TestimonialForm.controls['testimonialDate'].setValue(currentDate)
    this.userService.CreatTestimonial(this.TestimonialForm.value)
  }

}
