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
  PagesRequestService,
  AuthService,
} from '../shared-ng/services/services';

import {
  SubNavbarLink
} from '../shared-ng/interfaces/interfaces';

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
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [
    RequestService,
    HermesService,
    AuthService,
    PagesRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private hs: HermesService) {
    library.add(faSearch);

    // sub navbar links
    const links: SubNavbarLink[] = [
      {linkText: 'Directory', linkURI: ''},
      {linkText: 'Search', linkURI: '/search'},
      {linkText: 'Collegian', linkURI: '/collegian'},
      {linkText: 'Events', linkURI: '/events'},
      {linkText: 'Departments', linkURI: '/departments'}
    ];

    // send sub navbar links
    this.hs.sendSubNavbarLinks(links);
  }
 }
