import {Component, OnInit, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'submit',
  templateUrl: 'app/routes/submit/submit.component.html',
})

export class SubmitComponent implements OnInit {
	form: any = { formID: "1", name: "dog whisperer", img: "http://lorempixel.com/300/200/abstract/", desc: "talk to dogs", owner: "1", questions: [{ID: "1", text: "What's your favorite color?"}, {ID: "2", text: "What's the best animal?"}]};
	answers: any[] = [];
	formID: number;

	constructor(route: ActivatedRoute) {
		this.formID = +route.snapshot.params['formID'];	
	}

	ngOnInit() {
		//build the empty answers array
		this.form.questions.forEach((entry) => {
			let answerObj = {questionID: entry.ID, answer: ""};
			this.answers.push(answerObj);
		});
	}

	onSubmit() {
		let submission = { jobID: this.formID, answers: this.answers};
		console.log(submission);
	}

}