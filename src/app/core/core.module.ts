import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './../app-routing.module';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthorizationInterceptor } from './../shared/authorization.interceptor';
import { UserGuard } from './user/user-guard.service';
import { AddressGuard } from './address/address-guard.service';
import { ProfessionGaurd } from './professions/profession-guard.service';
import { UserResolve } from './user/user-resolve.service';
import { ProfessionResolve } from './professions/profession-resolve.service';
import { UserService } from './user/user.service';
import { GlobalDataService } from './../shared/global-data.service';
import { ServerAccessService } from './../shared/server-access.service';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { OrderCompleteComponent } from './order/order-complete/order-complete.component';
import { AddressComponent } from './address/address.component';
import { UserComponent } from './user/user.component';
import { OrderComponent } from './order/order.component';
import { ProfessionsComponent } from './professions/professions.component';
import { ProfessionComponent } from './professions/profession/profession.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ProfessionComponent,
        ProfessionsComponent,
        AddressComponent,
        UserComponent,
        OrderComponent,
        OrderCompleteComponent,
        ContactUsComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
          apiKey: "AIzaSyDyRmuM4bvGvATH-mZYJDCK0_xAjnW1qRE",
          libraries: [
            "places"
          ]
        })
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        ServerAccessService,
        GlobalDataService, 
        UserService,
        ProfessionResolve,
        UserResolve,
        ProfessionGaurd,
        AddressGuard,
        UserGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthorizationInterceptor,
          multi: true
        }
  ]
})
export class CoreModule { }