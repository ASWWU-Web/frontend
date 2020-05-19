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
import { NotificationAdminComponent } from './components/notification/notification-admin/notification-admin.component';
import { NotificationEditComponent } from './components/notification/notification-edit/notification-edit.component';
import { NotificationViewComponent } from './components/notification/notification-view/notification-view.component';


@NgModule({
  declarations: [
    HomeComponent,
    OpenForumComponent,
    SuperDuperComponent,
    UpcomingComponent,
    NotificationAdminComponent,
    NotificationEditComponent,
    NotificationViewComponent
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
