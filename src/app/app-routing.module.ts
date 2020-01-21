import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './routes/search/search.component';
import { SuperSearchComponent } from './routes/super-search/super-search.component';
import { UpdateComponent } from './routes/update/update.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { RandomComponent } from './routes/random/random.component';
import { BirthdayComponent } from './routes/birthdays/birthday.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
