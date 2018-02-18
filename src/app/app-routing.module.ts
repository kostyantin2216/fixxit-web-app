import { OrderCompleteComponent } from './order/order-complete/order-complete.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { AddressComponent } from './address/address.component';
import { ProfessionsComponent } from './professions/professions.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes = [
    { path: '', component: ProfessionsComponent },
    { path: ':profession', component: AddressComponent },
    { path: ':profession/:address', component: UserComponent },
    { path: ':profession/:address/:user', component: OrderComponent },
    { path: ':profession/:address/:user/complete', component: OrderCompleteComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }