import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { of, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, catchError, switchMap, map } from 'rxjs/operators';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { HomepageRequestService } from '../../../../../shared-ng/services/services';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'super-duper',
  templateUrl: './super-duper.component.html',
  styleUrls: ['./super-duper.component.css']
})
export class SuperDuperComponent implements OnInit {

  @Input() model: string = null;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  // dropdown menu options
  sites: string[] = ['Mask', /* 'Pages', 'Jobs'*/];
  // placeholder options
  placeholders: string[] = ['search the mask...', /* 'search pages...', 'search jobs...'*/];
  // default placeholder
  placeHolder = 'search the mask...';
  // default dropdown option
  selectSites = 'Mask';

  searchPageroute = 'search';

  // new page routes
  maskPageRoute = 'mask/search?query=';
  pagesPageRoute = ''; // search route with query
  jobsPageRoute = ''; // search route with query
  formGroup: UntypedFormGroup;

  constructor(private hprs: HomepageRequestService, private router: Router) {
    this.formGroup = new UntypedFormGroup({name: new UntypedFormControl('')});
  }

  ngOnInit() {}

  getNames(query: string) {
    if (query === '') {
      return of({results: []});
    }
    return this.hprs.get('search/names', {full_name: query});
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((data) => this.getNames(data)),
      map((data: {results: {username: string, full_name: string}[]}) => {
        return data.results;
      })
    );
  }

  formatter = (x: {username: string, full_name: string}) => x.full_name;

  // allows dropdown menu button to change based on user selection
  ChangeSite(newSite: string) {
    this.selectSites = newSite;
    if (newSite === 'Mask') {
      this.placeHolder = this.placeholders[0];
    } else if (newSite === 'Pages') {
      this.placeHolder = this.placeholders[1];
    } else if (newSite === 'Jobs') {
      this.placeHolder = this.placeholders[2];
    }
  }

  // new search function
  superSearch(userinput?: any) {
    /**
     * If user chooses name from dropdown menu
     * then no arguments are passed in.
     * If user chooses to search whatever they
     * typed in then 1 is passed in distiguishing
     * which value to search.
     */
    if (!userinput) {
      // parses array of dropdown menu and searches username
      userinput = this.formGroup.value.name.username;
    } else if (userinput === 1) {
      // keeps generic name user typed
      userinput = this.formGroup.value.name;
    }

    // redirects user to mask query page
    if (this.selectSites === 'Mask') {
      window.location.href = this.maskPageRoute + userinput;
    }
    /* Not implemented yet
    else if (this.selectSites === 'Pages') {
      window.location.href = this.pagesPageRoute + userInput;
    } else if (this.selectSites === 'Jobs') {
      window.location.href = this.jobsPageRoute + userInput;
    }*/
  }

}

