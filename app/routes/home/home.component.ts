import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestService } from "../../RequestService/requests";

@Component({
  selector: 'home',
  templateUrl: 'app/routes/home/home.component.html',
  providers: [ RequestService ]
})

export class HomeComponent {
    query: string = "";
    department: string = "";
    filtered: any[] = [];
    forms: any[] = [];

    constructor(private rs: RequestService) {
      rs.get('/forms/job/view/all', (data) => {
        this.forms = data.forms;
        this.filterItems();
      }, null);
    }

    filterItems() {
      this.filtered = this.forms.filter((el) => {
          var doc = el.job_name + el.job_description;
         return doc.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      })
      this.filtered = this.filtered.filter((el) => {
        var doc = el.job_name + el.job_description;
         return doc.toLowerCase().indexOf(this.department.toLowerCase()) > -1;
      })
    }
}
