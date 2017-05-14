import { Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestService } from '../../../RequestService/requests';
import { SERVER_URL } from '../../../config';

@Component({
  selector: 'admin-review-app',
	templateUrl: 'app/routes/admin/review-application/admin-review-application.component.html',
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
	gAnswers:any[] = [];
	SERVER_URL: string = SERVER_URL;
	isResume: boolean = false;

	constructor(private route: ActivatedRoute, private rs: RequestService) {
		this.formID = +route.snapshot.params['formID'];
		this.username = route.snapshot.params['username'];
		rs.verify((user) => {
			if(user) {
				this.currentUser = user;
				rs.get('/forms/job/view/1', (data) => {
					this.gForm = data.form//{ formID: "1", name: "generic", img: "http://lorempixel.com/300/200/abstract/", desc: "baseline stuff", owner: "1", questions: [{ID: "1", text: "What does ASWWU mean to you?"}]};
					//GET request to retrieve previous application answers
					rs.get('/forms/application/view/1/'+this.username, (data) => {
						this.gApp = data.application//{ jobID: "1", answers: [ {questionID: "1", answer: "many things"}], username: "buddy.boy", status: "", last_update: ""};
						if(data.status == "Application not found" || this.gApp.answers.length == 0) {
							//build the empty answers array
							this.gForm.questions.forEach((entry) => {
								let answerObj = {questionID: entry.id, answer: ""};
								this.gAnswers.push(answerObj);
							});
						} else {
							this.gApp.answers.forEach((entry) => {
								let answerObj = {questionID: entry.questionID, answer: entry.answer};
								this.gAnswers.push(answerObj);
							});
						}
					}, (err) => {
						this.gForm.questions.forEach((entry) => {
							let answerObj = {questionID: entry.id, answer: ""};
							this.gAnswers.push(answerObj);
						});
					});
				}, undefined);

				//GET request to retrieve the form
				rs.get('/forms/job/view/'+this.formID, (data) => {
					this.form = data.form//{ formID: "2", name: "dog whisperer", img: "http://lorempixel.com/300/200/abstract/", desc: "talk to dogs", owner: "1", questions: [{ID: "1", text: "What's your favorite color?"}, {ID: "2", text: "What's the best animal?"}]};
					//GET request to retrieve previous application answers
					rs.get('/forms/application/view/'+this.formID+'/'+this.username, (data) => {
						this.app = data.application//{ jobID: "2", answers: [ {questionID: "1", answer: "Roja"}, {questionID: "2", answer: "Dogs of course"}], username: "buddy.boy", status: "", last_update: ""};
						if(data.status == "Application not found" || this.app.answers.length == 0) {
							//build the empty answers array
							this.form.questions.forEach((entry) => {
								let answerObj = {questionID: entry.id, answer: ""};
								this.answers.push(answerObj);
							});
						} else {
							this.app.answers.forEach((entry) => {
								let answerObj = {questionID: entry.questionID, answer: entry.answer};
								this.answers.push(answerObj);
							});
						}
					}, (err) => {
						this.form.questions.forEach((entry) => {
							let answerObj = {questionID: entry.id, answer: ""};
							this.answers.push(answerObj);
						});
					});
				}, undefined);
			}
			this.isResumeUploaded();
		});
	}

	updateStatus() {
		this.rs.postxwww('/forms/application/status', {jobID: this.formID, username: this.username, status: this.app.status},
			(data)=>{
				if(!(data.status == "success")){
					window.alert("Application status set to: " + this.app.status);
				}
			},
			(err) => {window.alert("Error: " + err);}
		);
	}

	isResumeUploaded() {
		this.rs.get(SERVER_URL + '/forms/resume/download/' +  this.formID  + '/' + this.username, (data) =>{
			this.isResume = true;
		}, (err) =>{

			// if err.status is undefined the resume exists. 
			if(!err.status){
				this.isResume = true;
			} else {
				this.isResume = false;
			}
		})
	}
}
