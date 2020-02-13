import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable , Subscription} from 'rxjs';

import { MaskRequestService } from '../../../../../shared-ng/services/services';
import { ProfileSmComponent } from '../profile-sm/profile-sm.component';
import { CURRENT_YEAR } from '../../../../../shared-ng/config';
import { Profile } from '../../../../../shared-ng/interfaces/interfaces';

@Component({
  selector: "search-results",
  templateUrl: "search-results.component.html",
  styleUrls: ["search-results.component.css"]
})


export class SearchResultsComponent {
  @Input() query: string;
  @Input('year') year: string = undefined;
  @Input() noResultsPrompt: string;
  @Input() noResultsJust: string = "center";

  results: Profile[] = [];
  shownResults: any[] = [];
  shown: number = 0;
  sub: Subscription = null;
  searching: boolean = false;

  constructor (private mrs: MaskRequestService) {}

  ngOnChanges() {
    this.shownResults = [];
    this.shown = 0;
    this.update();
  }

  ngOnInit() {
    if(!this.query){
      this.query = "";
    }
  }

  update() {
    // Set searching to true
    this.searching = true;
    // Query the server and sort the results.
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
    var query = this.query || "";
    if(this.year == undefined || this.year == CURRENT_YEAR) {
      const maskObservable = this.mrs.listProfile(CURRENT_YEAR, query);
      maskObservable.subscribe((data: Profile[]) => {
        this.results = data.sort((p1,p2) => {
          let views1: number = 0, views2: number = 0;
          if (typeof p1.views !== 'string')
            views1 = p1.views;
          if (typeof p2.views !== 'string')
            views2 = p2.views;

          return views2 - views1;
        });
        this.showMore();
      }, undefined);
    }
    else {
      const maskObservable = this.mrs.listProfile(this.year, query);
      maskObservable.subscribe((data: Profile[]) => {
        this.results = data.sort((p1,p2) => {
          let views1: number = 0, views2: number = 0;
          if (typeof p1.views !== 'string')
            views1 = p1.views;
          if (typeof p2.views !== 'string')
            views2 = p2.views;

            return views2 - views1;
        });
        this.showMore();
      }, undefined);
    }
  }

  showMore() {
    var cIndex = this.shown;
    var nIndex = cIndex + 24;
    this.shownResults = this.shownResults.concat(this.results.slice(cIndex,nIndex));
    this.shown = nIndex;
    // Set searching to false
    this.searching = false;
  }
}
