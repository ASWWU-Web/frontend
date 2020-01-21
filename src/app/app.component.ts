import { Component, NgModule, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { HermesService } from '../shared-ng/services/services';
import { SubNavbarLink } from '../shared-ng/interfaces/interfaces';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  fade = 1;

  constructor(
    private hermes: HermesService,
    private loc: Location,
    private router: Router
  ) {
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
        {linkText: 'Search', linkURI: '/mask/search'},
        {linkText: 'Super Search', linkURI: '/mask/super-search'},
        {linkText: 'Random Profile', linkURI: '/mask/random'},
        {linkText: 'Birthdays', linkURI: '/mask/birthdays'}
      ];

      // send links to page
      this.hermes.sendSubNavbarLinks(links);
    }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
