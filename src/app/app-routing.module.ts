import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestModule } from './guest/guest.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DealerModule } from './dealer/dealer.module';
import { checkauth } from './checkauth.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => GuestModule
  }, {
    path: 'admin',
    loadChildren: () => AdminModule,
    canActivate:[checkauth]
  }
  , {
    path: 'dealer',
    loadChildren: () => DealerModule,
    canActivate:[checkauth]
  }, {
    path: 'user',
    loadChildren: () => UserModule,
    canActivate:[checkauth]
  }, {
    path: 'planetAuth',
    loadChildren: () => AuthenticationModule
  }, {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
