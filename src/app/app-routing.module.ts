import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestModule } from './guest/guest.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { SecAuthModule } from './sec-auth/sec-auth.module';

 const routes: Routes = [
  {
    path:'',
    loadChildren:()=>GuestModule
},{
  path:'admin',
  loadChildren:()=>AdminModule
},{
  path:'user',
  loadChildren:()=>UserModule
}
,{
  path:'Auth',
  loadChildren:()=>SecAuthModule
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
