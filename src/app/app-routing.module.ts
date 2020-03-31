import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from '../shared-ng/components/error-page/error-page.component';


import {
  HomeComponent,
  SubmitComponent,
  DoneComponent,
  AdminComponent,
  AdminCreateComponent,
  AdminEditComponent,
  AdminReviewComponent,
  AdminReviewApplicationComponent,
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
    path: 'jobs',
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
  {
    path: '**',
    component: ErrorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
