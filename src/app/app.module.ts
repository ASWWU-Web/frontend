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

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { TagInputModule } from 'ngx-chips';

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
  PagesRequestService,
  AuthService,
} from '../shared-ng/services/services';

import {
  SubNavbarLink
} from '../shared-ng/interfaces/interfaces';

import { AppComponent } from './app.component';

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
} from './routes/routes';

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
    NgbModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
    FroalaViewModule.forRoot(),
    FroalaEditorModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        // MUST BE FIRST
        'path': 'admin',
        component: AdminComponent
      }, {
        'path': 'admin/edit/:pageURL',
        component: EditComponent
      }, {
        'path': 'admin/create',
        component: AdminCreateComponent
      }, {
        'path': 'admin/edit/:pageURL/revisions',
        component: RevisionsComponent
      }, {
        'path': 'admin/:pageURL',
        component: AdminViewComponent
      }, {
        'path': 'search',
        component: SearchComponent
      }, {
        'path': 'search:queryComponent',
        component: SearchComponent
      }, {
        'path': 'departments',
        component: DepartmentsComponent
      }, {
        'path': 'events',
        component: EventsComponent
      }, {
        'path': 'collegian',
        component: CollegianComponent
      }, {
        // MUST BE LAST
        'path': ':pageURL',
        component: ViewPageComponent
      }, {
        'path': '',
        component: DirectoryComponent
      }
    ])
  ],
  providers: [
    RequestService,
    HermesService,
    AuthService,
    PagesRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
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
