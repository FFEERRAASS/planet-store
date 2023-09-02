import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    email: new FormControl(),
    subject: new FormControl(),
    msg: new FormControl(),
    phonenumber: new FormControl(),

  })
  sendContact() {
    this.userService.CreatContact(this.contactForm.value);
  }
}
