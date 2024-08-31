import { Route } from '@angular/router';
import {
  AdminComponent,
  AdminCreateComponent,
  AdminEditComponent,
  AdminReviewApplicationComponent,
  AdminReviewComponent,
  DoneComponent,
  HomeComponent,
  SubmitComponent,
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



