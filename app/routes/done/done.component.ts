import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'done',
  template: `
  <h1>One more thing.</h1>
  <div class="row justify-content-center" style="margin-top: 30px;">
    <div class="col col-sm-12 col-md-8 text-center">
      <p>Please <strong>bring a copy of your resume</strong> to your interview.  An ASWWU departmental head will be contacting you soon! </p>
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
