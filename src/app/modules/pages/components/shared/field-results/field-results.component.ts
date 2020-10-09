import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'field-results',
  templateUrl: './field-results.component.html',
  styleUrls: ['./field-results.component.css']
})

export class FieldResultsComponent implements OnChanges {
  @Input() requestData: any;
  @Input() searchKey: string;
  @Input() sort: boolean = false;
  router: any;

  constructor(private _router: Router) {
    this.router = _router;
  }

  ngOnChanges() {
    // sort data based on searchKey
    if (this.requestData != null && this.sort) {
      this.requestData = this.requestData.sort((a, b) => {
        if(a[this.searchKey] < b[this.searchKey]) return -1;
        if(a[this.searchKey] > b[this.searchKey]) return 1;
        return 0;
      });
    }
  }
}
