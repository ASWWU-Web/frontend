import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './routes/homepage/home/home.component';
import { SearchComponent } from './routes/mask/search/search.component';
import { SuperSearchComponent } from './routes/mask/super-search/super-search.component';
import { UpdateComponent } from './routes/mask/update/update.component';
import { ProfileComponent } from './routes/mask/profile/profile.component';
import { RandomComponent } from './routes/mask/random/random.component';
import { BirthdayComponent } from './routes/mask/birthdays/birthday.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'mask/search',
    component: SearchComponent
  },
  {
    path: 'mask/search:query',
    component: SearchComponent
  },
  {
    path: 'mask/super-search',
    component: SuperSearchComponent
  },
  {
    path: 'mask/super-search:query',
    component: SuperSearchComponent
  },
  {
    path: 'mask/update',
    component: UpdateComponent
  },
  {
    path: 'mask/profile',
    component: ProfileComponent
  },
  {
    path: 'mask/profile/:username',
    component: ProfileComponent
  },
  {
    path: 'mask/profile/:username/:year',
    component: ProfileComponent
  },
  {
    path: 'mask/random',
    component: RandomComponent
  },
  {
    path: 'mask/birthdays',
    component: BirthdayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
