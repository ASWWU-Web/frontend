import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RequestService, HermesService } from '../../../shared-ng/services/services';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls:  ['home.component.css'],
  providers: [ RequestService ]
})

export class HomeComponent {
    query: string = '';
    department: string = '';
    filtered: any[] = [];
    forms: any[] = [];
    initialLoad: boolean = true;
    cards: any[] = [];

    constructor(private rs: RequestService, private hermesService: HermesService) {
      hermesService.sendHeaderTitle('What is ASWWU?');
      rs.get('/forms/job/view/all').subscribe((data) => {
        this.forms = data.forms.filter((el) => {
          return el.visibility;
        });
        // this.filterItems();
      }, null);
    }

    filterItems() {
      // set initialLoad to false
      this.initialLoad = false;
      // Remove the Generic form
      this.filtered = this.forms.filter((el) => {
        if (el.jobID == 1) {
          return false;
        }
        return true;
      });
      //Remove all other departments.
      this.filtered = this.filtered.filter((el) => {
         return el.department.toLowerCase().indexOf(this.department.toLowerCase()) > -1;
      });
      this.cards = this.buildCards(this.filtered);
    }

    shorten(description: string) {
      if(typeof description === "string") {
        return description.split("\n")[0];
      }
      return "";
    }

    buildCards(filteredCards: any[]) {
      return filteredCards.map((item) => {
        return {
          image: item.image,
          color: null,
          title: item.job_name,
          subTitle: item.department,
          body: this.shorten(item.job_description),
          buttonText: 'View Opportunity',
          buttonLink: `/submit/${item.jobID}`
        };
      });

    }
}
