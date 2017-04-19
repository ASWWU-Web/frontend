import {Component, NgModule, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { RequestService } from "../../../RequestService/requests";

@Component({
  selector: 'admin-create',
  templateUrl: 'app/routes/admin/create/admin-create.component.html',
  providers: [ RequestService ]
})

export class AdminCreateComponent implements OnInit {
  jobName: string;
  jobDesc: string;
  visibility: string;
  owner: string;
  imgLink: string;
  questions: any[] = [{question: ""}];

  constructor(private rs: RequestService, private router: Router) {}

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
    //document.getElementsByName((this.questions.length - 1).toString())[0].focus();
  }
  submitForm() {
    this.rs.postxwww("/forms/job/new", {
      job_name: this.jobName,
      job_description: this.jobDesc,
      visibility: this.visibility === "TRUE",
      image: this.imgLink,
      questions: this.questions

    }, (data) => {console.log(data);}, undefined);
  }
}
