import { OrderCompleteComponent } from './order/order-complete/order-complete.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { AddressComponent } from './address/address.component';
import { ProfessionsComponent } from './professions/professions.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfessionResolve } from './professions/profession-resolve.service';
import { ProfessionGaurd } from './professions/profession-guard.service';
import { AddressGuard } from './address/address-guard.service';
import { UserResolve } from './user/user-resolve.service';
import { UserGuard } from './user/user-guard.service';

const appRoutes: Routes = [{
  path: '',
  component: ProfessionsComponent
}, {
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