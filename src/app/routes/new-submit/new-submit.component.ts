import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { RequestService } from '../../../shared-ng/services/request.service';

import {environment} from '../../../shared-ng/environments/environment';
import { AuthService, HermesService, JobsRequestService } from '../../../shared-ng/services/services';
import {
  AnswerObject,
  ApplicationPOST,
  JobView,
  ApplicationView,
  User,
  QuestionObject,
  FormPairView
} from 'src/shared-ng/interfaces/interfaces';
import { Subscription } from 'rxjs';
import {concatMap, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'new-submit',
  templateUrl: 'new-submit.component.html',
  providers: [ RequestService, JobsRequestService ]
})

export class NewSubmitComponent implements OnInit {

  genericFormId = 1;

  formSection = {generic: 0, specific: 1};
  form: FormPairView[] = [
    {job: null, application: null},
    {job: null, application: null}
  ];

  genericAnswers: AnswerObject[] = [];
  specificAnswers: AnswerObject[] = [];

  formID: number;
  currentUser: User;
  submitText = 'Submit';
  file: any;
  public uploader: FileUploader = new FileUploader({url: environment.SERVER_URL + '/forms/resume/upload'});
  buildLoginLink: () => string;
  userInfoSubscription: Subscription;
  resumeUploadStatus = 'upload';

  constructor(private route: ActivatedRoute, private rs: RequestService, private jrs: JobsRequestService,
              private as: AuthService, private router: Router, private hermesService: HermesService) {
  }

  ngOnInit() {
    this.buildLoginLink = this.as.buildLoginLink;
    this.formID = this.route.snapshot.params.formID;
    this.userInfoSubscription = this.as.getUserInfo().subscribe((data: User) => {
      if (this.currentUser === null && data) {
        // this will get called when the component loads the first time, and
        // any time the user data goes from null to defined, but not times
        // when user data is only mutated.
        this.getJobData(data);
      }
      this.currentUser = data;
    });
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status);
      if (status < 200 || status > 299) {
        this.resumeUploadStatus = 'failed';
      } else {
        this.resumeUploadStatus = 'success';
      }
    };
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('jobID', this.formID);
      item.withCredentials = false;
    };
  }

  updateFormJob(formSection: number, data: JobView): void {
    this.form[formSection].job = data;
    this.hermesService.sendHeaderTitle(data.job_name);
  }

  updateFormApplication(formSection: number, data: ApplicationView): void {
    const expectedAnswers = this.form[formSection].job.questions.length;
    if (data.answers.length !== expectedAnswers) {
      data.answers = this.form[formSection].job.questions.map(value => ({questionID: value.id, answer: ''}));
    }
    this.form[formSection].application = data;
  }

  prepareForm(jobId: number, applicantUsername: string, formSection: number): void {
    this.jrs.readJob(jobId).pipe(
      tap(data => this.updateFormJob(formSection, data)),
      switchMap(data => this.jrs.readApplication(jobId, applicantUsername)),
      tap(data => this.updateFormApplication(formSection, data))
    ).subscribe();
  }

  getJobData(userData: User) {
    if (userData) {
      const username = userData.username;
      this.prepareForm(this.genericFormId, username, this.formSection.generic);
      this.prepareForm(this.formID, username, this.formSection.specific);
    }
  }

  navigateToDone(formID: number) {
    this.router.navigateByUrl('/done/' + this.formID);
  }

  uploadResume() {
    if (this.uploader.getNotUploadedItems().length > 0) {
      this.uploader.uploadAll();
    }
  }

  onSubmit() {
    this.submitText = 'Submitting...';
    const specificSubmission: ApplicationPOST = { jobID: this.formID, username: this.currentUser.username,
                                                  answers: this.form[this.formSection.specific].application.answers };
    const genericSubmission: ApplicationPOST = { jobID: this.genericFormId, username: this.currentUser.username,
                                                 answers: this.form[this.formSection.generic].application.answers };
    this.jrs.postSubmission(genericSubmission).subscribe();
    this.jrs.postSubmission(specificSubmission).subscribe();
  }

}
