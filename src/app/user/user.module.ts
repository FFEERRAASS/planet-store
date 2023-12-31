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
import { FavouriteComponent } from './favourite/favourite.component';
import { PreviouspurchasesComponent } from './previouspurchases/previouspurchases.component';
import { MatInputModule } from '@angular/material/input';
import { ProductfromcategoryComponent } from './productfromcategory/productfromcategory.component';


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
    CheckoutComponent,
    FavouriteComponent,
    PreviouspurchasesComponent,
    ProductfromcategoryComponent
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule ,
    MatInputModule 

  ]
})
export class UserModule { }
