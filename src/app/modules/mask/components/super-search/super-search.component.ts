import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CURRENT_YEAR } from '../../../../../shared-ng/config';
import { HermesService } from '../../../../../shared-ng/services/services';

import {
  FieldsForSearching,
  SearchableFields,
  SelectFields
} from '../../fields';

@Component({
  templateUrl: 'super-search.component.html',
  styleUrls: ['super-search.component.css'],
})

export class SuperSearchComponent implements OnInit {
  criteria: string[][] = [];
  query = '';
  serverQuery = '';
  year: string = CURRENT_YEAR;
  fieldsInOrder: string[] = FieldsForSearching;
  selectables = SelectFields;
  searchables = SearchableFields;
  singleField = true;

  private subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private location: Location,
    private elementRef: ElementRef, private hermesService: HermesService) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
    // displays header and subnav bar
    hermesService.sendShowHeader(true);
    hermesService.sendShowSubNav(true);
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.criteria = [];
      for (const key of params.keys) {
        this.criteria.push([key, params.get(key)]);
      }
      if (this.criteria.length === 0) {
        this.criteria.push(['full_name', '']);
      } else {
        this.updateQuery();
      }
      console.log(this.criteria);
    });
  }

  updateQuery() {
    let tempstring = '';
    for (const value of this.criteria) {
      if (value[0] !== 'year' && value[1] !== '') {
        tempstring += value[0] + '=' + value[1] + '&';
      } else if (value[0] === 'year') {
        this.year = value[1];
      }
    }
    tempstring = tempstring.slice(0, -1);
    this.query = tempstring;
    this.serverQuery = this.query.replace('&', ';');
    this.location.replaceState('/mask/super-search?' + this.query);
  }

  addField() {
    this.criteria.push(['', '']);
    this.singleField = false;
  }

  removeField(i) {
    this.criteria.splice(i, 1);
    if (this.criteria.length === 1) {
      this.singleField = true;
    }
  }
}
