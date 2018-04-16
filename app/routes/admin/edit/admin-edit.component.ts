import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';

import { RequestService } from "../../../RequestService/requests";

@Component({
  selector: 'admin-edit',
  templateUrl: 'app/routes/admin/edit/admin-edit.component.html'
})

export class AdminEditComponent implements OnInit {
  formID: number;
  jobName: string = "";
  jobDesc: string = "";
  visibility: number = 1;
  owner: string = "";
  imgLink: string = "";
  questions: any[] = [{question: ""}];
  department: string = "";

  constructor(private rs: RequestService, private router: Router, route: ActivatedRoute) {
		this.formID = +route.snapshot.params['formID'];
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
    this.questions.push({question: ""});
  }
  submitForm() {
    this.rs.postxwww("/forms/job/new", {
      job_name: this.jobName,
      job_description: this.jobDesc,
      visibility: this.visibility,
      department: this.department,
      owner: this.owner,
      image: this.imgLink,
      questions: this.questions

    }, (data) => {
      if(data.status == "submitted"){
        this.jobName = "";
        this.jobDesc = "";
        this.visibility = 1;
        this.owner = "";
        this.imgLink = "";
        this.questions = [{question: ""}];
        this.department = "";
      } else {
        window.alert("An unknown error occured.");
      }
    }, (error) => {window.alert("ERROR: \n" + error) });
  }
  removeQuestion(index: number) {
    this.questions.splice(index,1);
  }
}
