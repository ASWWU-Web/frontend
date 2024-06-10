import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Services
import {
  HermesService,
  HomepageRequestService
} from '../../../shared-ng/services/services';
import {
  CalendarService,
  SuperDuperService
} from './services/services';

// Local Components
import {
  HomeComponent,
  OpenForumComponent,
  SuperDuperComponent,
  UpcomingComponent
} from './components/home.component';

// Routes
import { HomepageRoutes } from './homepage.routes';


@NgModule({
  declarations: [
    HomeComponent,
    OpenForumComponent,
    SuperDuperComponent,
    UpcomingComponent
  ],
  imports: [
    CommonModule,
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
    SuperDuperComponent,
    UpcomingComponent
  ],
  providers: [
    SuperDuperService,
    CalendarService,
    HomepageRequestService,
  ]
})
export class HomepageModule { }
