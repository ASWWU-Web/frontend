import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { RequestService } from '../../../RequestService/requests';

@Component({
  selector: 'admin-review',
  template: `
  <h1>{{form?.job_name}} Review</h1>
  <!-- Job Applications  -->
  <div *ngIf="currentUser" id="jobApps" class="container">
      <div id="cards" class="row justify-content-center">
          <!-- Cards -->
          <div *ngFor="let app of applications" class="col col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <div class="card">
                  <div class="card-block">
                      <h3 class="card-title text-capitalize">{{app.username.replace(".", " ")}}</h3>
                      <p class="card-text text-capitalize">Status: {{app.status}}
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
  <div *ngIf="!currentUser">
      <p>This page can only be viewed by someone logged in, please click the button to log in:</p>
      <a class="btn btn-primary" href="https://saml.aswwu.com/?redirectURI=/jobs/submit/{{formID}}">Log in</a>
  </div>

  `,
    providers: [ RequestService ]
})

export class AdminReviewComponent {
	formID: number;
  form: any;
	applications: any;
	currentUser: any;

	constructor(route: ActivatedRoute, private rs: RequestService) {
		this.formID = route.snapshot.params['formID'];
		rs.verify((user) => {this.currentUser = user;});
    rs.get('/forms/application/view/' + this.formID + '/all', (data) => {
        this.applications = data.applications;
    }, null);
    rs.get('/forms/job/view/' + this.formID, (data) => {
      this.form = data.form;
    }, null);
	}

}
