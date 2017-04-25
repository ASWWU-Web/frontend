import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { RequestService } from '../../../RequestService/requests'

@Component({
  selector: 'admin-review',
  template: `
  <h1>Admin is reviewing {{formID}}!</h1>
  <!-- Job Applications  -->
  <div id="jobApps" class="container">
      <div id="cards" class="row justify-content-center">
          <!-- Cards -->
          <div *ngFor="let app of applications" class="col col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <div class="card">
                  <div class="card-block">
                      <h3 class="card-title">{{app.username}}</h3>
                      <h6 class="card-subtitle mb-2 text-uppercase" style="color:#8f8f8f;">JobID: {{app.jobID}}</h6>
                      <p class="card-text">Status: {{app.status}}
                      </p>
                      <a [routerLink]="['/admin/review/', this.formID, app.username]" class="btn">View Application</a>
                  </div>
              </div>
          </div>
          <div *ngIf="applications?.length == 0" class="col col-sm-12 col-md-6 col-lg-3 text-center">
              <p> No results found.</p>
          </div>
      </div>
  </div>
  `,
    providers: [ RequestService ]
})

export class AdminReviewComponent {
	formID: number;
	applications: any;

	constructor(route: ActivatedRoute, private rs: RequestService) {
		this.formID = route.snapshot.params['formID'];
        rs.get('/forms/application/view/' + this.formID + '/all', (data) => {
            this.applications = data.applications;
        }, null);

	}

}