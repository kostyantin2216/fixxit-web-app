import { AuthorizationInterceptor } from './shared/authorization.interceptor';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { UserService } from './user/user.service';
import { GlobalDataService } from './shared/global-data.service';
import { AppComponent } from './app.component';
import { ProfessionComponent } from './professions/profession/profession.component';
import { ProfessionsComponent } from './professions/professions.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { AddressComponent } from './address/address.component';
import { OrderCompleteComponent } from './order/order-complete/order-complete.component';
import { HeaderComponent } from './header/header.component';
import { HoverClassDirective } from './shared/utilities/hover-class.directive';
import { ProfessionResolve } from './professions/profession-resolve.service';
import { ProfessionGaurd } from './professions/profession-guard.service';
import { AddressGuard } from './address/address-guard.service';
import { UserGuard } from './user/user-guard.service';
import { UserResolve } from './user/user-resolve.service';
import { ServerAccessService } from './shared/server-access.service';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import '../rxjs.imports';

@NgModule({
  declarations: [
    AppComponent,
    ProfessionComponent,
    ProfessionsComponent,
    OrderComponent,
    UserComponent,
    AddressComponent,
    OrderCompleteComponent,
    HeaderComponent,
    HoverClassDirective,
    FooterComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDyRmuM4bvGvATH-mZYJDCK0_xAjnW1qRE",
      libraries: [
        "places"
      ]
    })
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
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
