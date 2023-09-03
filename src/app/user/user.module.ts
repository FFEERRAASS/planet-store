import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { CardComponent } from './card/card.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    IndexComponent,
    ProductComponent,
    AboutComponent,
    ContactComponent,
    TestimonialComponent,
    CardComponent,
    ProfileComponent,
    CheckoutComponent
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,

  ]
})
export class UserModule { }
