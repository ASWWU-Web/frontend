import {Component, NgModule} from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { RequestService } from '../../../shared-ng/services/request.service';

import {environment} from '../../../shared-ng/environments/environment';
import { AuthService, HermesService } from 'src/shared-ng/services/services';


@Component({
  selector: 'submit',
  templateUrl: 'submit.component.html',
  providers: [ RequestService ]
})

export class SubmitComponent {
  form: any;
  gForm: any;
  app: any;
  gApp: any;
  answers: any[] = [];
  gAnswers: any[] = [];
  formID: number;
  currentUser: any;
  submitText = 'Submit';
  file: any;
  public uploader: FileUploader = new FileUploader({url: environment.SERVER_URL + '/forms/resume/upload'});
  buildLoginLink: () => string;

  constructor(private route: ActivatedRoute, private rs: RequestService,
              private as: AuthService, private router: Router, private hermesService: HermesService) {
    this.buildLoginLink = as.buildLoginLink;
    this.formID = route.snapshot.params.formID;
    as.authenticateUser().subscribe((user) => {
      if (user) {
        this.currentUser = user;
        rs.get('/forms/job/view/1').subscribe((data) => {
          this.gForm = data.form; // { formID: "1", name: "generic", img: "http://lorempixel.com/300/200/abstract/", desc: "baseline stuff", owner: "1", questions: [{ID: "1", text: "What does ASWWU mean to you?"}]};
          // GET request to retrieve previous application answers
          rs.get('/forms/application/view/1/' + this.currentUser.username).subscribe((data) => {
            this.gApp = data.application; // { jobID: "1", answers: [ {questionID: "1", answer: "many things"}], username: "buddy.boy", status: "", last_update: ""};
            if (data.status == 'Application not found' || this.gApp.answers.length == 0) {
              // build the empty answers array
              this.gForm.questions.forEach((entry) => {
                const answerObj = {
                  questionID: entry.id,
                  answer: ''
                };
                this.gAnswers.push(answerObj);
              });
            } else {
              this.gApp.answers.forEach((entry) => {
                const answerObj = {
                  questionID: entry.questionID,
                  answer: entry.answer
                };
                this.gAnswers.push(answerObj);
              });
            }
          }, (err) => {
            this.gForm.questions.forEach((entry) => {
              const answerObj = {
                questionID: entry.id,
                answer: ''
              };
              this.gAnswers.push(answerObj);
            });
          });
        }, undefined);

        // GET request to retrieve the form
        rs.get('/forms/job/view/' + this.formID).subscribe((data) => {
          this.form = data.form; // { formID: "2", name: "dog whisperer", img: "http://lorempixel.com/300/200/abstract/", desc: "talk to dogs", owner: "1", questions: [{ID: "1", text: "What's your favorite color?"}, {ID: "2", text: "What's the best animal?"}]};
          // GET request to retrieve previous application answers
          hermesService.sendHeaderTitle(this.form.job_name);
          rs.get('/forms/application/view/' + this.formID + '/' + this.currentUser.username).subscribe((data) => {
            this.app = data.application; // { jobID: "2", answers: [ {questionID: "1", answer: "Roja"}, {questionID: "2", answer: "Dogs of course"}], username: "buddy.boy", status: "", last_update: ""};
            if (data.status == 'Application not found' || this.app.answers.length == 0) {
              // build the empty answers array
              this.form.questions.forEach((entry) => {
                const answerObj = {
                  questionID: entry.id,
                  answer: ''
                };
                this.answers.push(answerObj);
              });
            } else {
              this.app.answers.forEach((entry) => {
                const answerObj = {
                  questionID: entry.questionID,
                  answer: entry.answer
                };
                this.answers.push(answerObj);
              });
            }
          }, (err) => {
            this.form.questions.forEach((entry) => {
              const answerObj = {
                questionID: entry.id,
                answer: ''
              };
              this.answers.push(answerObj);
            });
          });
        }, undefined);
      }
    });
  }

  onSubmit() {
    this.submitText = 'Submitting...';
    const submission = { jobID: this.formID, username: this.currentUser.username, answers: this.answers};
    const gSubmission = { jobID: '1', username: this.currentUser.username, answers: this.gAnswers};
    this.rs.post('/forms/application/submit', gSubmission, null, 'urlencoded').subscribe((data) => {
      try {
        if (!data.error) {
          this.rs.post('/forms/application/submit', submission, null, 'urlencoded').subscribe((data) => {
            try {
              if (data.error) {
                console.log('(a) Error:', data.error);
                this.submitText = 'Submit';
              } else if (data.status == 'submitted') {
                // File Upload
                this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                  console.log('ImageUpload:uploaded:', item, status);
                  if (status < 200 || status > 299) {
                    console.log('(b) Error: ', JSON.parse(response).message);
                    this.submitText = 'Submit';
                  } else {
                    this.router.navigateByUrl('/done/'+ this.formID);
                  }
                };
                this.uploader.onBuildItemForm = (item, form) => {
                  form.append('jobID', this.formID);
                  item.withCredentials = false;
                };
                this.uploader.uploadAll();
              } else {
                console.log('form status: ', data.status);
                window.alert('form status: '+ data.status);
                this.submitText = 'Submit';
              }
            } catch (err) {
              console.log('(c) Error: ', err);
              this.submitText = 'Submit';
            }
          }, (error) => { console.log('(d) Error: ', error); this.submitText = 'Submit'; } );
        }
      } catch (err) {

      }
    }, (error) => { console.log('(e) Error: ', error); this.submitText = 'Submit'; } );

  }

}
