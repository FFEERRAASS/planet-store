import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorrequestComponent } from './vendorrequest/vendorrequest.component';
import { FinanceComponent } from './finance/finance.component';
import { ReportsComponent } from './reports/reports.component';
import { ChartreportsComponent } from './chartreports/chartreports.component';
import { WalletsComponent } from './wallets/wallets.component';
import { ChatComponent } from './chat/chat.component';
import { MeetingComponent } from './meeting/meeting.component';
import { ManagepagesComponent } from './managepages/managepages.component';
import { ProductplanComponent } from './productplan/productplan.component';
import { CategoryComponent } from './category/category.component';
import { BlockedComponent } from './blocked/blocked.component';
import { ProfileComponent } from './profile/profile.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    IndexComponent,
    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    UsersComponent,
    VendorComponent,
    VendorrequestComponent,
    FinanceComponent,
    ReportsComponent,
    ChartreportsComponent,
    WalletsComponent,
    ChatComponent,
    MeetingComponent,
    ManagepagesComponent,
    ProductplanComponent,
    CategoryComponent,
    BlockedComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class AdminModule { }
