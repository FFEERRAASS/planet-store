import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProductComponent } from './product/product.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductCategoryComponent } from './product-category/product-category.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    IndexComponent,
    AboutusComponent,
    ProductComponent,
    ContactusComponent,
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GuestRoutingModule,
    ReactiveFormsModule ,
    MatInputModule 
  ]
})
export class GuestModule { }
