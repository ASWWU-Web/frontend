import {Component, NgModule, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { RequestService } from '../../../../shared-ng/services/services';

@Component({
  selector: 'admin-create',
  templateUrl: 'admin-create.component.html',
  providers: [ RequestService ]
})

export class AdminCreateComponent implements OnInit {
  jobName: string = '';
  jobDesc: string = '';
  visibility: number = 1;
  owner: string = '';
  imgLink: string = '';
  questions: any[] = [{question: ''}];
  department: string = '';
  featured: boolean;

  constructor(private rs: RequestService, private router: Router) {}

  ngOnInit() {
    // TODO: Check to make sure the user is logged in. This isn't that important because this page is for admins.
  }

  addQuestion() {
    this.questions.push({question: ''});
    //document.getElementsByName((this.questions.length - 1).toString())[0].focus();
  }
  submitForm() {
    const data = {
      job_name: this.jobName,
      job_description: this.jobDesc,
      visibility: this.visibility,
      featured: this.featured,
      department: this.department,
      owner: this.owner,
      image: this.imgLink,
      questions: this.questions
    };
    this.rs.post('/forms/job/new', data).subscribe((data) => {
      if(data.status == 'submitted'){
        this.jobName = '';
        this.jobDesc = '';
        this.visibility = 1;
	this.featured = false;
        this.owner = '';
        this.imgLink = '';
        this.questions = [{question: ''}];
        this.department = '';
      } else {
        window.alert(JSON.stringify('failed to submit'));
      }
    }, (error) => {window.alert('ERROR: \n' + JSON.stringify(error)) });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }
}
