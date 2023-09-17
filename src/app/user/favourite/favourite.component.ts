import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit{
constructor(public userService:UserService){}
ngOnInit(): void {
    this.userService.getProductFavourite();
}
removeFromFavourite(favouriteId:any){
    this.userService.removeFromFavourite(favouriteId);
}
addToCart(ProductId:any){
  debugger
  this.userService.addToCart1(ProductId);
}
}
