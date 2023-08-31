import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecAuthRoutingModule } from './sec-auth-routing.module';
import { RegisterVendorComponent } from './register-vendor/register-vendor.component';


@NgModule({
  declarations: [
    RegisterVendorComponent
  ],
  imports: [
    CommonModule,
    SecAuthRoutingModule
  ]
})
export class SecAuthModule { }
