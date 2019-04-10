import {Component, NgModule} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestService } from '../../../shared-ng/services/request.service';

@Component({
  selector: 'admin',
  template: `
  <!-- Job Opportunities  -->
  <div id="jobOpps" class="container">
  <h1>Admin Review</h1>
  <card-list [cards]="cards"></card-list>
    <div *ngIf="forms.length == 0" class="col col-sm-12 col-md-6 col-lg-3 text-center">
          <p> No results found.</p>
    </div>
  </div>
  `,
  providers: [ RequestService ],
})

export class AdminComponent {
	formID: number;
  forms: any[] = [];
  cards: any[] = [];

	constructor(route: ActivatedRoute, private rs: RequestService) {
		this.formID = +route.snapshot.params['formID'];
    this.loadForms();
	}
  loadForms() {
    this.rs.get('/forms/job/view/all').subscribe((data) => {
      this.forms = data.forms;
      this.cards = this.buildCards(this.forms);
    }, undefined);
  }

  shorten(description: string) {
    if(typeof description === "string") {
      return description.split("\n")[0];
    }
    return "";
  }

  buildCards(forms: any[]) {
    return forms.map((item) => {
      return {
        image: item.image,
        color: '',
        title: item.job_name,
        subTitle: item.department,
        body: this.shorten(item.job_description),
        buttonText: 'View Applications',
        buttonLink: `/admin/review/${item.jobID}`
      };
    });
  }
}
