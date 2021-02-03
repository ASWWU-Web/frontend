import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from '../shared-ng/components/error-page/error-page.component';
import {AtlasComponent} from "../app/modules/atlas/atlas.component";


const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/homepage/homepage.module#HomepageModule'
  },
  {
    path: 'atlas',
    component: AtlasComponent
  },
  {
    path: 'mask',
    loadChildren: './modules/mask/mask.module#MaskModule'
  },
  {
    path: 'jobs',
    loadChildren: './modules/jobs/jobs.module#JobsModule'
  },
  {
    'path': 'elections',
    loadChildren: './modules/elections/elections.module#ElectionsModule'
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
