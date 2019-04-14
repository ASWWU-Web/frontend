import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { RequestService, AuthService } from '../../../../shared-ng/services/services';

@Component({
  selector: 'admin-review',
  template: `
  <!-- Job Applications  -->
  <div *ngIf="currentUser" id="jobApps" class="container">
  <h1>{{form?.job_name}} Review</h1>
      <card-list [cards]="cards"></card-list>
      <div *ngIf="applications?.length == 0" class="col col-sm-12 col-md-6 col-lg-3 text-center">
              <p> No results found.</p>
      </div>
  </div>
  <div *ngIf="!currentUser">
      <p>This page can only be viewed by someone logged in, please click the button to log in:</p>
      <a class="btn btn-primary" href="https://saml.aswwu.com/?sso&redirect=/jobs/submit/{{formID}}">Log in</a>
  </div>
  `,
    providers: [ RequestService ]
})

export class AdminReviewComponent {
	formID: number;
  form: any;
	applications: any;
  currentUser: any;
  cards: any[] = [];

  constructor(route: ActivatedRoute, private rs: RequestService, private as: AuthService) {
    this.formID = route.snapshot.params['formID'];
    as.authenticateUser().subscribe((user) => this.currentUser = user);
    rs.get('/forms/application/view/' + this.formID + '/all').subscribe((data) => {
        this.applications = data.applications;
        this.cards = this.buildCards(this.applications);
    }, null);
    rs.get('/forms/job/view/' + this.formID).subscribe((data) => {
      this.form = data.form;
    }, null);
  }

  buildCards(applications: any[]) {
    return applications.map((item) => {
      return {
        image: '',
        color: '',
        title: item.username.replace('.', ' '),
        subTitle: '',
        body: item.status,
        buttonText: 'View Application',
        buttonLink: `/admin/review/${item.jobID}/${item.username}`
      };
    });
  }
}
