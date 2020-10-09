import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'page-results',
  templateUrl: './page-results.component.html',
  styleUrls: ['./page-results.component.css'],
})

export class PageResultsComponent implements OnChanges {
  @Input() requestData: any;
  @Input() showMeta: boolean;
  @Input() sort: boolean = false;

  ngOnChanges() {
    // sort data based on title
    if (this.requestData != null && this.sort) {
      this.requestData = this.requestData.sort((a, b) => {
        if(a['title'] < b['title']) return -1;
        if(a['title'] > b['title']) return 1;
        return 0;
      });
    }
  }
}
