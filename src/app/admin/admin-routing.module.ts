import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ProductsComponent } from './products/products.component';
import { WalletsComponent } from './wallets/wallets.component';
import { VendorrequestComponent } from './vendorrequest/vendorrequest.component';
import { VendorComponent } from './vendor/vendor.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductplanComponent } from './productplan/productplan.component';
import { MeetingComponent } from './meeting/meeting.component';
import { ManagepagesComponent } from './managepages/managepages.component';
import { FinanceComponent } from './finance/finance.component';
import { ChatComponent } from './chat/chat.component';
import { ChartreportsComponent } from './chartreports/chartreports.component';
import { CategoryComponent } from './category/category.component';
import { BlockedComponent } from './blocked/blocked.component';

const routes: Routes = [
  {
    path:'',
    component:IndexComponent
  },{
    path:'products',
    component:ProductsComponent
  },{
    path:'wallets',
    component:WalletsComponent
  },{
    path:'vendorrequest',
    component:VendorrequestComponent
  },{
    path:'vendor',
    component:VendorComponent
  },{
    path:'users',
    component:UsersComponent
  },{
    path:'reports',
    component:ReportsComponent
  },{
    path:'profile',
    component:ProfileComponent
  },{
    path:'productplan',
    component:ProductplanComponent
  },{
    path:'meeting',
    component:MeetingComponent
  },{
    path:'managepages',
    component:ManagepagesComponent
  },{
    path:'finance',
    component:FinanceComponent
  },{
    path:'chat',
    component:ChatComponent
  },{
    path:'chartreports',
    component:ChartreportsComponent
  },{
    path:'category',
    component:CategoryComponent
  },{
    path:'blocked',
    component:BlockedComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
