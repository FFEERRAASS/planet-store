import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ProductComponent } from './product/product.component';
import { ContactusComponent } from './contactus/contactus.component';

const routes: Routes = [{
  path:'',
  component:IndexComponent
},{
  path:'AboutUs',
  component:AboutusComponent
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
  component:ContactusComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
