import {Component, NgModule, OnInit, ElementRef} from '@angular/core';
import { Router } from '@angular/router';

import { RequestService } from '../../../../../../shared-ng/services/services';

@Component({
  selector: 'admin-create',
  templateUrl: 'admin-create.component.html',
  providers: [ RequestService ]
})

export class AdminCreateComponent implements OnInit {
  jobName = '';
  jobDesc = '';
  visibility = false;
  owner = '';
  imgLink = '';
  questions: any[] = [{question: ''}];
  department = '';
  featured = false;

  constructor(private rs: RequestService, private router: Router, private elementRef: ElementRef) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

  ngOnInit() {
    // TODO: Check to make sure the user is logged in. This isn't that important because this page is for admins.
  }

  addQuestion() {
    this.questions.push({question: ''});
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
    this.rs.post('/forms/job/new', data, null, 'urlencoded').subscribe((responseData) => {
      if (responseData.status === 'submitted') {
        this.jobName = '';
        this.jobDesc = '';
        this.visibility = false;
        this.featured = false;
        this.owner = '';
        this.imgLink = '';
        this.questions = [{question: ''}];
        this.department = '';
      } else {
        window.alert('failed to submit');
      }
    }, (error) => {
      window.alert(error.error.status);
    });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }
}
