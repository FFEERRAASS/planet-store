import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  constructor(public guestService:GuestService){}
  ngOnInit(): void {
    this.guestService.getContentForHome();

  }  }
