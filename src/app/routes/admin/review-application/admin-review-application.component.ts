import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestService, AuthService, HermesService } from '../../../../shared-ng/services/services';
import { environment } from '../../../../shared-ng/environments/environment';
import { User } from '../../../../shared-ng/interfaces/interfaces';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'admin-review-app',
  templateUrl: 'admin-review-application.component.html',
  providers: [ RequestService ]
})

export class AdminReviewApplicationComponent implements OnInit, OnDestroy {
  formID: number;
  username: string;
  application: any;
  currentUser: any;
  form: any;
  gForm: any;
  app: any;
  gApp: any;
  answers: any[] = [];
  gAnswers: any[] = [];
  SERVER_URL: string = environment.SERVER_URL;
  isResume = false;
  buildLoginLink: () => string;
  userInfoSubscription: Subscription;

  constructor(private route: ActivatedRoute, private rs: RequestService, private as: AuthService, private hs: HermesService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.hs.sendHeaderTitle('Admin Application Review');
    this.buildLoginLink = this.as.buildLoginLink;
    this.formID = +this.route.snapshot.params.formID;
    this.username = this.route.snapshot.params.username;
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

  ngOnDestroy() {
    this.userInfoSubscription.unsubscribe();
  }

  getJobData() {
      this.rs.get('/forms/job/view/1').subscribe((formData) => {
        this.gForm = formData.form;
        // GET request to retrieve previous application answers
        this.rs.get('/forms/application/view/1/' + this.username).subscribe((applicationData) => {
          this.gApp = applicationData.application;
          if (applicationData.status == 'Application not found' || this.gApp.answers.length === 0) {
            // build the empty answers array
            this.gForm.questions.forEach((entry) => {
              const answerObj = {questionID: entry.id, answer: ''};
              this.gAnswers.push(answerObj);
            });
          } else {
            this.gApp.answers.forEach((entry) => {
              const answerObj = {questionID: entry.questionID, answer: entry.answer};
              this.gAnswers.push(answerObj);
            });
          }
        }, (err) => {
          this.gForm.questions.forEach((entry) => {
            const answerObj = {questionID: entry.id, answer: ''};
            this.gAnswers.push(answerObj);
          });
        });
      }, undefined);
      // GET request to retrieve the form
      this.rs.get('/forms/job/view/' + this.formID).subscribe((formData) => {
        this.form = formData.form;
        // GET request to retrieve previous application answers
        this.rs.get('/forms/application/view/' + this.formID + '/' + this.username).subscribe(
          (applicationData) => {
            this.app = applicationData.application;
            this.isResumeUploaded();
            if (applicationData.status == 'Application not found' || this.app.answers.length === 0) {
              // build the empty answers array
              this.form.questions.forEach((entry) => {
                const answerObj = {questionID: entry.id, answer: ''};
                this.answers.push(answerObj);
              });
            } else {
              this.app.answers.forEach((entry) => {
                const answerObj = {questionID: entry.questionID, answer: entry.answer};
                this.answers.push(answerObj);
              });
            }
          }, (err) => {
            this.form.questions.forEach((entry) => {
              const answerObj = {questionID: entry.id, answer: ''};
              this.answers.push(answerObj);
            });
          }
        );
      }, undefined);
  }


  updateStatus() {
    const postData = {
      jobID: this.formID,
      username: this.username,
      status: this.app.status
    }
    this.rs.post('/forms/application/status', postData, null, 'urlencoded').subscribe(
      (data) => {
        if (!(data.status === 'success')) {
          window.alert('Application status set to: ' + this.app.status);
        }
      },
      (err) => window.alert('Error: ' + err)
    );
  }

  isResumeUploaded() {
    if (this.app.resume) {
      this.isResume = true;
    } else {
      this.isResume = false;
    }
  }
}
