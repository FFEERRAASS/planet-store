


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class checkauth implements CanActivate {
  constructor(private toaster:ToastrService, private router:Router){}

  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const token= localStorage.getItem('token');
      if(token)
      {
        if(state.url.indexOf('admin')>=0)
        {
          let user :any= localStorage.getItem('user');
          if(user)
          {
            user= JSON.parse(user);
       
            if(user.roleFk=='1')
            {
              
              return true;
            }
            else{
              this.toaster.warning('Sorry, this page for Admin');
              return false;
            }
          }
        }
        else if(state.url.indexOf('dealer')>=0){
          let user :any= localStorage.getItem('user');
          if(user)
          {
            user= JSON.parse(user);
       
            if(user.roleFk=='2'|| user.roleFk=='1')
            {
              
              return true;
            }
            else{
             
              this.toaster.warning('Sorry, this page for Dealer');
              if(user.roleFk ==3){
                this.router.navigate(['/user/']);
              }
              return false;
            }
          }
        }
        else if(state.url.indexOf('user')>=0){
          let user :any= localStorage.getItem('user');
          if(user)
          {
            user= JSON.parse(user);
       
            if(user.roleFk=='3'|| user.roleFk=='1')
            {
              
              return true;
            }
            else{
              this.toaster.warning('Sorry, this page for User');
              if(user.roleFk ==2){
                this.router.navigate(['/dealer/']);
              }
              return false;
            }
          }
        }

        return true;
      }
   
   else{
    this.router.navigate(['/planetAuth/']);
    return false;
   }
   
    }
  
}