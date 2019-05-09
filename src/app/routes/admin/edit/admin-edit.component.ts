import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RequestService, AuthService, HermesService, TypeAheadRequestService } from '../../../../shared-ng/services/services';
import { User } from 'src/shared-ng/interfaces/user';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { JobView } from 'src/shared-ng/interfaces/interfaces';

@Component({
  selector: 'admin-edit',
  templateUrl: './admin-edit.component.html',
  providers: [ RequestService, TypeAheadRequestService ]
})
export class AdminEditComponent implements OnInit {
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

  constructor(private rs: RequestService, private as: AuthService, private router: Router, route: ActivatedRoute,
              private hs: HermesService, private tas: TypeAheadRequestService) {
    this.jobID = route.snapshot.params['formID'];
    hs.sendHeaderTitle('Edit Job');
    this.userInfoSubscription = as.getUserInfo().pipe(
      // this prevents re-fetching the job data if the same user re-authenticates
      distinctUntilChanged()
    ).subscribe(
      (data: User) => {
        this.currentUser = data;
        if (data) {
          // if the user is logged in, get the job data.
          rs.get('/forms/job/view/' + this.jobID).subscribe(
            (jobData: {form: JobView}) => {
              this.job = jobData.form;
            }
          );
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
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
        if(data.status === 'Form Updated'){
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
