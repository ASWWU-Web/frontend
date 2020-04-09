// tslint:disable:no-string-literal
import {Component, NgModule, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestService, HermesService } from '../../../../../shared-ng/services/services';

@Component({
  selector: 'admin',
  template: `
  <!-- Job Opportunities  -->
  <div id="jobOpps" class="container">
  <button class="btn btn-primary" routerLink="create">Create Job</button><br>
  <br>
  <card-list [cards]="cards"></card-list>
    <div *ngIf="forms.length == 0" class="col col-sm-12 col-md-6 col-lg-3 text-center">
          <p> No results found.</p>
    </div>
  </div>
  `,
  providers: [ RequestService ],
})

export class AdminComponent {
  formID: number;
  forms: any[] = [];
  cards: any[] = [];

  constructor(route: ActivatedRoute, private rs: RequestService, private hs: HermesService, private elementRef: ElementRef) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';

    hs.sendHeaderTitle('Admin Review');
    this.formID = +route.snapshot.params['formID'];
    this.loadForms();
  }
  loadForms() {
    this.rs.get('/forms/job/view/all').subscribe((data) => {
      this.forms = data.forms;
      this.cards = this.buildCards(this.forms);
    }, undefined);
  }

  shorten(description: string) {
    if (typeof description === 'string') {
      return description.split('\n')[0];
    }
    return '';
  }

  buildCards(forms: any[]) {
    return forms.map((item) => {
      return {
        image: item.image,
        color: '',
        title: item.job_name,
        subTitle: item.department,
        body: this.shorten(item.job_description),
        buttonText: 'View Applications',
        buttonLink: `/jobs/admin/review/${item.jobID}`
      };
    });
  }
}
