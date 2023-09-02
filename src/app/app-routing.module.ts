import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestModule } from './guest/guest.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DealerModule } from './dealer/dealer.module';
debugger;
const routes: Routes = [
  {
    path: '',
    loadChildren: () => GuestModule
  }, {
    path: 'admin',
    loadChildren: () => AdminModule
  }
  , {
    path: 'dealer',
    loadChildren: () => DealerModule
  }, {
    path: 'user',
    loadChildren: () => UserModule
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
