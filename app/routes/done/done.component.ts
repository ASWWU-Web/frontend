import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'done',
  template: `
  <h1>Done with form {{formID}}!</h1>
  `,
})

export class DoneComponent {
	formID: number;

	constructor(route: ActivatedRoute) {
		this.formID = +route.snapshot.params['formID'];
	}
}