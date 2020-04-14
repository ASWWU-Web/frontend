import { Route } from '@angular/router';
import {
  HomeComponent,
  SubmitComponent,
  DoneComponent,
  AdminComponent,
  AdminCreateComponent,
  AdminEditComponent,
  AdminReviewComponent,
  AdminReviewApplicationComponent,
} from './components/jobs.component';

export const JobRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'submit/:formID',
    component: SubmitComponent
  },
  {
    path: 'done/:formID',
    component: DoneComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/create',
    component: AdminCreateComponent
  },
  {
    path: 'admin/edit/:formID',
    component: AdminEditComponent
  },
  {
    path: 'admin/review/:formID',
    component: AdminReviewComponent
  },
  {
    path: 'admin/review/:formID/:username',
    component: AdminReviewApplicationComponent
  },
];



