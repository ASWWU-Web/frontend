import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'field-card',
  templateUrl: './field-card.component.html',
  styleUrls: ['./field-card.component.css']
})

export class FieldCardComponent {
  @Input() item: any;
  @Input() searchKey: string;
  router: any;

  constructor(private _router: Router) {
    this.router = _router;
  }

  queryJson(item) {
    let json = {
      'queryParams': {},
    };
    json['queryParams'][this.searchKey] = item[this.searchKey];
    return json;
  }

  navigate(queryItem) {
    // wait to navigate if author link was clicked
    setTimeout(()=>{
      this.router.navigate(['/search'], this.queryJson(queryItem));
    }, 150);
  }
}
