import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RequestService } from "../../RequestService/requests";

@Component({
  selector: 'home',
  templateUrl: 'app/routes/home/home.component.html',
  styleUrls:  ['app/routes/home/home.component.css'],
  providers: [ RequestService ]
})

export class HomeComponent {
    query: string = "";
    department: string = "";
    filtered: any[] = [];
    forms: any[] = [];
    initialLoad: boolean = true;

    constructor(private rs: RequestService) {
      rs.get('/forms/job/view/all', (data) => {
        this.forms = data.forms.filter((el) => {
          return el.visibility;
        });
        this.filterItems();
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
    }

    shorten(description: string) {
      if(typeof description === "string") {
        return description.split("\n")[0];
      }
      return "";
    }
}
