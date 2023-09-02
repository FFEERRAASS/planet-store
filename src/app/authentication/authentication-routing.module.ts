import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegvendorsComponent } from './regvendors/regvendors.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

const routes: Routes = [{
  path:'',
  component:LoginComponent
},{
  path:'reguser',
  component:RegisterComponent
},{
  path:'regvendors',
  component:RegvendorsComponent
},{
  path:'forgetpassword',
  component:ForgetpasswordComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
