import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from '../shared-ng/components/error-page/error-page.component';
import {AtlasComponent} from "../app/modules/atlas/atlas.component";


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'atlas',
    component: AtlasComponent
  },
  {
    path: 'mask',
    loadChildren: () => import('./modules/mask/mask.module').then(m => m.MaskModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./modules/jobs/jobs.module').then(m => m.JobsModule)
  },
  {
    'path': 'elections',
    loadChildren: () => import('./modules/elections/elections.module').then(m => m.ElectionsModule)
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
