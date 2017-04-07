import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'admin-review',
  template: `
  <h1>Admin is reviewing {{formID}}!</h1>
  `,
})

export class AdminReviewComponent {
	formID: number;

	constructor(route: ActivatedRoute) {
		this.formID = +route.snapshot.params['formID'];
	}
}