import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';

import { RequestService } from "../../../RequestService/requests";

@Component({
  selector: 'admin-edit',
  templateUrl: 'app/routes/admin/edit/admin-edit.component.html'
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

  constructor(private rs: RequestService, private router: Router, route: ActivatedRoute) {
		this.jobID = route.snapshot.params['formID'];
    rs.verify((user) => {
			if(user) {
				this.currentUser = user;
				rs.get('/forms/job/view/' + this.jobID, (data) => {
          let job = data.form;
          delete job.jobID;
					this.job = job;//{ formID: "1", name: "generic", img: "http://lorempixel.com/300/200/abstract/", desc: "baseline stuff", owner: "1", questions: [{ID: "1", text: "What does ASWWU mean to you?"}]};
				}, undefined);
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

  addQuestion() {
    this.job.questions.push({question: "", id: 0});
  }
  submitForm() {
    this.rs.postxwww("/forms/job/edit/formID", {
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
    }, (error) => {window.alert("ERROR: \n" + error) });
  }
  removeQuestion(index: number) {
    this.job.questions.splice(index,1);
  }
}
