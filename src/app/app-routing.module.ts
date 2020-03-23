import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from '../shared-ng/components/error-page/error-page.component';

import {
  HomeComponent,
  VoteComponent,
  AdminComponent
} from './routes/routes';


const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/homepage/homepage.module#HomepageModule'
  },
  {
    path: 'mask',
    loadChildren: './modules/mask/mask.module#MaskModule'
  },
  {
    'path': 'vote',
    component: VoteComponent
  },
  {
    'path': 'admin',
    component: AdminComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
