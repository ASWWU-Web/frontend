import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ElectionsRequestService, HermesService } from '../../../shared-ng/services/services';
import { ElectionRoutes } from './elections.routes';

import {
  HomeComponent,
  VoteComponent,
  AdminComponent,
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
} from './components/elections.component';

@NgModule({
  declarations: [
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
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forChild(ElectionRoutes),
  ],
  exports: [
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
  providers: [
    ElectionsRequestService
  ]
})
export class ElectionsModule {
  constructor(private hs: HermesService) {
    this.hs.sendHeaderTitle('Elections');
  }
}
