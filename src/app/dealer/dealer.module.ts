import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealerRoutingModule } from './dealer-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { AddproductComponent } from './myproduct/addproduct.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { SaleschartComponent } from './saleschart/saleschart.component';
import { ChatComponent } from './chat/chat.component';
import { MeetingComponent } from './meeting/meeting.component';
import { ProfileComponent } from './profile/profile.component';
import { WalletComponent } from './wallet/wallet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TruncatePipe } from '../truncate.pipe';

import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,

    AddproductComponent,
    SalesreportComponent,
    SaleschartComponent,
    ChatComponent,
    MeetingComponent,
    ProfileComponent,
    WalletComponent
  ],
  imports: [
    CommonModule,
    DealerRoutingModule,
    ReactiveFormsModule ,
    MatInputModule ,
    NgChartsModule
  ]
})
export class DealerModule { }
