import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubNavbarLink } from '../../../shared-ng/interfaces/interfaces';

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
  ProfileInfoComponent,
} from './components/shared/shared';

import { PagesRequestService, HermesService, RequestService } from '../../../shared-ng/services/services';

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
    ProfileInfoComponent
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
    RequestService,
    PagesRequestService
  ]
})

export class PagesModule {
  constructor(private hs: HermesService) {
    library.add(faSearch);

    // sub navbar links
    const links: SubNavbarLink[] = [
      {linkText: 'Directory', linkURI: ''},
      {linkText: 'Search', linkURI: '/search'},
      {linkText: 'Collegian', linkURI: '/collegian'},
      {linkText: 'Events', linkURI: '/events'},
      {linkText: 'Departments', linkURI: '/departments'}
    ];

    // send sub navbar links
    this.hs.sendSubNavbarLinks(links);
  }
 }