import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(public userService: UserService) { }
  ngOnInit(): void {

  }

  contactForm: FormGroup = new FormGroup({
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    phonenumber: new FormControl(),
    bigMessage:new FormControl('',[Validators.required])
  
  })
  sendContact() {
    debugger;
    this.userService.CreatContact(this.contactForm.value);
  }
}
