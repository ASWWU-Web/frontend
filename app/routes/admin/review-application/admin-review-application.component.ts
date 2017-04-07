import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'admin-review-app',
  template: `
  <h1>The admin is reviewing user: {{username}}'s application for form {{formID}}!</h1>
  `,
})

export class AdminReviewApplicationComponent {
	formID: number;
	username: string;

	constructor(route: ActivatedRoute) {
		this.formID = +route.snapshot.params['formID'];
		this.username = route.snapshot.params['username'];
	}
}