import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, NavigationExtras } from '@angular/router';

import { RequestService, HermesService } from '../../../../../shared-ng/services/services';
import { GENERAL_SEARCH_FIELD } from '../shared/fields';

@Component({
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent {
  searchText: string;
  featureds: any = [];
  events: any = [];
  categories: any = [];
  departments: any = [];

  constructor(private rs: RequestService, private route: ActivatedRoute, private router: Router,
              private hs: HermesService) {
    // get featureds data
    this.rs.get('/pages/featureds').subscribe((data) => {
      this.featureds = data.featureds.reverse();
    });
    // get events data
    this.rs.get('/pages/search?category=Event').subscribe((data) => {
      this.events = data.results.reverse();
    });
    // get categories data
    this.rs.get('/pages/categories').subscribe((data) => {
      this.categories = data.categories.filter((category) => category['category'] !== 'Event');
    });
    // get departments data
    this.rs.get('/pages/departments').subscribe((data) => {
      this.departments = data.departments;
    });

    this.hs.sendShowHeader(true);
    this.hs.sendHeaderTitle('Directory');
    this.hs.sendHeaderInvert(false);
    this.hs.sendHeaderImageUri('../../../assets/directory.jpg');
    this.hs.sendShowSubNav(true);
  }

  search() {
    const json = {};
    json[GENERAL_SEARCH_FIELD] = this.searchText;
    this.router.navigate(['/search'], {
      queryParams: json
    });
  }
}
