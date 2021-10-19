import {Component, NgModule, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { RequestService, AuthService, HermesService } from '../../../../../../shared-ng/services/services';
import { Subject, Subscription } from 'rxjs';
import { User } from '../../../../../../shared-ng/interfaces/interfaces';

@Component({
  selector: 'admin-review',
  template: `
  <!-- Job Applications  -->
  <div *ngIf="currentUser" id="jobApps" class="container">
      <a *ngIf="!hasInsufficientPermissions" class="btn btn-primary mb-5" [routerLink]="'/jobs/admin/edit/' + formID">Edit this Form</a>
      <card-list [cards]="cards"></card-list>
      <div *ngIf="applications?.length == 0" class="col col-sm-12 col-md-6 col-lg-3 text-center">
              <p> No results found.</p>
      </div>
  </div>
  <div class="container" *ngIf="hasInsufficientPermissions">
      <p>You do not have sufficient permissions</p>
  </div>
  <div class="container" *ngIf="!currentUser">
      <p>This page can only be viewed by someone logged in, please click the button to log in:</p>
      <a class="btn btn-primary" [href]="buildLoginLink()">Log in</a>
  </div>
  `,
    providers: [ RequestService ]
})

export class AdminReviewComponent implements OnInit {
	formID: number;
  form: any;
	applications: any;
  currentUser: any;
  cards: any[] = [];
  buildLoginLink: () => string;
  userInfoSubscription: Subscription;
  hasInsufficientPermissions: boolean = false;

  constructor(private route: ActivatedRoute, private rs: RequestService,
              private as: AuthService, private hs: HermesService, private elementRef: ElementRef) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

  ngOnInit() {
    this.buildLoginLink = this.as.buildLoginLink;
    this.formID = this.route.snapshot.params['formID'];
    this.userInfoSubscription = this.as.getUserInfo().subscribe(
      (data: User) => {
        this.currentUser = data;
      }
    );
    this.rs.get('/forms/application/view/' + this.formID + '/all').subscribe(
      (data) => {
        this.applications = data.applications;
        this.cards = this.buildCards(this.applications);
      }, (err) => {
        console.log(err);
        if (err.error.status == "Insufficient Permissions") {
          this.hasInsufficientPermissions = true;
        }
      });
    this.rs.get('/forms/job/view/' + this.formID).subscribe((data) => {
        this.form = data.form;
        this.hs.sendHeaderTitle(this.form.job_name + ' Review');
      }, null);
  }

  buildCards(applications: any[]) {
    return applications.map((item) => {
      return {
        image: '',
        color: '',
        title: item.username.replace('.', ' '),
        subTitle: item.updated_at,
        body: item.status,
        buttonText: 'View Application',
        buttonLink: `/jobs/admin/review/${item.jobID}/${item.username}`
      };
    });
  }
}
