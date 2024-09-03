import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UnescapePipe } from './unescape';
import { MaskRoutes } from './mask.routes';

import { HermesService, MaskRequestService } from '../../../shared-ng/services/services';
import { SubNavbarLink } from '../../../shared-ng/interfaces/interfaces';

import {
  BirthdayComponent,
  ProfileComponent,
  ProfileFullComponent,
  ProfileModalComponent,
  ProfileModalContentComponent,
  ProfileSmComponent,
  RandomComponent,
  SearchComponent,
  SearchResultsComponent,
  SuperSearchComponent,
  UpdateComponent
} from './components/mask.components';

@NgModule({
  declarations: [
    ProfileComponent,
    SearchComponent,
    UpdateComponent,
    RandomComponent,
    BirthdayComponent,
    SuperSearchComponent,
    ProfileFullComponent,
    ProfileSmComponent,
    ProfileModalComponent,
    ProfileModalContentComponent,
    SearchResultsComponent,
    UnescapePipe,
  ],
  exports: [
    ProfileComponent,
    SearchComponent,
    UpdateComponent,
    RandomComponent,
    BirthdayComponent,
    SuperSearchComponent,
    ProfileFullComponent,
    ProfileSmComponent,
    ProfileModalComponent,
    ProfileModalContentComponent,
    SearchResultsComponent,
  ], imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forChild(MaskRoutes)], providers: [
      MaskRequestService,
      provideHttpClient(withInterceptorsFromDi())
    ]
})
export class MaskModule {
  fade = 1;
  constructor(private hermes: HermesService, private loc: Location, private router: Router) {
    this.router.events.subscribe(() => {
      this.fade = 2;

      // fade in/out background for profiles
      if (this.loc.path().search('profile') !== -1) {
        this.fade = 1;
      } else if (this.loc.path().search('update') !== -1) {
        this.fade = 1;
      } else if (this.loc.path().search('random') !== -1) {
        this.fade = 1;
      }
    });
    this.hermes.sendHeaderTitle('Mask');

    // sub navbar links
    const links: SubNavbarLink[] = [
      { linkText: 'Search', linkURI: '/mask/search' },
      { linkText: 'Super Search', linkURI: '/mask/super-search' },
      { linkText: 'Random Profile', linkURI: '/mask/random' },
      { linkText: 'Birthdays', linkURI: '/mask/birthdays' }
    ];

    // send links to page
    this.hermes.sendSubNavbarLinks(links);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
