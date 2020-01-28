import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';


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
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
