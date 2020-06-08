import { Component } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService, HermesService } from '../../../shared-ng/services/services';

@Component({
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {
  departments: any = [];

  constructor(private rs: RequestService, private route: ActivatedRoute, private router: Router,
              private hs: HermesService) {
    // get departments data
    this.rs.get('/pages/departments').subscribe((data) => {
      this.departments = data.departments;
    });

    this.hs.sendShowHeader(true);
    this.hs.sendHeaderImageUri('../../../assets/departments.jpg');
    this.hs.sendHeaderTitle('Departments');
    this.hs.sendHeaderInvert(true);
    this.hs.sendShowSubNav(true);
  }
}
