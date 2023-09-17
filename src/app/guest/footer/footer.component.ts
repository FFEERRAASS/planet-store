import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor( public guestService: GuestService,public toastr:ToastrService) { }
  ngOnInit(): void {

    this.guestService.getContentForHome2();


  }
  subscriptionForm: FormGroup = new FormGroup({
    fullname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email])
  })
  subscription(){
    if(this.subscriptionForm.valid){
      this.guestService.subscription(this.subscriptionForm.value);
    }
    else{
      this.toastr.warning("Enter the information correctly");
    }
  }
}