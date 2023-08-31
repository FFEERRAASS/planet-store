import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthComponent } from './login-auth/login-auth.component';

const routes: Routes = [
  {
    path:'',
    component:LoginAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecAuthRoutingModule { }
