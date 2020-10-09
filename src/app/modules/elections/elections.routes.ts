import { Route } from '@angular/router';
import {
  HomeComponent,
  VoteComponent,
  AdminComponent,
} from './components/elections.component';

export const ElectionRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'vote',
    component: VoteComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];
