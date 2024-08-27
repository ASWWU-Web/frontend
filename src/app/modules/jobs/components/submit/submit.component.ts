import { Component, NgModule, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';

import { RequestService } from '../../../../../shared-ng/services/request.service';

import { environment } from '../../../../../shared-ng/environments/environment';
import { AuthService, HermesService, JobsRequestService } from '../../../../../shared-ng/services/services';
import {
  ApplicationPOST,
  JobView,
  ApplicationView,
  User,
  FormPairView
} from 'src/shared-ng/interfaces/interfaces';
import { concat, forkJoin, Subscription } from 'rxjs';
import { concatMap, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'submit',
  templateUrl: 'submit.component.html',
  providers: [RequestService, JobsRequestService]
})

export class SubmitComponent implements OnInit {

  genericFormId = 1;

  submitTextOptions = {
    submit: 'Submit',
    submitting: 'Submitting...',
  };
  errorTextOptions = {
    submissionFailed: 'Submission Failed. Try again, then send an email to aswwu.webmaster@wallawalla.edu.',
    noError: '',
  };
  resumeUploadStatusOptions = {
    upload: 'Upload',
    success: 'Success',
    failed: 'Failed',
  };

  formSection = { generic: 0, specific: 1 };
  formContent: FormPairView[] = [
    { job: null, application: null },
    { job: null, application: null }
  ];

  formID: number;
  currentUser: User;
  submitText = this.submitTextOptions.submit;
  file: any;
  public uploader: FileUploader = new FileUploader({ url: environment.API_URL + '/forms/resume/upload' });
  buildLoginLink: () => string;
  userInfoSubscription: Subscription;
  resumeUploadStatus = this.resumeUploadStatusOptions.upload;
  errorText = this.errorTextOptions.noError;

  constructor(private route: ActivatedRoute, private rs: RequestService, private jrs: JobsRequestService,
    private as: AuthService, private router: Router, private hermesService: HermesService, private elementRef: ElementRef) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

  ngOnInit() {
    this.buildLoginLink = this.as.buildLoginLink;
    this.formID = this.route.snapshot.params.formID;
    this.userInfoSubscription = this.as.getUserInfo().subscribe((data: User) => {
      if (!this.currentUser && data) {
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
        this.resumeUploadStatus = this.resumeUploadStatusOptions.failed;
      } else {
        this.resumeUploadStatus = this.resumeUploadStatusOptions.success;
      }
    };

    this.uploader.onBuildItemForm = (item, form) => {
      form.append('jobID', this.formID);
      item.withCredentials = false;
    };

    // https://stackoverflow.com/a/51646103/11021067
    this.uploader.onAfterAddingFile = (fileItem) => {
      const latestFile = this.uploader.queue[this.uploader.queue.length - 1];
      this.uploader.queue = [];
      this.uploader.queue.push(latestFile);
    };
  }

  updateFormJob(formSection: number, data: JobView): void {
    this.formContent[formSection].job = data;
  }

  updateFormApplication(formSection: number, data: ApplicationView): void {
    const expectedAnswers = this.formContent[formSection].job.questions.length;
    if (data.answers.length !== expectedAnswers) {
      data.answers = this.formContent[formSection].job.questions.map(value => ({ questionID: value.id, answer: '' }));
    }
    this.formContent[formSection].application = data;
  }

  prepareForm(jobId: number, applicantUsername: string, formSection: number) {
    return this.jrs.readJob(jobId).pipe(
      tap(data => this.updateFormJob(formSection, data)),
      switchMap(data => this.jrs.readApplication(jobId, applicantUsername)),
      tap(data => this.updateFormApplication(formSection, data))
    );
  }

  getJobData(userData: User) {
    if (userData) {
      const username = userData.username;
      this.prepareForm(this.genericFormId, username, this.formSection.generic).subscribe();
      this.prepareForm(this.formID, username, this.formSection.specific).pipe(
        tap(data => this.hermesService.sendHeaderTitle(this.formContent[this.formSection.specific].job.job_name))
      ).subscribe();
    }
  }

  navigateToDone(formID: number) {
    this.router.navigateByUrl('jobs/done/' + this.formID);
  }

  uploadResume() {
    if (this.uploader.getNotUploadedItems().length > 0) {
      this.uploader.uploadAll();
    }
  }

  failedSubmission() {
    this.errorText = this.errorTextOptions.submissionFailed;
    this.submitText = this.submitTextOptions.submit;
  }

  successfulSubmission() {
    this.errorText = this.errorTextOptions.noError;
    this.navigateToDone(this.formID);
  }

  onSubmit() {
    this.submitText = this.submitTextOptions.submitting;
    const specificSubmission: ApplicationPOST = {
      jobID: this.formID, username: this.currentUser.username,
      answers: this.formContent[this.formSection.specific].application.answers
    };
    const genericSubmission: ApplicationPOST = {
      jobID: this.genericFormId, username: this.currentUser.username,
      answers: this.formContent[this.formSection.generic].application.answers
    };
    const generalObservable = this.jrs.postSubmission(genericSubmission);
    const specificObservable = this.jrs.postSubmission(specificSubmission);

    // run `general` first so we don't get applications where `general` failed but `specific` succeeded.
    concat(generalObservable, specificObservable).subscribe(
      data => this.successfulSubmission(),
      error => this.failedSubmission(),
      () => { },
    );
  }

}
