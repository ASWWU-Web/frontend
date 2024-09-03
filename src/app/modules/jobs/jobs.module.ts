import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { JobRoutes } from "./jobs.routes";
import { JobsRequestService } from "../../../shared-ng/services/services";

import { FileUploadModule } from "ng2-file-upload";

import {
  AdminComponent,
  AdminCreateComponent,
  AdminEditComponent,
  AdminReviewApplicationComponent,
  AdminReviewComponent,
  CardListComponent,
  DoneComponent,
  HomeComponent,
  SubmitComponent,
} from "./components/jobs.component";

@NgModule({
  declarations: [
    HomeComponent,
    SubmitComponent,
    DoneComponent,
    AdminComponent,
    AdminCreateComponent,
    AdminEditComponent,
    AdminReviewComponent,
    AdminReviewApplicationComponent,
    CardListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    FileUploadModule,
    RouterModule.forChild(JobRoutes),
  ],
  providers: [JobsRequestService, provideHttpClient(withInterceptorsFromDi())],
})
export class JobsModule {}
