import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { RequestService } from "../../RequestService/requests";


@Component({
  selector: 'submit',
  templateUrl: 'app/routes/submit/submit.component.html',
  providers: [ RequestService ]
})

export class SubmitComponent {
	form: any;
	app: any;
	answers: any[] = [];
	formID: number;

	constructor(private route: ActivatedRoute, private rs: RequestService) {
		this.formID = route.snapshot.params['formID'];	
		//TODO, actually make some requests to the proper places //need to send formID
		//GET request for form 
		rs.get('/search/all', (data) => {
			this.form = { formID: "1", name: "dog whisperer", img: "http://lorempixel.com/300/200/abstract/", desc: "talk to dogs", owner: "1", questions: [{ID: "1", text: "What's your favorite color?"}, {ID: "2", text: "What's the best animal?"}]};
			rs.get('/search/all', (data) => {
				this.app = { jobID: "1", answers: [ {questionID: "1", answer: "Roja"}, {questionID: "2", answer: "Dogs of course"}], username: "buddy.boy", status: "", last_update: ""};
				if(!this.app) {
					//build the empty answers array
					this.form.questions.forEach((entry) => {
						let answerObj = {questionID: entry.ID, answer: ""};
						this.answers.push(answerObj);
					});
				} else {
					this.app.answers.forEach((entry) => {
						let answerObj = {questionID: entry.questionID, answer: entry.answer};
						this.answers.push(answerObj);
					});
				}
			}, null);
		}, null);

		//GET request for application
		//need to send jobID (formID), and username (have to get username)
		
	}

	onSubmit() {
		let submission = { jobID: this.formID, username: "nolan.chinn", answers: this.answers};
		console.log(submission);
		this.rs.post('/forms/application/submit', submission, () => {}, null);
	}

}