import { CoreModule } from './core/core.module';
import { AuthorizationInterceptor } from './shared/authorization.interceptor';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { GlobalDataService } from './shared/global-data.service';
import { AppComponent } from './app.component';
import { HoverClassDirective } from './shared/utilities/hover-class.directive';
import { ServerAccessService } from './shared/server-access.service';
import '../rxjs.imports';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
