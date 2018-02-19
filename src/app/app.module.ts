import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';

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
import { HeaderComponent } from './header/header.component';import { GlobalStateService } from './shared/global-state.service';
import { HoverClassDirective } from './shared/utilities/hover-class.directive';

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
  ],
  imports: [
    BrowserModule,
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
    GlobalDataService, 
    GlobalStateService, 
    UserService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
