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
  SharedNgContainerComponent
} from '../shared-ng/components/components';
import {
  RequestService,
  HermesService,
  HomepageRequestService,
  AuthService,
  MaskRequestService,
} from '../shared-ng/services/services';

// homepage project components
import { SuperDuperService } from './services/services';
import { SuperDuperComponent } from './modules/homepage/components/super-duper/super-duper.component';
import { UpcomingComponent } from './modules/homepage/components/upcoming/upcoming.component';
import { CalendarService } from './services/calendar.service';
import { HomeComponent } from './modules/homepage/components/home/home.component';
import { OpenForumComponent } from './modules/homepage/components/open-forum/open-forum.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HeaderComponent,
    UpcomingComponent,
    UserBubbleComponent,
    HomeComponent,
    SuperDuperComponent,
    OpenForumComponent,
    SharedNgContainerComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [
    RequestService,
    CalendarService,
    SuperDuperService,
    HermesService,
    HomepageRequestService,
    AuthService,
    MaskRequestService
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
