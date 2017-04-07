import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'admin-edit',
  template: `
  <h1>Admin is editing form {{formID}}</h1>
  `,
})

export class AdminEditComponent {
	formID: number;

	constructor(route: ActivatedRoute) {
		this.formID = +route.snapshot.params['formID'];
	}
}