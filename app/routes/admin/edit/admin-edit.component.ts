import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { RequestService } from "../../../RequestService/requests";

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
    text
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.profiles.filter(profile => profile.username.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10).map(profile => profile.username));

  constructor(private rs: RequestService, private router: Router, route: ActivatedRoute) {
		this.jobID = route.snapshot.params['formID'];
    rs.verify((user) => {
			if(user) {
				this.currentUser = user;
				rs.get('/forms/job/view/' + this.jobID, (data) => {
          let job = data.form;
          delete job.jobID;
          console.log(job);
					this.job = job;
        }, null);
        rs.get('/search/all', (data) => {
          this.profiles = data['results'];
        }, null);
      }
    });
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
    this.rs.postxwww("/forms/job/edit/" + this.jobID, {
      job_name: this.job.job_name,
      job_description: this.job.job_description,
      visibility: this.job.visibility,
      department: this.job.department,
      owner: this.job.owner,
      image: this.job.image,
      questions: this.job.questions
    }, (data) => {
      if(data.status == "submitted"){
        this.job.job_name = "";
        this.job.job_description = "";
        this.job.visibility = true;
        this.job.owner = "";
        this.job.image = "";
        this.job.questions = [{question: "", id: 0}];
        this.job.department = "";
      } else {
        window.alert("An unknown error occured.");
      }
    }, (error) => {
      window.alert("ERROR: \n" + error);
    });
  }
}
