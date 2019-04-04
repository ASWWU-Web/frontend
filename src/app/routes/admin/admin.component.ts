import {Component, NgModule} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestService } from '../../../shared-ng/services/request.service';

@Component({
  selector: 'admin',
  template: `
  <h1>Admin Review</h1>
  <!-- Job Opportunities  -->
  <div id="jobOpps" class="container">
    <div class="row justify-content-center">

      <!-- Cards -->
      <div *ngFor="let form of forms" class="col col-sm-12 col-md-6 col-lg-4 col-xl-3 card-group">
        <div class="card">
        <img *ngIf="form.image != ''" class="card-img-top" src="{{form.image}}" alt="Card image cap">
          <div class="card-block d-flex flex-column">
            <h3 class="card-title">{{form.job_name}}</h3>
            <h6 class="card-subtitle mb-2 text-uppercase" style="color:#8f8f8f;">{{form.department}}</h6>
            <p class="card-text">{{shorten(form.job_description)}}
            </p>
            <div class="btn-group mt-auto">
              <a [routerLink]="['/admin/review/', form.jobID]" class="btn btn-secondary">Applicants</a>
              <a [routerLink]="['/admin/edit/', form.jobID]" class="btn btn-secondary">Edit</a>
            </div>
          </div>
        </div>
      </div>
        <div *ngIf="forms.length == 0" class="col col-sm-12 col-md-6 col-lg-3 text-center">
          <p> No results found.</p>
        </div>
    </div>
  </div>
  `,
  providers: [ RequestService ],
})

export class AdminComponent {
	formID: number;
  forms: any[] = [];

	constructor(route: ActivatedRoute, private rs: RequestService) {
		this.formID = +route.snapshot.params['formID'];
    this.loadForms();
	}
  loadForms() {
    this.rs.get('/forms/job/view/all').subscribe((data) => {
      this.forms = data.forms;
    }, undefined);
  }

  shorten(description: string) {
    if(typeof description === "string") {
      return description.split("\n")[0];
    }
    return "";
  }
}
