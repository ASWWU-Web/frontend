import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'submit',
  template: `
  <h1>Submitted form {{formID}}!</h1>
  `,
})

export class SubmitComponent {
	formID: number;

	constructor(route: ActivatedRoute) {
		this.formID = +route.snapshot.params['formID'];
	}
}