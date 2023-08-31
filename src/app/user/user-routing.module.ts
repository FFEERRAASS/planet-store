import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { CardComponent } from './card/card.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [{
  path:'',
  component:IndexComponent
},{
  path:'About',
  component:AboutComponent
},{
  path:'Testimonial',
  component:TestimonialComponent
},
{
  path:'Product',
  component:ProductComponent
},
{
  path:'ContactUs',
  component:ContactComponent
},{
  path:'Card',
  component:CardComponent
},{
  path:'Profile',
  component:ProfileComponent
},{
  path:'Checkout',
  component:CheckoutComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
