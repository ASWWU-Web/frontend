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
  AuthService,
  ElectionsRequestService
} from '../shared-ng/services/services';

import { AppComponent } from './app.component';

// project components
import {
  HomeComponent,
  VoteComponent,
  AdminComponent
} from './routes/routes';
import {
  CountdownComponent,
  AdminElectionsComponent,
  AdminElectionsCandidateModalComponent,
  AdminCandidatesRowComponent,
  AdminElectionsRowComponent,
  AdminPositionsComponent,
  AdminPositionsRowComponent,
  AdminBallotsComponent,
  VoteFormComponent,
  MultiPositionHandlerComponent,
  DistrictSelectionComponent,
  NavigatorComponent,
  AdminBallotModalComponent,
  AdminBallotModalContentComponent
} from './shared/shared';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HeaderComponent,
    UserBubbleComponent,
    SharedNgContainerComponent,
    ErrorPageComponent,
    HomeComponent,
    VoteComponent,
    AdminComponent,
    CountdownComponent,
    AdminElectionsComponent,
    AdminCandidatesRowComponent,
    AdminBallotsComponent,
    AdminPositionsComponent,
    VoteFormComponent,
    MultiPositionHandlerComponent,
    DistrictSelectionComponent,
    NavigatorComponent,
    AdminBallotModalComponent,
    AdminElectionsCandidateModalComponent,
    AdminElectionsRowComponent,
    AdminPositionsRowComponent,
    AdminBallotModalContentComponent

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
  ],
  providers: [
    RequestService,
    HermesService,
    ElectionsRequestService,
    AuthService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AdminElectionsCandidateModalComponent,
    AdminElectionsRowComponent,
    AdminPositionsRowComponent,
    AdminBallotModalContentComponent
  ]
})
export class AppModule {
  constructor() {
    library.add(faSearch);
  }
}
