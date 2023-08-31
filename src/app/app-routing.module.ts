import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestModule } from './guest/guest.module';
import { AdminModule } from './admin/admin.module';

 const routes: Routes = [
  {
    path:'',
    loadChildren:()=>GuestModule

},{
  path:'admin',
  loadChildren:()=>AdminModule
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
