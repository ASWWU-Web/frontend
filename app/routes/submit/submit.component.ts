import {Component, NgModule} from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';

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
	currentUser: any;

	constructor(private route: ActivatedRoute, private rs: RequestService, private router: Router) {
		this.formID = route.snapshot.params['formID'];	
		rs.verify((user) => {
			if(user) {
				this.currentUser = user;
				//GET request to retrieve the form
				rs.get('/search/all', (data) => {
					this.form = { formID: "1", name: "dog whisperer", img: "http://lorempixel.com/300/200/abstract/", desc: "talk to dogs", owner: "1", questions: [{ID: "1", text: "What's your favorite color?"}, {ID: "2", text: "What's the best animal?"}]};
					//GET request to retrieve previous application answers
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
					}, undefined);
				}, undefined);
			}
		});
	}

	onSubmit() {
		let submission = { jobID: this.formID, username: "ryan.rabello", answers: this.answers};
		this.rs.postxwww('/forms/application/submit', submission, (data) => {
			try {
				if(data.error) {
					window.alert("Error: "+data.error);
				} else if(data.status == "submitted") {
					this.router.navigateByUrl("/done/"+this.formID);
				} else {
					window.alert("form status: "+data.status);
				}
			}
			catch(err) {
				window.alert(err);
			}
		}, (error) => { window.alert(error)} );
	}

}