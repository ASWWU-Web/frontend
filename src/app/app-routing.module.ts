import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/homepage/components/home/home.component';
import { SearchComponent } from './modules/mask/components/search/search.component';
import { SuperSearchComponent } from './modules/mask/components/super-search/super-search.component';
import { UpdateComponent } from './modules/mask/components/update/update.component';
import { ProfileComponent } from './modules/mask/components/profile/profile.component';
import { RandomComponent } from './modules/mask/components/random/random.component';
import { BirthdayComponent } from './modules/mask/components/birthdays/birthday.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'mask',
    loadChildren: './modules/mask/mask.module#MaskModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
