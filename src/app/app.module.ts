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

// mask project components
import {
  ProfileComponent,
  SearchComponent,
  UpdateComponent,
  RandomComponent,
  BirthdayComponent,
  SuperSearchComponent
} from './routes/routes';
import {
  ProfileFullComponent,
  ProfileSmComponent,
  SearchResultsComponent,
  UnescapePipe,
  ProfileModalComponent,
  ProfileModalContentComponent
} from './routes/routes';

// homepage project components
import { SuperDuperService } from './services/services';
import { SuperDuperComponent } from './routes/homepage/super-duper/super-duper.component';
import { UpcomingComponent } from './routes/homepage/upcoming/upcoming.component';
import { CalendarService } from './services/calendar.service';
import { HomeComponent } from './routes/homepage/home/home.component';
import { OpenForumComponent } from './routes/homepage/open-forum/open-forum.component';

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
    ProfileComponent,
    SearchComponent,
    UpdateComponent,
    RandomComponent,
    BirthdayComponent,
    SuperSearchComponent,
    ProfileFullComponent,
    ProfileSmComponent,
    ProfileModalComponent,
    ProfileModalContentComponent,
    SearchResultsComponent,
    UnescapePipe,
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
    ProfileModalComponent,
    ProfileModalContentComponent
  ]
})
export class AppModule {
  constructor() {
    library.add(faSearch);
  }
}
