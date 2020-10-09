import { Route } from '@angular/router';
import {
  AdminComponent,
  EditComponent,
  AdminCreateComponent,
  RevisionsComponent,
  AdminViewComponent,
  SearchComponent,
  DepartmentsComponent,
  EventsComponent,
  CollegianComponent,
  ViewPageComponent,
  DirectoryComponent
} from './components/pages.component';

export const PagesRoutes: Route[] = [
  {
    // MUST BE FIRST
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/edit/:pageURL',
    component: EditComponent
  },
  {
    path: 'admin/create',
    component: AdminCreateComponent
  },
  {
    path: 'admin/edit/:pageURL/revisions',
    component: RevisionsComponent
  },
  {
    path: 'admin/:pageURL',
    component: AdminViewComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'search:queryComponent',
    component: SearchComponent
  },
  {
    path: 'departments',
    component: DepartmentsComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'collegian',
    component: CollegianComponent
  },
  {
    path: '',
    component: DirectoryComponent
  },
  {
    // MUST BE LAST
    path: ':pageURL',
    component: ViewPageComponent
  }
];

