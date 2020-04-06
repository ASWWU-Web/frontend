import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from '../shared-ng/components/error-page/error-page.component';


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
    'path': 'elections',
    loadChildren: './modules/elections/elections.module#ElectionsModule'
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
