import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddproductComponent } from './myproduct/addproduct.component';

import { SalesreportComponent } from './salesreport/salesreport.component';
import { SaleschartComponent } from './saleschart/saleschart.component';
import { ProfileComponent } from './profile/profile.component';
import { WalletComponent } from './wallet/wallet.component';
import { MeetingComponent } from './meeting/meeting.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{
  path:'',
  component:HomeComponent
},{
  path:'myproduct',
  component:AddproductComponent
},{
  path:'salesreport',
  component:SalesreportComponent
},{
  path:'saleschart',
  component:SaleschartComponent
},{
  path:'profile',
  component:ProfileComponent
},{
  path:'wallet',
  component:WalletComponent
},{
  path:'meeting',
  component:MeetingComponent
},{
  path:'chat',
  component:ChatComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerRoutingModule { }
