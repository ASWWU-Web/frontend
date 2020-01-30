import { Route } from '@angular/router';
import {
  ProfileComponent,
  SearchComponent,
  UpdateComponent,
  RandomComponent,
  BirthdayComponent,
  SuperSearchComponent,
} from './components/mask.components';

export const MaskRoutes: Route[] = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'search:query',
    component: SearchComponent
  },
  {
    path: 'super-search',
    component: SuperSearchComponent
  },
  {
    path: 'super-search:query',
    component: SuperSearchComponent
  },
  {
    path: 'update',
    component: UpdateComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile/:username',
    component: ProfileComponent
  },
  {
    path: 'profile/:username/:year',
    component: ProfileComponent
  },
  {
    path: 'random',
    component: RandomComponent
  },
  {
    path: 'birthdays',
    component: BirthdayComponent
  }
];
