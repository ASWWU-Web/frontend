import {Component, ElementRef, NgModule, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, HermesService, RequestService } from '../../../../../../shared-ng/services/services';

import { User } from '../../../../../../shared-ng/interfaces/interfaces';
import { Subscription } from 'rxjs';

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
  currentUser: any;
  buildLoginLink: () => string;
  userInfoSubscription: Subscription;

  constructor(private rs: RequestService, private router: Router, private elementRef: ElementRef,
              private as: AuthService, private hs: HermesService) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

  ngOnInit() {
    // TODO: Check to make sure the user is logged in. This isn't that important because this page is for admins.
    this.buildLoginLink = this.as.buildLoginLink;
    this.userInfoSubscription = this.as.getUserInfo().subscribe(
      (data: User) => {
        this.currentUser = data;
      }
    );
    this.hs.sendHeaderTitle('Create Job');
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
