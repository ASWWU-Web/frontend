import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { RequestService, AuthService } from '../../../../shared-ng/services/services';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { User } from 'src/shared-ng/interfaces/user';

@Component({
  selector: 'admin-edit',
  templateUrl: 'app/routes/admin/edit/admin-edit.component.html',
  providers: [ RequestService ]
})
export class AdminEditComponent implements OnInit {
  currentUser: any;
  jobID: number;
  job: {
        "department": string,
        "job_description": string,
        "questions": any[],
        "owner": string,
        "image": string,
        "job_name": string,
        "visibility": boolean
    };
    profiles: any;

    profileSearch = (text: Observable<string>) =>
      text.pipe(debounceTime(200), distinctUntilChanged(), map(
        (term) => {
          if (term.length < 2) {
            return [];
          } else {
            return this.profiles.filter(profile => profile.username.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10).map(profile => profile.username);
          }
        })
      );

  constructor(private rs: RequestService, private as: AuthService, private router: Router, route: ActivatedRoute) {
    this.jobID = route.snapshot.params['formID'];
    as.authenticateUser().subscribe(
      (data: User) => {
        this.currentUser = data;
        rs.get('/forms/job/view/' + this.jobID).subscribe(
          (data) => {
            let job = data.form;
            delete job.jobID;
            console.log(job);
            this.job = job;
          },
          (err) => {}
        );
        rs.get('/search/all').subscribe(
          (data) => {
            this.profiles = data['results'];
          },
          (err) => {}
        );
      },
      (err) => {}
    );
  }

  ngOnInit() {
    // TODO: Check to make sure the user is logged in. This isn't that important because this page is for admins.
    // rs.verify((user) => {
    //   if(user){
    //     this.owner = user.username;
    //   } else {
    //     console.log('Navigating!!');
    //     // this.router.navigateByUrl("/");
    //   }
    // });
  }

  submitForm() {
    const data = {
      job_name: this.job.job_name,
      job_description: this.job.job_description,
      visibility: this.job.visibility,
      department: this.job.department,
      owner: this.job.owner,
      image: this.job.image,
      questions: this.job.questions
    };
    this.rs.post("/forms/job/edit/" + this.jobID, data).subscribe(
      (data) => {
        //If the request was successful redirect to the admin page.
        if(data.status == "Form Updated"){
          this.router.navigate(['admin']);
        } else {
          window.alert("An unknown error ocurred.");
        }
      },
      (err) => {
        window.alert("ERROR: \n" + err);
      }
    );
  }
}
