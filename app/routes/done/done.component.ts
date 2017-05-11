import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'done',
  template: `
  <h1 class="text-center">You're all set.</h1>
  <div class="row justify-content-center" style="margin-top: 30px;">
    <div class="col col-sm-12 col-md-8 text-center">
      <p>If you have any questions, contact <a href="mailto:aswwu@wallawalla.edu">ASWWU@wallawalla.edu</a> An ASWWU departmental head will be contacting you soon!</p>
      <br>
      <br>
      <a class="btn" style="color: white; background-color: #803fa4;" href="https://aswwu.com/jobs">More Opportunities</a>
    </div>
  </div>
  `,
})

export class DoneComponent {
	formID: number;

	constructor(route: ActivatedRoute) {
		this.formID = +route.snapshot.params['formID'];
	}
}
