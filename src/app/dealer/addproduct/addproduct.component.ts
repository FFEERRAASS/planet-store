import { Component, OnInit } from '@angular/core';
import { DealerService } from 'src/app/services/dealer.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit{
  constructor(public dealerService:DealerService){}
  ngOnInit(): void {
    debugger
    this.dealerService.getAllProductForDealer();
  }

}
