import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  ViewPageComponent,
  EditComponent,
  RevisionsComponent,
  AdminComponent,
  AdminCreateComponent,
  AdminViewComponent,
  DirectoryComponent,
  SearchComponent,
  DepartmentsComponent,
  EventsComponent,
  CollegianComponent
} from './components/pages.component';

import {
  PageComponent,
  ProfileSmComponent,
  SubNavBarComponent,
  MobileNavComponent,
  UnescapePipe,
  BypassSecurityPipe,
  PageScrollCardsComponent,
  FieldScrollCardsComponent,
  PageResultsComponent,
  PageCardComponent,
  FieldResultsComponent,
  FieldCardComponent,
  ProfileInfoComponent
} from './components/shared/shared';

import { PagesRequestService, HermesService } from '../../../shared-ng/services/services';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { TagInputModule } from 'ngx-chips';
import { PagesRoutes } from './pages.routes';

@NgModule({
  declarations: [
    PageComponent,
    EditComponent,
    RevisionsComponent,
    ProfileSmComponent,
    SubNavBarComponent,
    MobileNavComponent,
    UnescapePipe,
    BypassSecurityPipe,
    DirectoryComponent,
    PageScrollCardsComponent,
    FieldScrollCardsComponent,
    PageCardComponent,
    AdminComponent,
    AdminCreateComponent,
    AdminViewComponent,
    SearchComponent,
    PageResultsComponent,
    DepartmentsComponent,
    FieldResultsComponent,
    EventsComponent,
    CollegianComponent,
    ViewPageComponent,
    FieldCardComponent,
    ProfileInfoComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    TagInputModule,
    FroalaViewModule.forRoot(),
    FroalaEditorModule.forRoot(),
    RouterModule.forChild(PagesRoutes),
  ],
  exports: [

  ],
  providers: [
    HermesService,
    PagesRequestService
  ]
})
export class PagesModule {
  constructor() {}
}
