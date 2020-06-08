import { Component, NgModule } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService } from '../../../shared-ng/services/request.service';

@Component({
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.css']
})
export class RevisionsComponent {
  revisions: any[];
  pageURL: string;
  revisionURL: string;
  viewingRevisionID: string;
  currentRevisionID: string;

  constructor(private rs: RequestService, private route: ActivatedRoute, private router: Router) {
    // get page URL
    this.route.params.subscribe((params) => {
      this.pageURL = params.pageURL;
    });
    this.reloadRevisions();
  }

  getDateTime(datetime) {
    const date = new Date(datetime);
    const options = { 'month': 'long', 'day': 'numeric', 'year': 'numeric', 'hour': 'numeric', 'minute': 'numeric' };
    return date.toLocaleString('en-US', options);
  }

  reloadRevisions() {
    this.rs.get('/pages/admin/' + this.pageURL + '/revision').subscribe((data) => {
      this.revisions = data.results.reverse();
      this.viewingRevisionID = this.revisions[0].id;
      this.currentRevisionID = this.revisions[0].id;
      this.revisions.splice(0, 1);
      this.loadRevision(this.currentRevisionID);
    });
  }

  loadRevision(id) {
    this.viewingRevisionID = id;
    this.revisionURL = '/pages/admin/' + this.pageURL + '/revision/' + id;
  }

  restoreRevision() {
    if (confirm('Are you sure you want to revert to this page?')) {
      this.rs.post(this.revisionURL, {}).subscribe((data) => {
        if (data.status === 'Revision Restored') {
          this.reloadRevisions();
          alert('Revision restored.');
        } else {
          alert('Something went wrong.');
        }
      }, (error) => {
        alert('Something went wrong.');
      });
    }
  }

  getStyle(id) {
    if (id === this.viewingRevisionID) {
      return {
        'color': 'white',
        'background-color': '#007bff',
        'z-index': 1
      };
    } else {
      return {
        'z-index': 0
      };
    }
  }
}
