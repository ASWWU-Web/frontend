import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ElectionsRequestService, HermesService } from '../../../shared-ng/services/services';
import { ElectionRoutes } from './elections.routes';

import {
  AdminBallotModalComponent,
  AdminBallotModalContentComponent,
  AdminBallotsComponent,
  AdminCandidatesRowComponent,
  AdminComponent,
  AdminElectionsCandidateModalComponent,
  AdminElectionsComponent,
  AdminElectionsRowComponent,
  AdminPositionsComponent,
  AdminPositionsRowComponent,
  CountdownComponent,
  DistrictSelectionComponent,
  HomeComponent,
  MultiPositionHandlerComponent,
  NavigatorComponent,
  VoteComponent,
  VoteFormComponent
} from './components/elections.component';

@NgModule({ declarations: [
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
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        FontAwesomeModule,
        RouterModule.forChild(ElectionRoutes)], providers: [
        ElectionsRequestService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class ElectionsModule {
  constructor(private hs: HermesService) {
    this.hs.sendHeaderTitle('Elections');
  }
}
