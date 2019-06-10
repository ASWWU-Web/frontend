import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RequestService, AuthService, HermesService, TypeAheadRequestService } from '../../../../shared-ng/services/services';
import { User } from 'src/shared-ng/interfaces/user';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { JobView } from 'src/shared-ng/interfaces/interfaces';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'admin-edit',
  templateUrl: './admin-edit.component.html',
  providers: [ RequestService, TypeAheadRequestService ]
})
export class AdminEditComponent implements OnInit, OnDestroy {
  currentUser: any;
  jobID: number;
  job: {
        'department': string,
        'job_description': string,
        'questions': any[],
        'owner': string,
        'image': string,
        'job_name': string,
        'visibility': boolean,
        'featured': boolean
    };
  search = this.tas.search;
  userInfoSubscription: Subscription;

  constructor(private rs: RequestService, private as: AuthService, private router: Router, private route: ActivatedRoute,
              private hs: HermesService, private tas: TypeAheadRequestService) {
  }

  ngOnInit() {
    this.jobID = this.route.snapshot.params['formID'];
    this.hs.sendHeaderTitle('Edit Job');
    this.userInfoSubscription = this.as.getUserInfo().subscribe(
      (data: User) => {
        const lastCurrentUserValue = this.currentUser;
        this.currentUser = data;
        if (lastCurrentUserValue == null && data) {
          // this will get called when the component loads the first time, and
          // any time the user data goes from null to defined, but not times
          // when user data is only mutated.
          this.getJobData();
        }
      }
    );
  }

  /**
   * run the get request to get relevant job data from the server.
   * this should only be run when the page loads (ngOnInit) and if the
   * currentUser state is going from logged out to logged in.
   */
  getJobData() {
      this.rs.get('/forms/job/view/' + this.jobID).subscribe(
        (jobData: {form: JobView}) => {
          this.job = jobData.form;
        }
      );
  }

  ngOnDestroy(): void {
    this.userInfoSubscription.unsubscribe();
  }

  submitForm() {
    const formData = {
      job_name: this.job.job_name,
      job_description: this.job.job_description,
      visibility: this.job.visibility,
      featured: this.job.featured,
      department: this.job.department,
      owner: this.job.owner,
      image: this.job.image,
      questions: this.job.questions
    };
    this.rs.post('/forms/job/edit/' + this.jobID, formData, null, 'urlencoded').subscribe(
      (data) => {
        // If the request was successful redirect to the admin page.
        if (data.status === 'Form Updated') {
          this.router.navigate(['admin']);
        } else {
          window.alert('An unknown error ocurred.');
        }
      },
      (err) => {
        window.alert('ERROR: \n' + err);
      }
    );
  }
}
