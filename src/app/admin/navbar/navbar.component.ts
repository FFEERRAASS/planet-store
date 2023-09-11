import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DealerService } from 'src/app/services/dealer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public router:Router,public dealerService:DealerService){}
ngOnInit(): void {
  this.dealerService.getUserInformation();
}
  logout(){
    this.router.navigate(['/planetAuth']);
    localStorage.clear();
  }
}
