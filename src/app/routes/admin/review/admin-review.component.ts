import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { RequestService, AuthService, HermesService } from '../../../../shared-ng/services/services';
import { Subject, Subscription } from 'rxjs';
import { User } from '../../../../shared-ng/interfaces/interfaces';

@Component({
  selector: 'admin-review',
  template: `
  <!-- Job Applications  -->
  <div *ngIf="currentUser" id="jobApps" class="container">
      <a class="btn btn-primary mb-5" [routerLink]="'/admin/edit/' + formID">Edit this Form</a>
      <card-list [cards]="cards"></card-list>
      <div *ngIf="applications?.length == 0" class="col col-sm-12 col-md-6 col-lg-3 text-center">
              <p> No results found.</p>
      </div>
  </div>
  <div class="container" *ngIf="!currentUser">
      <p>This page can only be viewed by someone logged in, please click the button to log in:</p>
      <a class="btn btn-primary" [href]="buildLoginLink()">Log in</a>
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
  buildLoginLink: () => string;
  userInfoSubscription: Subscription;

  constructor(route: ActivatedRoute, private rs: RequestService, private as: AuthService, private hs: HermesService) {
    this.buildLoginLink = as.buildLoginLink;
    this.formID = route.snapshot.params['formID'];
    this.userInfoSubscription = as.getUserInfo().subscribe((data: User) => {
        this.currentUser = data;
      }, null);
    rs.get('/forms/application/view/' + this.formID + '/all').subscribe((data) => {
        this.applications = data.applications;
        this.cards = this.buildCards(this.applications);
    }, null);
    rs.get('/forms/job/view/' + this.formID).subscribe((data) => {
      this.form = data.form;
      hs.sendHeaderTitle(this.form.job_name + ' Review');
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
