import { Component, ElementRef } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService, HermesService } from '../../../../../shared-ng/services/services';

@Component({
  templateUrl: './collegian.component.html',
  styleUrls: ['./collegian.component.css']
})

export class CollegianComponent {
  archives: any[];
  thisWeek: any[] = [];
  searchText: string;

  constructor(private rs: RequestService, private route: ActivatedRoute, private router: Router,
              private hs: HermesService, private elementRef: ElementRef) {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';

    // get all pages
    this.rs.get('/pages/search?department=Collegian').subscribe((data) => {
      // set archive pages
      this.archives = data.results.reverse();

      // get pages from the past week
      const currentTime = Date.now();
      for (let i = 0; i < this.archives.length; i++) {
        const pageTime = Date.parse(this.archives[i].created);
        if (currentTime - pageTime < 604800000) {  // 1 week is 604800000 milliseconds
          this.thisWeek.push(this.archives[i]);
        } else {
          this.archives.splice(0, i);
          break;
        }
      }
    });

    this.hs.sendShowHeader(true);
    this.hs.sendHeaderTitle('Collegian');
    this.hs.sendHeaderImageUri('../../../../../assets/collegian.jpg');
    this.hs.sendShowSubNav(true);
    this.hs.sendHeaderInvert(true);
  }

  search() {
    this.router.navigate(['/search'], {
      queryParams: {
        'department': 'Collegian', 'title': this.searchText
      }
    });
  }
}
