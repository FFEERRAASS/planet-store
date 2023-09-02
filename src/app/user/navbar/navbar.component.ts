import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/style.css',
    '../../../assets/css/tiny-slider.css',
  ],
})
export class NavbarComponent implements OnInit {
  constructor(public router:Router){}
ngOnInit(): void {
  
}
logout(){
  this.router.navigate(['/planetAuth']);
  localStorage.clear();
}
}
