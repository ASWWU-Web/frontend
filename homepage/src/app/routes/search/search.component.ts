import { Subscription ,  Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { MaskRequestService } from '../../../shared-ng/services/services'
import { SearchableFields } from '../../shared/fields';
import { Profile } from '../../../shared-ng/interfaces/interfaces';


@Component({
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
})
export class SearchComponent implements OnInit {
  typedQuery: string = '';
  searchQuery: string;
  allProfiles: any[] = [];
  typeaheadResults: string[] = [];
  typeaheadSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private mrs: MaskRequestService, private location: Location,
              private elementRef: ElementRef) {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
  }

  ngOnInit() {
    //Get the Params from the URL.
    this.activatedRoute.queryParamMap.subscribe( params => {
      this.typedQuery = params.get("query");
      if(this.typedQuery) {
        this.runSearch();
      }
    });
    const profileObservable = this.mrs.listProfile();
    profileObservable.subscribe(
      (data: Profile[]) => {
        this.allProfiles = data;
        this.setupTypeAhead();
      }, (err) => {});
  }

  //Converts 'majors=Computer Engineering' to 'Major: Computer Engineering'
  typeaheadFormatter = (result: string) => {
    if(result.substr(0,7) == 'majors=') {
      return 'Major: ' + result.substr(7);
    } else if(result.substr(0,7) == 'minors=') {
      return 'Minor: ' + result.substr(7);
    }
    return result.substr(0);
  }

  // Calculate the possible typeaheads
  typeaheadSearch = (text$: Observable<string>) =>
    text$.pipe(distinctUntilChanged(), map(
      term => term.length < 1 ? [] : this.typeaheadResults.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    ));

  // Runs the search
  runSearch(item=null) {
    if (item != null) {
      this.typedQuery = item.item;
    }
    this.searchQuery = this.typedQuery;
    this.location.replaceState("/search?query=" + this.typedQuery);
  }

  // Sets the first result of typeahead to the typed text
  addFirstResult() {
    this.typeaheadResults[0] = this.typedQuery;
  }

  setupTypeAhead() {
    this.typeaheadResults.push('');
    // Add all profiles to typeahead options

    for(let profile of this.allProfiles) {
      this.typeaheadResults.push(profile['full_name']);
    }
    // Add all majors and minors to typeahead options
    for(let major of SearchableFields['majors']) {
      this.typeaheadResults.push('majors=' + major);
    }
    for(let minor of SearchableFields['minors']) {
      this.typeaheadResults.push('minors=' + minor);
    }
  }
}
