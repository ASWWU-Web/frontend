import { Observable, Subscription } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { Component, ElementRef, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Params } from "@angular/router";
import {
  HermesService,
  MaskRequestService,
} from "../../../../../shared-ng/services/services";
import { SearchableFields } from "../../fields";
import { PartialProfile } from "../../../../../shared-ng/interfaces/interfaces";

@Component({
  templateUrl: "search.component.html",
  styleUrls: ["search.component.css"],
})
export class SearchComponent implements OnInit {
  typedQuery = "";
  searchQuery: string;
  allProfiles: any[] = [];
  typeaheadResults: string[] = [];
  typeaheadSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mrs: MaskRequestService,
    private location: Location,
    private elementRef: ElementRef,
    private hermesService: HermesService,
  ) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "black";
    // displays header and subnav bar
    hermesService.sendShowHeader(true);
    hermesService.sendShowSubNav(true);
  }

  ngOnInit() {
    // Get the Params from the URL.
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.typedQuery = params.get("query");
      if (this.typedQuery) {
        this.runSearch();
      }
    });
    const profileObservable = this.mrs.listProfile();
    profileObservable.subscribe(
      (data: PartialProfile[]) => {
        this.allProfiles = data;
        this.setupTypeAhead();
      },
      (err) => {},
    );
  }

  // Converts 'majors=Computer Engineering' to 'Major: Computer Engineering'
  typeaheadFormatter = (result: string) => {
    if (result.substr(0, 7) === "majors=") {
      return "Major: " + result.substr(7);
    } else if (result.substr(0, 7) === "minors=") {
      return "Minor: " + result.substr(7);
    }
    return result.substr(0);
  };

  // Calculate the possible typeaheads
  typeaheadSearch = (text$: Observable<string>) =>
    text$.pipe(
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.typeaheadResults
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10),
      ),
    );

  // Runs the search
  runSearch(item = null) {
    if (item != null) {
      this.typedQuery = item.item;
    }
    this.searchQuery = this.typedQuery;
    this.location.replaceState("/mask/search?query=" + this.typedQuery);
  }

  // Sets the first result of typeahead to the typed text
  addFirstResult() {
    this.typeaheadResults[0] = this.typedQuery;
  }

  setupTypeAhead() {
    this.typeaheadResults.push("");
    // Add all profiles to typeahead options

    for (const profile of this.allProfiles) {
      this.typeaheadResults.push(profile["full_name"]);
    }
    // Add all majors and minors to typeahead options
    for (const major of SearchableFields["majors"]) {
      this.typeaheadResults.push("majors=" + major);
    }
    for (const minor of SearchableFields["minors"]) {
      this.typeaheadResults.push("minors=" + minor);
    }
  }
}
