import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { OrderCompleteComponent } from './core/order/order-complete/order-complete.component';
import { UserGuard } from './core/user/user-guard.service';
import { UserResolve } from './core/user/user-resolve.service';
import { OrderComponent } from './core/order/order.component';
import { AddressGuard } from './core/address/address-guard.service';
import { UserComponent } from './core/user/user.component';
import { ProfessionGaurd } from './core/professions/profession-guard.service';
import { ProfessionResolve } from './core/professions/profession-resolve.service';
import { AddressComponent } from './core/address/address.component';
import { ContactUsComponent } from './core/contact-us/contact-us.component';
import { ProfessionsComponent } from './core/professions/professions.component';

const appRoutes: Routes = [{
  path: '',
  component: ProfessionsComponent
},
{
  path: 'contactus',
  component: ContactUsComponent
},
{
  path: ':profession',
  component: AddressComponent,
  resolve: {
    profession: ProfessionResolve
  },
  canActivate: [
    ProfessionGaurd
  ]
}, {
  path: ':profession/:address',
  component: UserComponent,
  canActivate: [
    AddressGuard
  ]
}, {
  path: ':profession/:address/:user',
  component: OrderComponent,
  resolve: {
    profession: ProfessionResolve,
    user: UserResolve
  },
  canActivate: [
    UserGuard
  ]
}, {
  path: ':profession/:address/:user/:comment',
  component: OrderCompleteComponent, 
  resolve: {
    profession: ProfessionResolve,
    user: UserResolve
  },
  canActivate: [
    UserGuard
  ]
}];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }