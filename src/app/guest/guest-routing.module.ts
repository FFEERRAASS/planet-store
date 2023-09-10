import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProductComponent } from './product/product.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductCategoryComponent } from './product-category/product-category.component';

const routes: Routes = [{
  path:'',
  component:IndexComponent
},{
  path:'AboutUs',
  component:AboutusComponent
},
{
  path:'Product',
  component:ProductComponent
},
{
  path:'ContactUs',
  component:ContactusComponent
},{
  path:'specificproduct',
  component:ProductCategoryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
