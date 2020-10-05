import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Services
import {
  HermesService,
  HomepageRequestService
} from '../../../shared-ng/services/services';
import {
  CalendarService,
  SuperHomepageSearchService
} from './services/services';

// Local Components
import {
  HomeComponent,
  OpenForumComponent,
  SuperHomepageSearchComponent,
  UpcomingComponent
} from './components/home.component';

// Routes
import { HomepageRoutes } from './homepage.routes';


@NgModule({
  declarations: [
    HomeComponent,
    OpenForumComponent,
    SuperHomepageSearchComponent,
    UpcomingComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forChild(HomepageRoutes),
  ],
  exports: [
    HomeComponent,
    OpenForumComponent,
    SuperHomepageSearchComponent,
    UpcomingComponent
  ],
  providers: [
    SuperHomepageSearchService,
    CalendarService,
    HomepageRequestService,
  ]
})
export class HomepageModule { }
