import { Component, Input, OnChanges, OnInit } from "@angular/core";

import { Subscription } from "rxjs";

import { MaskRequestService } from "../../../../../shared-ng/services/services";
import { CURRENT_YEAR } from "../../../../../shared-ng/config";
import { PartialProfile } from "../../../../../shared-ng/interfaces/interfaces";

@Component({
  selector: "search-results",
  templateUrl: "search-results.component.html",
  styleUrls: ["search-results.component.css"],
})
export class SearchResultsComponent implements OnChanges, OnInit {
  @Input() query: string;
  @Input() year: string = undefined;
  @Input() noResultsPrompt: string;
  @Input() noResultsJust = "center";

  results: PartialProfile[] = [];
  shownResults: PartialProfile[] = [];
  shown = 0;
  sub: Subscription = null;
  searching = false;

  constructor(private mrs: MaskRequestService) {}

  ngOnChanges() {
    this.shownResults = [];
    this.shown = 0;
    this.update();
  }

  ngOnInit() {
    if (!this.query) {
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
    const query = this.query || "";
    if (this.year == undefined || this.year == CURRENT_YEAR) {
      const maskObservable = this.mrs.listProfile(CURRENT_YEAR, query);
      maskObservable.subscribe((data) => {
        this.results = data;
        this.showMore();
      });
    } else {
      const maskObservable = this.mrs.listProfile(this.year, query);
      maskObservable.subscribe((data: PartialProfile[]) => {
        this.results = data;
        this.showMore();
      });
    }
  }

  showMore() {
    const cIndex = this.shown;
    const nIndex = cIndex + 24;
    this.shownResults = this.shownResults.concat(
      this.results.slice(cIndex, nIndex),
    );
    this.shown = nIndex;
    // Set searching to false
    this.searching = false;
  }
}
