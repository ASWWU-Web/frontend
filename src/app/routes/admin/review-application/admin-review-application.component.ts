import { Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestService, AuthService, HermesService } from '../../../../shared-ng/services/services';
import { environment } from '../../../../shared-ng/environments/environment';
import { User } from '../../../../shared-ng/interfaces/interfaces';

@Component({
  selector: 'admin-review-app',
  templateUrl: 'admin-review-application.component.html',
  providers: [ RequestService ]
})

export class AdminReviewApplicationComponent {
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

  constructor(private route: ActivatedRoute, private rs: RequestService, private as: AuthService, private hs: HermesService) {
    hs.sendHeaderTitle('Admin Application Review');
    this.buildLoginLink = as.buildLoginLink;
    this.formID = +route.snapshot.params.formID;
    this.username = route.snapshot.params.username;
    as.authenticateUser().subscribe(
      (data) => {
        if (data) {
          this.currentUser = data;
          rs.get('/forms/job/view/1').subscribe((data) => {
            this.gForm = data.form;// { formID: "1", name: "generic", img: "http://lorempixel.com/300/200/abstract/", desc: "baseline stuff", owner: "1", questions: [{ID: "1", text: "What does ASWWU mean to you?"}]};
            // GET request to retrieve previous application answers
            rs.get('/forms/application/view/1/' + this.username).subscribe((data) => {
              this.gApp = data.application;// { jobID: "1", answers: [ {questionID: "1", answer: "many things"}], username: "buddy.boy", status: "", last_update: ""};
              if (data.status == 'Application not found' || this.gApp.answers.length == 0) {
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
          rs.get('/forms/job/view/' + this.formID).subscribe((data) => {
            this.form = data.form;// { formID: "2", name: "dog whisperer", img: "http://lorempixel.com/300/200/abstract/", desc: "talk to dogs", owner: "1", questions: [{ID: "1", text: "What's your favorite color?"}, {ID: "2", text: "What's the best animal?"}]};
            // GET request to retrieve previous application answers
            rs.get('/forms/application/view/' + this.formID + '/' + this.username).subscribe(
              (data) => {
                this.app = data.application;// { jobID: "2", answers: [ {questionID: "1", answer: "Roja"}, {questionID: "2", answer: "Dogs of course"}], username: "buddy.boy", status: "", last_update: ""};
                this.isResumeUploaded();
                if (data.status == 'Application not found' || this.app.answers.length == 0) {
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
      }
    );
  }

  updateStatus() {
    this.rs.post('/forms/application/status', {jobID: this.formID, username: this.username, status: this.app.status}, null,'urlencoded').subscribe(
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
