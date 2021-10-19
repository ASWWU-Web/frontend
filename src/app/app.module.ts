import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  UploadModalComponent,
  ContentModerationComponent
} from '../shared-ng/components/components';
import {
  RequestService,
  HermesService,
  PagesRequestService,
  AuthService,
} from '../shared-ng/services/services';
import { ToastrModule } from 'ngx-toastr';

<<<<<<< HEAD
import {
  SubNavbarLink
} from '../shared-ng/interfaces/interfaces';
=======
import { AppComponent } from './app.component';
import {AtlasComponent} from "./modules/atlas/atlas.component";
>>>>>>> 5ce80ee06e83e300e6d7a7683f6a24846791ddd4

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
    UploadModalComponent,
    ContentModerationComponent,
    AtlasComponent
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
<<<<<<< HEAD
    NgbModule,
=======
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-left'
    })
>>>>>>> 5ce80ee06e83e300e6d7a7683f6a24846791ddd4
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
