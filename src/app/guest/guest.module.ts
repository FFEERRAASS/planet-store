import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProductComponent } from './product/product.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ContactusComponent } from './contactus/contactus.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    IndexComponent,
    AboutusComponent,
    ProductComponent,
    TestimonialComponent,
    ContactusComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule
  ]
})
export class GuestModule { }
