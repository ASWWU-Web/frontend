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
      rs.get('/search/all', (data) => {
        this.forms = [
            {formID: "1", name: "dog whisperer - ASWWU Spiritual", img: "http://lorempixel.com/300/200/abstract/", desc: "talk to dogs"},
            {formID: "2", name: "chef - ASWWU Executive", img: "http://lorempixel.com/300/200/abstract/", desc: "cookin'"},
            {formID: "3", name: "web wizard - ASWWU Web", img: "http://lorempixel.com/300/200/abstract/", desc: "the best job"},
            {formID: "4", name: "regular wizard", img: "http://lorempixel.com/300/200/abstract/", desc: "another good one"},
            {formID: "5", name: "president", img: "http://lorempixel.com/300/200/abstract/", desc: "of the US? or just ASWWU?"},
            {formID: "6", name: "dog whisperer", img: "http://lorempixel.com/300/200/abstract/", desc: "talk to dogs"},
            {formID: "7", name: "chef", img: "http://lorempixel.com/300/200/abstract/", desc: "cookin'"},
            {formID: "8", name: "web wizard", img: "http://lorempixel.com/300/200/abstract/", desc: "the best job"},
            {formID: "9", name: "regular wizard", img: "http://lorempixel.com/300/200/abstract/", desc: "another good one"},
            {formID: "10", name: "president", img: "http://lorempixel.com/300/200/abstract/", desc: "of the US? or just ASWWU?"},
        ];
        this.filterItems();
      }, null);
    }

    filterItems() {
      this.filtered = this.forms.filter((el) => {
          var doc = el.name + el.desc;
         return doc.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      })
      this.filtered = this.filtered.filter((el) => {
          var doc = el.name + el.desc;
         return doc.toLowerCase().indexOf(this.department.toLowerCase()) > -1;
      })
    }
}
