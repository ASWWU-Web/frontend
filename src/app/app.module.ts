import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";  // https://classic.yarnpkg.com/en/package/ngx-spinner


// shared-ng components
import {
  NavBarComponent,
  FooterComponent,
  HeaderComponent,
  UserBubbleComponent,
  SharedNgContainerComponent,
  ErrorPageComponent,
} from '../shared-ng/components/components';
import {
  RequestService,
  HermesService,
  AuthService,
} from '../shared-ng/services/services';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HeaderComponent,
    UserBubbleComponent,
    SharedNgContainerComponent,
    ErrorPageComponent,
  ],
  imports: [
    NgbModule,
    NgxSpinnerModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule.forRoot(),
  ],
  providers: [
    RequestService,
    HermesService,
    AuthService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [

  ]
})
export class AppModule {
  constructor() {
    library.add(faSearch);
  }
}
