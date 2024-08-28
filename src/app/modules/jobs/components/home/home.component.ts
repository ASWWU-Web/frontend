import {Component, NgModule, OnInit, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RequestService, HermesService } from '../../../../../shared-ng/services/services';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls:  ['home.component.css'],
  providers: [ RequestService ]
})

export class HomeComponent implements OnInit {
    query = '';
    department = '';
    filtered: any[] = [];
    forms: any[] = [];
    initialLoad = true;
    cards: any[] = [];

    constructor(private rs: RequestService, private hermesService: HermesService, private elementRef: ElementRef) {
      // sets background color
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    }

    ngOnInit(): void {
      this.hermesService.sendShowHeader(true);
      this.hermesService.sendHeaderTitle('What is ASWWU?');
      this.rs.get('/forms/job/view/all').subscribe((data) => {
        this.forms = data.forms.filter((el) => {
          return el.visibility;
        });
        this.filterFeatured();
      }, null);
    }

  filterFeatured() {
      this.filtered = this.forms.filter((form) => {
        return form.featured;
      });
      this.cards = this.buildCards(this.filtered);
    }

    filterItems() {
      // set initialLoad to false
      this.initialLoad = false;
      // Remove the Generic form
      this.filtered = this.forms.filter((el) => {
        if (el.jobID === 1) {
          return false;
        }
        return true;
      });
      // Remove all other departments.
      this.filtered = this.filtered.filter((el) => {
         return el.department.toLowerCase().indexOf(this.department.toLowerCase()) > -1;
      });
      this.cards = this.buildCards(this.filtered);
    }

    shorten(description: string) {
      if (typeof description === 'string') {
        return description.split('\n')[0];
      }
      return '';
    }

    deptToCardColor(dept: string) {
      // currently most of the departments in the server can be
      // converted to color strings in the custom aswwu stylesheet
      // with simple string manipulations. this may not always be
      // the case in the future.
      if (dept === 'Department Head') {
 dept = 'aswwu-dark';
}
      const deptPart = dept.replace(' ', '-').toLowerCase();
      return `var(--color-${deptPart})`;
    }

    buildCards(filteredCards: any[]) {
      return filteredCards.map((item) => {
        return {
          image: item.image,
          color: this.deptToCardColor(item.department),
          title: item.job_name,
          subTitle: item.department,
          body: this.shorten(item.job_description),
          buttonText: 'View Opportunity',
          buttonLink: `submit/${item.jobID}`
        };
      });
    }
}
