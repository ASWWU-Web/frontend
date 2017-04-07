import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'admin-edit',
  template: `
  <h1>Admin is editing form {{ID}}</h1>
  `,
})

export class AdminEditComponent {
	ID: number;

	constructor(route: ActivatedRoute) {
		this.ID = +route.snapshot.params['ID'];
	}
}